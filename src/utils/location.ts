import { replacements } from '@/config/location-replacements'
import type { Reply } from '@/injection/types'

const preprocessLocation = (location?: string): string | undefined => {
  if (!location || replacements.size === 0) return location

  let result = location
  for (const [target, replacement] of replacements) {
    if (result.includes(target)) {
      result = result.replaceAll(target, replacement)
    }
  }
  return result
}

export const getLocationString = (replyItem?: Reply): string | undefined => {
  const locationString = replyItem?.reply_control?.location
  if (__LITE_VERSION__) return locationString
  return preprocessLocation(locationString)
}
