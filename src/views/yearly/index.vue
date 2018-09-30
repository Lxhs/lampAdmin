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
                   <td>{{dataList.yearPlanNumber}}</td>
                   <td>{{dataList.firstHalfYearPlanNumber}}</td>
                   <td>{{dataList.firstHalfYearUndone}}</td>
                   <td>{{dataList.secondHalfPlanNumber}}</td>
                   <td>{{dataList.secondHalfUndone}}</td>
                   <td style="cursor: pointer" @click="getPush({path:'detail',name:'detail',params:{isShow: 1}})">{{dataList.undone}}</td>
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
                    <tr v-for="(item,index) in dataList.firstHalfPages.list" :key="index">
                        <td width="150px">{{item.name}}</td>
                        <td style="cursor: pointer" @click="getDetail(item.id)">{{item.title}}</td>
                    </tr>
                </table>
            </div>
            <div class="first-half">
                <div class="first-title">
                    <img src="../../assets/images/元素_12.png" alt="" style="width: 14px">
                    下半年未完成工作
                </div>
                <table>
                    <tr v-for="(item,index) in dataList.secondHalfPages.list" :key="index">
                        <td width="150px">{{item.name}}</td>
                        <td style="cursor: pointer" @click="getDetail(item.id)">{{item.title}}</td>
                    </tr>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
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
            },
            getDetail: function (weekId) {
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
            }
        },
        mounted() {
            this.axios({
                method: 'post',
                url: '/ld/yearPlan/statistical',
                params:{
                    pageNo: 1,
                    pageSize: 10,
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id
                }
            }).then( res => {
                this.dataList = res.data.data
                console.log(res);
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
</style>
