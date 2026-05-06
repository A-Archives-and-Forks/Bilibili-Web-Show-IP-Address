import { getLocationString } from '@/utils/location'
import { unsafeWindow } from '$'
import type { bbComment, CreateListCon, CreateSubReplyItem } from './types'

type HooksFunc = CreateListCon | CreateSubReplyItem

interface InjectorOption {
    variation: boolean
}

const injectBBComment = (bbComment: bbComment, { variation }: InjectorOption = { variation: false }) => {
    const { _createListCon: createListCon, _createSubReplyItem: createSubReplyItem } = bbComment.prototype
    const applyHandler = <T extends HooksFunc>(target: T, thisArg: bbComment, args: Parameters<T>) => {
        const [item] = args
        const result: string = Reflect.apply(target, thisArg, args)
        const replyTimeRegex = /<span class="reply-time">(.*?)<\/span>/
        const location = getLocationString(item)
        if (!location) return result
        if (variation) {
            const variationRegex = /<span class="time">(.*?)<\/span>/
            return result.replace(variationRegex, `<span class="time">$1&nbsp;&nbsp;${location}</span>`)
        }
        return result.replace(
            replyTimeRegex,
            `<span class="reply-time">$1</span><span class="reply-location">${location}</span>`
        )
    }
    bbComment.prototype._createListCon = new Proxy(createListCon, {
        apply: applyHandler,
    })
    bbComment.prototype._createSubReplyItem = new Proxy(createSubReplyItem, {
        apply: applyHandler,
    })
}

export const hookBBComment = ({ variation }: InjectorOption = { variation: false }) => {
    if (unsafeWindow.bbComment) {
        injectBBComment(unsafeWindow.bbComment, { variation })
        return
    }
    let bbComment: bbComment | undefined
    Object.defineProperty(unsafeWindow, 'bbComment', {
        get: (): bbComment | undefined => bbComment,
        set: (value: bbComment) => {
            bbComment = value
            injectBBComment(value, { variation })
        },
        configurable: true,
    })
}
