<template>
  <div class="min-h-screen bg-white flex flex-col items-center p-4 font-sans">
    <div class="w-full bg-white overflow-hidden">
      <div class="flex items-center justify-between pb-4">
        <button
          @click="resetFlow()"
          class="text-gray-900 font-semibold text-lg transition-colors flex items-center"
        >
          <div class="p-2 rounded-lg mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <span class="text-gray-900 font-bold">Atrás</span>
        </button>
        <h1 class="text-3xl font-bold text-gray-900">Pago de Propinas</h1>
        <div class="text-4xl font-bold text-red-500">
          ${{ formatCurrency(currentTip.totalAmount) }}
        </div>
      </div>

      <hr class="mt-4 mb-8 border-t border-gray-100" />

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="">
          <div class="mb-8">
            <p class="text-lg font-semibold text-gray-700">Total de Propinas</p>
            <div class="flex items-center space-x-2">
              <div v-if="!isEditingTotal" class="flex items-center space-x-2">
                <p class="text-4xl font-bold text-red-500">
                  ${{ formatCurrency(currentTip.totalAmount) }}
                </p>
                <button
                  @click="toggleEditMode(true)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Editar cantidad"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.5 7.5a2 2 0 012-2H15a2 2 0 012 2v2a2 2 0 01-2 2h-1.414l-2.828 2.828-.707-.707 2.121-2.121H13a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>

              <div v-else class="flex items-center space-x-2">
                <span class="text-4xl font-bold text-red-500">$</span>
                <input
                  type="number"
                  v-model.number="tempTotalAmount"
                  @keyup.enter="saveTotalAmount"
                  class="text-4xl font-bold text-red-500 w-32 border-b-2 border-red-500 focus:outline-none focus:border-red-700"
                  autofocus
                />
                <button
                  @click="saveTotalAmount"
                  class="text-green-500 hover:text-green-700 transition-colors p-1"
                  title="Guardar"
                >
                  <svg
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="toggleEditMode(false)"
                  class="text-gray-500 hover:text-red-500 transition-colors p-1"
                  title="Cancelar"
                >
                  <svg
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <p class="text-lg font-normal text-gray-700 mb-4">
              ¿Entre cuántos quieres dividir las Propinas?
            </p>
            <div class="flex items-center space-x-3">
              <input
                type="number"
                v-model.number="splitCountInput"
                min="1"
                class="w-24 py-2 px-3 text-center text-xl font-normal border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-0"
                @change="updateSplitCount"
              />
              <div class="text-xl font-normal text-gray-700">
                ${{ formatCurrency(currentTip.amountPerPerson) }} x Persona
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2
              class="text-xl font-normal text-gray-700 mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-gray-500"
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
              Elige el Método de Pago
            </h2>
            <PaymentMethodSelector v-model="selectedMethod" />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="grid grid-cols-2 gap-8 mb-6 shrink-0">
            <div class="bg-red-50 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-4">
                <span class="text-4xl font-normal text-gray-800">$</span>
                <input
                  type="text"
                  :value="formatCurrency(amountToPay)"
                  readonly
                  class="bg-transparent text-4xl font-bold text-gray-800 text-right w-full border-none focus:ring-0 p-0 m-0"
                />
                <button
                  @click="handleKeypadInput('backspace')"
                  class="text-gray-400 hover:text-red-600 transition-colors ml-2 p-1"
                >
                  <svg
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <Keypad @update:value="handleKeypadInput" />
            </div>

            <div class="flex flex-col">
              <h2 class="text-xl font-bold text-gray-700 mb-3">Pagos</h2>
              <div
                class="bg-white border border-gray-300 p-4 rounded-xl shadow-sm grow min-h-[150px]"
              >
                <p
                  v-if="currentTip.payments.length === 0"
                  class="text-gray-500 italic"
                >
                  Sin Pagos
                </p>
                <ul v-else class="space-y-2">
                  <li
                    v-for="payment in currentTip.payments"
                    :key="payment.id"
                    class="flex justify-between text-gray-700"
                  >
                    <span>{{ payment.method }}</span>
                    <span class="font-semibold"
                      >${{ formatCurrency(payment.amount) }}</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pt-4 mt-4 shrink-0">
            <div class="flex justify-between text-2xl font-bold mb-4">
              <span class="text-red-500">Total Pagado</span>
              <span class="text-red-500"
                >${{
                  formatCurrency(
                    currentTip.totalAmount - currentTip.remainingAmount
                  )
                }}</span
              >
            </div>

            <div class="flex justify-between text-2xl font-bold mb-6">
              <span class="text-gray-800">Restante por Pagar</span>
              <span class="font-bold text-gray-800"
                >${{ formatCurrency(currentTip.remainingAmount) }}</span
              >
            </div>

            <p v-if="error" class="text-red-500 mb-4 font-medium">
              {{ error }}
            </p>
            <p v-if="success" class="text-green-600 mb-4 font-medium">
              {{ success }}
            </p>

            <button
              @click="handlePayment"
              :disabled="isPaymentDisabled"
              :class="[
                'w-full py-4 rounded-xl text-xl font-bold transition-all duration-200 border-2',
                isPaymentDisabled
                  ? 'bg-white border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-red-500 text-red-500 hover:bg-red-50 transform hover:scale-[1.01]',
              ]"
            >
              Pagar ${{ formatCurrency(amountToPay) }} en Propinas
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import Keypad from "../components/Keypad.vue";
import PaymentMethodSelector from "../components/PaymentMethodSelector.vue";
import type { Tip } from "../types/Tip.type";
import { startTipProcess, payTip } from "../services/tip.service";

export default defineComponent({
  name: "TipPaymentView",
  components: {
    Keypad,
    PaymentMethodSelector,
  },
  setup() {
    const initialTotalAmount = 1500;
    const initialSplitCount = 1;

    const defaultTip: Tip = {
      id: "",
      totalAmount: initialTotalAmount,
      splitCount: initialSplitCount,
      amountPerPerson: initialTotalAmount,
      payments: [],
      remainingAmount: initialTotalAmount,
    };

    const currentTip = ref<Tip>(defaultTip);
    const splitCountInput = ref(initialSplitCount);
    const amountToPay = ref(0);
    const selectedMethod = ref("Efectivo");
    const error = ref("");
    const success = ref("");

    const isEditingTotal = ref(false);
    const tempTotalAmount = ref(initialTotalAmount);

    const isPaymentDisabled = computed(
      () => amountToPay.value <= 0 || currentTip.value.remainingAmount <= 0
    );

    const formatCurrency = (amount: number) => {
      return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const toggleEditMode = (editing: boolean) => {
      if (editing) {
        tempTotalAmount.value = currentTip.value.totalAmount;
      }
      isEditingTotal.value = editing;
      error.value = "";
    };

    const saveTotalAmount = async () => {
      const newTotal = parseFloat(tempTotalAmount.value.toFixed(2));

      if (isNaN(newTotal) || newTotal <= 0) {
        error.value = "La propina total debe ser un número positivo.";
        return;
      }

      resetFlow(newTotal);
      isEditingTotal.value = false;
      error.value = "";
    };

    const updateSplitCount = async () => {
      const count = Math.max(1, splitCountInput.value);
      splitCountInput.value = count;

      try {
        const initialTip = await startTipProcess(
          currentTip.value.totalAmount,
          count
        );
        currentTip.value = initialTip;
        amountToPay.value = initialTip.amountPerPerson;
      } catch (e: any) {
        error.value = e.message;
      }
    };

    const handleKeypadInput = (key: string) => {
      let currentAmountStr = amountToPay.value.toFixed(2).replace(".", "");
      let newAmountStr = "";

      if (key === "backspace" || key === "✔") {
        newAmountStr = currentAmountStr.slice(0, -1);
      } else if (key === "00") {
        if (currentAmountStr.length >= 10) return;
        newAmountStr = currentAmountStr + "00";
      } else {
        if (currentAmountStr.length >= 10) return;
        newAmountStr = currentAmountStr + key;
      }

      if (newAmountStr.length < 3) {
        newAmountStr = "000".slice(0, 3 - newAmountStr.length) + newAmountStr;
      }

      const newAmount = parseFloat(newAmountStr) / 100;

      if (newAmount > currentTip.value.remainingAmount + 0.01) {
        error.value = "El monto no puede exceder el restante.";
        return;
      }

      amountToPay.value = parseFloat(newAmount.toFixed(2));
      error.value = "";
    };

    const handlePayment = async () => {
      error.value = "";
      success.value = "";

      if (amountToPay.value <= 0) {
        error.value = "Ingrese una cantidad válida.";
        return;
      }

      try {
        const updatedTip = await payTip(
          currentTip.value.id,
          amountToPay.value,
          selectedMethod.value
        );
        currentTip.value = updatedTip;

        if (updatedTip.remainingAmount <= 0) {
          success.value = "¡Pago de propinas completado!";
          amountToPay.value = 0;
        } else {
          success.value = `Pago de $${formatCurrency(
            amountToPay.value
          )} registrado.`;
          amountToPay.value = Math.min(
            updatedTip.amountPerPerson,
            updatedTip.remainingAmount
          );
        }
      } catch (e: any) {
        error.value = e.message;
      }
    };

    const resetFlow = (newTotal: number | undefined = undefined) => {
      const resetTotal = newTotal !== undefined ? newTotal : initialTotalAmount;

      currentTip.value = {
        ...defaultTip,
        totalAmount: resetTotal,
        splitCount: initialSplitCount,
        amountPerPerson: resetTotal,
        remainingAmount: resetTotal,
        payments: [],
      };
      splitCountInput.value = initialSplitCount;
      amountToPay.value = 0;
      error.value = "";
      success.value = "";
      initializeProcess(resetTotal);
    };

    const initializeProcess = async (
      totalToUse: number = initialTotalAmount
    ) => {
      try {
        const initialTip = await startTipProcess(totalToUse, initialSplitCount);
        currentTip.value = initialTip;
        amountToPay.value = initialTip.amountPerPerson;
      } catch (e: any) {
        error.value = `Error al iniciar el proceso: ${e.message}. Asegúrese de que el backend esté corriendo en puerto 3000.`;
      }
    };

    onMounted(() => {
      initializeProcess();
    });

    return {
      currentTip,
      splitCountInput,
      amountToPay,
      selectedMethod,
      error,
      success,
      isPaymentDisabled,

      isEditingTotal,
      tempTotalAmount,
      toggleEditMode,
      saveTotalAmount,

      formatCurrency,
      updateSplitCount,
      handleKeypadInput,
      handlePayment,
      resetFlow,
    };
  },
});
</script>

<style scoped></style>
