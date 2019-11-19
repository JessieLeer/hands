<template>
  <van-row class='f-tac'>
		<van-col span="24">
		  <h1 class='name'>手持ERP<br><small class='f-fs2'>用户登录</small></h1>
		</van-col>
		<van-col span='20' offset='2'>
		  <van-field placeholder="请输入用户名" left-icon="manager" class='input' v-model="form.user"/>
			<van-field placeholder="请输入密码" left-icon="lock" class='input' type='password' v-model='form.password'/>
			<van-button type="danger" round color='#F33358' class='login' v-bind:disabled='!submitAble' v-on:click='login'>登录</van-button>
		</van-col>
	</van-row>
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>