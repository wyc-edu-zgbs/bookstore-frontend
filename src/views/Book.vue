<template>
	<div class="book-container" :key="key">
		<el-row type="flex" justify="space-around">
			<el-col :span="6">
				<el-image :src="book.cover" lazy>
				</el-image>
			</el-col>
			<el-col :span="6">
				<p>{{book.name}}</p>
				<p>{{book.subtitle}}</p>
				<p>{{book.author}}</p>
				<p>{{book.press}}</p>
				<p>{{book.date}}</p>
				<p>{{book.price}}</p>
			</el-col>
		</el-row>
		<el-tabs type="card">
			<el-tab-pane label="详情">
				<p>{{book.description}}</p>
			</el-tab-pane>
			<el-tab-pane label="评论">
				<p>
					placeholder
				</p>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	data(){
		return {
			key: "",
			book: {}
		}
	},
	components: {
	},
	computed: {
	},
	mounted() {
		this.update()
	},
	watch:{
		$route(to) {
			console.log(to)
			this.update()
		},
	},
	methods: {
		update() {
			this.$http.get("/api/book/"+this.$route.params.id)
				.then((response) => {
					Object.assign(this.book, response.data)
					this.key = this.$route.params.id
				})
				.catch((error) => {
					console.log(error)
					this.$notify({
						title: 'Could not reach the API.',
						message: error
					})
				})
		}
	},
}
</script>

<style scoped>
</style>
