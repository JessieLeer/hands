import { Icon, NavBar, Search } from 'vant'

export default {
	name: 'cheader',
	props: {
		backcolor: {
			type: String
		},
		title: {
			type: String
		},
		righText: {
			type: String
		},
		ckeyword: {
			type: String
		},
		hasSearch: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String
		}
	},
	data() {
		return {
			keyword: this.ckeyword
		}
	},
	components: {
		vanIcon: Icon,
		vanNavBar: NavBar,
	  vanSearch: Search,
	},
	mounted() {
		this.$refs.header.style.backgroundColor = this.backcolor
	},
	methods: {
		back() {
			this.$router.back()
		},
		handleRight() {
			this.$emit('handleRight')
		},
		search(value) {
			this.$emit('search', value)
		},
		input(value) {
			this.$emit('input', value)
		}
	}
}