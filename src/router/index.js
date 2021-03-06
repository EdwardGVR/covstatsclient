import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import CreatePost from '../views/CreatePost.vue'
import RegisterUser from '../views/RegisterUser.vue'
import Login from '../views/Login.vue'
import Pruebas from '../views/Pruebas.vue'
import RegisterTest from '../views/RegisterTest.vue'
import EditTest from '../views/EditTest.vue'
import Autoevaluaciones from '../views/Autoevaluaciones.vue'
import NewAutoEval from '../views/NewAutoEval.vue'
import DetallesAutoEval from '../views/DetallesAutoEval.vue'
import Datos from '../views/Datos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editar/:idPost',
    name: 'Edit',
    component: Edit,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/pruebas',
    name: 'Pruebas',
    component: Pruebas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/registerTest',
    name: 'RegisterTest',
    component: RegisterTest,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editTest/:testId',
    name: 'EditTest',
    component: EditTest,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/datos',
    name: 'Datos',
    component: Datos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/autoEvaluaciones',
    name: 'Autoevaluaciones',
    component: Autoevaluaciones,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/detalleAutoEval/:id',
    name: 'DetalleAutoEval',
    component: DetallesAutoEval,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newAutoEval',
    name: 'NewAutoEval',
    component: NewAutoEval,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/registerUser',
    name: 'RegisterUser',
    component: RegisterUser,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (localStorage.getItem('token') !== null) {
    Vue.prototype.$tokenExists = true
  } else {
    Vue.prototype.$tokenExists = false
  }

  if (localStorage.getItem('rolUser') !== null && localStorage.getItem('rolUser') == 2) {
    Vue.prototype.$isAdmin = true
  } else {
    Vue.prototype.$isAdmin = false
  }

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!Vue.prototype.$tokenExists) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(route => route.meta.requiresGuest)) {
    if (Vue.prototype.$tokenExists) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }

  if (to.matched.some(route => route.meta.requiresAdmin)) {
    if (!Vue.prototype.$isAdmin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
