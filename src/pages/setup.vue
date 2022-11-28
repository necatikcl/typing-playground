<template>
  <div class="setup-page">
    <div class="setup-page-heading">
      <div class="setup-page-subtitle">
        Setup
      </div>
      <div class="setup-page-title">
        Enter the text
      </div>
    </div>
    <tp-textarea v-model="text" @keydown.enter="handleNext" placeholder="Enter the text you want to exercise." />
    <tp-button @click="handleNext" :disabled="!text">
      Next
    </tp-button>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '../stores/appStore';

const appStore = useAppStore();
const router = useRouter();

const text = ref(appStore.text);

const handleNext = () => {
  if (!text.value) return;

  if (appStore.text !== text.value) {
    appStore.text = text.value;
  }

  router.push('/');
};
</script>

<style lang="scss" scoped>
.setup-page {
  display: flex;
  height: 100%;
  flex-direction: column;

  &-subtitle {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 18px;
    text-align: center;
  }

  &-title {
    font-size: 48px;
    margin-bottom: 64px;
    text-align: center;
  }
}

.tp-textarea {
  flex: 1;
}

.tp-button {
  margin-left: auto;
  margin-top: 24px;
}
</style>
