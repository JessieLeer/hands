<template>
  <van-row class='main'>
    <van-col span="24" class='f-tac'>
		  <cheader v-bind:backcolor='backColor' title='选择类型'></cheader>
		  <h2 class='pick-title'>{{pickTitle}}</h2>
			<section class='type-icon f-ib f-csp'>
			  <van-image width="100" height="100" v-bind:src="image.bone"  v-on:click='handleType("bone")'/>
				<i class='type-text f-fs2 f-db'>骨科</i>
			</section>
			<section class='type-icon f-ib f-csp'>
			  <van-image width="100" height="100" v-bind:src="image.nobone"  v-on:click='handleType("nobone")' />
				<i class='type-text f-fs2 f-db'>非骨科</i>
			</section>
		</van-col>
  </van-row>
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>