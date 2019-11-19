<template>
  <van-row class='main'>
	  <van-col :span='24'>
		  <cheader backcolor='#FD6660' title='到货信息' v-bind:righText='good.lots.length == 0 ? "" : "添加"' v-on:handleRight='handleCreate(type == "nobone" ? `/purchase/good/lot/create/${good.id}` : `/purchase/good/lot/create1/${good.id}`)'></cheader>
			<van-collapse v-model="actives">
				<van-collapse-item name="1">
				  <van-cell class='good-cell' v-bind:title="good.name" v-bind:value="actives.indexOf('1') == -1 ? '展开' : '收起'" label="描述信息" slot='title'>
					  <section slot='label'>
						  <dl>
							  <dt class='f-ib'>生产厂商：</dt>
								<dd class='f-ib'>{{good.manufacturer}}</dd>
							</dl>
							<dl>
							  <dt class='f-ib'>采购数量：</dt>
								<dd class='f-ib'>{{good.need}} <i class='total ml-30' v-if='good.lots.length > 0'>共收货{{bought}}</i></dd>
							</dl>
						</section>
					</van-cell>
          <dl>
						<dt class='f-ib'>批准文号：</dt>
					  <dd class='f-ib'>{{good.approve}}</dd>
					</dl>
					<dl>
						<dt class='f-ib'>单位：</dt>
						<dd class='f-ib'>{{good.unit}}</dd>
						<dt class='ml-30 f-ib'>件包装：</dt>
						<dd class='f-ib'>{{good.packages}}</dd>
					</dl>
				</van-collapse-item>
			</van-collapse>
			<h4 class='lot-title f-fwn'>到货信息（{{good.lots.length}}）</h4>
			<div v-if='type == "nobone" && good.lots.length > 0'>
				<van-panel v-for='(item, index) in good.lots' v-bind:key='index'  v-on:click='handleEdit(item)'>
				  <header slot='header' class='lot-header f-fs2'>
					  <van-checkbox class='lot-id' v-model="item.checked" v-if='status == "deleting" && item.submitted == false' @click.stop>批号{{item.id}}</van-checkbox>
						<i v-else class='lot-id'>批号{{item.id}}</i>
						<i class='lot-counter f-tar'>收货数量{{item.count}}</i>
					</header>
					<van-row class='lot-count-wrapper f-fs2'>
						<van-col span='12' class='lot-count f-tac'>
							<dl>
								<dt class='f-ib'>件数</dt>
								<dd class='f-ib'>{{Math.floor(item.count / (item.packages == 0 ? good.packages : item.packages))}}</dd>
							</dl>
						</van-col>
						<van-col span='12' class='lot-count f-tac'>
							<dl>
								<dt class='f-ib'>零散数量</dt>
								<dd class='f-ib'>{{item.count % (item.packages == 0 ? good.packages : item.packages)}}</dd>
							</dl>
						</van-col>
					</van-row>
				</van-panel>
			</div>
			<div v-if='type == "bone" && good.lots.length > 0'>
			  <van-panel v-for='(item, index) in good.lots' v-bind:key='index'  v-on:click='handleEdit(item)'>
				  <header slot='header' class='lot-header f-fs2'>
					  <van-checkbox class='lot-id' v-model="item.checked" v-if='status == "deleting" && item.submitted == false' @click.stop>批号{{item.id}}</van-checkbox>
						<i v-else class='lot-id'>批号{{item.id}}</i>
						<i class='lot-counter f-tar'>收货数量{{item.serials.length}}</i>
					</header>
				</van-panel>
			</div>
			<van-row v-if='good.lots.length == 0'>
			  <van-col :span='24' class='lot-empty f-tac'>
				  <van-icon v-bind:name="add" size='40' />
					<br>
					<van-button type="default" color='#59D7AF' class='add' v-on:click='go(type == "nobone" ? `/purchase/good/lot/create/${good.id}` : `/purchase/good/lot/create1/${good.id}`)'>添加到货信息</van-button>
				</van-col>
			</van-row>
			<van-submit-bar button-text="返回继续收货" @submit="back" v-if='good.lots.length == 0 || status == "normal"'> 
			  <van-button class='delete' type='default' slot='default' size='large' color='rgba(254,241,243,1)' v-bind:disabled='good.lots.filter((item) => {return item.submitted == false}).length == 0' v-on:click='handleStatus("deleting")'>删除</van-button>
			</van-submit-bar>
			<van-submit-bar v-bind:button-text="`删除(${checkeds.length})`" @submit="del" v-if='good.lots.length > 0 && status == "deleting"' v-bind:disabled='checkeds.length == 0'> 
			  <van-button class='delete' type='default' slot='default' size='large' color='rgba(254,241,243,1)'  v-on:click='handleStatus("normal")'>取消</van-button>
			</van-submit-bar>
		</van-col>
	</van-row>	
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>