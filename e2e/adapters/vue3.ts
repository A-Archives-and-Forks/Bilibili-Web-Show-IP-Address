import type { Locator, Page } from '@playwright/test'
import type { BiliCommentAdapter } from '.'

export class Vue3Adapter implements BiliCommentAdapter {
  readonly commentAppSelector = '.reply-list'
  readonly locationPattern = /IP属地：.+/

  constructor(private page: Page) {}

  getMainComment(index: number = 0): Locator {
    return this.page.locator('.reply-item').nth(index)
  }

  getLocationTag(commentLocator: Locator): Locator {
    return commentLocator.locator('.reply-time').first()
  }

  async clickSort(page: Page): Promise<void> {
    await page.locator('.time-sort').click()
  }
}
