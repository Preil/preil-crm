import {db} from '@/firebase/init'
import Spec from '@/components/JS/models/spec'

export default class SpecRepository {

    static async getSpecs() {
        let snapshot = await db.collection('test_specs').get()
        let specs = []
        snapshot.forEach(doc => {
            let spec = doc.data()
            spec.id = doc.id
            specs.push(spec)
        })
        return specs
    }

    static async getSpecById(spec_id) {
        let specRef = await db.collection('test_specs').doc(spec_id).get()
        let spec = specRef.data()
        spec.id = specRef.id
        return spec
    }

    static async update(spec) {
        const id = spec.id
        delete spec.id
        await db.collection('test_specs').doc(id).update(spec)
        .then(() => {

        })
    }

    static async updateSpecMaterials(spec_id, materials) {
        await db.collection('test_specs').doc(spec_id).update({
            materials: materials
        }).then(() => {


        })
    }

    static async getSpecsOfProduct(id) {
        const snapshot = await db.collection('test_specs').get()
        let specs = []
        snapshot.forEach(doc => {
            if (doc.data().product.id == id) {
                let spec = doc.data()
                spec.id = doc.id
                console.log(spec.product.id)
                specs.push(spec)
            }
        })
        return specs
    }

    static async addSpec(spec) {
        const docRef = await db.collection('test_specs').add(spec)
        return docRef.id

    }

    static async getSpecMaterials(spec_id) {

    }

    static async updateSpecProducts(spec_id, products) {
        await db.collection('test_specs').doc(spec_id).update({
            products: products
        }).then(() => {


        })
    }

    static async getSpecProducts(spec_id) {

    }

    static async delete(spec_id) {
        await db.collection('test_specs').doc(spec_id).delete()
    }

}