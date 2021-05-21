<template>
	<div class="search-container">
		<SearchBox />
		<div class="result">
			<el-row v-for="product_row in product_rows"
					:key="product_row.map(x=>x.id).join()">
				<el-col
					v-for="product in product_row"
					:key="product.id"
					:span="24/item_per_rows"
					>
					<ProductItem
						:product="product" />
				</el-col>
			</el-row>
		</div>
		<el-pagination
			@current-change="gotoPage"
			:current-page="pageNo"
			:page-size="100"
			layout="prev, pager, next, jumper"
			:total="1000">
		</el-pagination>
	</div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'
import SearchBox from '../components/SearchBox.vue'

function chunk(a, n) {
	var ret = []
	for (var i = 0; i < a.length; i += n) {
		ret.push(a.slice(i, i+n))
	}
	return ret
}

export default {
	data(){
		return{
			item_per_rows: 4,
			product_rows: [],
		}
	},
	components: {
		ProductItem,
		SearchBox
	},
	computed: {
		pageNo() {
			return this.$route.query.p || 1
		}
	},
	mounted() {
		this.showSearch()
	},
	watch:{
		$route(to) {
			console.log(to)
			this.showSearch()
		},
	},
	methods: {
		showSearch() {
			this.product_rows = []
			// while (this.product_rows.length) {this.product_rows.pop()}
			this.$http.get("/api"+this.$route.fullPath)
				.then((response) => {
					this.showProducts(response.data)
				})
				.catch((error) => {
					console.log(error)
					this.$notify({
						title: 'Could not reach the API.',
						message: error
					})
				})
		},
		showProducts(products) {
			for (let i of chunk(products, this.item_per_rows)) {
				this.product_rows.push(i)
			}
		},
		gotoPage(p) {
			this.$router.push({
				path: this.$route.path,
				query: {...this.$route.query, p: p}
				})
				.catch(e=>console.log(e))
		}
	},
}
</script>

<style scoped>
#container{
	position: relative;
	margin: 30px auto;
	width: 100%;
}
.product{
	margin: 0 auto;
	width: 980px;
}
.product>.pro_line{
	margin-bottom: 20px;
	width: 980px;
	height: 50px;
	line-height: 50px;
	font-size: 26px;
	font-family: sans-serif;
	font-weight: normal;
	color: #222;
}
.pro_line>h3{
	display: inline-block;
}
.el-dropdown-link {
	display: inline-block;
	cursor: pointer;
	color: #409EFF;
}
.el-icon-arrow-down {
	font-size: 12px;
}
.goHome{
	font-size: 14px;
	display: inline-block;
	margin-left: 20px;
	text-decoration: none;
	color: skyblue;
	cursor: pointer;
}
.goHome:hover{
	color: #ccc;
}
.product>.pro_show{
	margin: 0 auto;
	padding-left: 20px;
	width: 980px;
	height: 300px;
}
.pro_show>.pro{
	position: relative;
	float: left;
	margin-right: 20px;
	margin-bottom: 20px;
	width: 300px;
	height: 200px;
	border: 1px solid gainsboro;
}
.pro>.pro_img{
	margin: 20px;
	width: 120px;
	height: 120px;
}
.pro>.pro_text{
	position: absolute;
	top: 30px;
	right: 0;
	height: 130px;
	width: 140px;
	line-height: 25px;
}
.pro_text>p{
	margin-bottom: 10px;
}
.pro_text>p:first-child{
	color: red;
	font-weight: 900;
}
.pro_text>p:nth-child(2){
	font-size: 13px;
}
.pro_text>p:nth-child(3){
	font-size: 12px;
	color: #999;
}
.pro>.add_btn{
	float: right;
	position: absolute;
	bottom: 15px;
	right: 20px;
}
.add_btn>a{
	display: block;
	width: 120px;
	height: 25px;
	text-align: center;
	line-height: 25px;
	background: #FF0036;
	color: white;
	cursor: pointer;
}
#footer{
	height: 50px;
	width: 100%;
	display: flex;
}
#footer>ul.pagination{
	margin: 0 auto;
}
ul.pagination li{
	float: left;
}
ul.pagination li a {
	float: left;
	padding: 8px 16px;
	text-decoration: none;
	transition: background-color .3s;
	color: black;
	border: 1px solid #ddd;
}
ul.pagination li a.pag_active {
	background-color: #c40000;
	color: white;
	border: 1px solid #c40000;
}
ul.pagination li a:hover:not(.pag_active){
	background-color: #ddd;
}
div.center{
	text-align: center;
}
</style>
