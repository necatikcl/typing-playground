<template>
  <button class="tp-button" type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.tp-button {
  padding: 7px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  width: max-content;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &[disabled] {
    cursor: not-allowed;
    border-color: transparent;
  }

  :deep(> *:not(:last-child)) {
    margin-right: 4px;
  }
}
</style>
