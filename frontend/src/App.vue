<template>
  <TipPaymentView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TipPaymentView from "./views/TipPaymentView.vue";

export default defineComponent({
  name: "App",
  components: {
    TipPaymentView,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap");
body {
  font-family: "Inter", sans-serif;
  background-color: #f9fafb;
}
</style>
