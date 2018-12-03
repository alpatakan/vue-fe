<template>
	<div>
 		<div id="userMenuContentContainer">
		<!-- Main table element -->
			<b-table show-empty
				 	 ref="table"
				 	 :items="itemsList"
					 :fields="fields"
			>
			<template slot="actions" slot-scope="row">
			<!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
				<b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
					{{ row.detailsShowing ? 'Hide' : 'Show'}} Details
				</b-button>
				<b-button size="sm" v-on:click.stop="removeTest(row.item)" class="mr-1">
					Remove
				</b-button>
			</template>
			<template slot="row-details" slot-scope="row">
				<b-card>
					<b-row class="mb-2">
						<b-col>"asd"</b-col>
					</b-row>
					<b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
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
		instance: {},
      itemsList: [],
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
      ]
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
        this.itemsList = response.data.data;
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
          var index = this.itemsList.indexOf(testItem);

          if (index !== -1) {
            this.itemsList.splice(index, 1);
          }
        })
        .catch(error => {
          console.log(error);
		});
	},
	renewForms() {
		this.instance
			.patch("/forms/")
			.then(response => {
				console.log(response.data.data);
				this.itemsList.push(response.data.data);
			})
			.catch(error => {
				console.log(error);
			});
	}
  }
};
</script>
