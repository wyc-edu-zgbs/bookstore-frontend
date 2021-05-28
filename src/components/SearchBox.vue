<template>
	<el-form :inline="true" @submit.native.prevent="goSearch()">
		<el-form-item>
			<el-input placeholder="Search" v-model="query" />
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				icon="el-icon-search"
				@click="goSearch()"
				:disabled="query.length == 0">
				Search
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			query: this.$route.path == '/search' ? this.$route.query.q : ""
		}
	},
	methods: {
		goSearch() {
			if (this.query.length) {
				this.$router
					.push({path: "/search", query: {q: this.query}})
					.catch(()=>{})
			}
		},
	}
}
</script>

<style scoped>
.el-form {
	text-align: center
}
</style>
