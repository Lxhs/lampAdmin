<template>
    <div class="main">
        <div class="work-head">
            <span>工作日志</span>
        </div>
        <div class="work-colour">
            <div class="colour" >
                标记颜色
                <ul>
                    <li v-for="(color,index) in labelColor" style="cursor: pointer" :style="{backgroundColor: color}" :key="index"
                        :class="currentLabelColor === color ? 'is-activeC' : '' " @click="getCurrentColor(index)"></li>
                    <!--<li style="background-color: #00AEEF;"></li>-->
                    <!--<li style="background-color: #F2ED84;" class="is-activeC"></li>-->
                    <!--<li style="background-color: #ED1C24;"></li>-->
                </ul>
            </div>
        </div>
        <ul class="work-search">
            <li class="time">
                <div style="float: left; margin: 10px 10px; color: #474747">时间</div>
                <el-date-picker
                        v-model="time"
                        type="date"
                        placeholder="选择日期"
                        style="width: 150px">
                </el-date-picker>
            </li>
            <li>
                <div style="float: left; margin: 10px 10px; color: #474747">标题</div>
                <el-input  placeholder="请输入内容" style="width: 400px; height: 40px;" v-model="title"></el-input>
            </li>
            <li>
                <el-select v-model="value" placeholder="请选择" value="1" style="width: 140px;margin-left: 20px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
        <div class="work-duty">
            <span>责任人</span>
            <el-checkbox-group v-model="checkedCities" >
                <el-checkbox style="margin: 0 15px 5px 0; width: 66px "  v-for="(city,index) in cities" :label="city.name" :key="index">{{city.name}}</el-checkbox>
            </el-checkbox-group>
            <div id="other">
                <span class="otherZ">其他</span>
                <el-input   v-for="(item,index) in otherResponsiblePersons" v-model="otherResponsiblePersons[index]" placeholder="请输入姓名" style="width: 150px; height: 40px; margin: 10px" :key="index"></el-input>
                <div class="add-de" >
                    <icon name="添加" :w="12" :h="12" class=" ii"  @click.native="addPerson(1)" ></icon>
                    <icon name="垃圾箱" :w="12" :h="12"  class=" ii" @click.native="addPerson(2)" style="right: 30px;"></icon>
                </div>
            </div>
        </div>
        <div class="work-main">
            <div class="main-left">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="bookContent"
                        id="textL"
                >
                </el-input>
                <icon name="添加" :w="12" :h="12" class=" ii2" @click.native="add1" :plain="true"></icon>
            </div>
            <div class="main-m">
                <ul>
                    <!--<li  v-for="(item,index) in bookContent2.bookContents" :key="index" @click="changeColor('contentColor',index)" :style="{backgroundColor : contentColor[index]}" >-->
                        <!--<span class="serial" :style="{backgroundColor: colors[index]}">{{index+1}}</span>-->
                        <!--<i class="el-icon-plus ii1" @click.stop="add2(index)"></i>-->
                        <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="1"-->
                                <!--placeholder="请输入内容"-->
                                <!--v-model="inputValue[index]"-->
                                <!--id="textM"-->
                                <!--:style="{backgroundColor : contentColor[index]}">-->
                        <!--</el-input>-->
                    <!--</li>-->
                    <li  v-for="(item,index) in bookContent2.bookContents" :key="index" @click="changeColor(1,index)" :style="{backgroundColor : item.contentCss}" >
                        <span class="serial" :style="{backgroundColor: colors[index % 3]}">{{index+1}}</span>
                        <icon name="添加" :w="12" :h="12" class=" ii1" @click.native="add2(index)"></icon>
                        <icon  name="垃圾箱" :w="12" :h="12" class=" remove" @click.native="deleteList(index)" ></icon>
                        <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="item.contentDesc"
                                id="textM"
                                >
                        </el-input>
                    </li>

                </ul>
            </div>
            <div class="main-right">
                <!--<ul>-->
                    <!--<li   v-for="(item,index) in bookContent2a.bookContents" :key="index" @click="changeColor('contentColorA',index)" :style="{backgroundColor: contentColorA[index]}">-->
                        <!--<span class="serial" :style="{backgroundColor: colors[0]}"  >{{item.contentNo}}</span>-->
                        <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="1"-->
                                <!--placeholder="请输入内容"-->
                                <!--v-model="inputValueA[index]"-->
                                <!--id="textR1"-->
                                <!--:style="{backgroundColor: contentColorA[index]}">-->
                        <!--</el-input>-->
                    <!--</li>-->
                    <!--<li  v-for="(item,index) in bookContent2b.bookContents" :key="index" @click="changeColor('contentColorB',index)" :style="{backgroundColor: contentColorB[index]}">-->
                        <!--<span class="serial" :style="{backgroundColor: colors[1]}" >{{item.contentNo}}</span>-->
                        <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="1"-->
                                <!--placeholder="请输入内容"-->
                                <!--v-model="inputValueB[index]"-->
                                <!--id="textR2"-->
                                <!--:style="{backgroundColor: contentColorB[index]}">-->
                        <!--</el-input>-->
                    <!--</li>-->
                    <!--<li v-for="(item,index) in bookContent2c.bookContents" :key="index" @click="changeColor('contentColorC',index)" :style="{backgroundColor: contentColorC[index]}">-->
                        <!--<span class="serial" :style="{backgroundColor: colors[2]}" >{{item.contentNo}}</span>-->
                        <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="1"-->
                                <!--placeholder="请输入内容"-->
                                <!--v-model="inputValueC[index]"-->
                                <!--id="textR3"-->
                                <!--:style="{backgroundColor: contentColorC[index]}">-->
                        <!--</el-input>-->
                    <!--</li>-->
                <!--</ul>-->
                <div class="scroll">
                    <ul v-for="(item,index) in bookContent2.bookContents" :key="index">
                        <li v-for="(items,indexS) in item.bookContents" :key="indexS" @click="changeColor(2,index,indexS)" :style="{backgroundColor: items.contentCss}">
                            <span class="serial" :style="{backgroundColor: colors[index]}"  >{{(index + 1) + '.' + (indexS + 1)}}</span>
                            <el-input
                                    type="textarea"
                                    :rows="1"
                                    placeholder="请输入内容"
                                    v-model="items.contentDesc"
                                    id="textR1"
                                    :style="{backgroundColor: contentColorA[index]}"
                            >
                            </el-input>
                            <icon  name="垃圾箱" :w="12" :h="12" class=" remove" @click.native="deleteOne(index,indexS)" ></icon>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <div class="btmAction">
            <el-button type="info" plain class="saveBtn" style="background-color: #ccc; color: #474747;" @click="goBack" >返回</el-button>
            <el-button type="info" plain class="saveBtn" @click="dialogVisible = true" >保存</el-button>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <span>确定是否添加吗</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addWorkBook">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "workEdit",
        data() {
            return {
                options: [{
                    value: 1,
                    label: '完成'
                }, {
                    value: 2,
                    label: '未完成'
                }, {
                    value: 3,
                    label: '阶段性完成'
                }],
                value: 1,
                checkAll: false,
                checkedCities: [],
                cities: [],
                isIndeterminate: true,
                title:'',
                time: '',
                textarea: '',
                dialogVisible: false,
                colors: ['#81BE41','#58585A','#F7941E'],
                inputList: 1,
                labelColor: ['#8CC63F','#00AEEF','#F2ED84','#ED1C24'],
                currentLabelColor: '',
                dataList: '',
                bookContent: '',
                bookContent2: {
                    bookContents:[],
                    contentCss:"",
                    contentDesc:this.bookContent,
                    contentNo:"0",
                    parentNo:null
                },
                bookContent2a: {
                    bookContents:[],
                    contentCss:"",
                    contentDesc:"1111",
                    contentNo:"1",
                    parentNo:"0"
                },
                bookContent2b:{
                    bookContents:[],
                    contentCss:"",
                    contentDesc:"1111",
                    contentNo:"2",
                    parentNo:"0"
                },
                bookContent2c: {
                    bookContents:[],
                    contentCss:"",
                    contentDesc:"1111",
                    contentNo:"3",
                    parentNo:"0"

                },
                bookContentNum: 0,
                inputValue: [],    //中间批注的 3个固定模块的 内容值
                inputValueA: [],   // 2模块的内容值集合
                inputValueB: [],  // 2模块的内容值集合
                inputValueC: [],  // 3模块的内容值集合
                contentColor: [],    //中间批注的 3个固定模块的 内容值
                contentColorA: [],   // 1模块的批注颜色集合
                contentColorB: [],   // 2模块的批注颜色集合
                contentColorC: [],   // 3模块的批注颜色集合
                otherResponsiblePersons: [''],
                responsiblePersonId:[]
            }
        },
        methods: {
            //
            add1: function () {
                if (this.bookContent2.bookContents.length < 3){
                    this.inputValue.push('')
                    console.log(1);
                    this.$set(this.bookContent2.bookContents,this.bookContent2.bookContents.length,{
                        bookContents: [],
                        contentDesc : '',
                        contentCss : '',
                        contentNo: this.bookContent2.bookContents.length + 1,
                        parentNo: 0
                    })

                } else {
                    this.$message.error('最多只能添加三条');
                }
            },
            goBack: function () {
                this.$router.push({
                    path: 'index',
                    name: 'workLog',
                    params: {
                        isShow: 1
                    }
                })
            },
            add2: function (index) {

                    this.$set(this.bookContent2.bookContents[index].bookContents,this.bookContent2.bookContents[index].bookContents.length,{
                        bookContents: [],
                        contentDesc : '',
                        contentCss : '',
                        contentNo: (index + 1) + '.' + (this.bookContent2.bookContents[index].bookContents.length + 1),
                        parentNo: index + 1
                    })

            },
            deleteList: function(index) {
                this.bookContent2.bookContents.splice(index,1)
                for (let i = 0; i < this.bookContent2.bookContents.length; i++){
                    this.bookContent2.bookContents[i].contentNo = i + 1
                    console.log(112131231);
                    for (let j = 0; j < this.bookContent2.bookContents[i].bookContents.length; j++) {
                        this.bookContent2.bookContents[i].bookContents[j].contentNo = (i + 1) + '.' + (j + 1)
                        console.log('j:' + j + i);
                        this.bookContent2.bookContents[i].bookContents[j].parentNo = i + 1

                    }
                }
                if (index === 0){
                    this.bookContent2a.bookContents = []
                } else if (index === 1){
                    this.bookContent2b.bookContents = []
                } else if (index === 2){
                    this.bookContent2c.bookContents = []
                }
            },
            deleteOne: function(index,indexS){
                this.bookContent2.bookContents[index].bookContents.splice(indexS,1)
                for (let i = 0; i<  this.bookContent2.bookContents[index].bookContents.length; i++){
                    this.bookContent2.bookContents[index].bookContents[i].contentNo = (index + 1)  + '.' + ( i + 1)
                }
            },
            getCurrentColor: function (index) {
                if (this.currentLabelColor === this.labelColor[index]) {
                    this.currentLabelColor = ''
                }else  {
                    this.currentLabelColor = this.labelColor[index]

                }
            },
            getResponsiblePerson: function () {
                this.axios.get('/ld/workBook/getResponsiblePerson').then(res => {
                    this.cities = res.data.data
                })
            },
            addPerson: function (status){
                if (status === 1){
                    this.otherResponsiblePersons.push('')
                }else if (status === 2){
                    if (this.otherResponsiblePersons.length >0){
                        this.otherResponsiblePersons.pop()
                    }else {
                        this.$message.error('不能再删除了');
                    }
                }
            },
            //改变批注颜色
            changeColor: function (v,index,indexS) {
                if (v === 1){
                    this.bookContent2.bookContents[index].contentCss = this.currentLabelColor
                } else if (v === 2){
                    this.bookContent2.bookContents[index].bookContents[indexS].contentCss = this.currentLabelColor
                }

            },
            addWorkBook: function () {

                // for (let i = 0; i< this.bookContent2.bookContents.length; i++){
                //     if (i === 0){
                //         this.bookContent2.bookContents[i].bookContents = this.bookContent2a.bookContents
                //     } else if (i === 1) {
                //         this.bookContent2.bookContents[i].bookContents = this.bookContent2b.bookContents
                //     }else if (i === 2){
                //         this.bookContent2.bookContents[i].bookContents = this.bookContent2c.bookContents
                //     }
                // }

                this.dialogVisible = false
                this.bookContent2.contentDesc = this.bookContent
                // for (let i = 0; i < this.bookContent2.bookContents.length; i++) {
                //     // this.bookContent2.bookContents[i].contentDesc = this.inputValue[i]
                //     // for (let j = 0; j <this.bookContent2.bookContents[i].bookContents.length; j++) {
                //     //     if (i === 0){
                //     //         this.bookContent2.bookContents[i].bookContents[j].contentDesc = this.inputValueA[j]
                //     //     } else if (i=== 1) {
                //     //         this.bookContent2.bookContents[i].bookContents[j].contentDesc = this.inputValueB[j]
                //     //     } else if (i === 2) {
                //     //         this.bookContent2.bookContents[i].bookContents[j].contentDesc = this.inputValueC[j]
                //     //     }
                //     // }
                // }
                for (let i =0; i < this.checkedCities.length; i++ ){
                    for (let j = 0; j < this.cities.length; j++){
                        if (this.checkedCities[i] === this.cities[j].name){
                            this.responsiblePersonId.push(this.cities[j].id)
                        }
                    }
                }
                console.log(this.responsiblePersonId);
                this.dataList = {
                    recordTime: Date.parse(new Date()),
                    title: this.title,
                    workState: this.value,
                    responsiblePersonId: this.responsiblePersonId,
                    otherResponsiblePerson: this.otherResponsiblePersons,
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                    bookContent: this.bookContent2
                    // id: this.$route.params.data.id,

                }
                console.log(this.dataList);
                this.axios({
                    method: 'post',
                    url: '/ld/workBook/addWorkBook',
                    data: this.dataList,
                }).then( res => {
                    console.log(res);
                    if (res.data.status === '200'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push({
                            path: 'workLog',
                            name: 'workLog',
                            params: {
                                isShow: 1
                            }
                        })

                    }

                })

            },


        },
        created(){
            this.getResponsiblePerson()
            this.time = Date.parse(new Date())
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 30px auto;
        position: relative;
        .work-head{
            background: url("../../../assets/images/元素_04.png") no-repeat;
            width: 900px;
            height: 40px;
            margin: 0 auto;
            span{
                line-height: 40px;
                margin-left: 65px;
                font-size: 20px;
                color: #fff;
            }
        }
        .work-colour{
            overflow: hidden;
            .colour{
                overflow: auto;
                float: right;
                font-size: 14px;
                margin-top: 20px;
                ul{
                    padding: 5px 10px;
                    background-color: #E9EAEB;
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
            }
        }
        .work-search{
            width: 855px;
            margin: 10px auto;
            color: #BDBEC0;
            li{
                overflow: hidden;
                display: inline-block;
                font-size: 14px;
                &>span{
                    display: inline-block;
                    padding: 0 35px ;
                    height: 28px;
                    border: 2px solid #BDBEC0;
                    border-radius: 3px;
                    margin-left: 10px;
                }
                &:nth-child(2){
                    margin-left: 20px;
                }
                &:last-child{
                    .el-input__inner{
                        height: 28px !important;
                        line-height: 28px !important;
                    }
                }
            }
        }
        .work-duty{
            width: 840px;
            margin: 10px auto;
            padding-left: 70px;
            position: relative;
            box-sizing: border-box;
            span{
                position: absolute;
                left: 0;
                top: 0;
                font-size: 16px;
                color: #474747;
            }
            #other{
                margin-top: 15px;
                font-size: 14px;
                position: relative;
                width: auto;

            }
        }
        .work-main{
            width: 840px;
            overflow: hidden;
            margin: 0 auto;
            .main-left{
                overflow: hidden;
                border-radius: 3px;
                padding: 0 20px 20px;
                float: left;
                position: relative;
            }
            .main-m{
                float: left;
                margin-left: 60px;
                padding-left: 10px;
                overflow: hidden;
                ul{

                    li{
                        overflow: hidden;
                        padding: 10px 25px;
                        margin-bottom: 30px;
                        border-radius: 5px;
                        position: relative;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .serial{
                            display: block;
                            width: 25px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            background-color: #81BE41;
                            position: absolute;
                            left: 0px;
                            top: 50%;
                            transform: translateY(-50%);
                            color: #fff;
                            font-size: 14px;
                        }
                    }
                }
            }
            .main-right{
                float: left;
                overflow: hidden;
                padding-left: 30px;
                height: 100%;
                .scroll{
                    height: 335px;
                    width: 200px;
                    overflow: auto;
                    ul{
                        overflow-y: auto;
                        li{
                            margin-left: 20px;
                            /*width: 145px;*/
                            /*height: 25px;*/
                            padding: 10px ;
                            margin-bottom: 0;
                            border-radius: 5px;
                            position: relative;
                            &:last-child{
                                margin-bottom: 0;
                            }
                            .serial{
                                display: block;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                background-color: #81BE41;
                                position: absolute;
                                left: -10px;
                                top: 50%;
                                transform: translateY(-50%);
                                color: #fff;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
        .btmAction{
            position: absolute;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            overflow: hidden;
            .saveBtn{
                background-color: #3A3A3A;
                color: #fff;
                width: 120px;
                letter-spacing: 5px;
            }
        }
    }
    .is-activeC{
        border: 3px solid #58585A !important;
    }
    .el-textarea__inner {
        background-color: #F2ED84 !important;
    }
    .ii{
        position: absolute;
        bottom: 5px;
        right: 5px;
        cursor: pointer;

    }
    .ii1{
        position: absolute;
        bottom: 20px;
        right: 35px;
        cursor: pointer;
    }
    .ii2{
        position: absolute;
        bottom: 30px;
        right: 30px;
        cursor: pointer;
    }
    .add-de {
        position: relative;
        width: 65px;
        height: 4px;
        display: inline-block;
        margin: -18px;
    }
    .otherZ{
        left: -55px !important;
    }
    .ii1{
        position: absolute;
        bottom: 15px;
        right: 30px;
        cursor: pointer;
    }
    .ii2{
        position: absolute;
        bottom: 30px;
        right: 30px;
        cursor: pointer;
    }
    .remove{
        position: absolute;
        top: 15px;
        right: 30px;
        color: #ccc;
        cursor: pointer;
        &:hover{
            color: red ;
        }
    }

</style>
<style >
    /*.el-input__inner{*/
        /*float: left;*/
    /*}*/
</style>
