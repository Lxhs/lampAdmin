<template>
    <div class="main">
        <div class="work-head">
            <span>工作日志</span>
        </div>
        <div class="work-colour">
           <div class="colour" >
               标记颜色
               <ul>
                   <li style="background-color: #8CC63F;"></li>
                   <li style="background-color: #00AEEF;"></li>
                   <li style="background-color: #F2ED84;" class="is-activeC"></li>
                   <li style="background-color: #ED1C24;"></li>
               </ul>
           </div>
        </div>
        <ul class="work-search">
            <li class="time">
                时间
                <el-date-picker
                        v-model="time"
                        type="date"
                        placeholder="选择日期"
                style="width: 150px">
                </el-date-picker>
            </li>
            <li>
                标题
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
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <div id="other">
                其他
                <el-input  v-for="item in inputList" placeholder="请输入姓名" style="width: 150px; height: 40px; margin: 10px" :key="item.id"></el-input>
                <i class="el-icon-plus ii" @click=" inputList += 1" ></i>
                <i class="el-icon-minus ii" @click=" inputList -= 1" style="right: 30px;"></i>
            </div>
        </div>
        <div class="work-main">
            <div class="main-left">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="textarea"
                        id="textM"
                        >
                </el-input>
                <i class="el-icon-plus ii" @click="add1"></i>
            </div>
            <div class="main-m">
                <ul>
                    <li v-show="showList >= index + 1" v-for="(item,index) in showList" :key="index">
                        <span class="serial" :style="{backgroundColor: colors[index]}">{{item}}</span>
                        <i class="el-icon-plus ii" @click="add2(index)"></i>
                        <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </li>

                </ul>
            </div>
            <div class="main-right">
                <ul>
                    <li v-show="showList2[0] >= index + 1"  v-for="(item,index) in showList2[0]" :key="item.id">
                        <span class="serial" :style="{backgroundColor: colors[0]}"  >1.{{item }}</span>
                        <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>

                    </li>
                    <li v-show="showList2[1] >= index + 1" v-for="(item,index) in showList2[1]" :key="item.id">
                        <span class="serial" :style="{backgroundColor: colors[1]}" >2.{{item}}</span>
                        <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </li>
                    <li  v-show="showList2[2] >= index + 1" v-for="(item,index) in showList2[2]" :key="item.id">
                        <span class="serial" :style="{backgroundColor: colors[2]}" >3.{{item}}</span>
                        <el-input
                                type="textarea"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
const cityOptions = ['冯鹏', '李佳', '黄小山', '余林禧','陈雪'];
export default {
    name: "workEdit",
    data() {
        return {
            options: [{
                value: '1',
                label: '完成'
            }, {
                value: '2',
                label: '未完成'
            }, {
                value: '3',
                label: '阶段性完成'
            }],
            value: '1',
            checkAll: false,
            checkedCities: ['冯鹏', '李佳', '黄小山'],
            cities: cityOptions,
            isIndeterminate: true,
            title:'组织职工申报职称技能等级评定',
            time: '',
            textarea: '',
            showList: 0,
            showList2: [0,0,0],
            colors: ['#81BE41','#58585A','#F7941E'],
            inputList: 1
        }
    },
    methods: {
        add1: function () {
            if (this.showList === 0){
                this.showList = 1
                console.log(111);
            } else if (this.showList === 1) {
                this.showList = 2
            }else {
                this.showList = 3
            }
        },
        add2: function (index) {
            let addNum = this.showList2[index] +1
            this.$set(this.showList2,index, addNum)
            // this.showList2[index] ++
            console.log(this.showList2);
        }
    }
}
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 30px auto;
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
                    border: 1px solid #C0BFBF;
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
            width: 840px;
            margin: 10px auto;
            color: #BDBEC0;
            li{
                overflow: hidden;
                line-height: 28px;
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
                overflow: hidden;
            }
        }
        .work-main{
            width: 840px;
            overflow: hidden;
            margin: 0 auto;
            .main-left{
                width: 200px;
                height: 245px;
                border: 1px solid #BDBEC0;
                border-radius: 3px;
                background-color: #F2ED84;
                padding: 20px;
                float: left;
                position: relative;
            }
            .main-m{
                float: left;
                margin-left: 60px;
                padding-left: 30px;
                overflow: hidden;
                ul{

                    li{
                        width: 250px;
                        height: 40px;
                        border: 1px solid #BDBEC0;
                        background-color: #F2ED84;
                        padding: 10px;
                        margin-bottom: 50px;
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
                            left: -26px;
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
                ul{
                    overflow-y: auto;
                    height: 286px;
                    li{
                        margin-left: 20px;
                        width: 145px;
                        height: 25px;
                        border: 1px solid #BDBEC0;
                        background-color: #F2ED84;
                        padding: 10px;
                        margin-bottom: 20px;
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
                            left: -21px;
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
</style>
