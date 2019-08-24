<template>
    <v-container>
        <v-row>
            <v-col>
                <span>Spec name: {{this.spec.name}}</span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SpecRepository from '@/components/JS/repository/specRepository'
    import db from '@/firebase/init'

    export default {
        name: "specClassTest",
        data() {
            return {
                spec: {
                    name: ''
                }
            }
        },
        methods: {
            initialize() {
                let spec_id = 'LMIKjPGPnIUuu51WkbyX'
                SpecRepository.getSpecById(spec_id)
                    .then(e => this.spec = e)

            },
            getSpecById(spec_id) {
                // db.collection('test_specs').doc(spec_id).get()
                //     .then(doc => {
                //         let spec = doc.data()
                //         spec.id = doc.id
                //         console.log(spec)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            }
        },
        created() {
            this.initialize()
        }
    }
</script>

<style scoped>

</style>