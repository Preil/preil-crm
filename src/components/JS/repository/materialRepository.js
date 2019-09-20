import {db} from '@/firebase/init'
import Spec from '@/components/JS/models/material'

export default class MaterialRepository {

    static async getMaterialById(id) {
        const materialsColRef = db.collection('materials')
        const materialRef = await materialsColRef.doc(id).get()
        let material = materialRef.data()
        material.id = materialRef.id
        return material
    }

    static async getMaterials() {
        const snapshot = await db.collection('materials').get()
        let materials = []
        snapshot.forEach(doc => {
            let material = doc.data()
            material.id = doc.id
            materials.push(material)
        })
        return materials
    }

    static async addMaterial(material) {
        const docRef = await db.collection('materials').add(material)
        return docRef.id
    }

    static async deleteMaterial(id) {
        const docRef = await db.collection('materials').doc(id).delete()

    }

    static async updateMaterial(material) {
        const material_id = material.id
        delete material.id
        const materialRef = await db.collection('materials').doc(material_id).update(material)
        return materialRef
    }

    static async materialUsageFind(material_id) {
        //todo: create method which return specs array where material is used.
    }
}