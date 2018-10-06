<template>
  <div id="app">
    <navbarMenu>
      <navbarItem name="Dashboard" navTo="dashboard" :selected="true"></navbarItem>
      <navbarItem name="Formlar" navTo="forms"></navbarItem>
      <navbarItem name="Rapor Sablonu" navTo="report-template"></navbarItem>
      <navbarItem name="Kisiler" navTo="people"></navbarItem>
      <navbarItem name="Oturumlar" navTo="sessions"></navbarItem>
    </navbarMenu>
    <router-view/>
  </div>
</template>

<script>
  import NavbarMenu from '@/components/navigation-bar/NavbarMenu'
  import NavbarItem from '@/components/navigation-bar/NavbarItem'

  export default {
    name: 'App',
    components: {
      NavbarMenu,
      NavbarItem,
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
