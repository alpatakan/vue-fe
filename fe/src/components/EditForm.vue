<template>
    <div>
        // form builder template
        <form-builder type="template" v-model="formData"></form-builder>
		<b-button size="sm" :to="{ name: 'editGui', query: { formData }}">
			Edit Gui
		</b-button>
		<b-button size="sm" @click="formSave()">
			console log
		</b-button>
    </div>
</template>

<script>
import FormBuilder from 'v-form-builder';

export default {
	components: {
		FormBuilder
	},
	mounted() {
		console.log('mount edildi edit');
	},
	data() {
		return {
			formData:{},
		}
	},
	methods: {
		formSave() {
			console.log(JSON.stringify(this.formData))
		}
	},
}
</script>
