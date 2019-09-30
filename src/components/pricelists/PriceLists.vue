<template>
    <v-container>
        <v-card>
            <v-card-title class="lighten-1 purple white--text">
                Prices
            </v-card-title>
            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="priceLists"
                        :search="search"
                        sort-by="name"

                >
                    <template v-slot:top>
                        <v-toolbar class="mt-3" flat color="white">
                            <v-toolbar-title>Price Lists</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="800px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="purple lighten-1" dark class="mb-2" v-on="on">New Item</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container grid-list-md>
                                            <v-layout wrap>
                                                <v-flex xs12 sm12 md12>
                                                    <v-text-field v-model="editedItem.name"
                                                                  label="Price list name"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12>
                                                    <v-text-field v-model="editedItem.description"
                                                                  label="Description"></v-text-field>
                                                </v-flex>
                                            </v-layout>


                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="save" @keydown.enter="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-layout>
                            <v-flex>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon
                                                small
                                                class="mr-2"
                                                @click="copyItem(item)"
                                                v-on="on">
                                            mdi-content-copy
                                        </v-icon>
                                    </template>
                                    <span>copy</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon
                                                small
                                                class="mr-2"
                                                @click="editItem(item)"
                                                v-on="on">
                                            edit
                                        </v-icon>
                                    </template>
                                    <span>edit</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-icon
                                                small
                                                class="mr-2"
                                                @click="deleteItem(item)"
                                                v-on="on">
                                            delete
                                        </v-icon>
                                    </template>
                                    <span>delete</span>
                                </v-tooltip>
                            </v-flex>
                        </v-layout>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>



    </v-container>

</template>

<script>
    import db from '@/firebase/init'
    import priceListRepository from '@/components/JS/repository/priceListRepository'

    export default {
        name: 'PriceLists',
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
                {text: 'Description', value: 'description'},
                // {text: 'Units', value: 'units'},
                // {text: 'Description', value: 'description'},
                {text: 'Actions', value: 'action', sortable: false, width: "1%"},
            ],
            priceLists: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                description: ''
            },
            defaultItem: {
                name: '',
                description: ''
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                priceListRepository.getpriceLists()
                    .then(e => this.priceLists = e)
            },

            editItem(item) {
                this.editedIndex = this.priceLists.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            copyItem(item) {
                this.editedIndex = -1
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.priceLists.indexOf(item)
                const id = this.priceLists[index].id
                confirm('Are you sure you want to delete this item?') &&
                priceListRepository.deletePriceList(this.priceLists[index].id)
                    .then(() => this.priceLists.splice(index, 1))
                    .catch(err => console.log(err))

            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {

                    priceListRepository.updatePriceList(
                        {
                            id: this.priceLists[this.editedIndex].id,
                            name: this.editedItem.name,
                            description: this.editedItem.description
                        }).then(() => {
                        Object.assign(this.priceLists[this.editedIndex], this.editedItem)

                    }).catch(err => console.log(err))
                    this.close()
                } else {
                    priceListRepository.addPriceList({
                        name: this.editedItem.name,
                        description: this.editedItem.description
                    }).then(id => {
                        this.editedItem.id = id
                        this.priceLists.push(this.editedItem)
                        this.close()
                    })
                        .catch(err => console.log(err))
                }

            },
        },
    }
</script>
<style scoped>

</style>