import { ref, watch } from 'vue';
import type { Ref } from 'vue';

const storage = {
  set<T>(key: string, newValue: T) {
    localStorage.setItem(key, JSON.stringify(newValue));
  },
  get<T>(key: string) {
    const fromStorage = localStorage.getItem(key);

    if (fromStorage) {
      return JSON.parse(fromStorage) as T;
    }

    return undefined;
  },
};

const useReactiveStorage = <T>(key: string, defaultValue: T) => {
  const initialValue = storage.get<T>(key) || defaultValue;
  const value = ref(initialValue) as Ref<T>;

  storage.set(key, initialValue);

  watch(
    value,
    (newValue) => storage.set(key, newValue),
    { deep: true },
  );

  return value;
};

export default useReactiveStorage;
