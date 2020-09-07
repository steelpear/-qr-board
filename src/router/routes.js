
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/about',
        component: () => import('pages/About.vue')
      },
      {
        path: '/add',
        component: () => import('pages/Add.vue')
      },
      {
        path: '/policy',
        component: () => import('pages/Policy.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'Общие настройки',
        component: () => import('pages/GeneralSettings.vue')
      },
      {
        path: '/admin/ads',
        name: 'Объявления',
        component: () => import('pages/Ads.vue')
      },
      {
        path: '/admin/auth',
        name: 'Параметры авторизации',
        component: () => import('pages/Auth.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginForm.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
