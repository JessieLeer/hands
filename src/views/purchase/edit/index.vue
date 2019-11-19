<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#FD6660' title='订单信息录入' righText='提交' v-on:handleRight='submit'></cheader>
			<van-cell-group>
				<van-field label="起运时间" input-align='right' class='inputer' v-model='form.start_at.value' />
				<van-field label="到货时间" input-align='right' class='inputer' v-model='form.arrive_at.value' />
				<van-field label="温控方式" input-align='right' class='inputer' v-model='form.temcontrol.value' placeholder='请选择温控方式'  right-icon="arrow" readonly v-on:click='temp.show = true'/>
				<van-field label="起运温度" input-align='right' class='inputer' v-model='form.start_tem.value' />
				<van-field label="到货温度" input-align='right' class='inputer' v-model='form.arrive_tem.value' />
				<van-field label="车牌号" input-align='right' class='inputer' v-model='form.license.value' />
			</van-cell-group>
			<van-popup v-model="temp.show" position="bottom">
				<van-picker show-toolbar v-bind:columns="temp.data" @cancel="temp.show = false" @confirm="onTempConfirm"/>
			</van-popup>
		</van-col>
	</van-row>	
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>