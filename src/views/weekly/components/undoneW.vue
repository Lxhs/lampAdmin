<template>
    <div class="main">
        <table width="960px">
            <thead>
                <td width="20%">部门</td>
                <td width="40%" >工作内容</td>
                <td width="40%">进度</td>
            </thead>
            <tr>
                <td>办公室</td>
                <td style="cursor: pointer" @click="getPush">对上级行政文件，会议精神和行政办公会议定事项的监督检查</td>
                <td>未完成</td>
            </tr>
            <tr>
                <td>建设中心</td>
                <td>对上级行政文件，会议精神和行政办公会议定事项的监督检查</td>
                <td>未完成</td>
            </tr>
            <tr>
                <td>财务科</td>
                <td>对上级行政文件，会议精神和行政办公会议定事项的监督检查</td>
                <td>阶段性完成</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "undoneW",
        methods: {
            getPush: function (val) {
                this.$router.push({
                    path: 'detail',
                    name: 'detailW',
                    params: {
                        isShow: 3,
                    }
                    /*query: {
                        name: 'name',
                        dataObj: this.msg
                    }*/
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 70px auto 0;
        overflow: hidden;
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
                }
            }
        }
    }
</style>
