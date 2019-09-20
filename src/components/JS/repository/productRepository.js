import {db} from '@/firebase/init'

export default class ProductRepository {

    static async getProductById(id) {
        const productRef = await db.collection('products').doc(id).get()
        let product = productRef.data()
        product.id = productRef.id
        return product
    }

    static async getProducts() {
        const snapshot = await db.collection('products').get()
        let products = []
        snapshot.forEach(doc => {
            let product = doc.data()
            product.id = doc.id
            products.push(product)
        })
        return products
    }

    static async add(product) {
        const docRef = await db.collection('products').add(product)
        return docRef.id
    }

    static async delete(id) {
        const docRef = await db.collection('products').doc(id).delete()

    }

    static async update(product) {
        const product_id = product.id
        delete product.id
        await db.collection('products').doc(product_id).update(product)

    }

    static async productUsageFind(product_id) {
        //todo: create method which return specs array where product is used.
    }
}