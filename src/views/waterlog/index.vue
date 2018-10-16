<template>
    <div class="main">
        <div class="map">
            <div class="mainMap"  v-show="isShow === 0">
                <div class="coordinate" v-for="(item,index) in signList" :key="index" :style="{left:(item.latitude * (610 / 932)) + 'px',top:(item.longitude * (610 / 932) - 7) + 'px'}" >
                    <icon :w="10" :h="10" name="坐标2" style="cursor: pointer;" @click.native="showPage(item.id)"></icon>
                    <span class="cdSign">{{item.lampNum}}</span>
                </div>
            </div>
            <!--<img src="../../../public/img/1.png" alt="">-->
            <img :src="`${baseUrl}${index+1}.png`" v-for="(item,index) in 77" :key="index" v-show="index === isShow - 1" class="imgList">
            <img src="../../assets/images/叉2X.png" alt="" class="goBack" v-show="isShow !== 0" @click="closeX" >
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                isShow : 0,
                baseUrl: './img/',
                signList: ''
            }
        },
        methods: {
            getData: function () {
                this.axios({
                    url: '/ld/waterlogging/getWaterloggingList',
                    method: 'post',
                    params: {
                        userId : JSON.parse(localStorage.getItem('accessToken')).user_id,
                    }
                }).then( res => {
                    console.log(res);
                    this.signList = res.data.data
                })
            },
            showPage: function (id) {
                this.isShow = id
            },
            closeX:function () {
                this.isShow = 0
            }
        },
        mounted() {
            this.getData()
        }

    }
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 0 auto;
        overflow: hidden;
        .map{
            width: 900px;
            height: 600px;
            background: url("../../assets/images/边框2X.png")  no-repeat;
            background-size: 100%;
            margin: 50px auto 0;
            position: relative;
            .mainMap{
                width: 610px;
                height: 530px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background: url("../../assets/images/总图1（底图）.png") no-repeat;
                background-size: 100%;
                .coordinate{
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    .cdSign{
                        display: block;
                        position: absolute;
                        right: -21px;
                        top: 2px;
                        height: 15px;
                        border: 1px solid #000;
                        font-size: 5px;
                        background-color: #fff;
                    }
                }
            }
        }
        .imgList{
            width: 750px;
            height: 480px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }

        .goBack{
            width: 28px;
            height: 28px;
            position: absolute;
            right: 25px;
            top: 20px;
            cursor: pointer;
            z-index: 99;
        }
    }
</style>
