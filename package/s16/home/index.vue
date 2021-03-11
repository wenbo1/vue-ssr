<template>
    <div class="home">
    </div>
</template>

<script>
import Headerh from '../cpn/homeHeader';
import Footerh from '../cpn/homeFooter';
export default {
    name: 'home',
    head(){
            return {
                title: '首页',
            }
    },
    components: {
        Headerh,
        Footerh
    },
    data() {
        return {
        }
    },
    mounted(){
    },
    methods:{
    }
}
</script>

<style>
    .home{
        position: relative;
        height: 100vh;
    }
</style>
