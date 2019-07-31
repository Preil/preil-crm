<template>
    <v-container>

        <v-card>
            <v-card-title>
                Спецификации
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="specs"
                    :search="search"
            >
                <template v-slot:item.action="{ item }">
                    <v-layout>
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                class="mr-2"
                                @click="deleteItem(item)"
                        >
                            delete
                        </v-icon>
                        <router-link :to="{ name: 'Spec', params: { spec_id: item.id } }">
                            <v-icon
                                    small
                                    class="mr-2"
                            >
                                visibility
                            </v-icon>
                        </router-link>
                    </v-layout>
                </template>
            </v-data-table>
        </v-card>
    </v-container>

</template>

<script>
    import db from '@/firebase/init'

    export default {
        name: 'SpecsList',
        data: () => ({
            search: '',
            dialog: false,
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    sortable: true,
                    value: 'name',
                },
                {text: 'Product name', value: 'product_name'},
                {text: 'Status', value: 'status'},
                {text: 'Description', value: 'description'},
                {text: 'Actions', value: 'action', sortable: false, width: "1%"},
            ],
            specs: [
                // {
                //     name: 'Спецификация 1',
                //     description: 'описание спецификации 1',
                //     status: 'default'
                // },
                // {
                //     name: 'Спецификация 2',
                //     description: 'описание спецификации 2',
                //     status: ''
                // },

            ]

        }),


        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                db.collection('specs').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            let spec = doc.data()
                            spec.id = doc.id
                            this.specs.push(spec)
                        })
                    })
            }
        }
    }
</script>
<style scoped>

</style>