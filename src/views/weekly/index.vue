<template>
    <div class="main">
        <div class="main-top">
            <table width="960px">
                <tr>
                    <th colspan="2">上周重点工作反馈</th>
                    <th>本周重点工作计划</th>
                    <th style="cursor: pointer;" @click="getPush({path:'undone',name:'undoneW',params:{isShow: 2, title: '累计未完成工作情况'}})">累计未完成工作计划</th>
                </tr>
                <tr>
                    <td>计划</td>
                    <td>未计划</td>
                    <td>计划</td>
                    <td>数量</td>
                </tr>
                <tr>
                    <td>{{dataList.lastWeeksPlan}}</td>
                    <td>{{dataList.lastWeeksUndone}}</td>
                    <td>{{dataList.weeksPlan}}</td>
                    <td>{{dataList.undone}}</td>
                </tr>
            </table>
        </div>
        <div class="main-bottom">
            <span>累计未完成工作</span>
            <table width="865px">
                <thead>
                    <td>部门</td>
                    <td width="43%">内容</td>
                    <td width="43%">时间</td>
                </thead>
                <tr v-for="(item,index) in dataList.pages.list" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.planTime | formatDates}}</td>
                </tr>

            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return{
                dataList: ''
            }
        },
        methods: {
            getPush: function (val) {
                this.$router.push({
                    path: val.path,
                    name: val.name,
                    params: val.params
                    /*query: {
                        name: 'name',
                        dataObj: this.msg
                    }*/
                })
            }
        },
        mounted() {
            this.axios({
                method: 'post',
                url: '/ld/weekPlan/statistical',
                params:{
                    pageNo: 1,
                    pageSize: 10,
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id
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
        margin: 0 auto;
        overflow: hidden;
        .main-top{
            width: 1000px;
            overflow: hidden;
            margin: 25px auto 0;
            background-color: #F3F3F5;
            height: 240px;
            table{
                width: 960px;
                margin: 0 auto;
                tr{
                    height: 75px;
                    line-height: 75px;
                    text-align: center;
                    &:nth-child(1){
                        th{
                            font-weight: 500;
                            width: 33.33%;
                            &:nth-child(2){
                                border-left: 1px solid #A8A8AA;
                                border-right: 1px solid #A8A8AA;
                            }
                        }
                        th:nth-child(odd){
                            background-color: #393939;
                            color: #fff;
                        }
                        th:nth-child(even) {
                            background-color: #949599;
                            color: #fff;
                        }
                    }
                    &:nth-child(2){
                        background-color: #fff;
                        td:nth-child(3){
                            border-left: 1px solid #A8A8AA;
                            border-right: 1px solid #A8A8AA;
                        }
                    }
                    &:nth-child(3){
                        background-color: #F3F3F5;
                        border-top: 1px dashed #ccc;
                        border-bottom: 15px solid #DEDEE0;
                        td:nth-child(3){
                            border-left: 1px solid #A8A8AA;
                            border-right: 1px solid #A8A8AA;
                        }
                    }
                }
            }
        }
        .main-bottom{
            width: 960px;
            margin: 15px auto 0;
            span{
                display: block;
                height: 23px;
                width: 270px;
                background: url("../../assets/images/箭头_08.png");
                padding-left: 32px ;
                color: #fff;
                font-size: 12px;
                box-sizing: border-box;
                line-height: 23px;
                letter-spacing: 2px;
            }
            table{
                margin-top: 20px;
                border-collapse: separate;
                border-spacing:0 15px;
                thead{
                    height: 28px;
                    line-height: 28px;
                    background-color: #57585A;
                    td{
                        color: #fff;
                        font-size: 14px;
                        &:nth-child(1){
                            text-align: center;
                        }
                    }
                }
                tr{
                    height: 25px;
                    line-height: 25px;
                    margin-top: 20px;

                    td:nth-child(1){
                        text-align: center;
                    }
                    td{
                        color: #818183;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                    &:nth-child(even){
                        background-color: #E7E8EA;
                    }
                }
            }
        }
    }
</style>
