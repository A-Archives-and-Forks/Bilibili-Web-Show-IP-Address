import type { bbComment } from './reply'

declare global {
    interface Window {
        bbComment?: bbComment
    }
}
