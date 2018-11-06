<template>
    <div class="main">
        <el-form ref="loginForm" :model="loginForm"  :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <h3 class="title">账号</h3>
            <el-form-item prop="username">
                 <span class="svg-container svg-container_login">
                     <icon name="personal" :w="24" :h="24" />
                 </span>
                <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
            </el-form-item>
            <h3 class="title">密码</h3>
            <el-form-item prop="password" style="margin-bottom: 15px">
                <span class="svg-container">
                    <icon name="钥匙" :w="24" :h="24" />
                </span>
                <el-input
                        :type="pwdType"
                        v-model="loginForm.password"
                        name="password"
                        auto-complete="on"
                        placeholder="password"
                        @keyup.enter.native="login('loginForm')" />
                <span class="show-pwd" @click="showPwd">
                    <icon name="眼睛-闭" :w="24" :h="24" ></icon>
                </span>
            </el-form-item>
            <el-checkbox v-model="checked" style="margin-bottom: 20px">记住密码</el-checkbox>
            <el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="login">
                    登 录
                </el-button>
                </el-form-item>
                <div class="tips">
            </div>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from '../../utils/validate'
import * as types from '../../utils/type'
export default {
    name: "login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('密码不能小于5位'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },
            loading: false,
            pwdType: 'password',
            checked: true
        }
    },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        // handleLogin() {
        //     this.$refs.loginForm.validate(valid => {
        //         if (valid) {
        //             this.loading = true
        //             this.$store.dispatch('Login', this.loginForm).then(() => {
        //                 this.loading = false
        //                 this.$router.push({ path: '/' })
        //             }).catch(() => {
        //                 this.loading = false
        //             })
        //         } else {
        //             console.log('error submit!!')
        //             return false
        //         }
        //     })
        // },
        login(){
            // if (this.token) {
            //     this.$store.commit(types.LOGIN, this.token)
            //     let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            //     this.$router.push({
            //         path: redirect
            //     })
            // }
            const self = this;
            console.log(self.$refs['loginForm']);
            self.$refs['loginForm'].validate((valid) => {
                if (!valid) {
                    //判断复选框是否被勾选 勾选则调用配置cookie方法
                    if (self.checked === true) {
                        console.log("checked == true");
                        //传入账号名，密码，和保存天数3个参数
                        self.setCookie(self.loginForm.username, self.loginForm.password, 7);
                    }else {
                        console.log("清空Cookie");
                        //清空Cookie
                        self.clearCookie();
                    }
                    console.log("登陆成功");
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            this.axios({
                method: 'post',
                url: '/user/login/login',
                data: {
                    userName: this.loginForm.username,
                    password: this.loginForm.password
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
            }).then(res => {
                console.log(res);
                sessionStorage.setItem('userName',this.loginForm.username)
                this.$store.state.userName = this.loginForm.username
                if (res.data.status === '200') {
                    localStorage.setItem('accessToken',JSON.stringify({
                        session_id: res.data.data.sessionId,
                        user_id: res.data.data.id
                    }))
                    this.$store.state.user = {
                        session_id: res.data.data.sessionId,
                        user_id: res.data.data.id
                    }
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });

                    this.$router.push({
                        path: 'home',
                        name: 'home',
                        params: {
                            isShow: 3
                        }
                    })

                } else{
                    this.$message.error(res.data.message);
                }
            })
        },
        setCookie(c_name, c_pwd, exdays) {
            let exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] === 'userName') {
                        this.loginForm.username = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] === 'userPwd') {
                        this.loginForm.password = arr2[1];
                    }
                }
            }
        },
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        }
    },
    mounted(){
        this.getCookie();
        // this.$store.commit(types.TITLE, 'Login');
    },
}
</script>

<style scoped lang="scss">
    .main{
        width: 100%;
        height: 100%;
        background: url("../../assets/images/登录背景元素1.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        position: fixed;
        .login-form{
            width: 550px;
            height: 440px;
            position: absolute;
            top: 200px;
            left: 50%;
            transform: translateX(-50%);
            background-color:rgba(231,233,230,0.7);
            padding: 50px 0 0 180px;
            box-sizing: border-box;
            border-radius: 10px;
            .title{
                font-size: 14px;
                color: #3A3A3C;
                margin-bottom: 10px;
            }
            .svg-container {
                margin-left: 5px;
                color: #3A3A3C;
                vertical-align: middle;
                width: 30px;
                display: inline-block;

            }
        }
    }
</style>
<style scoped rel="stylesheet/scss" lang="scss">
    $bg:#2d3a4b;
    $light_gray:#eee;

    /* reset element-ui css */
    .main {
        .el-input {
            display: inline-block;
            height: 30px;
            width: 130px;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 5px;
                color: #3A3A3C;
                height: 30px;

            }

        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            color: #3A3A3C;
            background-color: #fff;
            width: 197px;
            .el-button--primary{
                background: url("../../assets/images/元素_30.png") no-repeat;
                border: 0;
            }
            .el-button{
                padding: 24px 20px;
                font-weight: 700;
            }
        }
    }

</style>
