<template>
    <div class="main">
        <iscroll-view class="scroll-view"  @pullUp="load" @pullDown="refresh">
            <div class="map">
                <div class="mainMap"  v-show="showMap === 1">

                    <div class="coordinate" v-for="(item,index) in signList" :key="index" :style="{left:(item.latitude * (560 / 932)) + 'px',top:((item.longitude - 7)* (560 / 932)) + 'px'}" >
                        <transition name="toTop" v-if="item.status === 1">
                            <icon v-show="isFlicker" :w="14" :h="14" name="坐标2" style="cursor: pointer;" :style="{color:colors[item.grade - 1]}" @click.native="showPage(item.id)"></icon>
                        </transition>
                        <icon v-if="item.status === 2" :w="14" :h="14" name="坐标2" style="cursor: pointer;color: #e82e16;" @click.native="showPage(item.id)"></icon>
                    </div>
                </div>
                <div class="mainMap2"  v-show="showMap === 2">
                    <div class="coordinate2" v-for="(item,index) in signList" :key="index" :style="{left:(item.latitude * (800 / 1316)) + 'px',top:((item.longitude - 7)* (800 / 1316)) + 'px'}" >
                        <transition name="toTop" v-if="item.status === 1">
                            <icon v-show="isFlicker" :w="14" :h="14" name="坐标2" style="cursor: pointer;"  :style="{color:colors[item.grade - 1]}" @click.native="showPage(item.id)"></icon>
                        </transition>
                        <icon v-if="item.status === 2" :w="14" :h="14" name="坐标2" style="cursor: pointer;color: #e82e16;"  @click.native="showPage(item.id)"></icon>
                    </div>
                </div>
                <!--<img src="../../../public/img/1.png" alt="">-->
                <img :src="`${baseUrl}${index+1}.png`" v-for="(item,index) in 77" :key="index" v-show="index === isShow - 1" class="imgList">
                <img src="../../assets/images/叉2X.png" alt="" class="goBack" v-show="isShow !== 0" @click="closeX" >
                <icon name="向左箭头" :w="48" :h="48" class="arrows" style="left: 10px;" @click.native="prePage" v-show="showMap !== 0"></icon>
                <icon name="向右箭头" :w="48" :h="48" class="arrows" style="right: 10px;" @click.native="nextPage" v-show="showMap !== 0"></icon>
            </div>
        </iscroll-view>
    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                isShow : 0,
                showMap: 1,
                baseUrl: './img/',
                signList: '',
                showHis: 1,
                isFlicker: false,
                colors:['#e82e16','#ea9518','#f1e729']
            }
        },
        methods: {
            getData: function () {
                this.axios({
                    url: '/ld/waterlogging/getWaterloggingList',
                    method: 'post',
                    params: {
                        distinguish: this.showMap
                    }
                }).then( res => {
                    console.log(res);
                    this.signList = res.data.data
                })
            },
            showPage: function (id) {
                this.showMap = 0
                this.isShow = id
            },
            closeX:function () {
                this.isShow = 0
                this.showMap = this.showHis
            },
            refresh (iscroll) {
            },
            load (iscroll) {
                // Load new data
                if (iscroll.distY > 50){
                    if (this.showMap < 2 ){
                        this.showMap += 1
                        this.showHis += 1
                        this.getData()
                    }else {
                        this.$message({
                            message: '已经最后一张',
                            type: 'warning'
                        });
                    }

                } else if (iscroll.distY < -50) {
                    if (this.showMap <= 1){
                        this.$message({
                            message: '已经是第1页',
                            type: 'warning'
                        });
                    }else {
                        this.showMap -= 1
                        this.showHis -= 1
                        this.getData()
                    }

                }
            },
            startInterval:function () {
               this.isFlicker = !this.isFlicker
            },
            prePage: function () {
                if (this.showMap <= 1){
                    this.$message({
                        message: '已经是第1页',
                        type: 'warning'
                    });
                }else {
                    this.showMap -= 1
                    this.showHis -= 1
                    this.getData()
                }
            },
            nextPage: function () {
                if (this.showMap < 2 ){
                    this.showMap += 1
                    this.showHis += 1
                    this.getData()
                }else {
                    this.$message({
                        message: '已经最后一张',
                        type: 'warning'
                    });
                }
            }
        },
        mounted() {
            this.getData()
            setInterval(this.startInterval,800)
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
            .mainMap2{
                width: 800px;
                height: 500px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background: url("../../assets/images/总图2（底图）.png") no-repeat;
                background-size: 100%;
                .coordinate2{
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    .cdSign2{
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

    .scroll-view {
        /* -- Attention: This line is extremely important in chrome 55+! -- */
        touch-action: none;
        /* -- Attention-- */
        position: fixed;
        top: 185px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    @keyframes flicker {
        0% {opacity: 1;}
        99%{opacity: 0}
    }
    @keyframes flickers {
        0% {opacity: 0;}
        99%{opacity: 1}
    }
    .toTop-enter-active{
        animation: flicker 1s ;
    }
    .toTop-leave-active {
        animation: flickers 1s ;
    }
    .arrows{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
</style>
