import {db} from '@/firebase/init'
import Spec from '@/components/JS/models/material'

export default class priceListRepository {

    static async getPriceListById(id) {
        const priceListsColRef = db.collection('priceLists')
        const priceListRef = await priceListsColRef.doc(id).get()
        let priceList = priceListRef.data()
        priceList.id = priceListRef.id
        return priceList
    }

    static async getpriceLists() {
        const snapshot = await db.collection('priceLists').get()
        let priceLists = []
        snapshot.forEach(doc => {
            let priceList = doc.data()
            priceList.id = doc.id
            priceLists.push(priceList)
        })
        return priceLists
    }

    static async addPriceList(priceList) {
        const docRef = await db.collection('priceLists').add(priceList)
        return docRef.id
    }

    static async deletePriceList(id) {
        const docRef = await db.collection('priceLists').doc(id).delete()

    }

    static async updatePriceList(priceList) {
        const priceList_id = priceList.id
        delete priceList.id
        const priceListRef = await db.collection('priceLists').doc(priceList_id).update(priceList)
        return priceListRef
    }
}