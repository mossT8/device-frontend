import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import SensorsView from "../views/SensorsView.vue";
import DevicesView from "../views/DevicesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: "/devices",
    name: "devices",
    component: DevicesView,
    meta: { requiresAuth: true }
  },
  {
    path: "/sensors",
    name: "sensors",
    component: SensorsView,
    meta: { requiresAuth: true }
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    name: "about",
    meta: { requiresAuth: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1]
    console.log('running');
    
    if (!token) {
      console.log('ran');

      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
