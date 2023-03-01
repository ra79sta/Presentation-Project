<template>
  <div class="nft-list-wrapper">
    <h1>List of your NFTs</h1>
    <p v-if="address && userNfts.ownedNfts?.length > 0" class="wallet-address">
      Wallet Address: {{ address }}
    </p>
    <div class="nft-crad-wrapper" v-if="userNfts.ownedNfts?.length > 0">
      <div v-for="(nfts, index) in userNfts.ownedNfts" :key="index">
        <nft-card :data="nfts" />
      </div>
    </div>
    <div class="no-nfts-text" v-else>
      <p v-if="!address" class="info">
        Connect your metamask wallet or enter your wallet address and see list of your NFTs
      </p>
      <div class="input-address-wrapper">
        <app-input
          type="text"
          v-model="walletAddress"
          name="walletAddres"
          inputClass="box-input"
          placeholder="Your wallet address"
        />
        <div class="button-wrapper">
          <app-button buttonClass="connect-metamask" text="Submit" @click="getNfts" />
        </div>
      </div>
      <img class="no-nfts-image" src="@/assets/images/nft-ell-3.png" alt="noNfts" />
      <p class="nothing-to-see">Nothing to see here!</p>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import useUsers from '@/composables/useUsers'
import NftCard from '@/components/NftCard.vue'
import AppInput from '@/elements/AppInput.vue'
import AppButton from '@/elements/AppButton.vue'
export default {
  components: {
    NftCard,
    AppInput,
    AppButton
  },
  setup() {
    const store = useStore()
    const { userNfts, address, getNftsForAddress } = useUsers(store)

    const walletAddress = ref('')
    const getNfts = () => {
      getNftsForAddress(walletAddress.value)
      store.dispatch('users/commitByKey', {
        address: walletAddress.value
      })
    }
    return {
      getNfts,
      address,
      userNfts,
      walletAddress
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/nftListPage.scss"></style>
