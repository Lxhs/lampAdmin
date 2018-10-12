import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Layout from  "./views/Layout/Layout"
import axios from "axios"

Vue.use(Router);

const router =  new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', component: () => import('./views/login/login'), hidden: true },
    {
      path: "/",
      component: Layout,
      redirect: '/home',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      children:[{
        path: 'home',
          meta:{requireAuth:true,isShow: 3,keepAlive: false},
          component: () => import('./views/home/index'),
      }]
    },
    {
        path: "/home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Layout,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        children:[{
            path: 'index',
            name: 'home',
            meta:{
                requireAuth:true,
                isShow: 3,
                keepAlive: false
            },
            component: () => import('./views/home/index')
        }]
    },
    {
        path:'/yearly',
        component: Layout,
        meta:{requireAuth:true},
        children: [{
              path: 'index',
              name: 'yearly',
             meta:{
                  requireAuth:true,
                 title: '年度计划工作',
                 isShow: 2,
                 keepAlive: false
             },
                component: () => import('./views/yearly/index'),
            },
            {
            path: 'undone',
            name: 'undone',
            meta:{
                requireAuth:true,
                title: '',
                isShow: 1,
                keepAlive: false
            },
            component: () => import('./views/yearly/components/undone')
        },{
                path: 'detailY',
                name: 'detailY',
                meta:{
                    requireAuth:true,
                    title: '',
                    isShow: 3,
                    keepAlive: false
                },
                component: () => import('./views/yearly/components/detailY')
            }
        ]
    },
    {
      path: "/weekly",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Layout,
        meta:{
            requireAuth:true,

        },
      children:[{
          path: 'index',
          name: 'weekly',
          meta:{requireAuth:true, isShow: 2, title: '每周完成工作情况',keepAlive: false},
          component: () => import('./views/weekly/index')
      },{
          path: 'undone',
          name: 'undoneW',
          meta:{requireAuth:true,isShow: 2, title: '累计未完成工作情况',keepAlive: false},
          component: () => import('./views/weekly/components/undoneW')
      },{
          path: 'detail',
          name: 'detailW',
          meta:{requireAuth:true,isShow: 3,keepAlive: false},
          component: () => import('./views/weekly/components/detail')
      }
      ]
    },
    {
        path: "/progress",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Layout,
        meta:{requireAuth:true},
        children:[{
            path: 'index',
            name: 'progress',
            meta:{requireAuth:true,isShow: 2,title: '工程进度',keepAlive: false},
            component: () => import('./views/progress/index')
        },
            {
                path: 'detail',
                name: 'detailP',
                meta:{requireAuth:true,isShow: 1,keepAlive: false},
                component: () => import('./views/progress/components/detail')
            },
        ]
    },
    {
          path: "/waterLog",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Layout,
        meta:{requireAuth:true},
          children:[{
              path: 'index',
              name: 'waterLog',
              meta:{requireAuth:true,isShow: 2, title: '渍水情况',keepAlive: false},
              component: () => import('./views/waterlog/index')
          }]
      },
    {
          path: "/workLog",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Layout,
          meta:{requireAuth:true},
          children:[{
              path: 'index',
              name: 'workLog',
              meta:{requireAuth:true,isShow: 1,keepAlive: true},
              component: () => import('./views/worklog/index')
          },{
              path: 'workEdit',
              name: 'workEdit',
              meta:{requireAuth:true,isShow: 3,keepAlive: false},
              component: () => import('./views/worklog/components/workEdit')
          },{
              path: 'workAdd',
              name: 'workAdd',
              meta:{requireAuth:true,isShow: 3,keepAlive: false},
              component: () => import('./views/worklog/components/workAdd')
          }
          ]
      }
  ]
});

// if (window.localStorage.getItem('token')) {
//     store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }
router.beforeEach((to, from, next) => {

    //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子

    if(to.path === '/login')  {  next()  }  // 如果即将进入登录路由，则直接放行

    else {     //进入的不是登录路由

        if(to.meta.requireAuth && ! JSON.parse(localStorage.getItem('accessToken'))) {next({ path: '/login' })}

        //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由

        else {
            axios.defaults.headers.session_id = JSON.parse(localStorage.getItem('accessToken')).session_id
            axios.defaults.headers.user_id = JSON.parse(localStorage.getItem('accessToken')).user_id
            next()
        }}  //如果不需要登录验证，或者已经登录成功，则直接放行

})




export default router;

