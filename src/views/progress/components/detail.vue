<template>
    <div class="main">
        <table>
            <thead>
                <td>序号</td>
                <td>编号</td>
                <td>工程名称</td>
                <td>超时</td>
                <td>状态</td>
                <td>时间</td>
                <td>备注</td>
            </thead>
            <tr>
                <td>1</td>
                <td>2016-计改-22至27</td>
                <td @click="openOp(true)" style="cursor: pointer;">2016年道路老旧照明设施达标升级改造工程1标段工程</td>
                <td>是</td>
                <td>
                    <div id="gridList">
                        <el-tooltip class="item complete" id="tip" effect="dark" content="Top Center 提示文字" placement="top" v-for="index in 15" :key="index">
                            <span>1</span>
                        </el-tooltip>
                    </div>
                </td>
                <td>2016-8-5</td>
                <td>备注</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2016-计改-22至27</td>
                <td>2016年道路老旧照明设施达标升级改造工程1标段工程</td>
                <td>是</td>
                <td>
                    <ul>
                        <li></li>
                    </ul>
                </td>
                <td>时间</td>
                <td>备注</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2016-计改-22至27</td>
                <td  >2016年道路老旧照明设施达标升级改造工程1标段工程</td>
                <td>是</td>
                <td>
                    <ul>
                        <li></li>
                    </ul>
                </td>
                <td>时间</td>
                <td>备注</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2016-计改-22至27</td>
                <td>2016年道路老旧照明设施达标升级改造工程1标段工程</td>
                <td>是</td>
                <td>
                    <ul>
                        <li></li>
                    </ul>
                </td>
                <td>时间</td>
                <td>备注</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2016-计改-22至27</td>
                <td>2016年道路老旧照明设施达标升级改造工程1标段工程</td>
                <td>是</td>
                <td>
                    <ul>
                        <li></li>
                    </ul>
                </td>
                <td>时间</td>
                <td>备注</td>
            </tr>
        </table>
        <div class="popups" v-show="isShowO">
            <div class="detail">
                <div class="dTop" >
                    <icon name="cancel" width="24" id="cancel" @click.native="openOp(false)"></icon>
                </div>
                <table class="dMain">
                    <tr>
                        <td>工程名称</td>
                        <td>2016年道路老旧照明设施达标升级改造工程1标段工程</td>
                    </tr>
                    <tr>
                        <td>中期验收</td>
                        <td>未超时</td>
                    </tr>
                    <tr>
                        <td>编号</td>
                        <td>2016-计改-22至27</td>
                    </tr>
                    <tr>
                        <td>时间</td>
                        <td>2018-8-19</td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td>
                            稽查队在神龙大道稽查队在神龙大道稽查队在神龙大道稽查队在神龙大道稽查队
                            在神龙大道稽查队在神龙大道稽查队在神龙大道稽查队在神龙大道稽查队在神大
                            道稽查队在神龙大道稽查队在神龙大道稽查队在神龙大道
                        </td>
                    </tr>
                    <tr>
                        <td>批注</td>
                        <td>
                            <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="textarea"
                                    class="postil">
                            </el-input>
                        </td>
                    </tr>

                </table>
                <el-button type="primary" id="dBtn">主要按钮</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
            return {
                isShowO: false,
                textarea: ''
            }
        },
        methods: {
            openOp: function (v) {
                this.isShowO = v
            }
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 20px auto;
        overflow: hidden;
        position: relative;
        &>table{
            width: 960px;
            margin: 0 auto;
            overflow: hidden;
            thead{
                height: 36px;
                line-height: 36px;
                td{
                    text-align: center;
                    background-color: #E9EAEB;
                    color: #7C7E81;
                    font-size: 14px;
                    margin-left: 3px;
                    border: 1px solid #C0BFBF;
                    border-radius: 3px ;
                    &:last-child{
                        margin: 0;
                    }
                }
            }
            tr{
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #A0A1A3;
                td{
                    text-align: center;
                    color: #7C7E81;
                    font-size: 14px;
                    #gridList{
                        display: block;
                        border-radius: 5px;
                        overflow: hidden;
                        margin: 0 auto;
                        width: 195px;
                        #tip{
                            display: block;
                            width: 10px;
                            height: 10px;
                            background-color: #2386C7;
                            border-right:3px solid #939598 ;
                            float: left;
                        }
                    }
                }
            }
        }
        .popups {
            width: 1000px;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            .detail{
                width: 900px;
                overflow: hidden;
                margin: 150px auto;
                background-color: #fff;
                .dTop{
                    width: 100%;
                    height: 45px;
                    background-color: #4C81BF;
                    position: relative;
                    #cancel{
                        position: absolute;
                        top: 50%;
                        right: 15px;
                        font-weight: 700;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                }
                .dMain{
                    width: 100%;
                    padding: 0 30px 50px 30px;
                    border-collapse:separate;
                    border-spacing:30px;
                    overflow: hidden;
                    border-top:  1px dashed #D1D2D4;
                    margin-top: 45px;
                    position: relative;
                    tr{
                        font-size: 14px;
                        color: #6D6E71;
                        td:nth-child(1){
                            width: 10%;
                        }
                        &:nth-child(2){
                            position: absolute;
                            right: -300px;
                            top: 0;
                        }
                        &:nth-child(5){
                            margin-bottom: 20px;
                        }
                        &:last-child{
                            .postil{
                                position: relative;
                                top: 20px;
                            }
                        }
                    }
                }
                #dBtn{
                    position: relative;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%);
                    margin-bottom: 50px;
                    width: 140px;
                }
            }
        }
    }
    .complete{
        background-color: #BDC830 !important;
    }
</style>
