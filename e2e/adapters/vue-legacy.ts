import type { Locator, Page } from '@playwright/test'
import type { BiliCommentAdapter } from '.'

export class VueLegacyAdapter implements BiliCommentAdapter {
  readonly commentAppSelector = '.bb-comment'
  readonly locationPattern = /IP属地：.+/

  constructor(private page: Page) {}

  getMainComment(index: number = 0): Locator {
    return this.page.locator('.list-item.reply-wrap:not(:has(.stick))').nth(index)
  }

  getLocationTag(commentLocator: Locator): Locator {
    return commentLocator.locator('.info').first()
  }

  async clickSort(page: Page): Promise<void> {
    await page.locator('.new-sort').click()
  }
}
