<template>
  <div id="individualTabContentContainer" v-show="isActive" class="jumbotron">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      name: { required: true },
      selected: { default: false }
    },
    data() {
      return {
        isActive: false
      }
    },
    computed: {
      href() {
        return '#' + this.name.toLowerCase().replace(/ /g, '-')
      }
    },
    mounted() {
      this.isActive = this.selected
    }
  }
</script>
