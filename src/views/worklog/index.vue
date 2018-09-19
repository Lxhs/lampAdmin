<template>
 <div class="main">
     <table>
         <tr>
             <th>日期</th>
             <th>标题</th>
             <th>内容</th>
             <th>状态</th>
             <th>责任人</th>
             <th>操作</th>
         </tr>
         <tr>
             <td>2018-8-19</td>
             <td>组织职工申述职称技能等级评定</td>
             <td>组织职工申诉职称技能等级评定</td>
             <td>未完成</td>
             <td>方勇</td>
             <td>修改</td>
         </tr>
         <tr>
             <td>2018-8-19</td>
             <td>组织职工申述职称技能等级评定</td>
             <td>组织职工申诉职称技能等级评定</td>
             <td>未完成</td>
             <td>方勇</td>
             <td>修改</td>
         </tr>
         <tr>
             <td>2018-8-19</td>
             <td>组织职工申述职称技能等级评定</td>
             <td>组织职工申诉职称技能等级评定</td>
             <td>未完成</td>
             <td>方勇</td>
             <td>
                 <span>修改</span>
                 <span style="margin-left: 5px;"  @click="dialogVisible = true">删除</span>
             </td>
         </tr>
         <tr>
             <td>2018-8-19</td>
             <td>组织职工申述职称技能等级评定</td>
             <td>组织职工申诉职称技能等级评定</td>
             <td>未完成</td>
             <td>方勇</td>
             <td>修改</td>
         </tr>
     </table>
     <span id="add" @click="getPush({path:'workEdit',name:'workEdit',params:{isShow: 1}})">
         <img src="../../assets/images/新增_04.png" style="width: 25px">
         新增
     </span>
     <el-dialog
             title="提示"
             :visible.sync="dialogVisible"
             width="30%"
             :before-close="handleClose">
         <span>这是一段信息</span>
         <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
         </span>
     </el-dialog>
 </div>
</template>

<script>
export default {
    name: "index",
    data() {
      return {
          dialogVisible: false
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
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }

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
            img{
                vertical-align: top;
            }
        }
    }
</style>
