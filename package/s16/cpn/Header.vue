<template>
    <div class="header flex flex-alc justify-center">
        头部{{$t('index')}}
        <span class="lang-switcher">
            <a v-for="(locale, i) in showLocales" :key="i" :href="locale.domain + $route.fullPath">
            点击切换{{ locale.name }}
            </a>
        </span>
    </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
    name: "Header",
    computed: {
        showLocales() {
            return this.$i18n.locales.filter(
                locale => locale.code !== this.$i18n.locale
            );
        }
    },
    data(){
        return{
        }
    },
    methods: {
    }
};
</script>

<style scoped>
    .header{
        z-index: 1999;
        position: sticky;
        top: 0;
        padding: 0 6.8vw;
        box-sizing: border-box;
        height:10.53vw;
        background-color: #fff;
        box-shadow: 2px 0 10px 0 rgba(0, 0, 0, .1);
    }
</style>
