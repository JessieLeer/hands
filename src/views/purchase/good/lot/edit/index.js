import { Row, Col, Field, CellGroup, Toast } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'purchaseGoodLotEdit',
	data() {
		return {
			lot: {
				id: {
					value: '',
					needcheck: true,
					patten: /\S/,
					message: '请填写批号'
				},
				box: {
					value: '',
					needcheck: true,
					patten: /\S/,
					message: '请填写合箱号'
				},
				created_at: {
					value: '',
					needcheck: true,
					patten: /[0-9]{8}/,
					message: '请填写有效的生产日期（八位数字）'
				},
				until_at: {
					value: '',
					needcheck: true,
					patten: /[0-9]{8}/,
					message: '请填写有效期(八位数字)'
				},
				packages: {
					value: 0,
					needcheck: true,
					patten: /^[1-9]\d*$/,
					message: '件包装必须为大于等于1的整数'
				},
				count: {
					value: 1,
					needcheck: true,
					patten: /^[1-9]\d*$/,
					message: '收获数量必须为大于1且小于等于所剩最大购买量的整数'
				},
				address: {
					value: '',
					needcheck: true,
					patten: /\S/,
					message: '请输入产地'
				},
				refuse: {
					value: 0,
					needcheck: true,
					patten: /^[0-9]\d*$/,
					message: '拒收数量不能小于0'
				},
				reason: {
					value: '',
					needcheck: false
				},
				submitted: {
					value: false,
					needcheck: false
				}
			}
		}
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanField: Field,
		vanCellGroup: CellGroup,
		cheader
	},
	computed: {
		good() {
			return this.$store.state.order.goods.filter((item) => {
				return item.id == this.$route.params.goodId
			})[0]
		},
		loter() {
			return this.good.lots.filter((item) => {
				return item.id == this.$route.params.lotId
			})[0]
		},
		need() {
			return this.good.need - this.good.lots.map((item) => {return parseInt(item.count)}).reduce((prevalue, curvalue) => {
				return prevalue + curvalue
			}) + parseInt(this.loter.count)
		}
	},
	mounted() {
		this.initLot()
	},
	methods: {
		initLot() {
			this.loter.created_at = this.loter.created_at.replace(/-/g, '')
			this.loter.until_at = this.loter.until_at.replace(/-/g, '')
			Object.keys(this.loter).forEach((key) => {
				this.lot[key].value = this.loter[key]
			})
		},
		countInput(value) {
			this.lot.count.value = this.lot.count.value > this.need ? this.need : this.lot.count.value
		},
		submit() {
			let lot = new Object
			for(let i in this.lot) {
				if(this.lot[i].needcheck == false || this.lot[i].patten.test(this.lot[i].value)){
					lot[i] = this.lot[i].value
				}else{
					Toast(this.lot[i].message)
					return false
				}
			}
			this.$store.commit('lotUpdate', {goodId: this.$route.params.goodId, lot: lot})
			Toast('更新批号成功')
			setTimeout(() => {
				this.$router.back()
			},2000)
		}
	}
}