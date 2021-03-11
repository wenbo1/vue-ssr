<template>
    <div>
        <!-- <Header/> -->
        <NuxtChild keep-alive @hook:activated="hookActivated" @hook:deactivated="hookDeactivated" />
        <!-- <Footer/> -->
    </div>
</template>


<script>
    import Header from './cpn/Header';
    import Footer from './cpn/Footer';
    import trace from "assets/utils/trace";
    import {http_get} from "assets/utils/http";

    export default {
        name: 'app',
        mixins: [trace],
        async asyncData({app, route, env, query, params, $http_get, $http_post})
        {
            let lang = app.i18n.locale;
            let seo = {
                title: '默认title',
                desc: '默认description',
                keyword: '默认keywords'
            };
            await $http_get('/cms/seo/match', {path: route.path, lang: 'cn'}).then(res => {
                if (res) {
                    seo = res;
                }
            });

            return {seo}
        },
        head(){
            return {
                title: this.seo.title,
                meta: [
                    {hid: 'description', name: 'description', content: this.seo.desc},
                    {hid: 'keywords', name: 'keywords', content: this.seo.keyword}
                ],
                link: [
                    {rel: 'icon', type: 'image/x-icon', href: '/s16/icon.png'},
                    // {
                    //     rel: 'stylesheet',
                    //     href: '/css/style.css'
                    // }
                ],
            }
        },
        data() {
            return {
            }
        },
        watch: {
            '$route': function () {
                this.setSeo();
            }
        },
        components: {
            Header,
            Footer
        },
        methods: {
            setSeo() {
                http_get('/cms/seo/match', {path: this.$route.path, lang: 'cn'}).then(res => {
                    if (res) {
                        this.seo = res;
                    }
                });
            }
        }
        // middleware: ['auth']
    }
</script>

<style>

</style>
