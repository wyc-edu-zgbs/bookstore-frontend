<template>
	<el-card>
		<el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
			<el-form-item label="Email" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item v-if="register" label="Nickname" prop="nickname" key="nick_item">
				<el-input v-model="form.nickname" key="nickname" ></el-input>
			</el-form-item>
			<el-form-item label="Password" prop="pass" key="pass_item">
				<el-input
					type="password"
					v-model="form.pass"
					:autocomplete="this.register?'new-password':'current-password'"
					key="pass">
				</el-input>
			</el-form-item>
			<el-form-item v-if="register" label="Confirm" prop="checkPass">
				<el-input type="password" v-model="form.checkPass" autocomplete="new-password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()">
					<span v-if="this.register">Register</span>
					<span v-else>Login</span>
				</el-button>
				<el-button @click="resetForm()">Reset</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="register = !register">
					<div v-if="register" class="text-grey-6">Back to Login</div>
					<div v-else class="text-grey-6">
						Not reigistered? Created an Account
					</div>
				</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Please input the password'))
			} else {
				if (this.register && this.form.checkPass !== '') {
					this.$refs.form.validateField('checkPass')
				}
				callback()
			}
		}
		var validatePass2 = (rule, value, callback) => {
			if (!this.register) {
				callback()
			}
			if (value === '') {
				callback(new Error('Please input the password again'))
			} else if (value !== this.form.pass) {
				callback(new Error('Two inputs don\'t match!'))
			} else {
				callback()
			}
		}
		return {
			register: false,
			form: {
				email: '',
				nickname: '',
				pass: '',
				checkPass: ''
			},
			rules: {
				email: [
					{ required: true },
					{ pattern: /.+@.+/, message: "invalid email" },
				],
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		submitForm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					var data = {email: this.form.email, password: this.form.pass}
					if (this.register) {
						data.nickname = this.form.nickname
					}
					this.$http.post(
						this.register ? "/api/register" : "/api/login",
						data)
						.then(() => {
							this.$router.push("/")
						})
						.catch(error => {
							this.$alert(
								error.response.data.reason || error.toString(),
								'Authentication Error')
						})
				} else {
					this.$message("invalid input")
					return false
				}
			})
		},
		resetForm() {
			this.$refs.form.resetFields()
		}
	}
}
</script>

<style scoped>
.el-card {
	width: 480px;
	margin: auto
}
</style>
