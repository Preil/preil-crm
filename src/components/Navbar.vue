<template>
    <nav>
        <v-app-bar text app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Preil </span>
                <span>crm</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" color="grey">
                        <v-icon left></v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn v-if="!userIsAuthenticated" text color="grey" to="/signin">
                <span>Sign In</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
            <v-btn v-if="!userIsAuthenticated" text color="grey" to="/signup">
                <span>Sign Up</span>
                <v-icon right>face</v-icon>
            </v-btn>
            <v-btn v-if="userIsAuthenticated" text color="grey" @click="onLogout">
                <span>Logout</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>

        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img src="/avatar-1.png"/>
                    </v-avatar>
                </v-flex>
                <p class="subheading white--text mt-1 align-center">Ninja</p>


            </v-layout>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>

    export default {
        name: "Navbar",

        data() {
            return {
                drawer: false,
                links: [
                    {icon: 'dashboard', text: 'Dashboard', route: '/'},
                    {icon: 'category', text: 'Products', route: '/products'},
                    {icon: 'folder', text: 'Materials', route: '/materials'},
                    {icon: 'folder', text: 'Specs', route: '/specs'},
                ],
                snackbar: true
            }
        },
        computed: {
            menuItems() {
                let menuItems = [
                    {icon: 'face', title: 'Sign Up', link: '/signup'},
                    {icon: 'lock_open', title: 'Sign in', link: '/signin'}
                ]
                if (this.userIsAuthenticated()) {
                    menuItems = [
                        {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
                        {icon: 'room', title: 'Organize Meetup', link: '/meetups/new'},
                        {icon: 'person', title: 'Profile', link: '/profile'}
                    ]
                }
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        },
        methods: {
            onLogout(){
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<style scoped>

</style>