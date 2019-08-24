<template>
    <!--todo: Change this component to view specification, not edit-->
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

        <!--Material list-->

        <v-row>
            <v-col cols="12" sm="12" md="8">
                <v-card class="mb-5">
                    <v-card-title class="grey lighten-1">
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
                            <tr v-for="item in spec.products" :key="item.product.name">
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
                                            <span class="headline">Add | Edit materials</span>
                                        </v-card-title>

                                        <v-card-text>

                                            <v-layout wrap>
                                                <v-flex xs12 sm12 md12>
                                                    <!--<v-text-field v-model="editedItem.name"-->
                                                    <!--label="Material name"></v-text-field>-->
                                                    <v-autocomplete
                                                            ref="unUsedMaterials"
                                                            v-model="editedItem.material"
                                                            :rules="[() => !!editedItem.material|| 'This field is required']"
                                                            :items="unUsedMaterials"
                                                            item-text="name"
                                                            label="Material"
                                                            :placeholder="editedItem.material.name"
                                                            return-object
                                                            required
                                                    ></v-autocomplete>
                                                </v-flex>


                                                <v-flex xs12 sm6 md6>
                                                    <v-text-field v-model="editedItem.quantity"
                                                                  label="Quantity"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md6>
                                                    <span>{{editedItem.material.units}}</span>
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
        <v-row>
            <v-col>
                <v-card class="mb-5">
                    <v-card-title class="grey lighten-1">
                        <span>Materials</span>
                    </v-card-title>
                    <v-card-text>
                        <v-simple-table dense>
                            <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Quantity</th>
                                <th>Units</th>
                                <th class="text-left"></th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in spec.materials" :key="item.material.name">
                                <td>{{ item.material.name }}</td>
                                <td class="text-right">{{ item.quantity }}</td>
                                <td>{{ item.material.units }}</td>
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
                                <v-dialog v-model="dialog" max-width="800px">
                                    <template v-slot:activator="{ on }">
                                        <span class="float-right pointer"
                                              style="cursor: pointer"
                                              v-on="on">
                                            <v-icon>add</v-icon>
                                        </span>

                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Add | Edit materials</span>
                                        </v-card-title>

                                        <v-card-text>

                                            <v-layout wrap>
                                                <v-flex xs12 sm12 md12>
                                                    <!--<v-text-field v-model="editedItem.name"-->
                                                    <!--label="Material name"></v-text-field>-->
                                                    <v-autocomplete
                                                            ref="unUsedMaterials"
                                                            v-model="editedItem.material"
                                                            :rules="[() => !!editedItem.material|| 'This field is required']"
                                                            :items="unUsedMaterials"
                                                            item-text="name"
                                                            label="Material"
                                                            :placeholder="editedItem.material.name"
                                                            return-object
                                                            required
                                                    ></v-autocomplete>
                                                </v-flex>


                                                <v-flex xs12 sm6 md6>
                                                    <v-text-field v-model="editedItem.quantity"
                                                                  label="Quantity"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md6>
                                                    <span>{{editedItem.material.units}}</span>
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

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <h3>ToDo:</h3>
                    </v-card-title>
                    <v-card-text>
                        <ul>
                            <li>Edit spec data</li>
                            <li>Add/Remove consisted products</li>
                            <li>Create bill of materials</li>
                            <ul>
                                <li>Create reports section</li>
                            </ul>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>


    </v-container>
</template>

<script>
    import db from '@/firebase/init'
    import Product from "../products/ProductData";

    export default {
        name: "SpecData",
        components: {Product},
        data() {
            return {
                dialog: false,
                dialog2: false,
                dialogEditProducts: false,
                spec: {
                    name: '',
                    product: {
                        name: '',
                        id: ''
                    },
                    status: '',
                    description: '',
                    products: [
                        {
                            product: {id: 'flange100', name: 'Flange 100', units: 'psc.'},
                            spec: {id: 'flange100', name:'Spec Flange 100'},
                            quantity: 24
                        },
                        {
                            product: {id: 'flange150', name: 'Flange 150', units: 'psc.'},
                            spec: {id: 'flange150', name:'Spec Flange 150'},
                            quantity: 2
                        }
                    ],
                    materials: []

                },
                editedIndex: -1,
                editedItem: {
                    material: {
                        id: '',
                        name: '',
                        units: ''
                    },
                    quantity: ''

                },
                defaultItem: {
                    material: {
                        id: '',
                        name: '',
                        units: ''
                    },
                    quantity: ''

                },
                unUsedMaterials: [],
                allMaterials: [],
                usedMaterials: []

            }
        },
        methods: {
            initialize(spec_id) {
                let usedMaterials = []
                db.collection('test_specs').doc(spec_id).get()
                    .then(doc => {
                            this.spec = doc.data()
                            this.spec.id = doc.id
                            this.spec.materials.sort((a, b) => a.material.name.localeCompare(b.material.name))
                            this.spec.materials.forEach(el => {
                                let usedMaterial = {}
                                usedMaterial.id = el.material.id
                                usedMaterial.name = el.material.name
                                usedMaterial.units = el.material.units
                                usedMaterials.push(usedMaterial)
                            })
                        console.log(this.spec)

                            this.usedMaterials = usedMaterials
                            let allMaterials = []
                            db.collection('materials').get()
                                .then(snapshot => {
                                    snapshot.forEach(doc => {
                                        let material = {}
                                        material.id = doc.id
                                        material.name = doc.data().name
                                        material.units = doc.data().units
                                        if (!usedMaterials.filter(el => {
                                            return el.id === material.id
                                        }).length > 0) {
                                            this.unUsedMaterials.push(material)
                                        }
                                        allMaterials.push(material)
                                    })
                                    this.allMaterials = allMaterials
                                    this.unUsedMaterials.sort((a, b) => a.name.localeCompare(b.name))
                                }).catch(err => {
                                console.log(err)
                            })
                        }
                    )
                    .catch(err => {
                        console.log(err)
                    })
            },
            editItem(item) {
                this.editedIndex = this.spec.materials.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true

            }
            ,
            deleteItem(item) {
                const index = this.spec.materials.indexOf(item)
                let newMaterials = this.spec.materials.concat()
                confirm('Are you sure you want to delete this item?') &&
                newMaterials.splice(index, 1)
                db.collection('test_specs').doc(this.spec.id).update({
                    materials: newMaterials
                })
                    .then(() => {
                        this.spec.materials = newMaterials
                        this.updateMaterialsUsage()
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
            ,
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            }
            ,
            save() {
                if (this.editedIndex > -1) {
                    let newMaterials = this.spec.materials.concat()
                    newMaterials[this.editedIndex] = this.editedItem
                    db.collection('test_specs').doc(this.spec.id).update({
                        materials: newMaterials
                    }).then(() => {
                        Object.assign(this.spec.materials[this.editedIndex], this.editedItem)
                        this.spec.materials.sort((a, b) => a.material.name.localeCompare(b.material.name))
                        this.updateMaterialsUsage()
                        this.close()
                    })
                } else {
                    let newMaterials = this.spec.materials.concat()
                    newMaterials.push(this.editedItem)
                    db.collection('test_specs').doc(this.spec.id).update({
                        materials: newMaterials
                    }).then(() => {
                        this.spec.materials.push(this.editedItem)
                        this.spec.materials.sort((a, b) => a.material.name.localeCompare(b.material.name))
                        this.updateMaterialsUsage()
                        this.close()
                    }).catch(err => {
                        console.log(err)
                    })
                }

            },
            updateMaterialsUsage() {
                this.unUsedMaterials.length = 0
                this.usedMaterials.length = 0
                this.spec.materials.forEach(doc => {
                    let material = {}
                    material.id = doc.material.id
                    material.name = doc.material.name
                    material.units = doc.material.units
                    this.usedMaterials.push(material)
                })
                this.allMaterials.forEach(doc => {
                    if (!this.usedMaterials.filter(el => {
                        return el.id === doc.id
                    }).length > 0) {
                        this.unUsedMaterials.push(doc)
                    }
                })


                this.unUsedMaterials.sort((a, b) => a.name.localeCompare(b.name))
            }
        },
        created() {
            this.initialize(this.$route.params.spec_id)
        }

    }
</script>

<style scoped>

</style>