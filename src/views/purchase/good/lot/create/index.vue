<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#FD6660' title='到货信息录入' righText='确定' v-on:handleRight='submit'></cheader>
			<van-cell-group>
				<van-field label="批号" input-align='right' class='inputer' v-model='lot.id.value' />
				<van-field label="合箱号" input-align='right' class='inputer' v-model='lot.box.value'/>
				<van-field label="生产日期" input-align='right' class='inputer' type='number' v-model='lot.created_at.value'/>
				<van-field label="有效期至" input-align='right' class='inputer' type='number' v-model='lot.until_at.value'/>
				<van-field label="件包装" input-align='right' class='inputer' type='number' v-model='lot.packages.value'/>
				<van-field label="收货数量" input-align='right' class='inputer' type='number' v-model='lot.count.value' min='1' v-bind:max='need' v-on:input='countInput'/>
				<van-field label="件数" input-align='right' class='inputer' type='number' v-bind:value='Math.floor(lot.count.value / lot.packages.value)' readonly/>
				<van-field label="零散数量" input-align='right' class='inputer' type='number' v-bind:value='lot.count.value % lot.packages.value' readonly/>
				<van-field label="产地" input-align='right' class='inputer' v-model='lot.address.value'/>
				<van-field label="拒收数量" input-align='right' class='inputer' type='number' v-model='lot.refuse.value' min='0'/>
				<van-field label="拒收原因" input-align='right' class='inputer' v-model='lot.reason.value' />
			</van-cell-group>
		</van-col>
	</van-row>	
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>