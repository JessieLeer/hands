<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#FD6660' title='' v-bind:hasSearch='true' placeholder='搜索供应商名称或助记码' v-bind:ckeyword='keyword' v-on:search='search' v-on:input='onInput'></cheader>
			<van-popup v-model="popup.show" position="top" v-bind:overlay='false' v-bind:duration='0'>
			  <van-cell-group>
          <van-cell v-for='(item,index) in popup.data' v-bind:key='index' v-bind:title="item" v-on:click='search(item)'/>
				</van-cell-group>	
			</van-popup>
			<van-index-bar v-bind:index-list="indexList" v-bind:sticky='false' class='good-bar' v-bind:sticky-offset-top='98'>
				<van-index-anchor v-bind:index="indexList[0]" v-show='true' class='good-bar-anchor'>未处理</van-index-anchor>
				<van-cell-group class='goods'>
					<van-cell v-for='(item, index) in undealed' v-bind:key='index' is-link class='good' v-bind:to="`/purchase/good/show/${item.id}`">
						<template slot="title">
							<h4 class="good-name">{{item.name}}</h4>
							<b>规格：{{item.specification}}</b>
						</template>
						<template slot='label'>
							<dl>
								<dt class='f-ib'>批准文号：</dt>
								<dd class='f-ib'>{{item.approve}}</dd>
							</dl>
							<dl>
								<dt class='f-ib'>生产厂商：</dt>
								<dd class='f-ib'>{{item.manufacturer}}</dd>
							</dl>
						</template>
					</van-cell>
				</van-cell-group>
				<van-index-anchor v-bind:index="indexList[1]" v-show='true' class='good-bar-anchor'>已处理</van-index-anchor>
				<van-cell-group class='goods' ref='goods'>
					<van-cell v-for='(item, index) in dealed' v-bind:key='index' class='good' v-bind:to="`/purchase/good/show/${item.id}`">
						<template slot="title">
							<h4 class="good-name">{{item.name}}</h4>
							<b>规格：{{item.specification}}</b>
						</template>
						<template slot='label' class='f-pr'>
							<dl>
								<dt class='f-ib'>批准文号：</dt>
								<dd class='f-ib'>{{item.approve}}</dd>
							</dl>
							<dl>
								<dt class='f-ib'>生产厂商：</dt>
								<dd class='f-ib'>{{item.manufacturer}}</dd>
							</dl>
							<van-tag color='#effaf6' text-color='#75D7B9' v-if='item.need == item.lots.map((item) => {return item.count}).reduce((prevalue, curvalue) => {return prevalue + curvalue})' class='good-tag'>已全部收货</van-tag>
							<van-tag color='#fcf5ed' text-color='#EC9738' v-else class='good-tag'>
								<section>
									<dl class='f-db'>
										<dt class='f-ib'>采购数量</dt>
										<dd class='f-ib'>{{item.need}}</dd>
									</dl>
									<dl class='f-db'>
										<dt class='f-ib'>未收数量</dt>
										<dd class='f-ib'>{{item.need - item.lots.map((item) => {return parseInt(item.count)}).reduce((prevalue, curvalue) => {return prevalue + curvalue})}}</dd>
									</dl>
								</section>
							</van-tag>
						</template>
					</van-cell>
				</van-cell-group>	
			</van-index-bar>
			<van-button class='submit' color='#f4e6e8' v-bind:disabled='submitables.length == 0' v-on:click='submit(`/purchase/edit/${orderId}`)'>收货确认</van-button>
		</van-col>
	</van-row>	
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>