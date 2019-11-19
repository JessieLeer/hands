import { Row, Col, Cell, CellGroup, IndexBar, IndexAnchor, Tag, Button, Dialog, Popup, Panel, Toast, Icon, Search, NoticeBar } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'pickingGood1',
	data() {
		return {
			keyword: '',
			popup: {
				show: false,
				keyword: '',
				data: []
			},
			confirmShow: false,
			editing: {
				registrations: [],
				serials: []
			}
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
				return item.need == item.serials.length
			})
		},
		undealed() {
			return this.showingGoods.filter((item) => {
				return item.need != item.serials.length
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
		vanSearch: Search,
		vanNoticeBar: NoticeBar,
		cheader
	},
	beforeRouteLeave (to, from, next) {
		if(to.name == 'purchase') {
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
	created() {
	},
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
			if(good.need == good.serials.length) {
				this.go(`/picking/good/show/${good.id}`)
			}else{
				this.confirmShow = true
				this.editing = good
			}
		},
		closeConfirm(good) {
			Dialog.confirm({
				message: '为保存的序列号信息将会被清空，是否退出？'
			}).then(() => {
				good.serials = []
				this.confirmShow = false
				this.popup.keyword = ''
			}).catch(() => {
				
			})
		},
		update(good) {
			if(good.serials.length == good.need) {
				good.dealed = true
				good.changed = true
				this.$store.commit('handleGoods', this.goods)
				this.confirmShow = false
			}else{
				Dialog.alert({
					message: `该商品销售计划为${good.need},实际拣货数量${good.serials.length},请继续拣货`,
					confirmButtonText: '继续拣货'
				})
			}
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
			})
		},
		handleSerial(value) {
			if(this.editing.serials.length == this.editing.need) {
				Toast('该商品收货已满，请删除序列号后再扫描')
			}else {
				if(this.editing.serials.indexOf(value) == -1) {
					this.editing.serials.push(value)
					this.popup.keyword = ''
				}else{
					Toast('序列号重复，请重新输入或扫描')
				}
			}
		},
		closeSerial(i) {
			this.editing.serials.splice(i,1)
		},
	}
}