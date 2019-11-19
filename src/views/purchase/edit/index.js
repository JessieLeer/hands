import { Row, Col, Field, CellGroup, Toast, Picker, Popup, Dialog } from 'vant'
import qs from 'qs'
import cheader from '@/components/header/index.vue'

export default {
	name: 'purchaseEdit',
	data() {
		return {
			form: {
				id: {
					value: '',
					patten: /\S/,
					message: ''
				},
				start_at: {
					value: '11111111',
					patten: /[0-9]{8}/,
					message: '请填写有效的起运时间（八位数字）'
				},
				arrive_at: {
					value: '11111111',
					patten: /[0-9]{8}/,
					message: '请填写有效的到货时间（八位数字）'
				},
				temcontrol: {
					value: '阴凉',
					patten: /\S/,
					message: '请选择温控方式'
				},
				start_tem: {
					value: '1',
					patten: /\S/,
					message: '请输入起运温度'
				},
				arrive_tem: {
					value: '1',
					patten: /\S/,
					message: '请输入到货温度'
				},
				license: {
					value: '1',
					patten: /\S/,
					message: '请输入车牌号'
				}
			},
			temp: {
				show: false,
				data: [
					'阴凉',
					'保温',
					'冷藏',
					'常温'
				]
			}
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		},
		type() {
			return this.$store.state.config.type
		},
		goods() {
			return this.$store.state.order.goods
		},
		dealed() {
			return this.goods.filter((item) => {
				return item.lots.filter((lot) => {
					return lot.submitted == false
				}).length > 0
			})
		}
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanField: Field,
		vanCellGroup: CellGroup,
		vanPicker: Picker,
		vanPopup: Popup,
		vanDialog: Dialog,
		cheader
	},
	created() {
		this.form.id.value = this.$route.params.id
		console.log(this.dealed)
	},
	methods: {
		onTempConfirm(value) {
			this.form.temcontrol.value = value
			this.temp.show = false
		},
		submit() {
			let form = new Object
			for(let i in this.form) {
				if(this.form[i].patten.test(this.form[i].value)){
					form[i] = this.form[i].value
				}else{
					Toast(this.form[i].message)
					return false
				}
			}
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