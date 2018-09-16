<template>
  <div id="applicationContainer">
    <div id="navBarContainer" class="navbar">
      <ul class="nav">
        <li class="nav-item" :class="{ active: menuItem.isActive }" v-for="menuItem in navItemsArray"><a :href="menuItem.href" @click="selectTabItem(menuItem)">{{ menuItem.name }}</a></li>
      </ul>
    </div>

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
