<template>
	<ProductItem :product="product"/>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'

export default {
	components: {
		ProductItem
	},
	data() {
		return {
			product: {
				"id": "n/a",
				"name": "寻找《局外人》",
				"cover": "/api/media/s33658199.jpg",
				"author": "[美]爱丽丝·卡普兰 ",
				"price": "98.00元 "
			}
		}
	}
}

</script>
