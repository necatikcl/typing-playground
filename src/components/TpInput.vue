<template>
  <input class="tp-input" :value="modelValue" @input="handleUpdate" ref="element" />
</template>

<script setup lang="ts">
export interface Props {
  modelValue: string;
}

export interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleUpdate = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const element = ref<HTMLInputElement>();

onMounted(() => {
  element.value?.focus();
});

defineExpose({ element });
</script>

<style lang="scss">
.tp-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  padding: 20px;
  font-weight: 400;
  font-size: 24px;
  color: #fff;

  &:placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
