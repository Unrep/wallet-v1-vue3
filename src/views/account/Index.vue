<template>
  <div class="account-page">
    <h1 class="page-headline">Account Overview</h1>
    <Card>
      <template #header>
        <h3 class="card-section-headline">Account Overview</h3>
      </template>
      <template #default>
        <div class="account-overview-data">
          <div class="account-data-row">
            <div class="row-name">Address</div>
            <div class="break-words md:col-span-2 md:px-1">{{ address }}</div>
          </div>

          <div class="account-data-row">
            <div class="row-name">Balances</div>
            <div class="balances-list" v-for="(item, key) in balances" :key="key">
              <div class="balance-row">
                <div class="row-name">{{ key }}</div>
                <div class="row-info col-span-2">{{ item }}</div>
              </div>
            </div>
          </div>
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

<style lang="scss" scoped>
.account-overview-data {
  @apply text-sm;

  .account-data-row {
    @apply flex flex-col space-y-1 py-4 px-5 align-middle md:grid md:grid-cols-3 md:space-y-0;

    &:not(:last-child) {
      @apply md:border-b;
    }

    &:last-child {
      @apply pb-0;
    }

    .row-name {
      @apply font-medium;
    }

    .balances-list {
      @apply flex flex-col rounded-md border border-gray-200 md:col-span-2;
      .row-name {
        @apply text-gray-500;
      }

      .row-info {
        @apply text-gray-900;
      }

      .balance-row {
        @apply grid grid-cols-3 px-3 py-2 align-middle;

        &:not(:last-child) {
          @apply border-b;
        }
      }
    }
  }
}
</style>
