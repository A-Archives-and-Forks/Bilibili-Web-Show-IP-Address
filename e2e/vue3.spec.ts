import { Vue3Adapter } from './adapters'
import { defineTestSuite } from './utils'

defineTestSuite('Vue 3', (page) => new Vue3Adapter(page), [
    {
        name: '活动页（拜年祭）',
        url: 'https://www.bilibili.com/blackboard/bnj2025.html',
    },
])
