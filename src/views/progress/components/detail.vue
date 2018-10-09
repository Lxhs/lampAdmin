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
            <tr v-for="(item, index) in dataList.list" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.projectNo}}</td>
                <td @click="openOp(true,item.id)" style="cursor: pointer;">{{item.projectName}}</td>
                <td>是</td>
                <td>
                    <div id="gridList">
                        <el-tooltip class="item " :class="items.state === 1 ? 'complete' : ''" id="tip" effect="dark" :content="items.progressName" placement="top" v-for="(items,index) in item.progressList" :key="index">
                            <span>1</span>
                        </el-tooltip>
                    </div>
                </td>
                <td>{{ item.projectTime | formatDates}}</td>
                <td>{{item.remarks}}</td>
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
                        <td>{{projectDetail.projectName}}</td>
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
                        <td>{{ projectDetail.projectTime | formatDates}}</td>
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
                <el-button type="primary" id="dBtn">保存</el-button>
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
                textarea: '',
                dataList: '',
                projectDetail: ''
            }
        },
        methods: {
            openOp: function (v,id) {
                console.log(id);
                this.isShowO = v
                if (id !== ''){
                    this.getProjectDetail(id)
                }
            },
            getProjectDetail: function (id) {
                this.axios({
                    url: '/ld/project/getProject',
                    method: 'post',
                    params: {
                        id: id || 1,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id
                    }
                }).then( res => {
                    console.log(res);
                    this.projectDetail = res.data.data
                })

            }
        },
        mounted() {
            this.axios({
                url: '/ld/project/getProjectList',
                method: 'post',
                data: {
                    pageNo: 1,
                    pageSize: 5,
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then( res => {
                console.log(res);
                this.dataList = res.data.data
            })
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
