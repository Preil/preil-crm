<template>
    <v-container>
        <v-layout row class="mb-5">
            <v-flex>
                <v-card>
                    <v-card-title>
                        <span>{{ product.name}}</span>
                    </v-card-title>
                    <v-card-text>
                        <p>{{ product.group}}</p>
                        <p>{{ product.type}}</p>
                        <p>{{ product.description}}</p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex>
                <spec-list :product_id="$route.params.product_id" />
            </v-flex>
        </v-layout>


    </v-container>
</template>

<script>
    import db from '@/firebase/init'
    import SpecList from '@/components/specs/SpecsList'

    export default {
        name: "Product",
        data() {
            return {
                product: {
                    name: 'Название продукта',
                    group: 'группа А',
                    type: 'тип',
                    description: 'здесь описание продукта'
                },
                specs: [
                    {
                        name: 'Спецификация 1',
                        description: 'описание спецификации 1',
                        status: 'default'
                    },
                    {
                        name: 'Спецификация 2',
                        description: 'описание спецификации 2',
                        status: ''
                    },

                ]
            }
        },
        components: {
          SpecList
        },
        methods: {
            initialize(product_id) {
                db.collection('products').doc(product_id).get()
                    .then(doc => {
                        this.product = doc.data()
                        this.product.id = doc.id
                        console.log(this.product)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                let ref = db.collection('specs').where('product_id', '==', product_id)
                ref.get().then(snapshot => {
                    snapshot.forEach(doc => {
                        let spec = doc.data()
                        spec.id = doc.id
                        this.specs.push(spec)
                        console.log(spec)
                    })
                })
            }
        },
        created() {
            this.initialize(this.$route.params.product_id)
        }
    }
</script>

<style scoped>

</style>