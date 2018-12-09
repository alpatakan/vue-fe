<template>
	<div>
 		<div id="userMenuContentContainer">
		<!-- Main table element -->
			<b-table show-empty
					 ref="table"
					 :items="formMetaList"
					 :fields="fields"
			>
			<template slot="actions" slot-scope="row">
				<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
				<b-button size="sm" @click.stop="row.toggleDetails" @click="loadTest(row.item)" class="mr-2">
					{{ row.detailsShowing ? 'Hide' : 'Show'}} Details
				</b-button>
				<b-button size="sm" v-on:click.stop="removeTest(row.item)" class="mr-1">
					Remove
				</b-button>
			</template>
			<template slot="row-details" slot-scope="row">
				<b-card>
					<b-row class="mb-2">
						<img v-show="!row.item.loaded" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
					</b-row>
				</b-card>
			</template>
		</b-table>
		</div>
		<button v-on:click.stop="renewForms()" class="btn">
			getir
		</button>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			formMetaList: [],
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
				console.log(response.data.data);
				this.formMetaList = response.data.data;
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
					var index = this.formMetaList.indexOf(testItem);

					if (index !== -1) {
						this.formMetaList.splice(index, 1);
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		loadTest(testItem) {
			console.log("load testId = " + testItem._id);
		},
		renewForms() {
			this.instance
				.patch("/forms/")
				.then(response => {
					console.log(response.data.data);
					this.formMetaList.push(response.data.data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};
</script>
