<template>
<div class="page-container">
   <menu-bar />
  <router-view/>
  <app-footer />
</div>
</template>
<script >
import MenuBar from "@/components/MenuBar.vue"
import AppFooter from "@/components/AppFooter.vue"
export default {
  components: {
    MenuBar,
    AppFooter,
  },
  setup() {
    return{}
  }
}
</script>

<style></style>
