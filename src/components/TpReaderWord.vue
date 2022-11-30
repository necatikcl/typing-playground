<template>
  <span
    class="tp-reader-word"
    :class="{
      'tp-reader-word-active': active,
      'tp-reader-word-correct': totallyCorrect,
      'tp-reader-word-incorrect': totallyIncorrect,
    }"
    ref="element"
  >
    <template v-if="writtenWord && !(totallyCorrect || totallyIncorrect)">
      <template
        v-for="(letter, letterIndex) in word"
        :key="letterIndex"
      >
        <span v-if="active && writtenWord.length <= letterIndex">
          {{ letter }}
        </span>
        <span
          v-else
          :class="{
            'tp-reader-word-letter-incorrect': letter !== writtenWord[letterIndex],
            'tp-reader-word-letter-correct': letter === writtenWord[letterIndex],
          }">
          {{ letter }}
        </span>
      </template>
    </template>
    <template v-else>{{ word }}</template>
  </span>
</template>

<script setup lang="ts">
export interface Props {
  word: string,
  index: number,
  writtenWord: string,
  active: boolean
}

const props = defineProps<Props>();

const totallyCorrect = computed(() => props.word === props.writtenWord);

const totallyIncorrect = computed(() => {
  if (!props.writtenWord) return false;

  const allLettersAreIncorrect = [...props.word]
    .every((letter, index) => letter !== props.writtenWord?.[index]);

  if (props.writtenWord.length >= props.word.length) return allLettersAreIncorrect;
  if (props.active) return false;

  return allLettersAreIncorrect;
});

const element = ref<HTMLDivElement>();

defineExpose({ element });
</script>

<style lang="scss" scoped>
.tp-reader-word {
  opacity: .5;
  font-size: 24px;

  &-active {
    opacity: 1;
  }

  &-letter-correct, &-correct {
    color: #87FFA9;
  }

  &-letter-incorrect, &-incorrect {
    color: #FF8787;
  }
}
</style>
