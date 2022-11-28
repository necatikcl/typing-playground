<template>
  <div class="index-page">
    <tp-reader />
    <tp-input
      :model-value="appStore.currentWord"
      @input="handleInput"
      :placeholder="inputPlaceholder"
      @blur="appStore.stopTimer"
      ref="inputElement"
    />
    <tp-footer />
  </div>
</template>

<script setup lang="ts">
import useAppStore from '../stores/appStore';
import useShortcut, { Shortcuts } from '../composables/useShortcut';

const appStore = useAppStore();

const inputElement = ref<{ element: HTMLInputElement }>();

useShortcut(Shortcuts.FocusInput, () => {
  inputElement.value?.element.focus();
});

useShortcut(Shortcuts.BlurInput, () => {
  inputElement.value?.element.blur();
});

useShortcut(Shortcuts.Restart, appStore.restart);
useShortcut(Shortcuts.Edit, appStore.editText);

const inputPlaceholder = computed(() => {
  if (appStore.writtenWords.length > 0) return null;

  return 'You can start to type via this box. Timer will start as soon as you press a key.';
});

const submitWord = () => {
  appStore.currentWord = appStore.currentWord.trim();

  if (appStore.currentWord.length === 0) {
    return;
  }

  appStore.writtenWords.push(appStore.currentWord);

  appStore.currentWord = '';
  appStore.activeIndex += 1;
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.value.includes(' ')) {
    e.preventDefault();
    submitWord();
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
