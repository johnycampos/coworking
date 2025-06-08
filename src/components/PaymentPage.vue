<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Cabeçalho -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">Pagamento da Reserva</h2>
        </div>

        <!-- Resumo da Reserva -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumo da Reserva</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Tipo de Reserva:</span>
              <span class="font-medium">{{ getReservationTypeLabel }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Datas Selecionadas:</span>
              <span class="font-medium">{{ formattedDates }}</span>
            </div>
            <div v-if="selectedType === 'hourly'" class="flex justify-between">
              <span class="text-gray-600">Horário:</span>
              <span class="font-medium">{{ selectedHour }}:00</span>
            </div>
            <div class="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
              <span>Total:</span>
              <span>R$ {{ totalAmount }},00</span>
            </div>
          </div>
        </div>

        <!-- Formulário de Pagamento -->
        <div class="px-6 py-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Dados do Pagamento</h3>
          
          <!-- Formulário do Mercado Pago -->
          <div id="payment-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" v-model="paymentData.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">CPF</label>
                <input type="text" v-model="paymentData.cpf" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" v-model="paymentData.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Telefone</label>
              <input type="tel" v-model="paymentData.phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Container do Mercado Pago -->
            <div id="mercadopago-container" class="mt-4"></div>
          </div>

          <!-- Botões de Ação -->
          <div class="mt-6 flex justify-between">
            <button @click="goBack" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Voltar
            </button>
            <button @click="processPayment" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Finalizar Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useReservationStore } from '../stores/reservation'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useReservationStore()

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

// Funções
function goBack() {
  router.push('/booking')
}

async function processPayment() {
  try {
    // Aqui você implementará a integração com o Mercado Pago
    // Este é um exemplo básico da estrutura
    const paymentInfo = {
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
    }

    // Salvar dados do pagamento na store
    store.setPaymentData(paymentInfo)

    // Aqui você fará a chamada para a API do Mercado Pago
    // e redirecionará para a página de sucesso
    router.push('/payment-success')
  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    alert('Erro ao processar pagamento. Por favor, tente novamente.')
  }
}

onMounted(() => {
  // Aqui você inicializará o SDK do Mercado Pago
  // e configurará o formulário de pagamento
})
</script>

<style scoped>
/* Estilos específicos do componente */
</style> 