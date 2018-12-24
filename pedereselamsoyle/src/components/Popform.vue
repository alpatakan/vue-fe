<template>
	<modal :name="name" :scrollable=true :height="'auto'">
		<b-container>
			<slot/>
		</b-container>
	</modal>
</template>

<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
 
Vue.use(VModal)

export default {
	props: {
		name: { required: true },
	},
	mounted() {
		console.log('mount edildi popform');
	},
	methods: {
		show (id) {
			console.log(id + " show modal fk")
			this.$modal.show(id);
		},
		hide (id) {
			console.log(id + " hide modal fk")
			this.$modal.hide(id);
		}
	}
}
</script>