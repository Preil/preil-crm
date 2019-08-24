import db from '@/firebase/init'
import Spec from '@/components/JS/models/spec'

export default class SpecRepository {

    static async getSpecById(spec_id) {
        let specRef = await db.collection('test_specs').doc(spec_id).get()
        let spec = specRef.data()
        spec.id = specRef.id
        return spec
    }

    static async update(spec) {

    }

    static async updateMaterials(spec_id, materials) {
        await db.collection('test_specs').doc(spec_id).update({
            materials: materials
        }).then(() => {


        })
    }


    static
    async getSpecMaterials(spec_id) {

    }

    static
    async updateSpecProducts(spec_id) {

    }

    static
    async getSpecProducts(spec_id) {

    }

    static
    async delete(spec_id) {

    }


}