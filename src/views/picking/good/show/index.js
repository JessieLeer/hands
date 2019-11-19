import { Row, Col, Cell, Collapse, CellGroup, CollapseItem, Button, Panel, Icon, Toast, Dialog, Popup } from 'vant'
import cheader from '@/components/header/index.vue'

export default {
	name: 'pickingGoodShow',
	data() {
		return {
			actives: ['1'],
			serialShow: false
		}
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
	},
	components: {
		vanRow: Row,
		vanCol: Col,
		vanCell: Cell,
		vanCellGroup: CellGroup,
		vanCollapse: Collapse,
		vanCollapseItem: CollapseItem,
		vanButton: Button,
		vanDialog: Dialog,
		vanPopup: Popup,
		vanPanel: Panel,
		vanIcon: Icon,
		cheader
	},
	created() {
		console.log(this.good)
	},
	methods: {
		showLot() {
			this.serialShow = true
		}
	}
}