import { PullRefresh, Row, Col, Cell, CellGroup, List, Toast, Popup } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'picking',
	data() {
		return {
			isLoading: false,
			loading: false,
			finished: false,
			order: {
				page: 1,
				pageSize: 10,
				data: [],
				keyword: ''
			},
			popup: {
				show: false,
				data: []
			}
		}
	},
	components: {
		vanPullRefresh: PullRefresh,
		vanList: List,
		vanRow: Row,
		vanCol: Col,
		vanCell: Cell,
		vanCellGroup: CellGroup,
		vanPopup: Popup,
		cheader
	},
	created() {
		this.index()
	},
	computed: {
		user() {
			return this.$store.state.user
		},
		type() {
			return this.$store.state.config.type
		}
	},
	methods: {
		index() {
			this.$http.get('/jh/gys', {params: {page: this.order.page, pageSize: this.order.pageSize, keyword: this.order.keyword,is_gk: this.type == 'bone'}}).then((res) => {
				if(res.data.data.length == 0) {
					this.finished = true
				}
				this.order.data = this.order.data.concat(res.data.data)
			})
		},
		/*-- 搜索 --*/
		search(keyword) {
			this.order.data = []
			this.order.page = 1
			this.order.keyword = keyword
			this.popup.show = false
      this.index()
		},
		/*-- 上拉加载 --*/
		onLoad() {
      setTimeout(() => {
				this.order.page ++
				this.index()
        // 加载状态结束
        this.loading = false
      }, 500)
		},
		/*-- 下拉刷新 --*/
		onRefresh() {
			setTimeout(() => {
        this.finished = false
        this.isLoading = false
        this.order.data = []
				this.order.page = 1
        this.index()
      }, 500)
		},
		/*-- 搜索供应商名字 --*/
		onInput(keyword) {
			this.$http.get('/jh/gys/search', {params: {keyword: keyword, is_gk: this.type == 'bone'}}).then((res) => {
				this.popup.data = res.data.data
				this.popup.show = (this.popup.data.length > 0)
			})
		}
	}
}