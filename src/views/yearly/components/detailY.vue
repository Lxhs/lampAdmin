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
                <td>{{dataList.planTime}}</td>
            </tr>
            <tr>
                <td>事件详情</td>
                <td>{{dataList.eventDetails}}</td>
            </tr>
            <tr>
                <td>未完成原因</td>
                <td>{{dataList.unfinishedReason}}</td>
            </tr>
            <tr>
                <td >批注</td>
                <td>
                    <div style="overflow: auto;display: block;max-height: 250px;">
                        <div class="note" v-for="(item,index) in dataList.yearPlanNotes" :key="index">
                                    <span class="detailTime">
                                        {{item.notesTime}}
                                    </span>
                            <icon v-show="userName === 'thinkgem'" name="垃圾箱" :w="12" :h="12"  class="deleteIcon" @click.native="deleteNotes(index)" ></icon>
                            <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="item.detail"
                                    class="postil">
                            </el-input>
                        </div>
                        <div v-show=" !dataList.yearPlanNotes||!dataList.yearPlanNotes.length">
                            暂无批注
                        </div>
                    </div>
                    <div class="note" v-show="userName === 'thinkgem'">
                                    <span class="detailTime" style="background-color: #67C23A;">
                                        新增
                                    </span>
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="newDetail.detail"
                                class="postil">
                        </el-input>
                    </div>
                </td>
            </tr>
        </table>
        <div class="goBack">
            <el-button style="margin-left: 30px" type="info" plain  @click="$router.go(-1)">返回</el-button>
            <el-button v-show="userName === 'thinkgem'" type="primary" plain @click="dialogVisible = true">保存</el-button>
            <!--<div class="btn" @click="dialogVisible = true">保存</div>-->
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <span>确认要保存吗？</span>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addNotes">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
            return {
                dataList: '',
                newDetail: {
                    detail: ''
                },
                updataDetail: '',
                dialogVisible: false,
                userName: ''
            }
        },
        methods: {
            deleteNotes: function(index) {
                this.dataList.yearPlanNotes.splice(index,1)
            },
            addNotes: function () {
                this.dialogVisible = false
                this.updataDetail = this.dataList
                if (this.newDetail.detail !== ''){
                    this.updataDetail.yearPlanNotes.push(this.newDetail)
                }
                this.axios({
                    url: '/ld/yearPlan/updateYearPlan',
                    method: 'post',
                    data: this.updataDetail
                }).then( res => {
                    console.log(res);
                    this.newDetail.detail = ''
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getYearPlanList()
                })
            },
            getYearPlanList: function () {
                this.axios({
                    method: 'post',
                    url: '/ld/yearPlan/getYearPlan',
                    params:{
                        id: sessionStorage.getItem('yearDetailId'),
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                    }
                }).then( res => {
                    console.log(res);
                    this.dataList = res.data.data
                    console.log(this.dataList);
                })
            }
        },
        mounted() {
            this.getYearPlanList()
            this.userName = sessionStorage.getItem('userName')
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
        .note{
            margin-bottom: 10px;
            position: relative;
            .detailTime{
                border-spacing: 0 ;
                width: 100px;
                height: 30px;
                background-color: #A7A9AC;
                border-radius: 5px;
                display: block;
                color: #fff;
                text-align: center;
                line-height: 30px;

            }
        }
        .deleteIcon{
            position: absolute;
            cursor: pointer;
            top: 40px;
            right: 20px;
            z-index: 888;
        }
        .goBack{
            margin: 50px auto;
            width: 200px;
            padding: 20px;
        }
    }
</style>
