import useSWR from 'swr'
import { InstagramPost } from '@/lib/instagram-service'
import { siteConfig } from '@/config/site'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface UseInstagramOptions {
  username?: string
  limit?: number
  enabled?: boolean
}

export function useInstagram(options: UseInstagramOptions = {}) {
  const {
    username = siteConfig.instagramUsername,
    limit = 12,
    enabled = true,
  } = options

  const { data, error, isLoading } = useSWR(
    enabled ? `/api/instagram?username=${username}&limit=${limit}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 3600000, // 1 hour
    }
  )

  return {
    posts: (data?.data as InstagramPost[]) || [],
    isLoading,
    error,
    isError: !!error,
  }
}
