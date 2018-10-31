<template>
    <div class="main">
        <table width="960px">
            <thead>
                <td width="20%">部门</td>
                <td width="40%"  >工作内容</td>
                <td width="40%">进度</td>
            </thead>
            <tr v-for="(item, index) in dataList.list" :key="index">
                <td>{{item.name}}</td>
                <td style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; max-width: 400px" @click="getPush(item.id)">{{item.title}}</td>
                <td>{{planStatus[item.planState - 1]}}</td>
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
        <el-button type="info" plain class="goBack" @click="goBack">返回</el-button>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "undoneW",
        data() {
            return{
                dataList: '',
                planStatus: ['未完成','阶段性完成','已完成'],
                total: 0,
                pageSize: 5,
                currentPage: 1,
            }
        },
        methods: {
            getPush: function (weekId) {
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
            changePage: function () {
                this.getWeekList()
            },
            getWeekList: function () {
                this.axios({
                    method: 'post',
                    url: '/ld/weekPlan/undoneList',
                    params:{
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                        queryConditions: sessionStorage.getItem('weekQueryConditions'),
                        query: this.selectList
                    }
                }).then( res => {
                    console.log(res);
                    this.dataList = res.data.data
                    this.total = this.dataList.count
                    if (res.data.data.count === 0 ){
                        // console.log(1123123);
                        this.$message({
                            message: '暂无数据',
                            type: 'warning'
                        });
                    }
                })
            },
            goBack: function () {
                this.$router.go(-1)
            },
            searchKeys: function () {
                this.currentPage = 1
                this.getWeekList()
            }
        },
        beforeRouteLeave(to, from, next) {

            this.$store.state.selectList = ''

            next();
        },
        mounted() {
            this.getWeekList()
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
        margin: 70px auto 0;
        table{
            width: 960px;
            margin: 0 auto;
            overflow: hidden;
            border-bottom: 15px solid #DEDEDF;
            thead{
                height: 75px;
                line-height: 75px;
                text-align: center;
                td:nth-child(odd){
                    background-color: #393939;
                    color: #fff;
                }
                td:nth-child(even) {
                    background-color: #949599;
                    color: #fff;
                    border-left: 1px solid #A8A8AA;
                    border-right: 1px solid #A8A8AA;
                }

            }
            tr {
                height: 75px;
                line-height: 75px;
                text-align: center;
                border-bottom: 1px dashed #ccc;
                &:nth-child(even){
                    background-color: #F1F1F1;
                }
                &:last-child{
                    border: 0;
                }
                td{
                    &:nth-child(2){
                        font-size: 12px;
                        border-left: 1px solid #A8A8AA;
                        border-right: 1px solid #A8A8AA;
                    }
                    word-break : break-all;
                }
            }
        }
    }
    .block{
        float: right;
        margin: 10px 20px 0 0;
    }
    .goBack{
        position: relative;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
