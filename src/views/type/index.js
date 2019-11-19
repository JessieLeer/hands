import { Row, Col, Image } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'type',
	props: {},
	data() {
		return {
			pickTitle: '',
			backColor: '',
			image: {
				bone: require('../../assets/image/bone.png'),
				nobone: require('../../assets/image/nobone.png')
			}
		}
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanImage: Image,
		cheader
	},
	created() {
		this.pickTitle = this.$route.params.type == 'purchase' ? '请选择采购收货类型' : '请选择销售计划拣货类型'
		this.backColor = this.$route.params.type == 'purchase' ? '#FD6660' : '#1AC69C'
	},
	methods: {
		handleType(value) {
			this.$store.commit('handleType', value)
			this.$router.push(`/${this.$route.params.type}`)
		}
	}
}