<template>
  <div
    class="tp-reader"
    :class="{
      'tp-reader-no-scroll-top': wrapperNoScrollTop,
      'tp-reader-no-scroll-bottom': wrapperNoScrollBottom,
    }">
    <div class="tp-reader-words" ref="wrapper">
      <tp-reader-word
        v-for="(word, index) in appStore.words"
        :key="index"
        :word="word"
        :index="index"
        :active="index === appStore.activeIndex"
        :written-word="appStore.writtenWordsIncludingCurrent[index] || ''"
        :ref="(node: ChildNode) => saveWordElement(node, index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '../stores/appStore';

type ChildNode = { element: HTMLDivElement };
const appStore = useAppStore();

const wrapper = ref<HTMLDivElement>();
const wordElements = reactive(new Map<number, HTMLDivElement>());

const wrapperNoScrollTop = ref(true);
const wrapperNoScrollBottom = ref(true);

const saveWordElement = (node: ChildNode, index: number) => {
  if (!node) return;

  wordElements.set(index, node.element);
};

const scrollToActiveWord = (behavior: ScrollBehavior = 'smooth') => {
  wordElements.get(appStore.activeIndex)?.scrollIntoView({ behavior, block: 'center' });

  const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } = wrapper.value || {};

  wrapperNoScrollTop.value = scrollTop === 0;
  wrapperNoScrollBottom.value = scrollTop + clientHeight === scrollHeight;
};

watch(() => [appStore.activeIndex], () => scrollToActiveWord());
watch(wordElements, () => scrollToActiveWord('auto'), { flush: 'post' });
</script>

<style lang="scss" scoped>
.tp-reader {
  position: relative;
  height: 400px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 132px;
    position: absolute;
    left: 0;
    z-index: 1;
  }

  &::before {
    top: 0;
    background-image: linear-gradient(to bottom, #1a1a1a, transparent);
  }

  &::after {
    bottom: 0;
    background-image: linear-gradient(to top, #1a1a1a, transparent);
  }

  &-no-scroll-top {
    &::before {
      display: none
    }
  }

  &-no-scroll-bottom {
    &::after {
      display: none
    }
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
