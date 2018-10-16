<template>
    <div class="main">
        <table>
            <thead>
                <td>序号</td>
                <td>编号</td>
                <td  >工程名称</td>
                <td>超时</td>
                <td style="width: 220px;">状态</td>
                <td style="width: 135px;">时间</td>
                <td style="width: 95px;">备注</td>
            </thead>
            <tr v-for="(item, index) in dataList.list" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.projectNo}}</td>
                <td @click="openOp(true,item.id)" style="max-width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; cursor: pointer;width: 300px">{{item.projectName}}</td>
                <td>{{item.projectState === 0 ? '否': '是'}}</td>
                <td>
                    <div id="gridList">
                        <el-tooltip class="item " :class="items.state === 1 ? 'complete' : ''" id="tip" effect="dark" :content="items.progressName" placement="top" v-for="(items,index) in item.progressList" :key="index">
                            <span>1</span>
                        </el-tooltip>
                    </div>
                </td>
                <td>{{ item.projectTime | formatDates}}</td>
                <td style="cursor: pointer;" @click="openOp(true,item.id)">详情</td>
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
        <div class="popups" v-show="isShowO">
            <div class="detail">
                <div class="dTop" >
                    <icon name="cancel" width="24" id="cancel" @click.native="openOp(false)"></icon>
                </div>
                <div class="detailList" style="overflow:auto;display:block;height: 530px;">
                    <table class="dMain" >
                        <tr>
                            <td>工程名称</td>
                            <td>{{projectDetail.projectName}}</td>
                        </tr>
                        <tr style="border-collapse: separate;border-spacing:125px 15px;">
                            <td>{{projectDetail.projectProgressName}}</td>
                            <td>{{projectDetail.projectState  === 0 ? '未超时' : '已超时'}}</td>
                        </tr>
                        <tr>
                            <td>编号</td>
                            <td>{{projectDetail.projectNo}}</td>
                        </tr>
                        <tr>
                            <td>时间</td>
                            <td>{{ projectDetail.projectTime | formatDates}}</td>
                        </tr>
                        <tr>
                            <td>备注</td>
                            <td>
                                {{projectDetail.remarks | isEmptyStr}}
                            </td>
                        </tr>
                        <tr>
                            <td>批注</td>
                            <td>
                                <div style="overflow: auto;display: block;max-height: 250px;">
                                    <div class="note" v-for="(item,index) in projectDetail.projectNotes" :key="index">
                                    <span class="detailTime">
                                        {{item.notesTime}}
                                    </span>
                                        <icon name="垃圾箱" :w="12" :h="12"  class="deleteIcon" @click.native="deleteNotes(index)" ></icon>
                                        <el-input
                                                type="textarea"
                                                :rows="4"
                                                placeholder="请输入内容"
                                                v-model="item.detail"
                                                class="postil">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="note">
                                    <span class="detailTime" style="background-color: #67C23A;">
                                        新增
                                    </span>
                                    <el-input
                                            type="textarea"
                                            :rows="4"
                                            placeholder="请输入内容"
                                            v-model="newDetail.detail"
                                            class="postil">
                                    </el-input>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btnList">
                    <el-button type="info" @click="openOp(false)" plain>返回</el-button>
                    <el-button type="primary" id="dBtn"  @click="dialogVisible = true">保存</el-button>
                </div>


            </div>
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
    import {mapState} from "vuex";
    export default {
        name: "detail",
        data() {
            return {
                isShowO: false,
                textarea: '',
                dataList: '',
                projectDetail: '',
                newDetail: {
                    detail: ''
                },
                dialogVisible: false,
                updataDetail: '',
                total:0,
                pageSize: 5,
                currentPage: 1,

            }
        },
        methods: {
            openOp: function (v,id) {
                this.isShowO = v
                if (id !== ''){
                    sessionStorage.setItem('projectDetailId',id)
                    this.getProjectDetail(id)
                }
            },
            getProjectDetail: function (id) {
                this.axios({
                    url: '/ld/project/getProject',
                    method: 'post',
                    params: {
                        id:sessionStorage.getItem('projectDetailId') ,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id
                    }
                }).then( res => {
                    this.projectDetail = res.data.data

                })

            },
            addNotes: function () {
                this.dialogVisible = false
                this.updataDetail = this.projectDetail
                if (this.newDetail.detail !== ''){
                    this.updataDetail.projectNotes.push(this.newDetail)
                }
                this.axios({
                    url: '/ld/project/updateProject',
                    method: 'post',
                    data: this.updataDetail
                }).then( res => {
                    this.isShowO = false
                    this.newDetail.detail = ''
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getProjectList()
                })
            },
            deleteNotes: function(index) {
                this.projectDetail.projectNotes.splice(index,1)
            },
            getProjectList: function () {
                this.axios({
                    url: '/ld/project/getProjectList',
                    method: 'post',
                    data: {
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                        projectProgress: JSON.parse(sessionStorage.getItem('projectProgress')),
                        projectName: this.selectList
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then( res => {
                    this.dataList = res.data.data
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
                this.$router.push({
                    path: 'index',
                    name: 'progress',
                    params: {
                        isShow: 2,
                        title: '工程进度'
                    }
                })
            },
            changePage: function () {
                this.getProjectList()
            },
            searchKeys: function () {
                this.currentPage = 1
                this.getProjectList()
            }
        },
        beforeRouteLeave(to, from, next) {

            this.$store.state.selectList = ''

            next();
        },
        mounted() {
            this.$store.state.selectList = ''
            this.getProjectList()
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
        margin: 20px auto;
        position: relative;
        &>table{
            width: 960px;
            margin: 0 auto;
            overflow: hidden;
            thead{
                height: 36px;
                line-height: 36px;
                td{
                    text-align: center;
                    background-color: #E9EAEB;
                    color: #7C7E81;
                    font-size: 14px;
                    margin-left: 3px;
                    border: 1px solid #C0BFBF;
                    border-radius: 3px ;
                    &:last-child{
                        margin: 0;
                    }
                }
            }
            tr{
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #A0A1A3;
                td{
                    text-align: center;
                    color: #7C7E81;
                    font-size: 14px;
                    #gridList{
                        display: block;
                        border-radius: 5px;
                        overflow: hidden;
                        margin: 0 auto;
                        width: 195px;
                        #tip{
                            display: block;
                            width: 10px;
                            height: 10px;
                            background-color: #2386C7;
                            border-right:3px solid #939598 ;
                            float: left;
                        }
                    }
                }
            }
        }
        .popups {
            width: 1000px;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            .detail{
                width: 900px;
                overflow: hidden;
                margin: 150px auto;
                background-color: #fff;
                .dTop{
                    width: 100%;
                    height: 45px;
                    background-color: #4C81BF;
                    position: relative;
                    #cancel{
                        position: absolute;
                        top: 50%;
                        right: 15px;
                        font-weight: 700;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                }
                .dMain{
                    width: 100%;
                    padding: 0 30px 50px 30px;
                    border-collapse:separate;
                    border-spacing:15px;
                    overflow: hidden;
                    border-top:  1px dashed #D1D2D4;
                    margin-top: 45px;
                    position: relative;
                    tr{
                        font-size: 14px;
                        color: #6D6E71;
                        td:nth-child(1){
                            width: 10%;
                        }
                        &:nth-child(2){
                            position: absolute;
                            right: -450px;
                            top: 15px;
                        }
                        &:nth-child(5){
                            margin-bottom: 20px;
                        }
                        &:last-child{
                            .postil{
                                position: relative;
                                top: 0;
                            }
                        }
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
                }
                #dBtn{
                    width: 140px;
                }
                .btnList{
                    width: 230px;
                    margin: 50px auto;
                }
            }
        }
    }
    .complete{
        background-color: #BDC830 !important;
    }
    .v-modal{
        display: none;
    }
    .deleteIcon{
        position: absolute;
        cursor: pointer;
        top: 40px;
        right: 20px;
        z-index: 888;
    }
    .goBack{
        position: relative;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
    }
    .block{
        float: right;
        margin: 10px 20px 0 0;
    }
</style>
