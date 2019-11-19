<template>
	<van-nav-bar v-bind:title="title" v-bind:right-text="righText" left-arrow @click-left="back" @click-right='handleRight' ref='header' fixed>
	  <van-search slot='title' v-if='hasSearch' v-bind:placeholder='placeholder' background='#fff' v-on:input='input' @search="search" class='header-search f-fs2' v-model='keyword'/>  
	</van-nav-bar>
</template>

<style lang='stylus' scoped>
@import './index.styl'
</style>

<script src='./index'></script>