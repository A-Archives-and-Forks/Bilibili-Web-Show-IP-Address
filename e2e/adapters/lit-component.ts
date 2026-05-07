import type { Locator, Page } from '@playwright/test'
import type { BiliCommentAdapter } from '.'

export class LitComponentAdapter implements BiliCommentAdapter {
  readonly commentAppSelector = 'bili-comments'
  readonly locationPattern = /.+/

  constructor(private page: Page) {}

  getMainComment(index: number = 0): Locator {
    return this.page.locator('bili-comment-thread-renderer:not(:has(#top))').nth(index)
  }

  getLocationTag(commentLocator: Locator): Locator {
    return commentLocator
      .locator('bili-comment-action-buttons-renderer')
      .first()
      .locator('#location')
  }

  async clickSort(page: Page): Promise<void> {
    await page.getByRole('button', { name: '最新' }).click()
  }
}
