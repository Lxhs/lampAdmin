<template>
    <div class="main">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
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
                        @keyup.enter.native="login" />
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
                username: 'thinkgem',
                password: 'admin'
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
        }
    },
    mounted(){
        this.$store.commit(types.TITLE, 'Login');
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
