<template>
	<b-container>
    	<!-- User Interface controls -->
		<br/>
		<b-row>
			<b-col sm="9">
				<b-form-group horizontal label="" class="mb-1">
					<b-input-group>
						<b-form-input v-model="filter" placeholder="Arama.." />
						<b-input-group-append>
							<b-btn :disabled="!filter" @click="filter = ''">Temizle</b-btn>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>
		</b-row>
		<!-- Main table element -->
			<b-table show-empty
					 ref="table"
					 :items="groupList"
					 :fields="fields"
					 :filter="filter"
			>
			<template slot="actions" slot-scope="row">
				<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
				<b-button size="sm" @click.stop="loadTest(row)" class="mr-2">
					{{ row.item.showModal ? 'Hide' : 'Show'}} Details
				</b-button>
				<b-button :to="'edit'" size="sm" class="mr-1">
					Edit
				</b-button>
				<b-button size="sm" v-on:click.stop="removeTest(row.item)" class="mr-1">
					Remove
				</b-button>
			</template>
			<template slot="row-details" slot-scope="row">
				<img v-show="!row.item.loaded" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
				<br/> buraya tablo falan gelcek grup icerigini gosteren
			</template>
		</b-table>

		<button v-on:click.stop="renewForms()" class="btn">
			getir
		</button>
	</b-container>
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
			groupList: [],
			instance: {},
			fields: [
				{
					key: "name",
					label: "Gruplar",
					sortable: true,
					sortDirection: "desc"
				},
				{
					key: "metadata.count",
					label: "Kisi Sayisi",
					sortable: true,
					class: "text-center"
				},
				{ key: "actions", label: "Aksiyonlar" }
			],
			filter: null,
		};
	},
	mounted() {
		this.instance = axios.create({
			baseURL: "http://18.188.73.107:7890/api/v1",
			timeout: 1000,
			headers: {
				"x-auth-token": JSON.parse(localStorage.getItem('user')).token
			},
			results: []
		});

		console.log("mount edildi groups");

		this.instance
			.get("/groups/")
			.then(response => {
				this.groupList = response.data.data;
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		removeTest(testItem) {
			console.log("remove testId = " + testItem._id);
			this.instance
				.delete("/groups/" + testItem._id)
				.then(response => {
					console.log(response);
					var index = this.groupList.indexOf(testItem);
					if (index !== -1) {
						this.groupList.splice(index, 1);
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		loadTest(row) {
			row.toggleDetails();
			var groupItem = row.item;
			if (!groupItem.loaded) {
				console.log("load groupId = " + groupItem._id);
				this.instance
					.get("/groups/" + groupItem._id)
					.then(response => {
						console.log("response")
						console.log(response.data);
						var index = this.groupList.indexOf(groupItem);

						this.groupList[index]["questions"] = response.data.data.questions;
						console.log("questions");
						console.log(this.groupList[index]);
						Vue.set(groupItem, 'loaded', 1);
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
				.patch("/groups/")
				.then(response => {
					console.log(response.data.data);
					this.groupList.push(response.data.data);
				})
				.catch(error => {
					console.log(error);
				});
		},
	}
};
</script>

<style>
.xmodal {
	overflow: auto;
}
</style>