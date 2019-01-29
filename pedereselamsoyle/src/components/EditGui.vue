<template>
    <div>
        <form-builder type="gui" :form="formData"></form-builder>
		<b-button size="sm" @click="formSave()">
		</b-button>
    </div>
</template>

<script>
import FormBuilder from 'v-form-builder';

export default {
	components: {
		FormBuilder
	},
	created() {
		this.debFormBuilderug = this.$route.query;
	},
	mounted() {
		console.log('mount edildi editGui');
	},
	data() {
		return {
			formData:{},
		}
	},
	methods: {
		formSave() {
			console.log(this.formData)
		}
	},
}
</script>
