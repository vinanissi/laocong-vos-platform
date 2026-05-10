import { supabase } from './supabase'

export type SupabaseHealthResult = {
  ok: boolean
  status: 'OK' | 'ERROR'
  checkedAt: string
  error?: string
}

export async function checkSupabaseHealth(): Promise<SupabaseHealthResult> {
  const checkedAt = new Date().toISOString()

  try {
    const { error } = await supabase.auth.getSession()

    if (error) {
      return {
        ok: false,
        status: 'ERROR',
        checkedAt,
        error: error.message,
      }
    }

    return {
      ok: true,
      status: 'OK',
      checkedAt,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return {
      ok: false,
      status: 'ERROR',
      checkedAt,
      error: message,
    }
  }
}
