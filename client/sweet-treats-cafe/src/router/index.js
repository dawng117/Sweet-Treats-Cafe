import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import { useAuthStore } from '../stores/auth'
import Orders from '../views/Orders.vue'
import OrderSuccess from '../views/OrderSuccess.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList
    },
    // Đảm bảo có route cho trang chi tiết sản phẩm
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue') // Đảm bảo đúng tên file
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    // Add these routes to your router configuration
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: { requiresAuth: true } // This ensures only authenticated users can access
    },
    {
      path: '/order-success',
      name: 'orderSuccess',
      component: OrderSuccess
    },
    {
      path: '/order-success/:id',
      name: 'OrderSuccessWithId',
      component: OrderSuccess,
    },
    {
      path: '/access-denied',
      name: 'AccessDenied',
      component: () => import('../views/AccessDenied.vue')
    },
    
    // Thêm route này vào cuối cùng của mảng routes
    {
      path: '/:pathMatch(.*)*',
      redirect: '/access-denied'
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If not authenticated, redirect to login
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } 
    // Check if route requires admin role
    else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (authStore.user && authStore.user.role === 'admin') {
        next() // Allow access for admin
      } else {
        next('/access-denied') // Redirect to access denied page
      }
    } else {
      next() // Allow access for authenticated users
    }
  } else {
    next() // Allow access to non-protected routes
  }
})

export default router