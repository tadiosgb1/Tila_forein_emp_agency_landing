import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/opened/landing/Home.vue'

import About from  '../views/opened/landing/about.vue'
// import Products from  '../views/opened/landing/products.vue'
import NewsEvents from '../views/opened/landing/NewsEvents.vue'
import ContactPage from '../views/opened/landing/ContactPage.vue'

import AccessDenied from "../views/opened/auth/accessDenied.vue";
import first_dash from '../views/closed/first_dash.vue'
import dashboard from '../views/closed/dashboard.vue'





const routes = [
  {
    path: "/", name: "/",
    component: Home,
    meta:
      { requiresGuest: true }
  },


    


  {
    path: "/about", name: "/about",
    component: About,
    meta: { requiresGuest: true }
  },


  //   {
  //   path: "/products", name: "/products",
  //   component: Products,
  //   meta:
  //     { requiresGuest: true }
  // },
  {
    path: "/news-events", name: "/news-events",
    component: NewsEvents,
    meta: { requiresGuest: true }
  },

  {
    path: "/contact", name: "/contact",
    component: ContactPage,
    meta: { requiresGuest: true }
  },

  {
    path: "/dashboard", name: "dashboard",
    component: dashboard,
    meta:
      { requiresGuest: true },
      children: [
     

      

      


      {
        path: "first-dash", name: "first-dash",
        component: first_dash,
      },

    

         
    ]
  },
  { path: "/test-login/:token", name: "test-login", component: () => import('../views/opened/auth/TestLogin.vue'), meta: { requiresGuest: true } },
  { path: "/:pathMatch(.*)*", name: "accessDenied", component: AccessDenied, meta: { requiresGuest: true } },
];

const router = createRouter({
  // mode: 'hash',
  history: createWebHistory(),
  routes, // ✅ no spread needed
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiredRole = to.meta.role;

  if (requiresAuth) {
    if (!isAuthenticated) {
      next("/login");
    } else if (requiredRole && userRole !== requiredRole) {
      localStorage.clear();
      next("/login");
    } else {
      next();
    }
  } else if (requiresGuest) {
    next();
  } else {
    next();
  }
});

export default router;
