import { Row, Col, Cell, CellGroup, IndexBar, IndexAnchor, Tag, Button, Dialog, Popup, Panel, Toast, Icon } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'pickingGood',
	data() {
		return {
			keyword: '',
			popup: {
				show: false,
				data: []
			},
			confirmShow: false,
			editing: {}
		}
	},
	computed: {
		orderId() {
			return this.$route.params.id
		},
		goods() {
			return this.$store.state.order.goods
		},
		showingGoods() {
			return this.goods.filter((item) => {
				return item.name.indexOf(this.keyword) != -1 || item.code.toUpperCase().indexOf(this.keyword.toUpperCase()) != -1
			})
		},
		dealed() {
			return this.showingGoods.filter((item) => {
				return item.dealed == true
			})
		},
		undealed() {
			return this.showingGoods.filter((item) => {
				return item.dealed == false
			})
		},
		submitables() {
			return this.dealed.filter((item) => {
				return item.changed == true
			})
		},
		indexList() {
			return [
				`未处理（${this.undealed.length}）`,
				`已处理（${this.dealed.length}）`
			]
		} 
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanCell: Cell,
		vanCellGroup: CellGroup,
		vanIndexBar: IndexBar,
		vanIndexAnchor: IndexAnchor,
		vanTag: Tag,
		vanButton: Button,
		vanDialog: Dialog,
		vanPopup: Popup,
		vanPanel: Panel,
		vanIcon: Icon,
		cheader
	},
	beforeRouteLeave (to, from, next) {
		if(to.name == 'picking') {
			if(this.submitables.length > 0){
				Dialog.confirm({
					message: '您还有未提交的商品,离开后为保存的商品信息将被清空，确认离开？',
					confirmButtonText: '离开'
				}).then(() => {
					next()
				}).catch(() => {
					next(false)
				})
			}else{
				next()
			}
		}else{
			next()
		}
  },
	watch: {},
	created() {},
	mounted() {
		let h = window.innerHeight
		this.$refs.goods.style.minHeight = h + 'px'
	},
	beforeRouteLeave (to, from, next) {
		if(to.name == 'picking') {
			if(this.submitables.length > 0){
				Dialog.confirm({
					message: '您还有未提交的商品,离开后为保存的商品信息将被清空，确认离开？',
					confirmButtonText: '离开'
				}).then(() => {
					next()
				}).catch(() => {
					next(false)
				})
			}else{
				next()
			}
		}else{
			next()
		}
  },
	methods: {
		go(url) {
			this.$router.push(url)
		},
		search(keyword) {
			this.keyword = keyword
			this.popup.show = false
		},
		onInput(keyword) {
			this.popup.data = this.goods.filter((item) => {
				return item.name.indexOf(keyword) != -1 || item.code.toUpperCase().indexOf(keyword.toUpperCase()) != -1
			}).map((item) => {
				return item.name
			})
			this.popup.show = (this.popup.data.length > 0)
		},
		handleConfirm(good) {
			if(good.dealed == true) {
				Toast('该商品已确认拣货完成')
			}else{
				this.confirmShow = true
				this.editing = good
			}
		},
		update(good) {
			good.dealed = true
			good.changed = true
			this.$store.commit('handleGoods', this.goods)
			this.confirmShow = false
		},
		submit() {
			Dialog.confirm({
				message: `订单${this.orderId}的商品已拣货成功，是否确定提交该订单？`
			}).then(() => {
				// on confirm
				for(let item of this.dealed) {
					item.chenged = false
				}
				this.$router.push('/picking')
			}).catch(() => {
				// on cancel
			});
		}
	}
}