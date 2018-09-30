<template>
    <div class="main">
        <table>
            <tr>
                <td>部门</td>
                <td>{{dataList.name}}</td>
            </tr>
            <tr>
                <td>标题</td>
                <td>{{dataList.title}}</td>
            </tr>
            <tr>
                <td>时间</td>
                <td>{{dataList.planTime | formatDates}}</td>
            </tr>
            <tr>
                <td>事件详情</td>
                <td>{{dataList.eventDetails}}</td>
            </tr>
            <tr>
                <td>批注</td>
                <td>
                    <textarea cols="110" rows="10">在这里输入内容...</textarea>
                </td>
            </tr>
        </table>
        <div class="btn">保存</div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
          return {
              dataList: ''
          }
        },
        mounted() {
            this.axios({
                method: 'post',
                url: '/ld/weekPlan/getWeekPlan',
                params:{
                   id: this.$route.params.weekId,
                   userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                }
            }).then( res => {
                console.log(res);
                this.dataList = res.data.data
                console.log(this.dataList);
            })
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 30px auto;
        overflow: hidden;
        table{
            width: 960px;
            margin: 0 auto;
            overflow: hidden;
            border-collapse:separate;
            border-spacing:20px;
            tr{
                background-color: #E7E8E9;
                color: #454547;
                font-size: 14px;
                td:nth-child(1){
                    width: 10%;
                    padding-left: 10px;
                }
                &:nth-child(4){
                    td:last-child{
                        background-color: #fff;
                    }
                }
                &:last-child{

                    td:last-child{
                        background-color: #fff;
                        textarea{
                            padding: 10px;
                            box-sizing: border-box;
                            font-size: 14px;
                            color: #454547;
                        }
                    }
                }
            }
        }
        .btn{
            width: 100px;
            height: 30px;
            background-color: #3A3A3A;
            color: #fff;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            border-radius: 5px;
            margin: 20px auto ;
            font-weight: 600;
            letter-spacing: 2px;
            cursor: pointer;
        }
    }
</style>
