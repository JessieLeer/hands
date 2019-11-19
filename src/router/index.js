import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/views/login/index.vue'
import Index from '@/views/index/index.vue'
// 采购收货模块
import Type from '@/views/type/index.vue'
import Purchase from '@/views/purchase/index/index.vue'
import PurchaseEdit from '@/views/purchase/edit/index.vue'
import PurchaseGood from '@/views/purchase/good/index/index.vue'
import PurchaseGoodShow from '@/views/purchase/good/show/index.vue'
import PurchaseGoodLotCreate from '@/views/purchase/good/lot/create/index.vue'
import PurchaseGoodLotCreate1 from '@/views/purchase/good/lot/create1/index.vue'
import PurchaseGoodLotEdit from '@/views/purchase/good/lot/edit/index.vue'
import PurchaseGoodLotEdit1 from '@/views/purchase/good/lot/edit1/index.vue'
// 销售订单拣货
import Picking from '@/views/picking/index/index.vue'
import PickingGood from '@/views/picking/good/index/index.vue'
import PickingGood1 from '@/views/picking/good/index1/index.vue'
import PickingGoodShow from '@/views/picking/good/show/index.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
		{
			path: '/',
			name: 'index',
			component: Index,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/type/:type',
			name: 'type',
			component: Type,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase',
			name: 'purchase',
			component: Purchase,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase/edit/:id',
			name: 'purchaseEdit',
			component: PurchaseEdit,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase/good/index/:id',
			name: 'purchaseGood',
			component: PurchaseGood,
			meta: {
        needLogin: true
      },
			beforeEnter: (to, from, next) => {
				if(from.name == 'purchase'){
					store.dispatch('goodIndex', {url: '/cgsh/gys/info', order: to.params.id, is_gk: store.state.config.type == 'bone'})
				}
				next()
      }
		},
		{
			path: '/purchase/good/show/:id',
			name: 'purchaseGoodShow',
			component: PurchaseGoodShow,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase/good/lot/create/:goodId',
			name: 'purchaseGoodLotCreate',
			component: PurchaseGoodLotCreate,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase/good/lot/create1/:goodId',
			name: 'purchaseGoodLotCreate1',
			component: PurchaseGoodLotCreate1,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase/good/lot/edit/:goodId/:lotId',
			name: 'purchaseGoodLotEdit',
			component: PurchaseGoodLotEdit,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/purchase/good/lot/edit1/:goodId/:lotId',
			name: 'purchaseGoodLotEdit1',
			component: PurchaseGoodLotEdit1,
			meta: {
        needLogin: true
      }
		},
		{
			path: '/picking',
			name: 'picking',
			component: Picking,
			meta: {
				needLogin: true
			}
		},
		{
			path: '/picking/good/index/:id',
			name: 'pickingGood',
			component: PickingGood,
			meta: {
				needLogin: true
			},
			beforeEnter: (to, from, next) => {
				if(from.name == 'picking'){
					store.dispatch('goodIndex', {url: '/cgsh/gys/info', order: to.params.id})
				}
				next()
      }
		},
		{
			path: '/picking/good/index1/:id',
			name: 'pickingGood1',
			component: PickingGood1,
			meta: {
				needLogin: true
			},
			beforeEnter: (to, from, next) => {
				if(from.name == 'picking'){
					store.dispatch('goodIndex', {url: '/cgsh/gys/info', order: to.params.id})
				}
				next()
      }
		},
		{
			path: '/picking/good/show/:id',
			name: 'pickingGoodShow',
			component: PickingGoodShow,
			meta: {
        needLogin: true
      }
		}
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(res => res.meta.needLogin)){
    if (store.state.user.userId) {
      next()
    }else{
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      })
    }
  }else{
    next()
  }
})

export default router
