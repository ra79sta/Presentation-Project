import { ethereumService } from '@/main'
import alchemy from '@/plugins/alchemy'

const initialState = () => ({
  errors: [],
  address: '',
  balance: {},
  network: {},
  networkName: '',
  userNfts: []
})
const state = initialState()

const getters = {
  getByKey: (state) => (key) => state[key]
}

const mutations = {
  pushError(state, error) {
    state.errors.push(error)
  },
  commitByKey(state, object) {
    Object.keys(object).forEach((key) => (state[key] = object[key]))
  },
  clearErrors(state) {
    state.errors.splice(0)
  },
  resetState(state) {
    Object.assign(state, initialState())
  },
  setAddress(state, address) {
    state.address = address
  },
  setBalance(state, balance) {
    state.balance = balance
  },
  setNetwork(state, network) {
    state.network = network
  },
  setNetworkName(state, networkName) {
    state.networkName = networkName
  },
  setUserNfts(state, userNfts) {
    state.userNfts = userNfts
  }
}
const actions = {
  commitByKey({ commit }, object) {
    commit('commitByKey', object)
  },
  async fetchAddress({ commit }) {
    try {
      const address = await ethereumService.fetchAddress()
      commit('setAddress', address)
      return address
    } catch (error) {
      console.log(error)
      commit('pushError', error)
    }
  },
  async fetchBalance({ commit }, balanceAddress) {
    try {
      const balance = await ethereumService.fetchBalance(balanceAddress)
      commit('setBalance', balance)
      return balance
    } catch (error) {
      commit('pushError', error)
    }
  },
  async signNonce({ commit }, nonce) {
    try {
      return await ethereumService.signNonce(nonce)
    } catch (error) {
      if ('code' in error && error.code === 4001) {
        return 'rejected'
      }
      commit('pushError', error)
    }
  },

  async fetchNetwork({ commit }) {
    try {
      const result = await ethereumService.getNetwork()
      commit('setNetwork', result)
    } catch (error) {
      commit('pushError', error)
    }
  },
  async resetState({ commit }) {
    commit('resetState')
  },

  async fetchNetworkName({ commit }) {
    try {
      const result = await ethereumService.getNetworkName()
      commit('setNetworkName', result)
    } catch (error) {
      commit('pushError', error)
    }
  },
  async getNftsForAddress({ commit }, address) {
    try {
      const result = await alchemy.nft.getNftsForOwner(address)
      commit('setUserNfts', result)
    } catch (error) {
      commit('pushError', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
