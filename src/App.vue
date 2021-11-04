<template>
	<div>
		<router-view />
		<tabBar :num="num"></tabBar>
	</div>
</template>

<script>
import { Android } from './common/utils'
import tabBar from './components/tabBars/tabBar.vue'
import store from './store'
export default {
	name: 'App',
	components: { tabBar },
	computed: {
		num() {
			return store.state.listUnfinished.length
		}
	},
	created() {
		console.log(''+localStorage.name);
		Android.setAlias(''+localStorage.name)
	}
}
</script>

<style scoped>
.v-enter {
	opacity: 0;
	transform: translateX(-100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.3s ease;
}
</style>
