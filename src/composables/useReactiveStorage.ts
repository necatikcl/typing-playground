import { ref } from 'vue';
import type { Ref } from 'vue';
import { debouncedWatch } from '@vueuse/core';

const useReactiveStorage = <T>(key: string, defaultValue: T) => {
  let initialValue = defaultValue;
  const fromStorage = localStorage.getItem(key);

  if (fromStorage) {
    initialValue = JSON.parse(fromStorage) as T;
  }

  const value = ref(initialValue) as Ref<T>;

  debouncedWatch(
    value,
    (newValue) => localStorage.setItem(key, JSON.stringify(newValue)),
    { deep: true, debounce: 1000 },
  );

  return value;
};

export default useReactiveStorage;
