<template>
	<router-link :to="'/book/' + product.id">
		<el-card class="product" shadow="hover">
			<el-image :src="product.cover | media2url" fit="scale" class="pro_img" lazy />
			<p class="title">{{product.name}}</p>
			<p class="author">{{product.author}}</p>
			<p class="price">{{product.price}}</p>
		</el-card>
	</router-link>
</template>

<script>
export default {
	props: {
		product: {
			type: Object,
			required: true
		}
	}
}

</script>

<style scoped>
.product{
	text-align: left;
	width: 200px;
	height: 100%;
	background: white;
}
.product>.pro_img{
	margin: 20px;
	width: 120px;
	height: 120px;
}
</style>
