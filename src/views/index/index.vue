<template>
  <van-row>
	  <van-col :span='16' :offset='4' class='main'>
		  <router-link to='/type/purchase' class='red link f-db f-tal'>采购收货</router-link>
			<router-link to='/' class='blue link f-db f-tal'>采购验收</router-link>
			<router-link to='/' class='yellow link f-db f-tal'>收货上架</router-link>
			<router-link to='/type/picking' class='green link f-db f-tal'>拣货</router-link>
			<router-link to='/' class='blue link f-db f-tal'>库存盘点</router-link>
			<router-link to='/' class='red link f-db f-tal'>商品盘点</router-link>
			<router-link to='/' class='blue link f-db f-tal'>药品移架</router-link>
			<router-link to='/' class='red link f-db f-tal'>药品停售</router-link>
			<van-button type="default" size='large' class='logout' v-on:click='logout'>退出</van-button>
		</van-col>
	</van-row>
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>