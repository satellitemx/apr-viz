import { useSWR } from "sswr"

export const useAppStore = (bundleId) => {
  const { data, error } = useSWR(
    bundleId ? `https://itunes.apple.com/lookup?bundleId=${bundleId.toLowerCase()}` : null,
    {
      dedupingInterval: 60 * 1000,
    }
  )
  return {
    error,
    data,
  }
}