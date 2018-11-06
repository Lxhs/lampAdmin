<template>
    <div class="main">
       <div class="main-top">
           <table width="960px">
               <tr>
                   <th >年度计划工作</th>
                   <th colspan="2" class="year">
                       <span>上半年</span>
                       <span>计划</span>
                       <span>未完成</span>
                   </th>
                   <th colspan="2" class="year">
                       <span>下半年</span>
                       <span>计划</span>
                       <span>未完成</span>
                   </th>
                   <th>未完成</th>
               </tr>
               <tr>
                   <td style="cursor: pointer" @click="getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 6}})">{{dataList.yearPlanNumber}}</td>
                   <td style="cursor: pointer" @click="getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 4}})">{{dataList.firstHalfYearPlanNumber}}</td>
                   <td style="cursor: pointer" @click="getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 1}})">{{dataList.firstHalfYearUndone}}</td>
                   <td style="cursor: pointer" @click="getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 5}})">{{dataList.secondHalfPlanNumber}}</td>
                   <td style="cursor: pointer" @click="getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 2}})">{{dataList.secondHalfUndone}}</td>
                   <td style="cursor: pointer" @click="getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 3}})">{{dataList.undone}}</td>
               </tr>
           </table>
       </div>
        <hr >
        <div class="main-bottom">
            <span>全年未完成工作计划</span>
            <div class="first-half">
                <div class="first-title">
                    <img src="../../assets/images/元素_12.png" alt="" style="width: 14px">
                    上半年未完成工作
                </div>
                <table>
                    <tr v-for="(item,index) in firstList" :key="index" class="limited">
                        <td width="150px">{{item.name}}</td>
                        <td style="cursor: pointer" @click="getDetail(item.id)">{{item.title}}</td>
                    </tr>
                </table>
                <div class="block">
                    <el-pagination
                            layout="prev, pager, next"
                            :total="firstTotal"
                            :page-size="firstPageSize"
                            :current-page.sync="firstCurrentPage"
                            @current-change="changePageF">
                    </el-pagination>
                </div>
            </div>
            <div class="first-half">
                <div class="first-title">
                    <img src="../../assets/images/元素_12.png" alt="" style="width: 14px">
                    下半年未完成工作
                </div>
                <table>
                    <tr v-for="(item,index) in secList" :key="index">
                        <td width="150px">{{item.name}}</td>
                        <td style="cursor: pointer" @click="getDetail(item.id)">{{item.title}}</td>
                    </tr>
                </table>
                <div class="block">
                    <el-pagination
                            layout="prev, pager, next"
                            :total="secTotal"
                            :page-size="secPageSize"
                            :current-page.sync="secCurrentPage"
                            @current-change="changePageS">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "index",
        data() {
            return {
                dataList: '',
                firstList:[],
                firstTotal: 0,
                firstPageSize: 5,
                firstCurrentPage: 1,
                secList:[],
                secTotal:0,
                secPageSize: 5,
                secCurrentPage: 1,
            }
        },

        methods: {
            getPush: function (val) {
                sessionStorage.setItem('queryConditions',val.params.queryConditions)
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
            searchKeys: function () {
                this.getPush({path:'undone',name:'undone',params:{isShow: 1,queryConditions: 0}})
            },
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
            changePageF: function () {
                // this.firstList = this.dataList.firstHalfPages.list.slice((this.firstCurrentPage - 1) * 5,this. firstCurrentPage * 5)
                this.getData()
            },
            changePageS: function () {
                // this.secList = this.dataList.secondHalfPages.list.slice((this.secCurrentPage - 1) * 5,this. secCurrentPage * 5)
                this.getData()
            },
            getData: function () {
                this.axios({
                    method: 'post',
                    url: '/ld/yearPlan/statistical',
                    params:{
                        firstPageNo: this.firstCurrentPage,
                        firstPageSize: this.firstPageSize,
                        secondPageNo: this.secCurrentPage ,
                        secondPageSize: this.secPageSize,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id
                    }
                }).then( res => {
                    this.dataList = res.data.data
                    // console.log(res);
                    this.firstList = this.dataList.firstHalfPages.list
                    this.secList = this.dataList.secondHalfPages.list
                    this.firstTotal = this.dataList.firstHalfPages.count
                    this.secTotal = this.dataList.secondHalfPages.count
                })
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
    overflow: hidden;
    .main-top{
        width: 1000px;
        overflow: hidden;
        margin: 25px auto 0;
        background-color: #F3F3F5;
        table{
            width: 960px;
            margin: 0 auto;
            padding-bottom: 20px;
            tr{
                height: 75px;
                line-height: 75px;
                text-align: center;
                td{
                    width: 10%;
                }
                &:nth-child(1){
                    th{
                        font-weight: 500;
                        border-right: 1px solid #A8A8AA;
                        width: 16.66%;
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
                    border-bottom: 1px dashed #ccc;
                    td:nth-child(odd){
                        border-right: 1px solid #A8A8AA;
                    }

                }
                &:nth-child(odd){

                    td:nth-child(2){
                        border-left: 1px solid #A8A8AA;
                        border-right: 1px solid #A8A8AA;
                    }
                }
            }
        }
    }
    .main-bottom{
        width: 960px;
        margin: 50px auto 0;
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
        .first-half{
            width: 1000px;
            margin: 0 auto;
            overflow: hidden;
            .first-title{
                width: 160px;
                padding: 10px;
                border-bottom: 2px solid #F7941E;
                line-height: 10px;
                font-size: 14px;
                color: #58585A;
                margin: 20px auto 0;
                img{
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }
            table{
                margin: 10px auto 0;
                width: 960px;
                border-collapse:separate;
                border-spacing:10px;
                tr{
                    height: 20px;
                    line-height: 20px;
                    color: #58585A;
                    font-size: 14px;
                    &:nth-child(odd){
                        background-color: #E7E8E9;
                    }
                    td:nth-child(1){
                        text-align: center;
                    }
                }
            }

        }
    }
    hr{
        height: 20px;
        width: 960px;
        background-color: #3A3A3A;
        margin: 15px auto 0;
    }
}
.year{
    position: relative;
    span{
        position: absolute;
        display: block;
        line-height: 18px;
        &:nth-child(1){
             top: 10px;
             left: 50%;
             transform: translateX(-50%);
        }
        &:nth-child(2){
            bottom: 10px;
            left: 50px;
        }
        &:nth-child(3){
            bottom: 10px;
            right: 50px;
        }
    }
}
    .block{
        float: right;
        margin: 10px 20px 0 0;
    }
    .limited{
        td{
            &:nth-child(2){
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 700px;
            }
        }
    }
</style>
