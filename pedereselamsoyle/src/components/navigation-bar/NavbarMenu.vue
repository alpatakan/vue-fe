<template>
  <div id="navbarContainer">
    <b-navbar toggleable="md" type="dark" variant="info" >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-nav>
        <b-nav-item class="nav-item"
                    :class="{ active: menuItem.isActive }"
                    v-for="menuItem in menuItemsArray"
                      :key="menuItem.name"
                      @click="selectMenuItemAndGo(menuItem)">
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
        menuItemsArray: []
      }
    },
    mounted() {
      console.log('mount edildi navbar');
      this.menuItemsArray = this.$children;
    },
    methods: {
      selectMenuItemAndGo(selectedMenuItem) {
        this.menuItemsArray.forEach(menuItem => {
          menuItem.isActive = (selectedMenuItem == menuItem)
        },
        this.$router.push(selectedMenuItem.navTo))
      }
    }
  }
</script>
