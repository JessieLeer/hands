import { Row, Col, Cell, Collapse, CollapseItem, Button, Panel, Icon, SubmitBar, Checkbox, Toast, Dialog } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'purchaseGoodShow',
	data() {
		return {
			actives: ['1'],
			add: require('../../../../assets/image/add.png'),
			status: 'normal',
			confirmShow: false
		}
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanCollapse: Collapse,
		vanCollapseItem: CollapseItem,
		vanCell: Cell,
		vanPanel: Panel,
		vanButton: Button,
		vanIcon: Icon,
		vanSubmitBar: SubmitBar,
		vanCheckbox: Checkbox,
		vanDialog: Dialog,
		cheader
	},
	created() {
	},
	computed: {
		type() {
			return this.$store.state.config.type
		},
		good() {
			return this.$store.state.order.goods.filter((item) => {
				return item.id == this.$route.params.id
			})[0]
		},
		bought() {
			return this.type == 'nobone' ? this.good.lots.length == 0 ? 0 : this.good.lots.map((item) => {return parseInt(item.count)}).reduce((prevalue, curvalue) => {
				return prevalue + curvalue
			}) : this.good.lots.map((item) => {
				return parseInt(item.serials.length)}).reduce((prevalue, curvalue) => {
				return prevalue + curvalue
			})
		},
		checkeds() {
			return this.good.lots.filter((item) => {
				return item.checked == true
			})
		}
	},
	methods: {
		back() {
			if(this.good.need == this.bought) {
				this.$router.back()
			}else{
				Dialog.confirm({
					message: `实际收货${this.bought},该商品应收货${this.good.need},确定离开吗？`,
					confirmButtonText: '保存并离开',
					cancelButtonText: '留下'
				}).then(() => {
					this.$router.back()
				}).catch(() => {
				})
			}
		},
		handleCreate(url) {
			if(this.good.need == this.bought) {
				Dialog.alert({
					message: `您已收货${this.bought}件，已达到采购数量，可删除批号信息再添加到货信息`,
				}).then(() => {
					// on close
				})
			}else{
				this.go(url)
			}
		},
		handleEdit(lot) {
			if(lot.submitted) {
				Toast('该批号已提交，不可重复更改')
			}else{
				this.go(this.type == 'nobone' ? `/purchase/good/lot/edit/${this.good.id}/${lot.id}` : `/purchase/good/lot/edit1/${this.good.id}/${lot.id}`)
			}
		},
		go(url) {
			this.$router.push(url)
		},
		handleStatus(value) {
			this.status = value
		},
		del() {
			Dialog.confirm({
				message: '确认删除所选到货信息？',
				confirmButtonText: '确定删除'
			}).then(() => {
				// on confirm
				let checkeds = this.checkeds.map((item) => {
					return item.id
				})
				this.$store.commit('lotDelete', {goodId: this.good.id, lotIds: checkeds})
			}).catch(() => {
				// on cancel
			})
		}
	}
}