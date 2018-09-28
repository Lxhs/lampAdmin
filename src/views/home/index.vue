<template>
    <div class="main">
        <img src="../../assets/images/背景图片.png" alt="">
    </div>
</template>

<script>
    import * as qs from "qs";
    export default {
        name: "index",
        methods: {
            getData: function () {
                this.axios.post('/ld/workBook/getResponsiblePerson').then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    .main{
        width: 1000px;
        margin: 0 auto;
        overflow: hidden;
    }
</style>
