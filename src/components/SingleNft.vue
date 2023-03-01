<template>
  <div class="back-arrow" @click="$router.push('/')">
    <div class="arrow-left"></div>
    <p>BACK</p>
  </div>
  <div class="single-nft-wrapper">
    <div class="nft-image">
      <div class="image">
        <img :src="singleNft[0]?.media[0]?.thumbnail" alt="" />
      </div>
    </div>
    <div class="nft-data">
      <div>
        <p><span>Name:</span> {{ singleNft[0]?.title }}</p>
      </div>
      <div>
        <p><span> Contract Address:</span> {{ singleNft[0]?.contract.address }}</p>
      </div>
      <div>
        <p><span>Contract Name:</span> {{ singleNft[0]?.contract.name }}</p>
      </div>
      <div>
        <p><span>Nft Type:</span> {{ singleNft[0]?.tokenType }}</p>
      </div>
      <div>
        <p><span>Nft Name:</span> {{ singleNft[0]?.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import useUsers from '@/composables/useUsers'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const { userNfts } = useUsers(store)
    const singleNft = ref([])
    const path = computed(() => route.params.id)

    const filterNfts = () => {
      singleNft.value = userNfts.value.ownedNfts.filter((nft) => nft.tokenId === path.value)
    }
    onMounted(() => {
      filterNfts()
    })
    return {
      singleNft,
      userNfts,
      path
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/singleNft.scss"></style>
