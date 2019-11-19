<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#1AC69C' title='到货信息'></cheader>
			<van-collapse v-model="actives">
				<van-collapse-item name="1">
				  <van-cell class='good-cell' v-bind:title="good.name" v-bind:value="actives.indexOf('1') == -1 ? '展开' : '收起'" label="描述信息" slot='title'>
					  <section slot='label'>
						  <dl>
							  <dt class='f-ib'>生产厂商：</dt>
								<dd class='f-ib'>{{good.manufacturer}}</dd>
							</dl>
							<dl>
							  <dt class='f-ib'>销售计划：</dt>
								<dd class='f-ib'>{{good.need}}</dd>
							</dl>
						</section>
					</van-cell>
          <dl>
						<dt class='f-ib'>注册证号：</dt>
					  <dd class='f-ib'>{{good.registrations[0]}}</dd>
					</dl>
				</van-collapse-item>
			</van-collapse>
			<van-cell v-bind:title="`货位${good.id}`" class='good-header'>
			  <dl class='good-count'>
				  <dt class='f-ib'>拣货数量</dt>
					<dd class='f-ib f-fwb'>{{good.need}}</dd>
				</dl>
			</van-cell>
			<van-panel>
				<van-cell class='lot' slot='header'>
					<dl slot='title' class='lot-id'>
						<dt class='f-ib'>批号</dt>
						<dd class='f-ib'>aaa</dd>
					</dl>
					<i class='lot-count'>X33</i>
				</van-cell>
				<van-cell class='serials' v-on:click='showLot'>
					<i slot='title' class='lot-serial'>序列号</i>
					<ul class='serials-list f-tal'>
						<li>111</li>
						<li>111</li>
						<li>111</li>
						<li>111</li>
						<li>111</li>
						<li>111</li>
						<li>111</li>
					</ul>
				</van-cell>
				<footer slot='footer' class='lot-footer f-tar'>有效期至 2019-09-09</footer>
			</van-panel>
			<van-popup v-model="serialShow" position='right' class='serial-popup' closeable>
			  <van-panel class='mt-50'>
					<van-cell class='lot' slot='header'>
						<dl slot='title' class='lot-id'>
							<dt class='f-ib'>批号</dt>
							<dd class='f-ib'>aaa</dd>
						</dl>
						<i class='lot-count'>X33</i>
					</van-cell>
					<van-cell class='serials'>
						<i slot='title' class='lot-serial'>序列号</i>
						<ul class='serials-list f-tal'>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
							<li>111</li>
						</ul>
					</van-cell>
				</van-panel>	
			</van-popup>
		</van-col>
	</van-row>	
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>