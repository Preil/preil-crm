<template>
    <v-card>
        <v-card-title class="blue white--text">
            Спецификации
        </v-card-title>

        <!--<v-text-field-->
        <!--v-model="search"-->
        <!--append-icon="search"-->
        <!--label="Search"-->
        <!--single-line-->
        <!--hide-details-->
        <!--&gt;</v-text-field>-->
        <v-card-text>


            <v-data-table
                    :headers="headers"
                    :items="specs"
                    :search="search"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white" class="mt-3">
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
                                <v-btn color="blue" dark class="mb-2" v-on="on">New Item</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Add new</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <v-text-field v-model="editedItem.name"
                                                              label="Specification name"></v-text-field>
                                            </v-flex>

                                            <v-flex xs12 sm12 md12>
                                                <v-autocomplete
                                                        ref="unUsedProducts"
                                                        v-model="editedItem.product"
                                                        :rules="[() => !!editedItem.product|| 'This field is required']"
                                                        :items="products"
                                                        item-text="name"
                                                        label="Product"
                                                        return-object
                                                        required
                                                ></v-autocomplete>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
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
                        <router-link :to="{ name: 'SpecEdit', params: { spec_id: item.id } }">
                            <v-icon
                                    small
                                    class="mr-2"
                            >
                                edit
                            </v-icon>
                        </router-link>
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
        </v-card-text>
    </v-card>

</template>

<script>
    import SpecRepository from '@/components/JS/repository/specRepository'
    import ProductRepository from '@/components/JS/repository/productRepository'

    export default {
        name: 'SpecsList',
        props: ['product_id'],
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
                {text: 'Product name', value: 'product.name'},
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

            ],
            products: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                product: {
                    id: '',
                    name: ''
                },
                status: '',
                description: ''
            },
            defaultItem: {
                name: '',
                product: {
                    id: '',
                    name: ''
                },
                status: '',
                description: ''
            },


        }),

        watch: {
            dialog(val) {
                ProductRepository.getProducts().then(e => this.products = e)
            },
        },

        created() {
            this.initialize()
        },

        methods: {

            initialize() {
                if (this.product_id) {
                    SpecRepository.getSpecsOfProduct(this.product_id).then(e => this.specs = e)
                } else {
                    SpecRepository.getSpecs().then(e => this.specs = e)
                }
            },

            editItem(item) {
                this.editedIndex = this.specs.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            copyItem(item) {
                this.editedIndex = -1
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.specs.indexOf(item)
                const id = this.specs[index].id
                confirm('Are you sure you want to delete this item?') &&
                SpecRepository.delete(id)
                    .then(() => this.specs.splice(index, 1))
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

                    SpecRepository.updateSpec(
                        {
                            id: this.materials[this.editedIndex].id,
                            name: this.editedItem.name,
                            group: this.editedItem.group,
                            type: this.editedItem.type,
                            units: this.editedItem.units,
                            description: this.editedItem.description
                        }).then(() => {
                        Object.assign(this.materials[this.editedIndex], this.editedItem)

                    }).catch(err => console.log(err))
                    this.close()
                } else {
                    SpecRepository.addSpec({
                        name: this.editedItem.name,
                        status: this.editedItem.status,
                        product: {
                            id: this.editedItem.product.id,
                            name: this.editedItem.product.name
                        },
                        description: this.editedItem.description
                    }).then(id => {
                        this.editedItem.id = id
                        this.specs.push(this.editedItem)
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