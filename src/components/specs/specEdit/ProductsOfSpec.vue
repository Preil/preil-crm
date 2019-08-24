<template>
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
                        <tr v-for="item in products" :key="item.product.id">
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
</template>

<script>
    export default {
        name: "productsOfSpec",
        props: ['props'],
        data() {
            return {
                dialogEditProducts: false,
                products: [
                    {
                        product: {id: 'flange100', name: 'Flange 100', units: 'psc.'},
                        spec: {id: 'flange100', name: 'Spec Flange 100'},
                        quantity: 24
                    },
                    {
                        product: {id: 'flange150', name: 'Flange 150', units: 'psc.'},
                        spec: {id: 'flange150', name: 'Spec Flange 150'},
                        quantity: 2
                    }
                ],


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
        }
    }
</script>

<style scoped>

</style>