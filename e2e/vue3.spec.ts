import { Vue3Adapter } from './adapters'
import { defineTestSuite } from './utils'

defineTestSuite('Vue 3', Vue3Adapter, [
    {
        name: '活动页（拜年祭）',
        url: 'https://www.bilibili.com/blackboard/bnj2025.html',
    },
])
