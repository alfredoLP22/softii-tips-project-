<template>
  <div class="grid grid-cols-3 gap-3">
    <button
      v-for="key in keys"
      :key="key"
      @click="handleInput(key)"
      :class="[
        'text-gray-800 text-3xl font-normal py-5 rounded-lg transition-colors duration-100 transform active:scale-95 shadow-md border border-gray-200',
        'bg-white hover:bg-gray-50',
      ]"
    >
      <span v-if="key === '⌫'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <span v-else>{{ key }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Keypad",
  emits: ["update:value", "confirm"],
  setup(_, { emit }) {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];

    const handleInput = (key: string) => {
      if (key === "⌫") {
        emit("update:value", "backspace");
      } else {
        emit("update:value", key);
      }
    };

    return {
      keys,
      handleInput,
    };
  },
});
</script>

<style scoped></style>
