<template>
    <v-row>
        <v-col cols="12" sm="12" md="8">
            <v-card class="mb-5">
                <v-card-title class="light-green white--text lighten-1">
                    <span>Consist of</span>
                </v-card-title>
                <v-card-text>
                    <v-simple-table dense>
                        <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Specification</th>
                            <th class="text-left">Quantity</th>
                            <th>Units</th>
                            <th class="text-left"></th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in productsOfSpec" :key="item.product.id">
                            <td>{{ item.product.name }}</td>
                            <td class="text-right">{{ item.spec.name }}</td>
                            <td class="text-right">{{ item.quantity }}</td>
                            <td>{{ item.product.units }}</td>
                            <td>
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
                                </v-layout>
                            </td>

                        </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-layout>
                        <v-flex>
                            <v-dialog v-model="dialogEditProducts" max-width="800px">
                                <template v-slot:activator="{ on }">
                                        <span class="float-right pointer"
                                              style="cursor: pointer"
                                              v-on="on">
                                            <v-icon>add</v-icon>
                                        </span>

                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Add | Edit products</span>
                                    </v-card-title>

                                    <v-card-text>

                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <v-autocomplete
                                                        ref="unUsedProducts"
                                                        v-model="editedItem.product"
                                                        :rules="[() => !!editedItem.product|| 'This field is required']"
                                                        :items="unUsedProducts"
                                                        item-text="name"
                                                        label="Product"
                                                        @change="getSpecsOfProduct(editedItem.product.id)"
                                                        :placeholder="editedItem.product.name"
                                                        return-object
                                                        required
                                                ></v-autocomplete>
                                            </v-flex>

                                            <v-flex xs12 sm12 md12>
                                                <v-autocomplete
                                                        ref="unUsedProducts"
                                                        v-model="editedItem.spec"
                                                        :rules="[() => !!editedItem.spec|| 'This field is required']"
                                                        :items="productSpecs"
                                                        item-text="name"
                                                        label="Select Spec"
                                                        :placeholder="editedItem.spec.name"
                                                        return-object
                                                        required
                                                ></v-autocomplete>
                                            </v-flex>


                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="editedItem.quantity"
                                                              label="Quantity"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <span>{{editedItem.product.units}}</span>
                                            </v-flex>

                                        </v-layout>

                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                        </v-flex>
                    </v-layout>

                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import ProductRepository from '@/components/JS/repository/productRepository'
    import SpecRepository from '@/components/JS/repository/specRepository'

    export default {
        name: "productsOfSpec",
        props: ['props'],
        data() {
            return {
                productsOfSpec: [],
                productSpecs: [],
                dialogEditProducts: false,
                editedIndex: -1,
                editedItem: {
                    product: {
                        id: '',
                        name: '',
                        units: ''
                    },
                    spec: {
                        id: '',
                        name: ''
                    },
                    quantity: ''

                },
                defaultItem: {
                    product: {
                        id: '',
                        name: '',
                        units: ''
                    },
                    spec: {
                        id: '',
                        name: ''
                    },
                    quantity: ''

                },
                unUsedProducts: [],
                allProducts: [],
                usedProducts: []

            }
        },
        created() {
            setTimeout(() => {
                this.initialize()
            }, 300)
        },

        methods: {
            initialize() {
                if(this.props.products) {
                    this.productsOfSpec = this.props.products
                    console.log(this.props.products)
                }
                ProductRepository.getProducts()
                    .then(e => {
                        this.allProducts = e
                        // console.log(this.allProducts)
                    }).then(() => {
                    this.updateProductsUsage()
                })
            }
            ,
            editItem(item) {
                this.editedIndex = this.productsOfSpec.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogEditProducts = true

            }
            ,
            deleteItem(item) {
                const index = this.productsOfSpec.indexOf(item)
                let newProducts = this.productsOfSpec.concat()
                confirm('Are you sure you want to delete this item?') &&
                newProducts.splice(index, 1)
                SpecRepository.updateSpecProducts(this.props.spec_id, newProducts)
                    .then(() => {
                        this.productsOfSpec = newProducts
                        this.updateProductsUsage()
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
            ,
            close() {
                this.dialogEditProducts = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            }
            ,
            save() {
                if (this.editedIndex > -1) {
                    let newProducts = this.productsOfSpec.concat()
                    newProducts[this.editedIndex] = this.editedItem

                    SpecRepository.updateSpecProducts(this.props.spec_id, newProducts)
                        .then(() => {
                        Object.assign(this.productsOfSpec[this.editedIndex], this.editedItem)
                        this.productsOfSpec.sort((a, b) => a.product.name.localeCompare(b.product.name))
                        this.updateProductsUsage()
                        this.close()
                    })
                } else {
                    let newProducts = []
                    if (this.productsOfSpec) newProducts = this.productsOfSpec.concat()
                    newProducts.push(this.editedItem)
                    SpecRepository.updateSpecProducts(this.props.spec_id, newProducts)
                        .then(() => {
                        this.productsOfSpec.push(this.editedItem)
                        this.productsOfSpec.sort((a, b) => a.product.name.localeCompare(b.product.name))
                        this.updateProductsUsage()
                        this.close()
                    }).catch(err => {
                        console.log(err)
                    })
                }

            },
            getSpecsOfProduct(product_id) {
                SpecRepository.getSpecsOfProduct(product_id)
                    .then((e) => {
                        this.productSpecs = e
                        console.log(this.productSpecs)
                        console.log(product_id)
                    })
            }
            ,
            updateProductsUsage() {
                this.unUsedProducts.length = 0
                this.usedProducts.length = 0
                if (this.productsOfSpec) this.productsOfSpec.forEach(doc => {
                    let product = {}
                    product.id = doc.product.id
                    product.name = doc.product.name
                    product.units = doc.product.units
                    this.usedProducts.push(product)
                })
                this.allProducts.forEach(doc => {
                    if (!this.usedProducts.filter(el => {
                        return el.id === doc.id
                    }).length > 0) {
                        this.unUsedProducts.push(doc)
                    }
                })
                this.unUsedProducts.sort((a, b) => a.name.localeCompare(b.name))
            }
        }

    }
</script>

<style scoped>

</style>