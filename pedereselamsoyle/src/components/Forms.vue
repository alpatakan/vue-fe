<template>
  <div id="userMenuContentContainer">
    <!-- Main table element -->
    <b-table show-empty
             ref="table"
             :items="itemsList"
             :fields="fields"
    >
      <template slot="actions" slot-scope="row">
       <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
       <b-button size="sm" v-on:click.stop="removeTest(row.item)" class="mr-1">
         sil
       </b-button>
     </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

  const items = [
    { id: '1', testName: 'Macellan', questionCount: 40 },
    { id: '2', testName: 'Kisilik Testi', questionCount: 30 },
    { id: '3', testName: 'Mesleki Egitim', questionCount: 20 },
  ]

  var instance = axios.create({
    baseURL: 'http://192.168.0.37:7890/api/v1',
    timeout: 1000,
    headers: {'x-auth-token': 'eyJhbGciOiJIUzUxMiJ9.eyJjbGllbnRUeXBlIjoidXNlciIsInRva2VuX2V4cGlyYXRpb25fZGF0ZSI6MTU0MjA0Njg1NzY4MiwiZXhwIjoxNTQyMDQ2ODU3LCJ1c2VySWQiOiI1YmU4NzJlNDgwNTgzZTIwNDJjZTQ0MTciLCJ1c2VybmFtZSI6IkFsaSBEZXNpZGVybyIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImhvdXIiOjIxLCJtaW51dGUiOjIwLCJzZWNvbmQiOjU3LCJuYW5vIjo2ODIwMDAwMDAsIm1vbnRoVmFsdWUiOjExLCJkYXlPZk1vbnRoIjoxMSwiZGF5T2ZXZWVrIjoiU1VOREFZIiwiZGF5T2ZZZWFyIjozMTUsInllYXIiOjIwMTgsIm1vbnRoIjoiTk9WRU1CRVIiLCJjaHJvbm9sb2d5Ijp7ImNhbGVuZGFyVHlwZSI6Imlzbzg2MDEiLCJpZCI6IklTTyJ9fX0.1w9-bqbsVtUKB4xjsKBajhjnc1LcSQBxnSMbvRvl4S56aC0Z_Mv3X6dgs3gWKfIX4L2zbKcEHAq1YMTRf-sWIw'},
    results: []
  });

  export default {
    data () {
      return {
        itemsList: [],
        fields: [
          { key: 'name', label: 'Testler', sortable: true, sortDirection: 'desc' },
          { key: 'metadata.count', label: 'Soru Sayisi', sortable: true, 'class': 'text-center' },
          { key: 'actions', label: 'Aksiyonlar' }
        ],
      }
    },
    mounted() {
      console.log('mount edildi forms');
      instance.get('/forms/')
        .then((response) => {
          console.log(response.data.data);
          this.itemsList = response.data.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
    methods: {
      removeTest(testItem) {
        console.log('remove testId = ' + testItem._id)
        instance.delete('/forms/' + testItem._id)
          .then((response) => {
            console.log(response);
            var index = this.itemsList.indexOf(testItem);

            if (index !== -1) {
              this.itemsList.splice(index, 1)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }
  }
</script>
