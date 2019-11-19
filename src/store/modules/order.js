import Vue from 'vue'
import axios from '@/axios'

// initial state
const state = {
	goods: []
}

// getters
const getters = {
}

// actions
const actions = {
	goodIndex({ state, commit, rootState }, param) {
		axios.get(param.url, {params: {keyword: param.order, is_gk: param.is_gk}}).then((res) => {
			for(let item of res.data.data) {
				for(let lot of item.lots) {
					lot.serials == null ? lot.serials = '[]' : lot.serials = lot.serials
					lot.serials = JSON.parse(lot.serials)
				}
			}
			commit('handleGoods', res.data.data)
		})
	}
}

// mutations
const mutations = {
	handleGoods(state,value) {
		state.goods = value
	},
	lotCreate(state, param) {
		let good = state.goods.filter((item) => {
			return item.id == param.goodId
		})[0]
		let i = state.goods.indexOf(good)
		good.lots.push(param.lot)
		good.changed = true
		state.goods.splice(i, 1, good)
	},
	lotUpdate(state, param) {
		let good = state.goods.filter((item) => {
			return item.id == param.goodId
		})[0]
		let i = state.goods.indexOf(good)
		let lot = good.lots.filter((item) => {
			return item.id == param.lot.id
		})[0]
		let i0 = good.lots.indexOf(lot)
		good.lots.splice(i0, 1, param.lot)
		good.changed = true
		state.goods.splice(i, 1, good)
	},
	lotDelete(state, param) {
		let good = state.goods.filter((item) => {
			return item.id == param.goodId
		})[0]
		let i = state.goods.indexOf(good)
		good.lots = good.lots.filter((item) => {
			return param.lotIds.indexOf(item.id) == -1
		})
		good.changed = true
		state.goods.splice(i, 1, good)
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}