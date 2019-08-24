<template>
    <!--todo: Use this component to edit specification, also use components: materialsOfSpec, productsOfSpec -->
    <v-container>
        <v-row row class="mb-5">
            <v-col>
                <v-card>
                    <v-card-title class="light-green white--text">
                        <h2> {{ spec.name }}</h2>
                    </v-card-title>
                    <v-card-text class="mt-3 pb-0 mb-0">
                        <span class="headline text--primary">{{spec.product.name}}</span>
                        <span class="title float-right">Status: {{ spec.status }}</span>
                        <p class="mt-2 mb-0">{{spec.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog2" max-width="600px">
                            <template v-slot:activator="{ on }">
                                <!--<v-btn color="primary" dark v-on="on">Open Dialog</v-btn>-->
                                <span class="float-right pointer"
                                      style="cursor: pointer"
                                      v-on="on">
                            <v-icon>edit</v-icon>
                        </span>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit specification</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-text-field
                                                        v-model="spec.name"
                                                        label="Specification name*" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-textarea
                                                        v-model="spec.description"
                                                        label="Description"
                                                        hint="type some description here"></v-textarea>

                                            </v-col>

                                            <v-col cols="12" sm="12">
                                                <v-select
                                                        v-model="spec.status"
                                                        :items="['default', '-']"
                                                        label="Status"
                                                        required
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="dialog2 = false">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <!--<products-of-spec :props="productsProps"/>-->
        <materials-of-spec :props="materialsProps"/>
    </v-container>

</template>

<script>
    import MaterialsOfSpec from '@/components/specs/specEdit/MaterialsOfSpec'
    import ProductsOfSpec from '@/components/specs/specEdit/ProductsOfSpec'
    import SpecRepository from "../components/JS/repository/specRepository";

    export default {
        name: "SpecEdit",
        components: {
            MaterialsOfSpec,
            // ProductsOfSpec
        },
        data() {
            return {
                dialog2: false,
                spec: {
                    name: 'Spec name',
                    description: 'Spec description',
                    status: 'Spec status',
                    product: {
                        name: 'Product'
                    },
                    materials: [
                        {material: {id: '111', name: 'testMaterial1', units: 'kg'}, quantity: 1},
                        {material: {id: '222', name: 'testMaterial2', units: 'kg'}, quantity: 2},
                        {material: {id: '333', name: 'testMaterial3', units: 'kg'}, quantity: 3},

                    ]

                },
                materialsProps: {
                    spec_id: '',
                    materials: []
                },
                productsProps: {
                    spec_id: '',
                    products: []
                },
            }
        },

        created() {
            this.initialize(this.$route.params.spec_id)
        },
        methods: {
            initialize(spec_id) {
                SpecRepository.getSpecById(spec_id).
                then(e => {
                    this.spec = e
                    console.log(this.spec)
                    this.materialsProps.spec_id = spec_id
                    this.materialsProps.materials = this.spec.materials
                    console.log('props')
                    console.log(this.materialsProps)
                    this.productsProps.spec_id = spec_id
                    this.productsProps.products = this.spec.products
                })
            }
        }
    }
</script>

<style scoped>

</style>