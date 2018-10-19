<template>

        <div class="main">
            <span id="add" @click="getPush({path:'workAdd',name:'workAdd',params:{isShow: 3}})">
         <img src="../../assets/images/新增_04.png" style="width: 25px">
         新增
     </span>

            <div class="wrapper" ref="wrapper">
                <table class="content">
                    <tr>
                        <th style="width: 150px;">
                            <el-date-picker
                                    v-model="recordTime"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 120px; font-size: 12px"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    class="selectTime">
                            </el-date-picker>
                        </th>
                        <th>
                            <el-dropdown size="medium" trigger="click" placement="bottom">
                          <span class="el-dropdown-link" style="cursor: pointer">
                            标题<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in titleStates" :key="index" @click.native="changeTitleCss(index)">{{item}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </th>
                        <th>内容标记颜色</th>
                        <th>
                            <el-dropdown size="medium" trigger="click" placement="bottom">
                          <span class="el-dropdown-link" style="cursor: pointer">
                            状态<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in workSatesList" :key="index" @click.native="changeWorkState(index)">{{item}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </th>
                        <th>责任人</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item,index) in dataList.list" :key="index">
                    <td>{{ item.recordTime | formatDates}}</td>
                    <td style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; max-width: 340px;width: 340px " :class="item.titleCss === '' ? '' : 'is-marker'" @click="getPush({path:'workEdit',name:'workEdit',params:{isShow: 3, data:item}})" >{{item.title}}</td>
                    <td style="max-width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                        <ul class="labelCol">
                            <li v-for="(color,index) in labelColor" :style="{backgroundColor: color}" :key="index"
                                v-show="item.contentColors.indexOf(color)  !== -1 "></li>
                            <!--<li style="background-color: #00AEEF;"></li>-->
                            <!--<li style="background-color: #F2ED84;" class="is-activeC"></li>-->
                            <!--<li style="background-color: #ED1C24;"></li>-->
                        </ul>
                    </td>
                    <td>{{workSates[item.workState - 1]}}</td>
                    <td>{{item.bookResponsibleNames[0]}}</td>
                    <td >
                        <span style="cursor: pointer" @click="getPush({path:'workEdit',name:'workEdit',params:{isShow: 3,data:item}})" >修改</span>
                        <span style="cursor: pointer; margin-left: 10px" @click="dialogVisible = true; workBookIds = item.id">删除</span>
                    </td>
                </tr>
                 </table>
            </div>
            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        :current-page.sync="currentPage"
                        @current-change="changePage">
                </el-pagination>
            </div>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>确定是否删除吗？</span>
                <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteWorkBook">确 定</el-button>
         </span>
            </el-dialog>
        </div>

</template>

<script>
import {mapState} from "vuex";
import BScroll from 'better-scroll'
const options = {
    scrollY: true,
    scrollbar:true,
    click:true,
    mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
    }
}
options.pullUpLoad = {
    threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
}
export default {
    name: "index",
    data() {
      return {
          dialogVisible: false,
          dataList: {},
          workState: '',
          workSates:['完成','阶段性完成','未完成'],
          workSatesList:['所有','完成','阶段性完成','未完成'],
          detailContent: '',
          workBookIds:'',
          currentPage: 1,
          pageSize: 10,
          total: 0,
          titleStates:['所有','标注'],
          labelColor: ['#ED1C24','#F2ED84','#00AEEF','#8CC63F'],
          titleCss: '',
          recordTime: '',
      }
    },
    methods: {
        getPush: function (val) {
            sessionStorage.setItem('workLogId',JSON.stringify(val.params.data))
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
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then( _ => {
                    done();
                })
                .catch(_ => {});
        },
        getData() {
            this.axios({
                method: 'get',
                url:'/ld/workBook/getWorkBookList',
                params: {
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    keyWord: this.selectList,
                    workState: this.workState,
                    titleCss: this.titleCss,
                    recordTime: this.recordTime
                }
            }).then(res => {
                console.log(res);
                this.dataList = res.data.data
                console.log(this.dataList);
                this.total = this.dataList.count

                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.wrapper, options)
                        console.log(this.scroll);
                        this.scroll.on('pullingUp', () => {
                            console.log(213);
                            if (this.pageSize < this.total ) {
                                console.log(33333);
                                this.pageSize += 5
                                this.getData()
                            } else {
                                console.log(1231231);
                                this.$message({
                                    message: '暂无更多数据',
                                    type: 'warning'
                                });
                            }
                        })

                        this.scroll.on('scroll', pos => {
                            // console.log(pos);
                        })
                        this.scroll.on('scrollEnd', req => {
                            // console.log(req);
                        })
                    } else {
                        this.scroll.finishPullUp()
                        this.scroll.refresh()
                    }
                })

                if (JSON.stringify(res.data.data.list) === '[]' ){
                    this.$message({
                        message: '暂无数据',
                        type: 'warning'
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        deleteWorkBook: function () {
            this.axios({
                method: 'post',
                url: '/ld/workBook/deleteWorkBook',
                data: {
                    workBookId: this.workBookIds,
                    userId: 1
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
                    // 'user_id': this.$store.state.user.userId,
                    // 'session_id': this.$store.state.user.sessionId
                }
            }).then(res =>{
                console.log(res);
                if (res.data.status === '200') {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getData()
                }
            })
            this.dialogVisible = false
        },
        changePage: function () {
            this.getData()
        },
        changeWorkState: function (index) {
            if (index === 0){
                this.workState = ''
            } else {
                this.workState = index

            }
            this.currentPage = 1
            this.getData()
        },
        changeTitleCss: function (index) {
            if (index === 1){
                console.log(111);
                this.titleCss = 'red'
            } if (index === 0){
                console.log(222);
                this.titleCss = ''
            }
            this.currentPage = 1
            this.getData()
        },
        searchKeys:function () {
            this.currentPage = 1
            this.getData()
        },
        refresh (iscroll) {
        },
        load (iscroll) {
            // Load new data

            //变量scrollTop是滚动条滚动时，距离顶部的距离
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            //滚动条到底部的条件




            if (iscroll.distY < -20) {
                if(scrollTop + windowHeight === scrollHeight){
                    //写后台加载数据的函数
                    console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
                    if (this.pageSize < this.total ) {
                        this.pageSize += 5
                        this.getData()
                    } else {
                        this.$message({
                            message: '暂无更多数据',
                            type: 'warning'
                        });
                    }
                }

            }
            // } else if (iscroll.distY < -20) {
            //     if (this.currentPage <= 1){
            //         this.$message({
            //             message: '已经是第一张',
            //             type: 'warning'
            //         });
            //     }else {
            //         this.currentPage -= 1
            //         this.getData()
            //     }
            //
            // }
        }
    },
    created(){
        this.getData()
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            console.log(vm)
            // 每次进入路由执行
            vm.getData()
        })
    },
    beforeRouteLeave(to, from, next) {
        console.log(123);
        // from.meta.keepAlive = false;
        next();
    },
    computed: {
        ...mapState({
            selectList: state=> state.selectList
        })
    },
    watch: {
        'selectList' :  'searchKeys',
        'recordTime' : 'getData',
    },


}
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 50px auto;
        position: relative;
        flex: 1;
        height: 600px;
        table{
            width: 960px;
            margin: 0 auto;
            tr{
                height: 75px;
                line-height: 75px;
                text-align: center;
                border-bottom: 1px dashed #ccc;
                color: #58585A;
                font-size: 14px;
                &:nth-child(1){
                    th{
                        font-weight: 500;
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
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
        #add{
            display: block;
            position: absolute;
            overflow: hidden;
            right: 10px;
            top: -37px;
            font-size: 12px;
            vertical-align: top;
            cursor: pointer;
            line-height: 25px;
            img{
                vertical-align: top;
            }
        }
    }
    .block{
        position: absolute;
        bottom: -55px;
        right: 0;
    }
    .labelCol{
        padding: 5px 10px;
        display: inline-block;
        margin-left: 10px;
        li{
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #000;
            margin-right: 3px;
            &:last-child{
                margin: 0;
            }
        }
    }
    .is-activeC{
        border: 3px solid #58585A !important;
    }
    .is-marker{
        color: red
    }
   .selectTime >.el-input__inner{
        padding-right: 0 ;
    }
    .scroll-view {
        /* -- Attention: This line is extremely important in chrome 55+! -- */
        touch-action: none;
        /*touch-action: pan-y!important;*/
        /* -- Attention-- */
        width: 1000px;
        position: relative;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        /*overflow: hidden;*/
    }
    .v-model{
        display: none;
    }
    .wrapper{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: #fff;
        height: 600px;
    }
</style>
<style lang="scss">
    .selectTime >.el-input__inner{
        padding-right: 10px ;
    }
</style>
