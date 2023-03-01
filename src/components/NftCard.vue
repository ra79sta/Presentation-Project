<template>
  <div class="nft-card-wrapper">
    <div class="nft-image" @click="openSingleNft(data.tokenId)">
      <div class="image">
        <img :src="data.media[0].thumbnail" />
      </div>
      <div class="nft-name">
        <span>{{ data.rawMetadata.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const router = useRouter()
    console.log(router)
    const openSingleNft = async (id) => {
      router.push({ path: `/nft/${id}` })
    }
    return {
      openSingleNft
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/nftCard.scss"></style>
