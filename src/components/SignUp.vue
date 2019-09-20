<template>
    <v-container>
        <v-row>
            <v-col class="col-sm-12 col-md-8 offset-2">
                <v-card>
                    <v-card-title>
                        <h3>Register</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="email" label="e-mail"></v-text-field>
                        <v-text-field v-model="password" type="password" label="password"></v-text-field>
                        <v-text-field v-model="confirmPassword" type="password"
                                      label="confirm password" :rules="rules"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="primary" @click="onSignUp">Sign Up</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import fb from '@/firebase/init'

    export default {
        name: 'register',
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                rules: [
                    v=> v===this.password || 'check your password',
                    v=> !!v || 'You must be type on this field'
                ]
            }
        },
        methods: {

            onSignUp () {
                this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        watch: {
            user(value) {
                if(value!==null && value!== undefined) {
                    this.$router.push('/')
                }
            }
        }
    }
</script>

