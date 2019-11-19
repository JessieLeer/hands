<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#FD6660' title='' v-bind:ckeyword='order.keyword' v-bind:hasSearch='true' placeholder='搜索供应商名称或助记码' v-on:search='search' v-on:input='onInput'></cheader>
			<van-popup v-model="popup.show" position="top" v-bind:overlay='false' v-bind:duration='0'>
			  <van-cell-group>
          <van-cell v-for='(item,index) in popup.data' v-bind:key='index' v-bind:title="item" v-on:click='search(item)'/>
				</van-cell-group>	
			</van-popup>
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh" class='orders'>
				<van-list v-model="loading" v-bind:finished="finished" finished-text="没有更多了" @load="onLoad">
					<van-cell v-for='(item, index) in order.data' v-bind:key='index' v-bind:title="item.company" is-link class='order' v-on:click='go("/purchase/good/index/" + item.id)'>
						<template slot="label">
							<dl class='order-user f-db'>
								<dt class='f-ib'>委托人</dt>
								<dd class='f-ib'>{{item.user}}</dd>
							</dl>
							<footer class='order-footer'>
								<i class='order-id'>{{item.id}}</i>
								<time class='order-time f-tar'>{{item.created_at}}</time>
							</footer>
						</template>
					</van-cell>
				</van-list>
			</van-pull-refresh>	
		</van-col>
	</van-row>
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>