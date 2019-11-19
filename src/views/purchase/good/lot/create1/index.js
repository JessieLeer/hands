import { Row, Col, Field, CellGroup, Toast, Popup, Search, Panel, NoticeBar, Cell, Button } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'purchaseGoodLotCreate1',
	data() {
		return {
			keyword: '',
			serialShow: false,
			registrationShow: false,
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
					message: '请填写注册证号'
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
		need() {
			return 0
		}
	},
	mounted() {
	},
	methods: {
		search(keyword) {
			Toast({
				message: '该功能开发中'
			})
			/*this.keyword = keyword
			this.$http.get('/cgsh/gkdrug/info', {params: {spbh: keyword}}).then((res) => {
				res.data.data.serials = res.data.data.serials == '' ? [] : res.data.data.serials.split(',')
				Object.keys(res.data.data).forEach((key) => {
					this.lot[key].value = res.data.data[key]
				})
			})*/
		},
		handleRegis(value) {
			this.lot.registration.value = value
			this.registrationShow = false
		},
		openSerial() {
			this.serialShow = true
			this.$nextTick(() => {
				Array.from(document.getElementsByClassName('van-field__control'))[10].focus()
			})
		},
		handleSerial(value) {
			if(this.serial == '') {
				
			}else{
				if(this.lot.serials.value.indexOf(value) == -1) {
					this.lot.serials.value.push(value)
					this.serial = ''
				}else{
					Toast('序列号重复，请重新输入或扫描')
				}
			}
			this.$nextTick(() => {
				Array.from(document.getElementsByClassName('van-field__control'))[10].focus()
			})
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
				this.$store.commit('lotCreate', {goodId: this.$route.params.goodId, lot: lot})
				Toast('添加批号成功')
				setTimeout(() => {
					this.$router.back()
				},2000)
			}
		}
	}
}