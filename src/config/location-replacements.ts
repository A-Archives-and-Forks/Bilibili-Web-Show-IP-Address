import { GM_getValue } from '$'

export const REPLACEMENTS_KEY = 'locationReplacements'

type ReplacementMap = Map<string, string>

const safeJSONParse = <T>(text: string, defaultValue: T): T => {
  try {
    return JSON.parse(text) as T
  } catch {
    return defaultValue
  }
}

export const parseReplacements = (rawJson?: string): ReplacementMap => {
  const json = rawJson || GM_getValue(REPLACEMENTS_KEY, '{}')
  const parsed = safeJSONParse<Record<string, string>>(json, {})
  return new Map(Object.entries(parsed))
}

export const replacements = (__LITE_VERSION__ ? undefined : parseReplacements())!
