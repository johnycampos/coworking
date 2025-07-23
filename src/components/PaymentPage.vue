<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- Cabeçalho -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Pagamento da Reserva</h2>
        </div>

        <!-- Resumo da Reserva -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumo da Reserva</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Tipo de Reserva:</span>
              <span class="font-medium dark:text-white">{{ getReservationTypeLabel }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Datas Selecionadas:</span>
              <span class="font-medium dark:text-white">{{ formattedDates }}</span>
            </div>
            <div v-if="selectedType === 'hourly'" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Horário:</span>
              <span class="font-medium dark:text-white">{{ selectedHour }}:00</span>
            </div>
            <div class="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span>Total:</span>
              <span>R$ {{ totalAmount }},00</span>
            </div>
          </div>
        </div>

        <!-- Formulário de Pagamento -->
        <div class="px-6 py-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dados do Pagamento</h3>
          
          <form @submit.prevent="processPayment" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                <input type="text" v-model="paymentData.name" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">CPF</label>
                <input type="text" v-model="paymentData.cpf" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" v-model="paymentData.email" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
              <input type="tel" v-model="paymentData.phone" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Botão de Pagamento -->
            <div class="mt-6">
              <button 
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Processando...' : 'Pagar com Mercado Pago' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useReservationStore } from '../stores/reservation'
import { API_ENDPOINTS } from '../config/api'

const store = useReservationStore()
const isLoading = ref(false)

// Dados do pagamento
const paymentData = ref({
  name: '',
  cpf: '',
  email: '',
  phone: ''
})

// Computed properties
const selectedType = computed(() => store.selectedType)
const formattedDates = computed(() => store.formattedDates)
const totalAmount = computed(() => store.totalAmount)
const selectedHour = computed(() => store.selectedHour)

const getReservationTypeLabel = computed(() => {
  const types = {
    hourly: 'Por Hora',
    daily: 'Diária',
    monthly: 'Mensal'
  }
  return types[selectedType.value]
})

// Função para processar o pagamento
async function processPayment() {
  try {
    if (!paymentData.value.name || !paymentData.value.cpf || !paymentData.value.email || !paymentData.value.phone) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    isLoading.value = true

    // Criar preferência de pagamento
    const response = await fetch(API_ENDPOINTS.createPayment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount.value,
        description: `Reserva de coworking - ${getReservationTypeLabel.value}`,
        payer: {
          name: paymentData.value.name,
          email: paymentData.value.email,
          identification: {
            type: 'CPF',
            number: paymentData.value.cpf
          }
        }
      })
    })

    const result = await response.json()

    if (result.error) {
      throw new Error(result.error)
    }

    // Redirecionar para o checkout do Mercado Pago
    window.location.href = result.init_point

  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    alert('Erro ao processar pagamento. Por favor, tente novamente.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Estilos específicos do componente */
.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>