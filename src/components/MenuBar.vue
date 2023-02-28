<template>
  <div class="menu-bar">
    <div class="logo" @click="$router.push('/')">{{logoText}}</div>
    <div class="connect-wrapper">
      <app-button
        v-if="!address"
        buttonClass="connect-metamask"
        text="Connect to a wallet"
        @click="loginOrSignUp()"
      />
      <app-button v-else buttonClass="disconnect-metamask" text="Disconnect" @click="disconnect()" />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ethereumService } from '@/main'
import useUsers from '@/composables/useUsers'
import AppButton from '@/elements/AppButton.vue'

export default {
  name: 'MenuBar',
  components: {
    AppButton
  },
  setup() {
    const store = useStore()
    const logoText = ref('NFT Watcher')
    const { loginOrSignUp, address, disconnect } = useUsers(store, ethereumService)

    return {
      loginOrSignUp,
      disconnect,
      logoText,
      address,
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/menuBar.scss"></style>
