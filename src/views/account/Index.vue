<template>
  <div class="account-page">
    <h1 class="page-headline">Account Overview</h1>
    <Card>
      <template #header>
        <h3 class="card-section-headline">Account Overview</h3>
      </template>
      <template #default>
        <div class="">Address: {{ address }}</div>

        <div class="mt-5 flex flex-col space-y-2" v-for="(item, key) in balances" :key="key">
          <div>{{ key }}: {{ item }}</div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/common/Card.vue";

import useWallet from "@/store/wallet";
import { storeToRefs } from "pinia";

const { balances, address } = storeToRefs(useWallet());
</script>

<style lang="scss" scoped></style>
