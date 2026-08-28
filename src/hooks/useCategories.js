import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import {
  DEFAULT_INCOME_CATEGORIES,
  DEFAULT_EXPENSE_CATEGORIES,
} from '../utils/categories'

export function useCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!user) {
      setCategories([])
      setLoading(false)
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Gagal memuat kategori:', error)
      setCategories([])
      setLoading(false)
      return
    }

    if (data && data.length === 0) {
      await seedDefaults()

      const { data: newData, error: reloadError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })

      if (!reloadError) {
        setCategories(newData ?? [])
      }

      setLoading(false)
      return
    }

    setCategories(data ?? [])
    setLoading(false)
  }, [user])

  async function seedDefaults() {
    if (!user) return

    const rows = [
      ...DEFAULT_INCOME_CATEGORIES.map((name) => ({
        user_id: user.id,
        name,
        type: 'income',
      })),
      ...DEFAULT_EXPENSE_CATEGORIES.map((name) => ({
        user_id: user.id,
        name,
        type: 'expense',
      })),
    ]

    const { error } = await supabase
      .from('categories')
      .upsert(rows, {
        onConflict: 'user_id,name,type',
        ignoreDuplicates: true,
      })

    if (error) {
      console.error('Gagal membuat kategori default:', error)
    }
  }

  async function addCategory({ name, type }) {
    if (!user) {
      throw new Error('User belum login')
    }

    const cleanName = name.trim()

    if (!cleanName) {
      throw new Error('Nama kategori wajib diisi')
    }

    const { data, error } = await supabase
      .from('categories')
      .upsert(
        {
          user_id: user.id,
          name: cleanName,
          type,
        },
        {
          onConflict: 'user_id,name,type',
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Gagal membuat kategori:', error)
      throw new Error('Gagal membuat kategori')
    }

    await load()

    return data
  }

  useEffect(() => {
    load()
  }, [load])

  const byType = (type) =>
    categories.filter((category) => category.type === type)

  return {
    categories,
    incomeCategories: byType('income'),
    expenseCategories: byType('expense'),
    loading,
    reload: load,
    addCategory,
  }
}