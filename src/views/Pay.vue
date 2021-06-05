<template>
	<div class="payment-container" v-loading="is_loading">
		<el-button type="warning" icon="el-icon-bank-card" @click="pay">支付</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			is_loading: false,
		}
	},
	methods: {
		pay() {
			this.is_loading = true
			var data = {
				id: this.$route.params.id,
				state: 2,
			}
			this.$http.post("/api/order", data)
				.then((response) => {
					this.$message("pay success")
					this.$router.push("/cart")
				})
				.catch((error) => {
					console.log(error)
					this.$notify({
						title: 'Could not reach the API.',
						message: error
					})
				})
				.finally(() => this.is_loading = false)
		}
	}
}
</script>

<style>
.payment-container {
	text-align: center;
	padding: 30% 0;
}
</style>
