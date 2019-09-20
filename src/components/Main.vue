<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-flex xs12>

            </v-flex>

            <v-flex mb-4>
                <h1 class="display-2 font-weight-bold mb-3">
                    Welcome
                    <span v-if="user">{{user.email}}</span>
                </h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            user() {
                return this.$store.getters.user
            }
        },


    }
</script>
