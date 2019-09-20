import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null

    },
    mutations: {
        setUser(state, payload){
            console.log('set user in state')
            console.log(payload)
            state.user = payload
        }
    },
    actions: {
        signUserUp({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        console.log(user)
                        const newUser = {
                            id: user.user.uid
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(err => console.log(err))
        },
        signUserIn({commit}, payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then( doc => {
                        console.log(doc)
                        const newUser = {
                            id: doc.user.uid,
                            email: doc.user.email
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(err => console.log(err))
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
})
