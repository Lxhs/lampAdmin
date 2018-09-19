<template>
    <div class="search" v-show="isShow !== 3">
        <div class="search-main" v-if="isShow === 1">
            <icon name="搜索" :w="12" :h="12" class="srh" style="color: #818180;"></icon>
            <input type="text" placeholder="输入部门或关键词"  style="border: none; outline: none; font-size: 8px;height: 24px; width: 290px;">
            <icon name="取消" :w="12" :h="12" class="cancel" ></icon>
        </div>
        <div class="title" v-else-if="isShow === 2">
            <img src="../assets/images/元素1_05.png" alt="">
            <span>{{title}}</span>
            <img src="../assets/images/元素1_08.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data () {
            return {
                isShow : 1,
                title: ''
            }
        },
        methods: {
            fetchData () {
                this.isShow = this.$route.params.isShow
                if (this.$route.params.title) {
                    this.title = this.$route.params.title
                }
            }
        },
        watch: {
            // 监听路由变化，随时获取新的列表信息
            '$route': 'fetchData'
        }
    }
</script>

<style scoped lang="scss">
    .search{
        width: 1000px;
        background: url("../assets/images/背景元素_04.png");
        height: 86px;
        position: relative;
        .search-main{
            width: 350px;
            height: 27px;
            border: 3px solid #C8C9CB;
            background-color: #fff;
            border-radius: 16px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .srh{
                margin: 0 10px ;
            }
            input::-webkit-input-placeholder {
                /* placeholder颜色  */
                color: #C9CACC;
                 /* placeholder字体大小  */
                font-size: 10px;
                /* placeholder位置  */
            }
            .cancel{
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
            }

        }
        .title{
            height: 65px;
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            line-height: 65px;
            img{
                vertical-align: middle;
            }
            span{
                padding: 0 20px;
                font-size: 20px;
            }
        }
    }
</style>
