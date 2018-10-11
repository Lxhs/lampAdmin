<template>
    <div class="main">
        <table width="960px">
            <tr>
                <th>年度计划工作</th>
                <th>计划完成时间</th>
                <th>工作进度</th>
                <th>责任部门</th>
            </tr>
            <tr v-for="(item, index) in dataList.list" :key="index">
                <td style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; max-width: 200px" @click="getDetail(item.id)">{{item.title}}</td>
                <td :class="item.overTime === 1 ? 'isOverdue' : ''" >{{item.yearHalf === 1 ? '上半年' : '下半年'}}{{item.overTime === 1 ? '（已超时）': ''}}</td>
                <td>{{item.planState === 1 ? '已完成' : '未完成'}}</td>
                <td>{{item.name}}</td>
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
        name: "detail",
        data() {
          return {
              dataList: '',
              currentPage: 1,
              pageSize: 5,
              total: 0
          }
        },
        methods: {
            getDetail: function (yearId) {
                sessionStorage.setItem('yearDetailId',yearId)
                this.$router.push({
                    path: 'detailY',
                    name: 'detailY',
                    params: {
                        isShow: 3,
                        yearId,
                    }
                    /*query: {
                        name: 'name',
                        dataObj: this.msg
                    }*/
                })
            },
            changePage: function () {
                this.getYearPlanList()
            },
            getYearPlanList: function () {
                this.axios({
                    method: 'post',
                    url: '/ld/yearPlan/undoneList',
                    params:{
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                        queryConditions : sessionStorage.getItem('queryConditions'),
                        title: this.selectList
                    }
                }).then( res => {
                    this.dataList = res.data.data
                    console.log(res);
                    this.total = this.dataList.count
                    if (JSON.stringify(res.data.data.list) === '[]' ){
                        this.$message({
                            message: '暂无数据',
                            type: 'warning'
                        });
                    }
                })
            },
            goBack: function () {
                //     this.$router.push({
                //         path: 'index',
                //         name: 'yearly',
                //         params:{
                //             isShow: 2,
                //             title: '年度计划工作'
                //         }
                //     })
                this.$router.go(-1)
            }
        },
        mounted() {
           this.getYearPlanList()
        },
        computed: {
            ...mapState({
                selectList: state=> state.selectList
            })
        },
        watch: {
            'selectList' :  'getYearPlanList',
        }
    }
</script>

<style scoped lang="scss">
.main{
        width: 1000px;
        margin: 30px auto;
    table{
        width: 960px;
        margin: 0 auto;
        tr{
            height: 75px;
            line-height: 75px;
            text-align: center;
            border-bottom: 1px dashed #ccc;
            &:nth-child(1){
                th{
                    font-weight: 500;
                    width: 25%;
                    border-right: 1px solid #A8A8AA;
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
            &:nth-child(odd){
                background-color: #fff;
                td{
                    border-right: 1px solid #A8A8AA;
                }
            }
            &:nth-child(even){
                background-color: #F3F3F5;
                td{
                    border-right: 1px solid #A8A8AA;
                }
            }
            &:last-child{
                border-bottom: 20px solid #393939;
            }
            td:last-child{
                border: 0;
            }
        }

    }
    .block{
        float: right;
        margin-top: 40px;
    }

}
.goBack{
    position: relative;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
