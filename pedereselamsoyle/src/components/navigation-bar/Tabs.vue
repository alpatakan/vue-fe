<template>
  <div id="applicationContainer">
    <b-navbar toggleable="md" type="dark" variant="info" >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-nav>
        <b-nav-item class="nav-item" :class="{ active: menuItem.isActive }" v-for="menuItem in navItemsArray" :key="menuItem.name" :href="menuItem.href" @click="selectTabItem(menuItem)">
          {{ menuItem.name }}
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <div id="tabContentContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navItemsArray: []
      }
    },
    mounted() {
      this.navItemsArray = this.$children
    },
    methods: {
      selectTabItem(passedAlongMenuItemObject) {
        this.navItemsArray.forEach(navItem => {
          navItem.isActive = (passedAlongMenuItemObject == navItem)
        })
      }
    }
  }
</script>
