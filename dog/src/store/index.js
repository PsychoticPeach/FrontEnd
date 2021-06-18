import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        info: [],
        favoritos: [],
        venda: [],
        user: null
    },
    mutations: {
        setUser(state, users) {
            state.user = users
        },
        marcaFavorito(state, item) {
            state.favoritos = [item, ...state.favoritos]
            localStorage.setItem("favoritoLocal", JSON.stringify(state.favoritos))
        },
        desmarcaFavorito(state, item) {
            state.favoritos.splice(item, 1)
            localStorage.setItem("favoritoLocal", JSON.stringify(state.favoritos))
        },
        carregaInfo(state, array) {
            state.info = array
        },
        iniciaFavoritos(state, array) {
            state.favoritos = array
        },
        iniciaVenda(state, array) {
            state.venda = array
        }
    },
    actions: {
        carregaVenda({ commit }) {
            axios.get("https://teste-300513-default-rtdb.europe-west1.firebasedatabase.app/.json")
                .then(
                    res => commit("iniciaVenda", res.data)
                )
        },
        carregaInfo({ commit }) {
            let resultados = []
            let breeds = []
            let carregaBreed = (breed) => {
                return axios.get("https://dog.ceo/api/breed/" + breed + "/images/random")
                    .then(
                        res => res.data.message
                    )
            }
            let infoLocalStorage = localStorage.getItem("infoLocal")
            if (!infoLocalStorage) {
                axios.get("https://dog.ceo/api/breeds/list/all")
                    .then(res => {
                        return res.data.message
                    })
                    .then(
                        res => {
                            breeds = [...Object.keys(res)]
                            return [...Object.keys(res)]
                        }
                    )
                    .then(
                        res => {
                            return axios.all([...res.map(x => carregaBreed(x))])
                        }
                    )
                    .then(
                        res => {
                            for (let [index, item] of res.entries()) {
                                resultados.push({
                                    'name': breeds[index],
                                    'photo': item
                                })
                            }
                            return resultados
                        }
                    )
                    .then(
                        res => {
                            commit("carregaInfo", resultados),
                                localStorage.setItem("infoLocal", JSON.stringify(res))
                        }
                    )
            } else {
                commit("carregaInfo", JSON.parse(infoLocalStorage))
            }

        },
        carregaFavoritos({ commit }) {
            const favoritoLocalStorage = localStorage.getItem("favoritoLocal")
            if (!favoritoLocalStorage) {
                localStorage.setItem("favoritoLocal", "[]")
            } else {
                commit("iniciaFavoritos", JSON.parse(favoritoLocalStorage))
            }
        }
    },
    getters: {
        racaVenda: state => {
            return [...new Set(state.venda.map(x => x.nome))]
        }
    }
})