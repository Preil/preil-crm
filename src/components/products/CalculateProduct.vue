<template>
    <v-container>
        <v-row>
            <v-col>
                <p class="headline">Materials of product</p>
                <p v-model="product.name"></p>
                <v-card>
                    <v-card-title>
                        Testing getProdMaterials function:
                    </v-card-title>
                    <v-card-text>
                        <v-list v-for="row in testProdMaterials">
                            <v-list-item>
                                {{row.material.name}} - {{row.quantity}}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Testing calculateQuantity function:
                    </v-card-title>
                    <v-card-text>
                        <v-list v-for="row in testMaterials">
                            <v-list-item>
                                {{row.material.name}} - {{row.quantity}}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Testing reduceArray method:
                    </v-card-title>
                    <v-card-text>
                        <v-list v-for="row in testArray">
                            <v-list-item>
                                {{row.name}} - {{row.amount}}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                product: {
                    id: 'kol40',
                    name: 'Коллектор 40'
                },
                materialsOfProduct: [],
                testMaterials: [
                    {material: {id: 'testM1', name: 'test material 1'}, quantity: 1},
                    {material: {id: 'testM2', name: 'test material 2'}, quantity: 2},
                    {material: {id: 'testM3', name: 'test material 3'}, quantity: 3},
                ],
                testProdMaterials: [],
                testArray: [
                    {name: 'eve', amount: 1},
                    {name: 'ave', amount: 2},
                    {name: 'vve', amount: 3},
                    {name: 'vve', amount: 4},
                    {name: 'eve', amount: 6},
                ],

                specs:
                    [
                        {
                            id: 'kol40',
                            name: 'Коллектор 40',
                            description: 'описание спецификации 1',
                            status: 'default',
                            products: [
                                {
                                    product: {id: 'flange100', name: 'Flange 100'},
                                    spec: {id: 'flange100', name: 'Flange 100'},
                                    quantity: 24
                                },
                                {
                                    product: {id: 'flange150', name: 'Flange 150'},
                                    spec: {id: 'flange150', name: 'Flange 150'},
                                    quantity: 2
                                },
                                {
                                    product: {id: 'pipe100', name: 'Pipe 100'},
                                    spec: {id: 'pipe100', name: 'Pipe 100'},
                                    quantity: 21.6
                                },
                                {
                                    product: {id: 'pipe150', name: 'Pipe 150'},
                                    spec: {id: 'pipe150', name: 'Pipe 150'},
                                    quantity: 8.8
                                },
                            ],
                            materials: [
                                {material: {id: 'resin', name: 'Resin'}, quantity: 10},
                                {material: {id: 'cm300', name: 'CMat300'}, quantity: 4}
                            ]
                        },
                        {
                            id: 'pipe100',
                            name: 'Pipe 100',
                            description: 'Спецификация труба 100х5.0',
                            status: 'default',
                            products: [],
                            materials: [
                                {material: {id: 'resin', name: 'Resin'}, quantity: 1.5},
                                {material: {id: 'rovingD', name: 'Direct roving'}, quantity: 3.5}
                            ]
                        },
                        {
                            id: 'pipe150',
                            name: 'Pipe 150',
                            description: 'Спецификация труба 150х5.5',
                            status: 'default',
                            products: [],
                            materials: [
                                {material: {id: 'resin', name: 'Resin'}, quantity: 2},
                                {material: {id: 'rovingD', name: 'Direct roving'}, quantity: 4},
                                {material: {id: 'ud-wr500', name: 'Unidirectional WR500 '}, quantity: 0.5}
                            ]
                        },
                        {
                            id: 'flange150',
                            name: 'Flange 150',
                            description: 'Спецификация фланец 150',
                            status: 'default',
                            products: [],
                            materials: [
                                {material: {id: 'resin', name: 'Resin'}, quantity: 3},
                                {material: {id: 'rovingSp', name: 'Spray-up roving'}, quantity: 0.75},
                                {material: {id: 'tri-hydr', name: 'Aluminium tri-hydrate '}, quantity: 0.75}
                            ]
                        },
                        {
                            id: 'flange100',
                            name: 'Flange 100',
                            description: 'Спецификация фланец 100',
                            status: 'default',
                            products: [
                                {
                                    product: {id: 'bolt', name: 'Bolt 12'},
                                    spec: {id: 'bolt12', name: 'Bolt12'},
                                    quantity: 8
                                },
                            ],
                            materials: [
                                {material: {id: 'resin', name: 'Resin'}, quantity: 2},
                                {material: {id: 'rovingSp', name: 'Spray-up roving'}, quantity: 0.5},
                                {material: {id: 'tri-hydr', name: 'Aluminium tri-hydrate '}, quantity: 0.5}
                            ]
                        },
                        {
                            id: 'bolt12',
                            name: 'Bolt12',
                            description: 'Спецификация болт',
                            status: 'default',
                            products: [],
                            materials: [
                                {material: {id: 'bolt', name: 'Bolt'}, quantity: 1},
                            ]
                        }


                    ]
            }
        },
        methods: {
            getSpecById(spec_id) {
                console.log('trying to find specification by id')
                console.log(spec_id)
                let spec = this.specs.find((el) => {
                    return el.id === spec_id
                })
                return spec
            },
            calculateQuantity(materials, multiply) {
                materials.forEach(doc => {
                    doc.quantity = Math.round(doc.quantity * multiply * 1000) / 1000
                })
                return materials
            },
            getProdMaterials(spec) {
                console.log('getProdMaterials')
                let materials = []
                if (spec.products != null || undefined) {
                    console.log(spec.name)
                    spec.products.forEach(item => {
                        console.log('get items from spec Products: ')
                        console.log(item.product.name, item.quantity)
                        materials = materials.concat(
                            this.calculateQuantity(
                                this.getProdMaterials(this.getSpecById(item.spec.id)), item.quantity
                            )
                        )
                    })
                }
                materials = materials.concat(spec.materials)
                console.log(materials)
                return materials
            },
            reduceArray(array) {
                let updatedArray = []
                array.forEach(doc => {
                   let el = updatedArray.find(el=>doc.name == el.name)
                    if (el){
                      el.amount += doc.amount
                   } else {
                       updatedArray.push(doc)
                   }
                })
                console.log(updatedArray)
                return updatedArray
            },
            reduceMaterialArray(array) {
                let updatedArray = []
                array.forEach(doc => {
                    let el = updatedArray.find(el=>doc.material.id == el.material.id)
                    if (el){
                        el.amount += doc.amount
                        el.amount = Math.round(el.amount*1000)/1000
                    } else {
                        updatedArray.push(doc)
                    }
                })
                console.log(updatedArray)
                updatedArray.sort((a, b) => a.material.name.localeCompare(b.material.name))
                return updatedArray
            },
        },
        created() {
            this.testMaterials = this.calculateQuantity(this.testMaterials, 2)
            this.testProdMaterials = this.getProdMaterials(this.specs[0])
            this.testProdMaterials = this.reduceMaterialArray(this.testProdMaterials)
            this.testArray = this.reduceArray(this.testArray)
        }
    }

</script>