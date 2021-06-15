<template>
	<el-button-group>
		<el-button
			v-if="!is_admin && state == 0"
			type="primary"
			@click="orderconfirm"
			icon="el-icon-edit">
			继续
		</el-button>
		<el-button
			v-if="!is_admin && state == 1"
			type="primary"
			@click="pay"
			icon="el-icon-bank-card">
			付款
		</el-button>
		<el-button
			v-if="is_admin && state == 2"
			type="primary"
			@click="deliver"
			icon="el-icon-truck">
			发货
		</el-button>
		<el-button
			v-if="state != 255"
			type="primary"
			@click="ordercancel"
			icon="el-icon-close">
			取消
		</el-button>
		<el-button
			v-if="state == 3"
			type="primary"
			@click="complete"
			icon="el-icon-check">
			确认收货
		</el-button>
	</el-button-group>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			require: true
		},
		state: {
			type: Number,
			require: true
		},
		is_admin: {
			type: Boolean,
			require: true
		},
	},
	methods: {
		orderconfirm() {
			this.$router.push("/orderconfirm/" + this.id)
		},
		pay() {
			this.$router.push("/pay/" + this.id)
		},
		complete() {
			this.$confirm('确定此订单收货?', '确认收货', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'success'
			}).then(() => {
				this.change_state(this.id, 4)
			});
		},
		deliver() {
			this.$confirm('确定此订单发货?', '订单发货', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'success'
			}).then(() => {
				this.submitpush();
			});
		},
		ordercancel() {
			this.$confirm('确定取消此订单?', '取消订单', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.submitdel();
			});
		},
		submitdel() {
			this.change_state(this.id, 255)
		},
		submitpush() {
			this.change_state(this.id, 3)
		},
		change_state(order_id, state) {
			this.is_loading = true
			this.$http.post("/api/order", {id: order_id, state: state})
				.then((response) => {
					this.$router.go()
				})
				.catch((error) => {
					console.log(error)
					this.$notify({
						title: 'Could not reach the API.',
						message: error
					})
				})
				.finally(() => this.is_loading = false)
		},
		goTo(path) {
			this.$router.replace(path);
		}
	}
}
</script>
