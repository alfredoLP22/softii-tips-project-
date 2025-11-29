<template>
  <div class="grid grid-cols-3 gap-3">
    <button
      v-for="method in filteredPaymentMethods"
      :key="method.value"
      @click="selectMethod(method.value)"
      :class="[
        'flex flex-col items-center justify-center h-24 rounded-xl font-normal transition-all duration-200 border-2',
        selected === method.value
          ? 'border-red-500 bg-red-50 text-gray-800'
          : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-gray-50',
      ]"
    >
      <div class="mb-1">
        <svg
          v-if="method.icon === 'cash'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0l-1 2m1 0h14a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2m0 0l-1 2m1-2v3m12-3a2 2 0 002 2h-1m-4 0v3"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>

      <span class="text-sm text-center">{{ method.label }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";

export default defineComponent({
  name: "PaymentMethodSelector",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selected = ref(props.modelValue);

    const paymentMethods = [
      { value: "Efectivo", label: "Efectivo", icon: "cash" },
      { value: "BBVA", label: "BBVA 1234", icon: "card" },
      { value: "Santander", label: "Santander 1234", icon: "card" },
      { value: "Efectivo en Caja", label: "Efectivo en Caja", icon: "cash" },
    ];

    const filteredPaymentMethods = computed(() => paymentMethods.slice(0, 3));

    const selectMethod = (method: string) => {
      selected.value = method;
      emit("update:modelValue", method);
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        selected.value = newValue;
      }
    );

    return {
      selected,
      filteredPaymentMethods,
      selectMethod,
    };
  },
});
</script>

<style scoped></style>
