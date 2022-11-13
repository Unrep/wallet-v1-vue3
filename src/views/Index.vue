<template>
  <div class="home-page">
    <div class="logo"><span>zkSync</span>&nbsp;Wallet</div>
    <Button :loading="loggingIn" size="lg" class="mt-8" @click="tryLogin">
      <span>Connect Wallet</span>
      <LinkIcon class="button-icon" />
    </Button>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/common/Button.vue";
import { LinkIcon } from "@heroicons/vue/solid";
import useOnboard from "@/store/onboard";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { login } = useOnboard();
const loggingIn = ref(false);

async function tryLogin() {
  try {
    loggingIn.value = true;
    await login();
    router.push({ name: "account" });
  } catch (error) {
    console.error(error);
  } finally {
    loggingIn.value = false;
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  @apply flex h-full flex-col items-center justify-center pt-10 text-center;

  .logo {
    @apply text-5xl font-bold text-white sm:text-7xl;

    span {
      @apply text-indigo-300;
    }
  }
  .button-icon {
    @apply ml-4 -mr-1 h-6 w-6 sm:h-8 sm:w-8;
  }
}
</style>
