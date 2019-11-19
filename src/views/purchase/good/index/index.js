import { Row, Col, Cell, CellGroup, IndexBar, IndexAnchor, Tag, Button, Dialog, Popup } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'purchaseGood',
	data() {
		return {
			keyword: '',
			popup: {
				show: false,
				data: []
			}
		}
	},
	computed: {
		type() {
			return this.$store.state.config.type
		},
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
				return item.lots.length > 0
			})
		},
		undealed() {
			return this.showingGoods.filter((item) => {
				return item.lots.length == 0
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
	created() {},
	mounted() {
		let h = window.innerHeight
		this.$refs.goods.style.minHeight = h + 'px'
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
		
		submit() {
			let form = new Object
			form.goods = this.dealed
			form.goods.forEach((item, index) => {
				item.lots = item.lots.filter((lot) => {
					return lot.submitted == false
				})
			})
			Dialog.confirm({
				message: `订单${this.$route.params.id}的商品确认完毕，确定提交吗`,
				confirmButtonText: '立即提交',
				cancelButtonText: '不，再次查看'
			}).then(()=> {
				let url = this.type == 'nobone' ? '/cgsh/drug/add' : '/cgsh/gkdrug/add'
				this.$http.post(url,form,{header: {'Content-Type': 'application/json'}}).then((res) => {
					if(res.data.success) {
						Toast(res.data.message)
						setTimeout(() => {
							this.$router.push('/purchase')
						}, 1000)
					}
				})
			}).catch(() => {
				
			})
		}
	}
}