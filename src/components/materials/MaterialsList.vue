<template>
    <v-container>

        <v-data-table
                :headers="headers"
                :items="materials"
                sort-by="group"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Materials</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
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
                                                          label="Material name"></v-text-field>
                                        </v-flex>


                                        <v-flex xs12 sm6 md6>
                                            <v-text-field v-model="editedItem.group" label="Group"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
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
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>

    </v-container>

</template>

<script>
    import db from '@/firebase/init'
    export default {
        name: 'MaterialsList',
        data: () => ({
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
                {text: 'Description', value: 'description'},
                {text: 'Actions', value: 'action', sortable: false, width: "1%"},
            ],
            materials: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                group: '',
                type: '',
                description: ''
            },
            defaultItem: {
                name: '',
                group: '',
                type: '',
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
                db.collection('materials').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            let material = doc.data()
                            material.id = doc.id
                            this.materials.push(material)
                        })
                    })
            },
            initialize2() {
                this.materials = [
                    {
                        name: 'Polyester resin (construction)',
                        group: 'Resins',
                        type: 'Ortho',
                        description: 'Ordinary type polyester resin, normal viscosity'
                    },
                    {
                        name: 'Polyester resin liquid (construction) ',
                        group: 'Resins',
                        type: 'Ortho & DCPD',
                        description: 'Ordinary type polyester resin, low viscosity'
                    },
                    {
                        name: 'Polyester resin for winding ',
                        group: 'Resins',
                        type: 'Tere',
                        description: 'Tn polyester resin, low viscosity'
                    },
                    {
                        name: 'Polyester resin DCPD',
                        group: 'Resins',
                        type: 'DCPD',
                        description: 'High quality polyester resin'
                    },
                    {
                        name: 'Chemical resistant resin',
                        group: 'Resins',
                        type: 'ISO',
                        description: 'Polyester resin with medium chemical resistance'
                    },
                    {
                        name: 'Vynilester resin',
                        group: 'Resins',
                        type: 'Vynil',
                        description: 'High chemical resistance resin'
                    },
                    {
                        name: 'GSM 300',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Chopped strength mat'
                    },
                    {
                        name: 'GSM 450',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Chopped strength mat'
                    },
                    {
                        name: 'GSM 600',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Chopped strength mat'
                    },
                    {
                        name: 'WR 400',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Woven roving'
                    },
                    {
                        name: 'WR 500',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Woven roving'
                    },
                    {
                        name: 'WR 600',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Woven roving'
                    },
                    {
                        name: 'WR 800',
                        group: 'Glass',
                        type: 'E-glass',
                        description: 'Woven roving'
                    },
                ]
            },

            editItem(item) {
                this.editedIndex = this.materials.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.materials.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.materials.splice(index, 1)
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
                    Object.assign(this.materials[this.editedIndex], this.editedItem)
                } else {
                    console.log
                    db.collection('materials').add({
                        name: this.editedItem.name,
                        group: this.editedItem.group,
                        type: this.editedItem.type,
                        description: this.editedItem.description,
                    }).then(()=>{
                        this.materials.push(this.editedItem)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                this.close()
            },
        },
    }
</script>
<style scoped>

</style>