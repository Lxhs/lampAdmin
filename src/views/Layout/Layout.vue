<template>
  <div class="main">
      <div class="navTop">
          <div class="logo">
              <img src="../../assets/images/供电logo..png" alt="" width="40" height="40">
              <span>武汉路灯服务中心</span>
          </div>
          <div class="tel" @click="loginOut" style="cursor: pointer">
              <!--刘国立-->
              <icon name="personal" :w="18" :h="18" ></icon>
              登出

              <!--热线电话：-->
              <!--0278888888-->
          </div>
      </div>
      <div class="navBar">
          <ul>
              <li >
                  <router-link :to="{ name: 'yearly', params: { isShow: 2, title: '年度计划工作' }}"  :class="path === 'yearly' ? 'is-active' : ''">年度计划</router-link>
              </li>
              <li>
                  <router-link :to="{ name: 'weekly', params: { isShow: 2, title: '每周完成工作情况'}}" :class="path === 'weekly' ? 'is-active' : ''">每周计划</router-link>
              </li>
              <li>
                  <router-link :to="{ name: 'progress', params: { isShow: 2,title: '工程进度' }}" :class="path === 'progress' ? 'is-active' : ''">工程进度</router-link>
              </li>
              <li>
                  <router-link :to="{ name: 'waterLog', params: { isShow: 2, title: '渍水情况'}}" :class="path === 'waterLog' ? 'is-active' : ''">渍水情况</router-link>
              </li>
              <li>
                  <router-link :to="{ name: 'workLog', params: { isShow: 1 }}" :class="path === 'workLog' ? 'is-active' : ''">工作日志</router-link>
              </li>
          </ul>
      </div>
      <app-main></app-main>
  </div>
</template>

<script>
import  appMain  from "./components/appMain"
export default {
    name: "Layout",
    data() {
        return {
            path: ''
        }
    },
    methods: {
        changeClass() {
            let str = this.$route.path
            let strs = []
            strs = str.split("/")
            this.path = strs[1]
        },
        loginOut: function () {
            console.log(1);
            this.axios({
                method: 'post',
                url: '/user/login/loginOut',
                data: {
                    userId: this.$store.state.user.userId
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                console.log(res);
                if (res.data.status === '200') {
                    localStorage.removeItem('accessToken')

                    this.$store.state.user = {}
                    this.$message({
                        message: '退出登录',
                        type: 'success'
                    });
                    this.$router.push({
                        path: '/login',
                        // name: 'login',
                        params: {
                            isShow: 3
                        }
                    })
                }
            })
        }
    },
    components: {
        appMain
    },
    watch:{
        '$route':'changeClass'
    },
}
</script>

<style scoped lang="scss">
    .main{
        width: 1000px;
        margin: 0 auto;
        .navTop{
            width: 1000px;
            line-height: 40px;
            overflow: hidden;
            .logo{
                float: left;
                margin-left: 90px;
                img{
                    vertical-align: middle;
                    margin-right: 10px;
                }
                span{
                    vertical-align: middle;
                    font-size: 22px;
                    font-weight: 700;
                }
            }
            .tel{
                height: 46px;
                line-height: 46px;
                float: right;
                color: #585858;
                font-size: 12px;
            }
        }
        .navBar{
            width: 1000px;
            background: url("../../assets/images/导航栏.png");
            margin-top: 10px;
            ul{
                margin-left: 33px;
                li{
                    display: inline-block;
                    height: 46px;
                    line-height: 46px;
                    a{
                        &:hover{
                            text-decoration: none;
                        }
                        &:visited{
                            color: #000;
                        }
                        &:link{
                            color: #000;
                        }
                    }
                }
                li:nth-child(1){
                    margin-left: 44px;
                }
                li:nth-child(2){
                    margin-left: 81px;
                }
                li:nth-child(3){
                     margin-left: 69px;
                }
                li:nth-child(4){
                      margin-left: 70px;
                }
                li:nth-child(5){
                    margin-left: 91px;
                }
            }
        }
    }
</style>
