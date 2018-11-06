<template>
    <div class="main">
        <div class="main-top">
            <table width="960px">
                <tr>
                    <th colspan="2">上周重点工作反馈</th>
                    <th>本周重点工作计划</th>
                    <th >累计未完成工作</th>
                </tr>
                <tr>
                    <td>计划</td>
                    <td>未完成</td>
                    <td>计划</td>
                    <td>数量</td>
                </tr>
                <tr>
                    <td style="cursor: pointer;" @click="getPush({path:'undone',name:'undoneW',params:{isShow: 2, title: '累计未完成工作情况',queryConditions: 4}})">{{dataList.lastWeeksPlan}}</td>
                    <td style="cursor: pointer;" @click="getPush({path:'undone',name:'undoneW',params:{isShow: 2, title: '累计未完成工作情况',queryConditions: 1}})">{{dataList.lastWeeksUndone}}</td>
                    <td style="cursor: pointer;" @click="getPush({path:'undone',name:'undoneW',params:{isShow: 2, title: '累计未完成工作情况',queryConditions: 5}})">{{dataList.weeksPlan}}</td>
                    <td style="cursor: pointer;" @click="getPush({path:'undone',name:'undoneW',params:{isShow: 2, title: '累计未完成工作情况',queryConditions: 3}})">{{dataList.undone}}</td>
                </tr>
            </table>
        </div>
        <div class="main-bottom">
            <span>累计未完成工作</span>
            <table width="865px">
                <thead style="border-spacing: 0">
                    <td width="22%">部门</td>
                    <td style="padding-left: 10px" width="40%">内容</td>
                    <td style="text-align: center" width="38%">时间</td>
                </thead>
                <tr v-for="(item,index) in weekList" :key="index">
                    <td>{{item.name}}</td>
                    <td style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; max-width: 400px"  @click="getDetail(item.id)">{{item.title}}</td>
                    <td>{{item.planTime | formatDates}}</td>
                </tr>
            </table>
            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        :current-page.sync="currentPage"
                        @current-change="changePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "index",
        data () {
            return{
                dataList: '',
                weekList: [],
                total: 0,
                pageSize: 5,
                currentPage: 1
            }
        },
        methods: {
            getPush: function (val) {
                sessionStorage.setItem('weekQueryConditions',val.params.queryConditions)
                this.$router.push({
                    path: val.path,
                    name: val.name,
                    params: val.params
                    /*query: {
                        name: 'name',
                        dataObj: this.msg
                    }*/
                })
            },
            changePage: function () {
                // this.weekList = this.dataList.pages.list.slice((this.currentPage - 1) * 5,this. currentPage * 5)
                this.getData()
            },
            getDetail: function (weekId) {
                sessionStorage.setItem('weekPlanId',weekId)
                this.$router.push({
                    path: 'detail',
                    name: 'detailW',
                    params: {
                        isShow: 3,
                        weekId,
                    }
                    /*query: {
                        name: 'name',
                        dataObj: this.msg
                    }*/
                })
            },
            getData: function () {
                this.axios({
                    method: 'post',
                    url: '/ld/weekPlan/statistical',
                    params:{
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                    }
                }).then( res => {
                    // console.log(res);
                    this.dataList = res.data.data

                    this.total = this.dataList.pages.count
                    this.weekList = this.dataList.pages.list

                })
            },
            searchKeys: function () {
                this.getPush({path:'undone',name:'undoneW',params:{isShow: 2, title: '累计未完成工作情况',queryConditions: 0}})
            }
        },
        mounted() {
            this.$store.state.selectList = ''
            this.getData()
        },
        computed: {
            ...mapState({
                selectList: state=> state.selectList
            })
        },
        watch: {
            'selectList' :  'searchKeys',
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 0 auto;
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
                border-spacing:10px;
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
                    td:nth-child(2){
                        padding: 0 10px;
                    }
                    td:nth-child(3){
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
    .block{
        float: right;
        margin: 10px 20px 0 0;
    }

</style>
