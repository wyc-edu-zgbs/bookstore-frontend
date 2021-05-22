<template>
	<div class="search-container">
		<SearchBox :text="$route.query.q" />
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
			:page-size="1"
			layout="prev, pager, next, jumper"
			:total="totalPages">
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
			totalPages: 1,
			product_rows: [],
		}
	},
	components: {
		ProductItem,
		SearchBox
	},
	computed: {
		pageNo() {
			return parseInt(this.$route.query.p) || 1
		}
	},
	mounted() {
		this.showSearch()
	},
	watch:{
		$route() {
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
		showProducts(resp) {
			this.totalPages = resp.pages
			for (let i of chunk(resp.contents, this.item_per_rows)) {
				this.product_rows.push(i)
			}
		},
		gotoPage(p) {
			this.$router.push({
				path: this.$route.path,
				query: {...this.$route.query, p: p}
				})
				.catch(()=>{})
		}
	},
}
</script>

<style scoped>
</style>
