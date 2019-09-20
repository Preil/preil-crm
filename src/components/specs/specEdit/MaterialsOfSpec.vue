<template>
    <v-row>
        <v-col>
            <v-card class="mb-5">
                <v-card-title class="orange">
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
                        <tr v-for="item in materials" :key="item.material.id">
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

</template>

<script>
    import db from '@/firebase/init'
    import MaterialRepository from '@/components/JS/repository/materialRepository'
    import SpecRepository from '@/components/JS/repository/specRepository'

    export default {
        name: "materialsOfSpec",
        props: ['props'],
        data() {
            return {
                materials: [],
                dialog: false,
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
        created() {
            setTimeout(() => {
                this.initialize()
            }, 300)
        },
        methods: {
            initialize() {
                if (this.props.materials) this.materials = this.props.materials
                MaterialRepository.getMaterials()
                    .then(e => {
                        this.allMaterials = e
                        console.log(this.allMaterials)
                    }).then(() => {
                    this.updateMaterialsUsage()
                })
            },
            editItem(item) {
                this.editedIndex = this.materials.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true

            }
            ,
            deleteItem(item) {
                const index = this.materials.indexOf(item)
                let newMaterials = this.materials.concat()
                confirm('Are you sure you want to delete this item?') &&
                newMaterials.splice(index, 1)
                SpecRepository.updateSpecMaterials(this.props.spec_id, newMaterials)
                    .then(() => {
                        this.materials = newMaterials
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
                    let newMaterials = this.materials.concat()
                    newMaterials[this.editedIndex] = this.editedItem

                    SpecRepository.updateSpecMaterials(this.props.spec_id, newMaterials)
                        .then(() => {
                        Object.assign(this.materials[this.editedIndex], this.editedItem)
                        this.materials.sort((a, b) => a.material.name.localeCompare(b.material.name))
                        this.updateMaterialsUsage()
                        this.close()
                    })
                } else {
                    let newMaterials = []
                    if (this.materials) newMaterials = this.materials.concat()
                    newMaterials.push(this.editedItem)
                    SpecRepository.updateSpecMaterials(this.props.spec_id, newMaterials)
                    .then(() => {
                        this.materials.push(this.editedItem)
                        this.materials.sort((a, b) => a.material.name.localeCompare(b.material.name))
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
                if (this.materials) this.materials.forEach(doc => {
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
        }

    }
</script>

<style scoped>

</style>