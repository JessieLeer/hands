<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#FD6660' title='到货信息录入' righText=''  v-bind:hasSearch='true' v-bind:ckeyword='keyword' v-on:search='search' placeholder='扫描商品信息码'></cheader>
			<van-cell-group>
				<van-field label="批号" input-align='right' class='inputer' v-model='lot.id.value'/>
				<van-field label="注册证号" input-align='right' class='inputer' v-model='lot.registration.value' readonly right-icon='arrow' v-on:click='registrationShow = true'/>
				<van-field label="生产日期" input-align='right' class='inputer' type='number' v-model='lot.created_at.value'/>
				<van-field label="有效期至" input-align='right' class='inputer' type='number' v-model='lot.until_at.value'/>
				<van-field label="灭菌批号" input-align='right' class='inputer' v-model='lot.steri.value'/>
				<van-field label="灭菌有效期" input-align='right' class='inputer' v-model='lot.steri_until.value'/>
				<van-field label="序列号" input-align='right' class='inputer' right-icon="arrow" v-on:click='openSerial' v-model='lot.serials.value[0]' readonly/>
				<van-field label="拒收数量" input-align='right' class='inputer' type='number' v-model='lot.refuse.value' min='0'/>
				<van-field label="拒收原因" input-align='right' class='inputer' v-model='lot.reason.value' />
			</van-cell-group>
			<van-button type='default' size='large' v-on:click='submit' class='submit'>确定</van-button>
			<van-popup v-model="registrationShow" round class='registion' position='bottom'>
			  <van-panel>
				  <header slot='header' class='register-header f-tac'>选择注册证号</header>
					<van-cell-group>
						<van-cell v-for='(item,index) in good.registrations.split(",")' v-bind:title="item" v-bind:key='index' v-on:click='handleRegis(item)' />
					</van-cell-group>
					<footer slot='footer' class='register-footer'>
					  <van-button size='large' color='#f4e6e8' class='register-close' v-on:click='registrationShow = false'>关闭</van-button>
					</footer>
				</van-panel>
			</van-popup>
			<van-popup v-model="serialShow" round class='serial'>
			  <van-panel>
				  <header slot='header'>
						<van-search class='serial' placeholder='扫描或输入序列号' left-icon='scan' @search="handleSerial" v-model='serial' />
					</header>
					<div class='serial-list'>
						<van-notice-bar mode="closeable" background='white' color='#333' v-for='(item, index) in lot.serials.value' v-bind:key='index' v-on:close='closeSerial(index)' class='serial-item'>{{item}}</van-notice-bar>
					</div>
					<footer slot='footer'>
					  <van-cell class='serial-cell'>
						  <section class='serial-count' slot='title'>
							  收货数量 <b>{{lot.serials.value.length}}</b> / {{good.need}}
							</section>
							<van-button type='primary' color='#F33A5A' class='sure' v-on:click='serialShow = false'>确定</van-button>
						</van-cell>
					</footer>
				</van-panel>
			</van-popup>
		</van-col>
	</van-row>	
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>