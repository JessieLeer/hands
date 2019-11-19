import { Row, Col, Button, Toast } from 'vant'

export default {
	name: 'index',
	props: {},
	data() {
		return {
			
		}
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanButton: Button
	},
	methods: {
		logout() {
			this.$store.commit('logout')
			Toast('退出成功')
			setTimeout(() => {
				this.$router.push('/login')
			}, 1000)
		}
	}
}