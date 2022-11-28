<template>
  <div class="tp-footer">
    <div class="tp-footer-left">
      <tp-typing-detail title="Time passed" :value="timePassed" color="yellow" />
      <tp-typing-detail title="WPM" :value="appStore.wpm" color="green" />
      <tp-typing-detail title="Errors (Percentage)" :value="errorsAndPercentage" color="red" />
      <tp-typing-detail title="Words written (keystrokes)" :value="wordsWrittenAndKeystrokes" color="pink" />
      <tp-typing-detail title="Remaining words" :value="appStore.remainingWords" color="blue" />
    </div>
    <div class="tp-footer-right">
      <tp-button @click="appStore.restart">
        <tp-shortcut :shortcut="Shortcuts.Restart" />
        <span>Restart</span>
      </tp-button>
      <tp-button @click="$router.push('/setup')">
        <tp-shortcut :shortcut="Shortcuts.Edit" />
        <span>Edit</span>
      </tp-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '../stores/appStore';
import { Shortcuts } from '../composables/useShortcut';
import formatPercentage from '../utils/formatPercentage';

const appStore = useAppStore();

const errorsAndPercentage = computed(() => `${appStore.errors} (${formatPercentage(appStore.errorPercentage)})`);
const wordsWrittenAndKeystrokes = computed(() => `${appStore.writtenWordsIncludingCurrent.length} (${appStore.keystrokes})`);

const timePassed = computed(() => {
  let seconds = Math.floor(appStore.msPassed / 1000);
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let secondsString = `${seconds}`;
  if (seconds < 10) {
    secondsString = `0${seconds}`;
  }

  let minutesString = `${minutes}`;
  if (minutes < 10) {
    minutesString = `0${minutes}`;
  }

  return `${minutesString}:${secondsString}`;
});
</script>

<style lang="scss" scoped>
.tp-footer {
  margin-top: 64px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &-left {
    display: flex;

    > *:not(:last-child) {
      margin-right: 32px;
    }
  }

  &-right {
    display: flex;

    > *:not(:last-child) {
      margin-right: 12px;
    }
  }
}
</style>
