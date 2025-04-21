
<script>
	import utils from '@/common/utils/utils.js';
	export default {
		onLaunch: function() {
			uni.request({
			  url: 'http://192.168.31.73:3000/cart/items',
			  success: () => console.log('基础连接正常'),
			  fail: () => console.log('基础连接失败')
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
