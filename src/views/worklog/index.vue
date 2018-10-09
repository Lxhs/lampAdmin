<template>
 <div class="main">
     <table>
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
             <td style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; width: 340px;" :class="item.titleCss === '' ? '' : 'is-marker'" @click="getPush({path:'workEdit',name:'workEdit',params:{isShow: 3, data:item}})" >{{item.title}}</td>
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
     <span id="add" @click="getPush({path:'workAdd',name:'workAdd',params:{isShow: 3}})">
         <img src="../../assets/images/新增_04.png" style="width: 25px">
         新增
     </span>
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
          pageSize: 5,
          total: 0,
          titleStates:['所有','标注'],
          labelColor: ['#ED1C24','#F2ED84','#00AEEF','#8CC63F'],
          titleCss: '',
          recordTime: ''
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
    },
    mounted(){
        this.getData()
    },
    computed: {
        ...mapState({
            selectList: state=> state.selectList
        })
    },
    watch: {
        'selectList' :  'getData',
        'recordTime' : 'getData'
    }

}
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 50px auto;
        position: relative;
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
</style>
<style lang="scss">
    .selectTime >.el-input__inner{
        padding-right: 10px ;
    }
</style>
