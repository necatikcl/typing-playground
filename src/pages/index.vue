<template>
  <div class="index-page">
    <tp-reader />
    <tp-input
      :model-value="appStore.currentWord"
      @input="handleInput"
      :placeholder="inputPlaceholder"
      @blur="appStore.stopTimer"
      ref="inputElement"
      :disabled="appStore.remainingWords === 0"
    />
    <tp-footer />
  </div>
</template>

<script setup lang="ts">
import useAppStore from '../stores/appStore';
import useShortcut, { Shortcuts } from '../composables/useShortcut';

const appStore = useAppStore();
const router = useRouter();

const inputElement = ref<{ element: HTMLInputElement }>();

useShortcut(Shortcuts.FocusInput, () => {
  inputElement.value?.element.focus();
});

useShortcut(Shortcuts.BlurInput, () => {
  inputElement.value?.element.blur();
});

useShortcut(Shortcuts.Restart, appStore.restart);
useShortcut(Shortcuts.Edit, () => router.push('/setup'));

const inputPlaceholder = computed(() => {
  if (appStore.remainingWords === 0) return 'Congrats! You have finished writing all the text.';
  if (appStore.writtenWords.length > 0) return null;

  return 'You can start to type via this box. Timer will start as soon as you press a key.';
});

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.value.includes(' ')) {
    e.preventDefault();
    appStore.pushCurrentWord();
    return;
  }

  appStore.startTimer();

  target.value = target.value.trim();
  appStore.currentWord = target.value;
};

</script>

<style lang="scss" scoped>
.tp-input {
  margin-top: 1rem;
}
</style>
