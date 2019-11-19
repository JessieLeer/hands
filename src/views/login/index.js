import { Row, Col, Button, Field, Toast } from 'vant'

export default {
	name: 'login',
	props: {},
	data() {
		return {
			form: {
				user: 'jinxin',
				password: '123456'
			}
		}
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanButton: Button,
		vanField: Field
	},
	computed: {
		submitAble() {
			return this.form.user.length > 0 && this.form.password.length > 0
		}
	},
	created() {
	},
	methods: {
		login() {
			this.$http.get("/hand/login", {params: this.form}).then((res) => {
				if(res.data.success) {
					this.$store.commit('login', res.data.data)
					Toast('登录成功')
					setTimeout(() => {
						this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/')
					}, 2000)
				}
			})
		}
	}
}