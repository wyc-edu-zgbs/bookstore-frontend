<template>
	<div>
		<h1>
			<i class="el-icon-goods"></i>
			cart
		</h1>
		<el-table
			stripe
			ref="table"
			:data="items"
			@selection-change="(x)=>{this.selection=x}"
			>
			<el-table-column type="selection" />
			<el-table-column>
				<template v-slot:default="scope">
					<el-image
						class="cart-cover"
						:src="scope.row.cover | media2url"
						fit="contain"
						lazy></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="Name"></el-table-column>
			<el-table-column label="price">
				<template v-slot:default="scope">
					{{scope.row.price | formatPrice}}
				</template>
			</el-table-column>
			<el-table-column label="count">
				<template v-slot:default="scope">
					<el-input-number v-model="scope.row.count" :min="1" size="small"></el-input-number>
				</template>
			</el-table-column>
			<el-table-column label="">
				<template slot-scope="scope">
					{{scope.row.price * scope.row.count | formatPrice}}
				</template>
			</el-table-column>
			<el-table-column
				label="Operations">
				<template v-slot:default="scope">
					<el-button
						@click.native.prevent="deleteRow(scope.$index)"
						type="text">
						Remove
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div>
			<span class="cart-footer-right">
				<span>selected: {{selection.length}}</span>
				<el-divider direction="vertical"></el-divider>
				<span>
					total:
					{{selection.map(x=>x.count*x.price).reduce((a,b)=>a+b, 0) | formatPrice}}
				</span>
				<el-divider direction="vertical"></el-divider>
				<el-button @click="checkout()">checkout</el-button>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		deleteRow(idx) {
			console.log("del", idx)
		},
		selec(v) {
			console.log(v)
		}
	},
	data() {
		return {
			selection: [],
			items: [
				{
					"count": 7,
					"id": "ad727512-bd80-11eb-a8b8-c1e635d27859",
					"name": "寻找《局外人》",
					"cover": "s33658199.jpg",
					"price": 98.0
				},
				{
					"count": 9,
					"id": "ad727513-bd80-11eb-a8b8-c1e635d27859",
					"name": "不要和你妈争辩",
					"cover": "s33610259.jpg",
					"price": 39.8
				},
				{
					"count": 5,
					"id": "ad727514-bd80-11eb-a8b8-c1e635d27859",
					"name": "鞋带",
					"cover": "s33601424.jpg",
					"price": 45
				},
				{
					"count": 6,
					"id": "ad727515-bd80-11eb-a8b8-c1e635d27859",
					"name": "正常人",
					"cover": "s33684681.jpg",
					"price": 49.8
				},
				{
					"count": 9,
					"id": "ad727516-bd80-11eb-a8b8-c1e635d27859",
					"name": "光明共和国",
					"cover": "s33625558.jpg",
					"price": 46
				},
				{
					"count": 2,
					"id": "ad727517-bd80-11eb-a8b8-c1e635d27859",
					"name": "往复书简：初恋与不伦",
					"cover": "s33668217.jpg",
					"price": 42.0
				}
			]
		}
	}
}
</script>

<style scoped>
.cart-cover {
	height: 100px
}
.cart-footer-right {
	float: right
}
</style>
