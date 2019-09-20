<template>
    <v-container>
    <v-card>
        <v-card-title class="light-green white--text">
            Products
        </v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="products"
                    :search="search"
                    sort-by="group"

            >
                <template v-slot:top>
                    <v-toolbar flat color="white" class="mt-3">
                        <!--<v-toolbar-title>Products</v-toolbar-title>-->

                        <v-text-field class="left"
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="light-green" dark class="mb-2 " v-on="on">New Item</v-btn>
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
                                                              label="Product name"></v-text-field>
                                            </v-flex>


                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="editedItem.group" label="Group"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="editedItem.units" label="Units"></v-text-field>
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
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
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
                        <router-link :to="{ name: 'Product', params: { product_id: item.id } }">
                            <v-icon
                                    small
                                    class="mr-2"
                            >
                                visibility
                            </v-icon>
                        </router-link>
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
    import ProductRepository from '@/components/JS/repository/productRepository'

    export default {
        name: 'ProductsList',
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
                {text: 'Group', value: 'group'},
                {text: 'Type', value: 'type'},
                {text: 'Units', value: 'units'},
                {text: 'Description', value: 'description'},
                {text: 'Actions', value: 'action', sortable: false, width: "1%"},
            ],
            products: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                group: '',
                type: '',
                units: '',
                description: ''
            },
            defaultItem: {
                name: '',
                group: '',
                type: '',
                units: '',
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

                ProductRepository.getProducts()
                    .then(e => {
                        this.products = e

                    })
            },
            showAlert(a) {
                if (event.target.classList.contains('btn__content')) return;
                alert('Alert! \n' + a.name);
            },

            editItem(item) {
                this.editedIndex = this.products.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.products.indexOf(item)
                const id = this.products[index].id
                confirm('Are you sure you want to delete this item?') &&
                ProductRepository.delete(id)
                    .then(() => {
                        this.products.splice(index, 1)
                    })
                    .catch(err => {
                        console.log(err)
                    })


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
                    ProductRepository.update({
                        id: this.products[this.editedIndex].id,
                        name: this.editedItem.name,
                        group: this.editedItem.group,
                        type: this.editedItem.type,
                        units: this.editedItem.units,
                        description: this.editedItem.description
                    }).then(() => {
                        Object.assign(this.products[this.editedIndex], this.editedItem)
                        this.close()
                    })
                } else {
                    console.log
                    ProductRepository.add({
                        name: this.editedItem.name,
                        group: this.editedItem.group,
                        type: this.editedItem.type,
                        units: this.editedItem.units,
                        description: this.editedItem.description,
                    }).then((id) => {
                        console.log(id)
                        this.editedItem.id = id
                        this.products.push(this.editedItem)
                        this.close()
                    }).catch(err => {
                        console.log(err)
                    })
                }

            },
        },
    }
</script>
<style scoped>

</style>