const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export interface Beer {
  id: string
  name: string
  style: string
  origin: string
  description?: string
  ibu: number
  abv: number
  imageUrl?: string
  onTap: boolean
  bestseller: boolean
  priceHalf: number
  pricePint: number
  priceGrowler?: number
  createdAt: string
  updatedAt: string
  foodPairings?: { id: string; name: string }[]
}

export interface Food {
  id: string
  name: string
  category: string
  description?: string
  price: number
  imageUrl?: string
  available: boolean
  pairingBeerId?: string
  pairingBeer?: { id: string; name: string; style: string }
  createdAt: string
  updatedAt: string
}

export interface Drink {
  id: string
  name: string
  category: string
  description?: string
  price: number
  imageUrl?: string
  available: boolean
  createdAt: string
  updatedAt: string
}

export interface HappyHourStatus {
  active: boolean
  discount: number
  startTime?: string
  endTime?: string
  message: string
}

export interface Style {
  id: string
  name: string
  createdAt: string
}

import { getMockData } from './mockData'

async function fetchAPI<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
    if (!res.ok) {
      throw new Error('API error')
    }
    return await res.json()
  } catch (error) {
    // Fallback to static mock data if the API is offline (e.g. deployed to Vercel without backend)
    console.warn(`[Mock Fallback] API offline or failed, serving static data for /${path}`)
    return getMockData(path) as T
  }
}

// ── PUBLIC ────────────────────────────────────────────────────
export const api = {
  beers: {
    getAll: (params?: { style?: string; onTap?: boolean }) => {
      const qs = new URLSearchParams()
      if (params?.style) qs.set('style', params.style)
      if (params?.onTap !== undefined) qs.set('onTap', String(params.onTap))
      return fetchAPI<Beer[]>(`beers${qs.size ? '?' + qs : ''}`, { next: { revalidate: 60 } })
    },
    getOne: (id: string) => fetchAPI<Beer>(`beers/${id}`),
  },
  food: {
    getAll: (category?: string) => {
      const qs = category ? `?category=${category}` : ''
      return fetchAPI<Food[]>(`food${qs}`, { next: { revalidate: 60 } })
    },
  },
  drinks: {
    getAll: (category?: string) => {
      const qs = category ? `?category=${category}` : ''
      return fetchAPI<Drink[]>(`drinks${qs}`, { next: { revalidate: 60 } })
    },
  },
  happyHour: {
    getStatus: () => fetchAPI<HappyHourStatus>('happy-hour/status', { next: { revalidate: 30 } }),
  },
  styles: {
    getAll: () => fetchAPI<Style[]>('styles', { next: { revalidate: 60 } }),
  },
}

// ── ADMIN (requires JWT token) ────────────────────────────────
export function adminApi(token: string) {
  const headers = { Authorization: `Bearer ${token}` }

  return {
    auth: {
      login: (email: string, password: string) =>
        fetchAPI<{ access_token: string; user: { id: string; email: string; role: string } }>(
          'auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }
        ),
    },
    beers: {
      getAll: () => fetchAPI<Beer[]>('beers', { headers }),
      create: (data: Partial<Beer>) => fetchAPI<Beer>('beers', { method: 'POST', body: JSON.stringify(data), headers }),
      update: (id: string, data: Partial<Beer>) => fetchAPI<Beer>(`beers/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers }),
      delete: (id: string) => fetch(`${API_URL}/beers/${id}`, { method: 'DELETE', headers }),
      toggleTap: (id: string) => fetchAPI<Beer>(`beers/${id}/toggle-tap`, { method: 'PATCH', headers }),
      toggleBestseller: (id: string) => fetchAPI<Beer>(`beers/${id}/toggle-bestseller`, { method: 'PATCH', headers }),
    },
    food: {
      getAll: () => fetchAPI<Food[]>('food', { headers }),
      create: (data: Partial<Food>) => fetchAPI<Food>('food', { method: 'POST', body: JSON.stringify(data), headers }),
      update: (id: string, data: Partial<Food>) => fetchAPI<Food>(`food/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers }),
      delete: (id: string) => fetch(`${API_URL}/food/${id}`, { method: 'DELETE', headers }),
      toggleAvailable: (id: string) => fetchAPI<Food>(`food/${id}/toggle-available`, { method: 'PATCH', headers }),
    },
    drinks: {
      getAll: () => fetchAPI<Drink[]>('drinks', { headers }),
      create: (data: Partial<Drink>) => fetchAPI<Drink>('drinks', { method: 'POST', body: JSON.stringify(data), headers }),
      update: (id: string, data: Partial<Drink>) => fetchAPI<Drink>(`drinks/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers }),
      delete: (id: string) => fetch(`${API_URL}/drinks/${id}`, { method: 'DELETE', headers }),
      toggleAvailable: (id: string) => fetchAPI<Drink>(`drinks/${id}/toggle-available`, { method: 'PATCH', headers }),
    },
    happyHour: {
      getConfig: () => fetchAPI<any>('happy-hour/config', { headers }),
      update: (data: any) => fetchAPI<any>('happy-hour/config', { method: 'PATCH', body: JSON.stringify(data), headers }),
    },
    styles: {
      getAll: () => fetchAPI<Style[]>('styles', { headers }),
      create: (data: { name: string }) => fetchAPI<Style>('styles', { method: 'POST', body: JSON.stringify(data), headers }),
      delete: (id: string) => fetch(`${API_URL}/styles/${id}`, { method: 'DELETE', headers }),
    },
    upload: {
      image: async (file: File) => {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch(`${API_URL}/upload/image`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
        if (!res.ok) throw new Error('Upload failed')
        return res.json() as Promise<{ url: string; filename: string }>
      },
    },
  }
}
