<template>
	<div class="search-box">
		<el-row>
			<el-col span="18"><el-input placeholder="Search" v-model="query" /></el-col>
			<el-col span="6"><el-button type="primary" icon="el-icon-search">Search</el-button></el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			query: ''
		}
	},
	methods: {
		goDetail(id){
			this.$router.replace('/goods/' + id);
		},
	}
}
</script>
