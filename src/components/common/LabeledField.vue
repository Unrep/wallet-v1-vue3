<template>
  <div class="field-item">
    <dt class="field-label">{{ label }}</dt>
    <dd class="field-component-container">
      <slot />
    </dd>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.field-item {
  @apply bg-white py-3 sm:grid sm:grid-cols-3 sm:gap-4;

  .field-label {
    @apply text-sm font-medium leading-6 text-gray-500 sm:leading-10;
  }
  .field-component-container {
    @apply mt-1 sm:col-span-2 sm:mt-0;
  }
}
</style>
