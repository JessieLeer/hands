<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#1AC69C' title='' v-bind:hasSearch='true' placeholder='搜索供应商名称或助记码' v-bind:ckeyword='keyword' v-on:search='search' v-on:input='onInput'></cheader>
			<van-popup v-model="popup.show" position="top" v-bind:overlay='false' v-bind:duration='0'>
			  <van-cell-group>
          <van-cell v-for='(item,index) in popup.data' v-bind:key='index' v-bind:title="item" v-on:click='search(item)'/>
				</van-cell-group>	
			</van-popup>
			<van-index-bar v-bind:index-list="indexList" v-bind:sticky='false' class='good-bar' v-bind:sticky-offset-top='98'>
				<van-index-anchor v-bind:index="indexList[0]" v-show='true' class='good-bar-anchor'>未处理</van-index-anchor>
				<van-cell-group class='goods'>
				  <van-panel v-for='(item, index) in undealed' v-bind:key='index'  v-on:click='handleConfirm(item)'>
					  <header slot='header' class='good-header f-fs2'>
						  <em class='good-id'>货位号{{item.id}}</em>
							<dl class='good-count f-tar'>
							  <dt class='f-ib'>拣货数量</dt>
								<dd class='f-ib f-fwb'>{{item.need}}</dd>
							</dl>
						</header>
					  <van-cell is-link class='good'>
							<template slot="title">
								<h4 class="good-name">{{item.name}} {{item.specification}}</h4>
								<b>批号{{item.lot}}</b>
							</template>
							<template slot='label'>
								<dl>
									<dt class='f-ib'>注册证号：</dt>
									<dd class='f-ib'>{{item.registration}}</dd>
								</dl>
								<dl>
									<dt class='f-ib'>生产厂商：</dt>
									<dd class='f-ib'>{{item.manufacturer}}</dd>
								</dl>
							</template>
						</van-cell>
					</van-panel>
		    </van-cell-group>
				<van-index-anchor v-bind:index="indexList[1]" v-show='true' class='good-bar-anchor'>已处理</van-index-anchor>
				<van-cell-group class='goods' ref='goods'>
					<van-panel v-for='(item, index) in dealed' v-bind:key='index'  v-on:click='handleConfirm(item)'>
					  <header slot='header' class='good-header f-fs2'>
						  <em class='good-id'>货位号{{item.id}}</em>
							<dl class='good-count f-tar'>
							  <dt class='f-ib'>拣货数量</dt>
								<dd class='f-ib f-fwb'>{{item.need}}</dd>
							</dl>
						</header>
					  <van-cell class='good'>
							<template slot="title" class='f-pr'>
								<h4 class="good-name">{{item.name}} {{item.specification}}</h4>
								<b>批号{{item.lot}}</b>
								<van-icon name="checked" color='#75D7B9' class='checked' size='30px'/>
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
					</van-panel>
				</van-cell-group>	
			</van-index-bar>
			<van-button class='submit' color='#1AC69C' v-bind:disabled='submitables.length == 0' v-on:click='submit'>拣货确认</van-button>
			<van-popup v-model="confirmShow" position='bottom'>
			  <van-panel class='editing-panel'>
				  <header slot='header' class='editing-header f-fs2'>
					  <h4 class='editing-id'>货位号：{{editing.id}}</h4>
						<van-button class='editing-cancel' color='#f7f7f7' v-on:click='confirmShow = false'>取消</van-button>
					</header>
					<van-cell class='good'>
						<template slot="title">
							<h4 class="good-name">{{editing.name}} {{editing.specification}} <b class='editing-lot'>批号{{editing.lot}}</b></h4>
						</template>
						<template slot='label'>
							<dl>
								<dt class='f-ib'>批准文号：</dt>
								<dd class='f-ib'>{{editing.approve}}</dd>
							</dl>
				  		<dl>
								<dt class='f-ib'>生产厂商：</dt>
								<dd class='f-ib'>{{editing.manufacturer}}</dd>
							</dl>
							<section class='editing-confrim f-tac'>
							  <van-button color="#F2F2F2" class='editing-fact'>实际拣货数量 <b>{{editing.need}}</b></van-button>
								<dl class='editing-should'>
								  <dt class='f-ib'>应练货数量：</dt>
									<dd class='f-ib'>{{editing.need}}</dd>
								</dl>
							</section>
						</template>
					</van-cell>'
					<footer slot='footer'>
					  <van-button color='#E6FCE9' class='editing-sure' size='large' v-on:click='update(editing)'>确定</van-button>
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