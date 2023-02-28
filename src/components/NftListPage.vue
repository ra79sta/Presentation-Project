<template>
  <div class="nft-list-wrapper">
    <h1>List of your NFTs</h1>
    <p v-if="address" class="wallet-address"> Wallet Address: {{address}}</p>
    <div class="nft-crad-wrapper" v-if="userNfts.ownedNfts?.length > 0">
      <div v-for="(nfts, index) in userNfts.ownedNfts" :key="index">
        <nft-card :data="nfts" />
      </div>
    </div>
    <div class="no-nfts-text" v-else>
      <p v-if="!address" class="info">Connect your metamask wallet and see list of your NFTs</p>
      <img class="no-nfts-image" src="@/assets/images/nft-ell-3.png" alt="noNfts">
      <p class="nothing-to-see">Nothing to see here!</p>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import useUsers from '@/composables/useUsers'
import NftCard from '@/components/NftCard.vue'
export default {
  components: {
    NftCard
  },
  setup() {
    const store = useStore()
    const { userNfts, address } = useUsers(store)
    return {
      userNfts,
      address,
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/nftListPage.scss"></style>
