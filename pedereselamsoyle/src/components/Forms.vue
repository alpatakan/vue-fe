<template>
  <div id="userMenuContentContainer">
    <b-table striped hover :items="itemsList"></b-table>
  </div>
</template>

<script>
  const items = [
    { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
    { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
    { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
  ]

  export default {
    data () {
      return {
        itemsList: items
      }
    },
    mounted() {
      console.log('mount edildi forms');
    }
  }
</script>
