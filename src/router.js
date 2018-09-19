import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Layout from  "./views/Layout/Layout"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Layout
      // children:[{
      //   path: 'yearly',
      //   name: 'yearly',
      //   component: () => import('./views/yearly/index'),
      //
      // }]
    },
    {
        path:'/yearly',
        name:'yearly',
        component: Layout,
        children: [{
              path: 'index',
              name: 'yearly',
              component: () => import('./views/yearly/index'),

            },
            {
            path: 'detail',
            name: 'detail',
            component: () => import('./views/yearly/components/detail')
        }]
    },
    {
      path: "/weekly",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Layout,
      children:[{
          path: 'index',
          name: 'weekly',
          component: () => import('./views/weekly/index')
      },{
          path: 'undone',
          name: 'undoneW',
          component: () => import('./views/weekly/components/undoneW')
      },{
          path: 'detail',
          name: 'detailW',
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
        children:[{
            path: 'index',
            name: 'progress',
            component: () => import('./views/progress/index')
        },
            {
                path: 'detail',
                name: 'detailP',
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
          children:[{
              path: 'index',
              name: 'waterLog',
              component: () => import('./views/waterlog/index')
          }]
      },
    {
          path: "/workLog",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Layout,
          children:[{
              path: 'index',
              name: 'workLog',
              component: () => import('./views/worklog/index')
          },{
              path: 'workEdit',
              name: 'workEdit',
              component: () => import('./views/worklog/components/workEdit')
          }
          ]
      }
  ]
});
