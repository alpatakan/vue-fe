<template>
	<div>
 		<div id="userMenuContentContainer">
		<!-- Main table element -->
			<b-table show-empty
					 ref="table"
					 :items="formList"
					 :fields="fields"
			>
			<template slot="actions" slot-scope="row">
				<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
				<b-button size="sm" @click.stop="loadTest(row)" class="mr-2">
					{{ row.item.showModal ? 'Hide' : 'Show'}} Details
				</b-button>
				<b-button size="sm" v-on:click.stop="removeTest(row.item)" class="mr-1">
					Remove
				</b-button>
  				<popform :ref="'form-' + row.item._id" :name="'form-' + row.item._id">
					<h1> {{ row.item.name }} </h1>
						<img v-show="!row.item.loaded" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
						<!-- Radio Form -->
						<b-form-group v-for="(question, index) in row.item.questions" :key="index">
							<hr/>
							<p align="center"> {{ question.metadata.number }}: {{ question.text }} </p>
							<div align="center" v-if="question.metadata.type == 'RADIO'">
								<b-form-radio-group :id="'btnradios' + question.metadata.number" buttons :options="question.options" size="sm">
								</b-form-radio-group>
							</div>
							<div align="center" v-else-if="question.metadata.type == 'CHECKBOX'">
								<b-form-checkbox-group :id="'btnchecks' + question.metadata.number" buttons :options="question.options" size="sm">
								</b-form-checkbox-group>
							</div>
							<div align="center" v-else-if="question.metadata.type == 'STRING'">
								<b-input-group :name="'btnstrings' + question.metadata.number">
									<b-form-input v-for="(option, index) in question.options" :key="index" :id="'btnstrings' + question.metadata.number" placeholder="Enter something">
									</b-form-input>
								</b-input-group>
							</div>
							<div align="center" v-else-if="question.metadata.type == 'TEXT'">
								<b-form-textarea :id="'btntexts' + question.metadata.number" placeholder="Enter something">
								</b-form-textarea>
							</div>
							<div align="center" v-else-if="question.metadata.type == 'NUMBER'">
								<b-input-group :name="'btnstrings' + question.metadata.number">
									<b-form-input v-for="(option, index) in question.options" :key="index" :id="'btnstrings' + question.metadata.number" type="number" placeholder="Enter something">
									</b-form-input>
								</b-input-group>
							</div>
						</b-form-group>
						<b-button v-show="row.item.loaded" size="sm" @click.stop="hidePop(row)">Hide Details</b-button>
 				</popform>
			</template>
		</b-table>
		</div>
		<button v-on:click.stop="renewForms()" class="btn">
			getir
		</button>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from "axios";
import Popform from '@/components/Popform'

export default {
    components: {
		Popform,
	},
	data() {
		return {
			formList: [],
			instance: {},
			fields: [
				{
					key: "name",
					label: "Testler",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "metadata.count",
					label: "Soru Sayisi",
					sortable: true,
					class: "text-center"
				},
				{ key: "actions", label: "Aksiyonlar" }
			],
		};
	},
	mounted() {
		this.instance = axios.create({
			baseURL: "http://185.144.14.72:7890/api/v1",
			timeout: 1000,
			headers: {
				"x-auth-token": JSON.parse(localStorage.getItem('user')).token
			},
			results: []
		});

		console.log("mount edildi forms");

		this.instance
			.get("/forms/")
			.then(response => {
				this.formList = response.data.data;
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		removeTest(testItem) {
			console.log("remove testId = " + testItem._id);
			this.instance
				.delete("/forms/" + testItem._id)
				.then(response => {
					console.log(response);
					var index = this.formList.indexOf(testItem);

					if (index !== -1) {
						this.formList.splice(index, 1);
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		loadTest(row) {
			var testItem = row.item;
			var currentForm = "form-" + testItem._id;
			
			console.log(currentForm);
			console.log(this.$refs);
			console.log(this.$refs[currentForm]);
			this.$refs[currentForm].show(currentForm);
			if (!testItem.loaded) {
				console.log("load testId = " + testItem._id);
				this.instance
					.get("/forms/" + testItem._id)
					.then(response => {
						console.log("response")
						console.log(response.data);
						var index = this.formList.indexOf(testItem);

						this.formList[index]["questions"] = response.data.data.questions;
						console.log("questions");
						console.log(this.formList[index]);
						Vue.set(testItem, 'loaded', 1);
					})
					.catch(error => {
						console.log(error);
					});
			};
		},
		hidePop(row) {
			var testItem = row.item;
			var currentForm = "form-" + testItem._id;

			console.log(currentForm);
			console.log(this.$refs);
			console.log(this.$refs[currentForm]);
			this.$refs[currentForm].hide(currentForm);

		},
		renewForms() {
			this.instance
				.patch("/forms/")
				.then(response => {
					console.log(response.data.data);
					this.formList.push(response.data.data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};
</script>

<style>
.xmodal {
	overflow: auto;
}
</style>