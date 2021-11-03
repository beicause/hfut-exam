<template>
	<router-view />
</template>

<script>

export default {
	name: 'App',
	created() {
		// 判断是否登录
		if (!localStorage.token) {
			this.$notify({
				title: '',
				message: '请先登录..',
				type: 'warning'
			});
			this.$router.push({ path: '/myInfo' });
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
