<template>
    <div class="main">
        <ul>
            <li v-for="(item,index) in progress" :key="index" @click="getPush({path:'detail',name:'detailP',params:{isShow: 1,projectProgress: item.id}},item.count)">
                <h4>{{item.progressName}}</h4>
                <span>{{item.count}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "index",
        data() {
            return {
                progress: [{name:'立项',num: 2012},
                    {name:'设计行审',num: 0},
                    {name:'预案',num: 278},
                    {name:'招标',num: 0},
                    {name:'合同签订',num: 1426},
                    {name:'资金办理',num: 2213},
                    {name:'开工',num: 2019},
                    {name:'材料招标及配送',num: 2019},
                    {name:'中期验收',num: 0},
                    {name:'竣工验收',num: 0},
                    {name:'结算资料编制',num: 114},
                    {name:'工程审计',num: 415},
                    {name:'财务决算',num: 0},
                    {name:'尾款清收',num: 0},
                    {name:'销项归档',num: 0},
                ]
            }
        },
        methods: {
            getPush: function (val,num) {
                if (num === 0){
                    this.$message({
                        message: '暂无数据',
                        type: 'warning'
                    });
                } else {
                    sessionStorage.setItem('projectProgress',JSON.stringify(val.params.projectProgress))
                    this.$router.push({
                        path: val.path,
                        name: val.name,
                        params: val.params
                        /*query: {
                            name: 'name',
                            dataObj: this.msg
                        }*/
                    })
                }

            },
            searchKeys: function () {
                this.getPush({path:'detail',name:'detailP',params:{isShow: 1,projectProgress: 0}})
            }
        },
        mounted() {
            this.$store.state.selectList = ''
            this.axios({
                url: '/ld/project/statistical',
                method: 'post',
                params: {
                    userId: JSON.parse(localStorage.getItem('accessToken')).user_id,
                }
            }).then( res => {
                this.progress = res.data.data
            })
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
        margin: 0 auto;
        overflow: hidden;
        ul {
            width: 850px;
            margin: 100px auto;
            overflow: hidden;
            li{
                width: 146px;
                height: 70px;
                text-align: center;
                float: left;
                margin: 0 20px 50px 0;
                cursor: pointer;
                h4{
                    margin-top: 10px;
                }
                span{
                    font-size: 12px;
                }
                &:nth-child(5n+5){
                    margin-right: 0;
                }
                background: url("../../assets/images/圆角矩形元素背景_03.png");
            }
        }
    }
</style>
