import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Startseite',
    component: () => import('../views/Startseite.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/intern',
    name: 'Intern',
    component: () => import('../views/Intern.vue'),
    children: [
      {
        path: '',
        name: 'Übersicht',
        component: () => import('../views/intern/Daten.vue')
      },
      {
        path: 'schueler',
        name: 'Übersicht',
        component: () => import('../views/intern/Schueler.vue')
      },
      {
        path: 'testergebnisse',
        name: 'Testergebnisse',
        component: () => import('../views/intern/Testergebnisse.vue')
      },
      {
        path: 'tests',
        name: 'Ausgestellte Tests',
        component: () => import('../views/intern/Tests.vue')
      }
    ]
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: () => import('../views/Datenschutz.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import('../views/Impressum.vue')
  },
  {
    path: '/bestaetigen/:id?',
    name: 'Bestätigen',
    component: () => import('../views/Bestaetigen.vue'),
    props: true
  },
  {
    path: '/registrierung',
    name: 'Registrierung',
    component: () => import('../views/Registrierung.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
