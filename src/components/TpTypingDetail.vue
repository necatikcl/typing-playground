<template>
  <div class="tp-typing-detail" :class="`tp-typing-detail-${color}`">
    <div class="tp-typing-detail-title">
      {{ title }}
    </div>
    <div class="tp-typing-detail-value">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title: string,
  value: string | number,
  color: string
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.tp-typing-detail {
  &-title {
    color: var(--color);
    align-items: center;
    display: flex;
    font-size: 12px;
    margin-bottom: 4px;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: block;
      margin-right: 8px;
      background-color: var(--color);
    }
  }

  &-value {
    font-size: 24px;
  }

  &-yellow { --color: #FFF387 }
  &-green { --color: #87FFA9 }
  &-red { --color: #FF8787 }
  &-pink { --color: #EAAEFF }
  &-blue { --color: #AEF0FF }
}
</style>
