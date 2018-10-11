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
                <div style="float: left; margin: 10px 10px; color: #474747  ">时间</div>
                <el-date-picker
                        v-model="time"
                        type="date"
                        placeholder="选择日期"
                style="width: 150px">
                </el-date-picker>
            </li>
            <li>
                <div style="float: left; margin: 10px 10px; color: #474747;cursor: pointer" @click="changeTitleCol">标题</div>
                <el-input  placeholder="请输入内容" style="width: 400px; height: 40px;" v-model="title" :class="titleCol === '' ? '' : 'titleCol'"></el-input>
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
                <el-checkbox style="margin: 0 15px 5px 0; width:66px " class="checkList" v-for="(city,index) in cities" :label="city.name" :key="index">{{city.name}}</el-checkbox>
            </el-checkbox-group>
            <div id="other">
                <span id="otherZ">其他</span>
                <el-input  v-for="(item,index) in otherResponsiblePersons" v-model="otherResponsiblePersons[index]" placeholder="请输入姓名" style="width: 150px; height: 40px; margin: 10px" :key="index"></el-input>
                <div class="add-de" >
                    <icon name="添加" :w="12" :h="12" class=" ii"  @click.native="addPerson('add')" ></icon>
                    <icon name="垃圾箱" :w="12" :h="12"  class=" ii" @click.native="addPerson('delete')" style="right: 30px;"></icon>
                </div>
            </div>
        </div>
        <div class="work-main">
            <div class="main-left" @click="changeColor(3)" :style="{backgroundColor : contentCss}">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="bookContent"
                        id="textL"
                        class="textarea"
                        >
                </el-input>
                <icon name="添加" :w="12" :h="12" class=" ii2" @click.native="add1" :plain="true"></icon>
            </div>
            <div class="main-m">
                <ul>
                    <li  v-for="(item,index) in bookContent2" :key="index" @click="changeColor(1,index)" :style="{backgroundColor : item.contentCss}" >
                        <span class="serial" :style="{backgroundColor: colors[index % 3]}">{{index+1}}</span>
                        <icon name="添加" :w="12" :h="12" class=" ii1" @click.native="add2(index)"></icon>
                        <icon  name="垃圾箱" :w="12" :h="12" class=" remove" @click.native="deleteList(index)" ></icon>
                        <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="item.contentDesc"
                                id="textM"
                                class="textarea"
                               >
                        </el-input>
                    </li>
                </ul>
            </div>
            <div class="main-right">
                <!--<ul>-->
                    <!--<li  v-for="(item,index) in bookContent2a.bookContents" :key="index" @click="changeColor('contentColorA',index)" :style="{backgroundColor: contentColorA[index]}">-->
                        <!--<span class="serial" :style="{backgroundColor: colors[0]}"  >{{item.contentNo}}</span>-->
                        <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="1"-->
                                <!--placeholder="请输入内容"-->
                                <!--v-model="inputValueA[index]"-->
                                <!--id="textR1"-->
                                <!--:style="{backgroundColor: contentColorA[index]}"-->
                        <!--&gt;-->
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
                    <!--<li  v-for="(item,index) in bookContent2c.bookContents" :key="index" @click="changeColor('contentColorC',index)" :style="{backgroundColor: contentColorC[index]}">-->
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
                    <ul v-for="(item,index) in bookContent2" :key="index">
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
            <span>确定是否修改吗</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateWorkBook">确 定</el-button>
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
                label: '阶段性完成'
            }, {
                value: 3,
                label: '未完成'
            }],
            value: 1,
            checkAll: false,
            checkedCities: [],
            cities: [],
            isIndeterminate: true,
            title:'组织职工申报职称技能等级评定',
            time: '',
            textarea: '',
            dialogVisible: false,
            colors: ['#81BE41','#58585A','#F7941E'],
            inputList: 1,
            labelColor: ['#8CC63F','#00AEEF','#F2ED84','#ED1C24'],
            currentLabelColor: '',
            dataList: '',
            bookContent: '',
            bookContent2: '',
            bookContent2a: '',
            bookContent2b: '',
            bookContent2c: '',
            inputValue: [],    //中间批注的 3个固定模块的 内容值
            inputValueA: [],   // 2模块的内容值集合
            inputValueB: [],  // 2模块的内容值集合
            inputValueC: [],  // 3模块的内容值集合
            contentColor: [],    //中间批注的 3个固定模块的 内容值
            contentColorA: [],   // 1模块的批注颜色集合
            contentColorB: [],   // 2模块的批注颜色集合
            contentColorC: [],   // 3模块的批注颜色集合
            otherResponsiblePersons: [''],
            responsiblePersonId:[],
            contentCss: '',
            titleCol: ''
        }
    },
    methods: {
        //
        add1: function () {
            if (this.bookContent2.length < 3){
                this.inputValue.push('')
                this.bookContent2.push({
                    bookContents: [],
                    contentDesc : '',
                    contentCss : '',
                    contentNo: this.bookContent2.length + 1,
                    parentNo: 0
                })
                for (let i = 0; i < this.bookContent2.length; i++){
                    if (i === 0 ){
                        this.bookContent2a = this.bookContent2[0]
                    } else if (i === 1){
                        this.bookContent2b = this.bookContent2[1]

                    } else  if(i === 2){
                        this.bookContent2c = this.bookContent2[2]
                    }
                }
                // this.$set(this.bookContent2,this.bookContent2.length,{
                //     bookContents: [],
                //     contentDesc : '',
                //     contentCss : '',
                //     contentNo: this.bookContent2.length,
                //     parentNo: 0
                // })

            } else {
                this.$message.error('最多只能添加三条');
            }
        },
        add2: function (index) {
           if (index === 0){
                this.inputValueA.push('')
                this.$set(this.bookContent2a.bookContents,this.bookContent2a.bookContents.length,{
                    contentDesc : '',
                    contentCss : '',
                    contentNo: '1.'+  (this.bookContent2a.bookContents.length + 1),
                    parentNo: 1
                })

            }else  if (index === 1){
               this.inputValueB.push('')
               let num2b = this.bookContent2b.bookContents.length
               this.$set(this.bookContent2b.bookContents,num2b,{
                   contentDesc : '',
                   contentCss : '',
                   contentNo: '2.'+  (this.bookContent2b.bookContents.length + 1),
                   parentNo: 2
               })
           } else if (index === 2) {
               this.inputValueC.push('')
               this.$set(this.bookContent2c.bookContents,this.bookContent2c.bookContents.length,{
                   contentDesc : '',
                   contentCss : '',
                   contentNo: '3.'+  (this.bookContent2c.bookContents.length + 1),
                   parentNo: 3
               })
           }
        },
        deleteList: function(index) {
            this.bookContent2.splice(index,1)
            for (let i = 0; i < this.bookContent2.length; i++){
                this.bookContent2[i].contentNo = i + 1
                for (let j = 0; j < this.bookContent2[i].bookContents.length; j++){
                    this.bookContent2[i].bookContents[j].contentNo = (i + 1) + '.' + (j + 1)
                    console.log('j ' + j);
                    this.bookContent2[i].bookContents[j].parentNo = i
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
            this.bookContent2[index].bookContents.splice(indexS,1)
            for (let i = 0; i<  this.bookContent2[index].bookContents.length; i++){
                this.bookContent2[index].bookContents[i].contentNo = (index + 1)  + '.' + ( i + 1)
            }
        },
        getCurrentColor: function(index) {
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
            console.log(1);
            if (status === 'add'){
                 this.otherResponsiblePersons.push('')
                console.log(this.otherResponsiblePersons);
            }else if (status === 'delete'){
                if (this.otherResponsiblePersons.length > 1){
                    this.otherResponsiblePersons.pop()
                }else {
                    this.$message.error('不能再删除了');
                }
            }
        },
        //改变批注颜色
        changeColor: function (v,index,indexS) {
            if (v === 1){
                this.bookContent2[index].contentCss = this.currentLabelColor
            } else if (v === 2){
                this.bookContent2[index].bookContents[indexS].contentCss = this.currentLabelColor
            } else if( v === 3) {
                this.contentCss = this.currentLabelColor
            }

        },
        changeTitleCol:function () {
            if (this.titleCol){
                this.titleCol = ''
            } else {
                this.titleCol = 'red'
            }
        },
        getWorkBook: function() {
            // this.axios.post('/ld/workBook/getWorkBook',{
            //     workBookId: this.$route.params.data.id,
            //     userId: 1
            // }).then(res => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })
            this.axios({
                method: 'post',
                url: '/ld/workBook/getWorkBook',
                data: {
                    workBookId:JSON.parse(sessionStorage.getItem('workLogId')).id,
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id
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
            }).then(res =>{

                if (res.data.status === 200 || res.data.status === '200') {
                    this.dataList = res.data.data
                    console.log(this.dataList);
                }
                console.log(res);
            }).then(() =>{
                console.log(this.dataList);
                for (let i = 0; i < this.dataList.responsiblePersons.length; i++) {
                    // this.checkedCities[i] = this.dataList.responsiblePersons[i].name; //给s
                    this.$set(this.checkedCities,i, this.dataList.responsiblePersons[i].name)
                }
                if (this.dataList.otherResponsiblePersons.length === 0) {
                    this.otherResponsiblePersons = ['']
                }else {
                    for (let i = 0; i < this.dataList.otherResponsiblePersons.length; i++) {
                        this.$set(this.otherResponsiblePersons,i, this.dataList.otherResponsiblePersons[i].responsiblePersonName)
                    }
                }

                this.time = this.dataList.recordTime
                this.title = this.dataList.title
                this.value = this.dataList.workState
                this.titleCol = this.dataList.titleCss
                this.contentCss = this.dataList.bookContent.contentCss
                this.bookContent = this.dataList.bookContent.contentDesc
                this.bookContent2 = this.dataList.bookContent.bookContents || ''
                console.log(this.dataList.bookContent.bookContents);
                if (this.bookContent2){
                    for (let i = 0; i < this.bookContent2.length; i++){
                        if (i === 0 ){
                            this.bookContent2a = this.bookContent2[0]
                        } else if (i === 1){
                            this.bookContent2b = this.bookContent2[1]

                        } else  if(i === 2){
                            this.bookContent2c = this.bookContent2[2]
                        }
                    }
                    for (let i = 0; i < this.bookContent2.length; i++){
                        this.$set(this.inputValue,i, this.bookContent2[i].contentDesc)
                        this.$set(this.contentColor,i, this.bookContent2[i].contentCss)
                    }
                    if (this.bookContent2a.bookContents.length > 0){
                        for (let i = 0; i < this.bookContent2a.bookContents.length; i++) {
                            this.$set(this.inputValueA,i, this.bookContent2a.bookContents[i].contentDesc)
                            this.$set(this.contentColorA,i, this.bookContent2a.bookContents[i].contentCss)
                        }
                    }
                    if (this.bookContent2b.bookContents.length > 0) {
                        for (let i = 0; i < this.bookContent2a.bookContents.length; i++) {
                            this.$set(this.inputValueB,i, this.bookContent2b.bookContents[i].contentDesc)
                            this.$set(this.contentColorB,i, this.bookContent2b.bookContents[i].contentCss)
                        }
                    }
                    if (this.bookContent2c.bookContents.length > 0) {
                        for (let i = 0; i < this.bookContent2a.bookContents.length; i++) {
                            this.$set(this.inputValueC,i, this.bookContent2c.bookContents[i].contentDesc)
                            this.$set(this.contentColorC,i, this.bookContent2c.bookContents[i].contentCss)
                        }
                    }



                }
                console.log(this.bookContent2a);
                console.log(this.bookContent2b);
                console.log(this.bookContent2c);


                this.$forceUpdate()
            })

        },
        updateWorkBook: function () {


            this.dialogVisible = false
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
                titleCss: this.titleCol,
                responsiblePersonId: this.responsiblePersonId,
                otherResponsiblePerson: this.otherResponsiblePersons,
                userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                bookContent: {
                    contentDesc: this.bookContent,
                    contentNo: '0',
                    contentCss: this.contentCss,
                    parentNo: null,
                    bookContents: this.bookContent2,
                },
                id: this.$route.params.data.id,
            }
            console.log(this.dataList);

            // this.axios({
            //     method: 'post',
            //     url: '/ld/workBook/updateWorkBook',
            //     data: this.dataList
            // }).then( res => {
            //     console.log(res);
            // })
            this.axios.post('/ld/workBook/updateWorkBook',this.dataList).then( res => {
                console.log(res);
                if (res.data.status === '200'){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.$router.push({
                        path: 'index',
                        name: 'workLog',
                        params: {
                            isShow: 1
                        }
                    })
                }
            })


            console.log(1);
        },
        goBack: function () {
            this.$router.push({
                path: 'index',
                name: 'workLog',
                params: {
                    isShow: 1
                }
            })
        }

    },
    computed:{

    },
    created(){
        this.getResponsiblePerson()
        this.getWorkBook()
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
                line-height: 20px;
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
                padding: 10px 20px ;
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
                    width:200px;
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
    #otherZ{
        position: absolute;
        left: -60px;
        top: 5px;
        width: 50px;
        height: 10px;
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
    .add-de {
        position: relative;
        width: 65px;
        height: 4px;
        display: inline-block;
        margin: -18px;
    }
    #checkList{
        width: 66px;
    }
    .textarea >>> .el-textarea__inner{
        font-size:18px !important;
    }
</style>
<style lang="scss">
    .el-checkbox{
        width: 66px;
    }
    .titleCol > .el-input__inner{
        background-color: red;
        color: #fff;
    }
</style>
