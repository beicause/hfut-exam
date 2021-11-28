<template>
	<div>
		<router-view />
		<tabBar :num="num"></tabBar>
	</div>
</template>

<script>
import tabBar from './components/tabBars/tabBar.vue'
import store from './store'
export default {
	name: 'App',
	components: { tabBar },
	computed: {
		num() {
			return store.state.listMyInvigilate.length
		}
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
