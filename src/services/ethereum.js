import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const CHAINS = {
  1: 'mainnet',
  3: 'ropsten',
  137: 'polygon',
  80001: 'polygon testnet'
}
class EthereumService {
  constructor(chainId = 1) {
    this.chainId = chainId
    this.networkProvider = {}
    this.providerOptions = {}
    this.web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: this.providerOptions,
      theme: 'dark'
    })
  }
  parseChainId = (id) => {
    return CHAINS[id] || 'Selected network is not supported.'
  }

  async connectToProvider() {
    this.networkProvider = await this.web3Modal.connect()
  }

  async checkCachedProvider() {
    if (this.web3Modal.cachedProvider) {
      this.networkProvider = await this.web3Modal.connect()
    }
  }

  async onChainChanged(handleChainChange) {
    await this.checkCachedProvider()
    if (Object.keys(this.networkProvider).length > 0) {
      this.networkProvider.on('chainChanged', async (info) => {
        await handleChainChange(this.parseChainId(parseInt(info, 16)))
      })
    }
  }

  async onAccountChanged(handleAccountChange) {
    await this.checkCachedProvider()
    if (Object.keys(this.networkProvider).length > 0) {
      this.networkProvider.on(
        'accountsChanged',
        async (accounts) => await handleAccountChange(accounts[0])
      )
    }
  }

  async isProviderConnected() {
    await this.checkCachedProvider()
    if (Object.keys(this.networkProvider).length > 0) {
      const provider = new ethers.providers.Web3Provider(this.networkProvider)
      const accounts = await provider.listAccounts()
      return accounts.length > 0
    }
    return false
  }

  async getNetwork() {
    await this.checkCachedProvider()
    if (Object.keys(this.networkProvider).length > 0) {
      const provider = new ethers.providers.Web3Provider(this.networkProvider)
      return await provider.getNetwork()
    }
    return {}
  }

  async getNetworkName() {
    const network = await this.getNetwork()
    console.log(CHAINS[network.chainId])
    return CHAINS[network.chainId] || 'Unsupported network'
  }

  async disconnectProvider() {
    this.web3Modal.clearCachedProvider()
    location.reload()
  }

  async fetchAddress() {
    await this.checkCachedProvider()
    if (Object.keys(this.networkProvider).length > 0) {
      const provider = new ethers.providers.Web3Provider(this.networkProvider)
      const accounts = await provider.listAccounts()
      return accounts[0]
    }
    throw new Error('No network provider found!')
  }

  async fetchBalance(address) {
    await this.checkCachedProvider()
    const balances = {}
    if (Object.keys(this.networkProvider).length > 0) {
      const provider = new ethers.providers.Web3Provider(this.networkProvider)
      const balance = await provider.getBalance(address)
      balances['default'] = ethers.utils.formatEther(balance)
      return balances
    }
    throw new Error('No network provider found!')
  }

  async signNonce(nonce) {
    await this.checkCachedProvider()
    if (Object.keys(this.networkProvider).length > 0) {
      const provider = new ethers.providers.Web3Provider(this.networkProvider)
      const signer = provider.getSigner()
      return signer.signMessage(nonce)
    }
    throw new Error('No network provider found!')
  }
}
export default EthereumService
