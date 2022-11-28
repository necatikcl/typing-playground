<template>
  <div class="tp-reader" ref="wrapper">
    <div class="tp-reader-words">
      <tp-reader-word
        v-for="(word, index) in appStore.words"
        :key="index"
        :word="word"
        :index="index"
        :active="index === appStore.activeIndex"
        :written-word="appStore.writtenWordsIncludingCurrent[index] || ''"
        :ref="(node: ChildNode) => saveWordElement(node, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '../stores/appStore';

type ChildNode = { element: HTMLDivElement };
const appStore = useAppStore();

const wrapper = ref<HTMLDivElement>();
const wordElements = reactive(new Map<number, HTMLDivElement>());

const saveWordElement = (node: ChildNode, index: number) => {
  if (!node) return;

  wordElements.set(index, node.element);
};

const scrollToActiveWord = (behavior: ScrollBehavior = 'smooth') => {
  wordElements.get(appStore.activeIndex)?.scrollIntoView({ behavior, block: 'center' });
};

watch(() => [appStore.activeIndex], () => scrollToActiveWord());
watch(wordElements, () => scrollToActiveWord('auto'), { flush: 'post' });
</script>

<style lang="scss" scoped>
.tp-reader {
  position: relative;
  height: 400px;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 132px;
    background-image: linear-gradient(to top, #1a1a1a, transparent);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  &-words {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    height: 100%;
    overflow-y: hidden
  }
}
</style>
