<template>
    <div class="main">
        <table width="960px">
            <tr>
                <th>年度计划工作</th>
                <th>计划完成时间</th>
                <th>工作进度</th>
                <th>责任部门</th>
            </tr>
            <tr>
                <td>完成月度EPP人员异动</td>
                <td class="isOverdue">上半年（已超期）</td>
                <td>未完成</td>
                <td>办公室</td>
            </tr>
            <tr>
                <td>完成月度EPP人员异动</td>
                <td>上半年（已超期）</td>
                <td>未完成</td>
                <td>办公室</td>
            </tr>
            <tr>
                <td>完成月度EPP人员异动</td>
                <td>上半年（已超期）</td>
                <td>未完成</td>
                <td>办公室</td>
            </tr>
            <tr>
                <td>完成月度EPP人员异动</td>
                <td>上半年（已超期）</td>
                <td>未完成</td>
                <td>办公室</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "detail",
        mounted () {
            console.log(this.$route.path)
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
    }

</style>
