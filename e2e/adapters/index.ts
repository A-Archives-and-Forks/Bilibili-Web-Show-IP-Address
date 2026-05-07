export * from './lit-component'
export * from './vue-legacy'
export * from './vue3'

import type { Locator, Page } from '@playwright/test'

export interface BiliCommentAdapter {
  /** 评论区根元素的 CSS selector */
  readonly commentAppSelector: string

  /** IP 属地文本匹配正则 */
  readonly locationPattern: RegExp

  /** 获取第 N 条主评论 */
  getMainComment(index: number): Locator

  /** 获取指定评论内的 IP 属地标签 */
  getLocationTag(commentLocator: Locator): Locator

  /** 点击「按最新排序」按钮 */
  clickSort(page: Page): Promise<void>
}
