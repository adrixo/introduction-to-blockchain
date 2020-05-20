import Vue from 'vue'
import Router from 'vue-router'
import Dash from './views/Dash.vue'
import Transaction from './views/Transaction.vue'
import Wallets from './views/Wallets.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'dash',
        redirect: {name: 'transaction'},
        component: Dash,
        children: [
        {
            path: '/transaction',
            name: 'transaction',
            component: Transaction
        },
        {
          path: '/wallets',
          name: 'wallets',
          component: Wallets
        }
      ]
    }
  ]
})
