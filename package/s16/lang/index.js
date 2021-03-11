import zh from './zh'
import en from './en'

// 加载element-ui语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const mergeZH = Object.assign(zhLocale, zh);
const mergeEN = Object.assign(enLocale, en);

const localeDomains = require('./locale-domains');

module.exports = {
    locales: [
        {
            code: 'en',
            iso: 'en-US',
            name: 'English',
            domain: localeDomains.en
        },
        {
            code: 'zh',
            iso: 'zh-ZH',
            name: '中文',
            domain: localeDomains.zh
        }
    ],
    defaultLocale: 'zh',
    differentDomains: true,
    vueI18n: {
        fallbackLocale: 'zh',
        messages: {
            en: mergeEN,
            zh: mergeZH
        }
    }
}
