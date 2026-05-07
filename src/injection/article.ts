import { isElementLoaded } from '@/utils'
import type { ReadViewInfo } from './types'

export const injectArticleLocation = async (url: string) => {
  const cv = url.split('/').filter(Boolean).pop()?.replace('cv', '')
  if (!cv) return

  try {
    const { data: viewinfo }: { data: ReadViewInfo } = await fetch(
      `https://api.bilibili.com/x/article/viewinfo?id=${cv}`,
      { credentials: 'include' },
    ).then((res) => res.json())

    if (!viewinfo?.location) return

    const articleDetail = await isElementLoaded('.article-detail')
    const publishText = articleDetail?.querySelector('.publish-text')
    if (!publishText) return

    const locationEl = document.createElement('span')
    locationEl.textContent = `${viewinfo.location} · `
    publishText.insertAdjacentElement('afterend', locationEl)
  } catch (error) {
    console.error('获取文章 IP 属地失败：', error)
  }
}
