<template>
	<div id="navbarContainer">
		<b-navbar toggleable="md" type="dark" variant="info">
			<b-navbar-nav>
				<b-nav-item class="nav-item"
							:class="{ active: menuItem.isActive }"
							v-for="menuItem in menuItemsArray"
							:key="menuItem.name"
							@click="selectMenuItemAndGo(menuItem)"
				>
					{{ menuItem.name }}
					<b-badge v-if="menuItem.name == 'Dashboard'" variant="light">
						123
					</b-badge>
				</b-nav-item>
			</b-navbar-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown right>
				<!-- Using button-content slot -->
				<template slot="button-content">
					<em>User</em>
				</template>
				<b-dropdown-item @click="signout()">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
		</b-navbar>

		<div id="tabContentContainer">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			menuItemsArray: []
		}
	},
	mounted() {
		console.log('mount edildi navbar');
		this.menuItemsArray = this.$children;
		this.selectFromInitUrl(this.$route.path.replace('/',''));
	},
	methods: {
		...mapActions('account', ['login', 'logout']),
		selectMenuItemAndGo(selectedMenuItem) {
			this.menuItemsArray.forEach(menuItem => {
				menuItem.isActive = (selectedMenuItem == menuItem);
			});
			this.$router.push(selectedMenuItem.navTo);
		},
		selectFromInitUrl(url) {
			this.menuItemsArray.forEach(menuItem => {
				menuItem.isActive = (url == menuItem.navTo);
			});
		},
		signout(){
			this.logout();
			this.$router.push("login");
		}
	}
}
</script>
