export const isElementLoaded = async (selector: string, root: HTMLElement | Document | Element = document) => {
    const getElement = () => root.querySelector(selector)
    return new Promise<Element>((resolve) => {
        const element = getElement()
        if (element) return resolve(element)
        const observer = new MutationObserver((_) => {
            const element = getElement()
            if (!element) return
            resolve(element)
            observer.disconnect()
        })
        const target = root === document ? (root.documentElement ?? root) : root
        observer.observe(target, {
            childList: true,
            subtree: true,
        })
    })
}
