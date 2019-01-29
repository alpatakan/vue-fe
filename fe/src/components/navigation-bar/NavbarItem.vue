<template>
	<b-tab id="individualMenuItem" v-show="isActive">
		<slot></slot>
	</b-tab>
</template>

<script>
export default {
	props: {
		name: { required: true },
		navTo: { required: true },
		selected: { default: false }
	},
	data() {
		return {
			isActive: false
		}
	},
	mounted() {
		this.isActive = this.selected
	}
}
</script>
