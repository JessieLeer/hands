import { Row, Col, Field, CellGroup, Toast, Popup, Search, Panel, NoticeBar, Cell, Button } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'purchaseGoodLotEdit1',
	data() {
		return {
			serialShow: false,
			serial: '',
			lot: {
				id: {
					value: '',
					needcheck: true,
					patten: /\S/,
					message: '请填写批号'
				},
				registration: {
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
				steri: {
					value: '',
					needcheck: true,
					patten: /\S/,
					message: '请填写灭菌批号'
				},
				steri_until: {
					value: '',
					needcheck: true,
					patten: /[0-9]{8}/,
					message: '请填写有效的灭菌有效日期（八位数字）'
				},
				serials: {
					value: [],
					needcheck: false,
					message: '请选择序列号'
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
		vanPopup: Popup,
		vanSearch: Search,
		vanPanel: Panel,
		vanNoticeBar: NoticeBar,
		vanCell: Cell,
		vanButton: Button,
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
			return 0
		}
	},
	mounted() {
		this.initLot()
	},
	methods: {
		search(keyword) {
			this.keyword = keyword
		},
		initLot() {
			this.loter.created_at = this.loter.created_at.replace(/-/g, '')
			this.loter.until_at = this.loter.until_at.replace(/-/g, '')
			Object.keys(this.loter).forEach((key) => {
				this.lot[key].value = this.loter[key]
			})
		},
		handleSerial(value) {
			if(this.lot.serials.value.indexOf(value) == -1) {
				this.lot.serials.value.push(value)
			}else{
				Toast('序列号重复，请重新输入或扫描')
			}
		},
		closeSerial(i) {
			this.lot.serials.value.splice(i,1)
		},
		submit() {
			if(this.lot.serials.value.length == 0) {
				Toast('请选择序列号')
				return false
			}else{
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
}