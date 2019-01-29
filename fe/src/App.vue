<template>
	<div id="app">
		<!-- if login or register page is loaded do not show navbar -->
		<navbarMenu v-if="['login', 'register'].indexOf($route.name) < 0">
			<navbarItem name="Dashboard" navTo="dashboard"></navbarItem>
			<navbarItem name="Formlar" navTo="forms"></navbarItem>
			<navbarItem name="Rapor Sablonu" navTo="report-template"></navbarItem>
			<navbarItem name="Kisiler" navTo="groups"></navbarItem>
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
	},
	mounted() {
		//console.log("asd:" + ['login', 'register'].indexOf(this.$route.name));
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
  overflow-y: auto;
}
</style>
