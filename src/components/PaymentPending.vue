<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Pagamento Pendente</h2>
        </div>
        <div class="px-6 py-4">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">Seu pagamento está sendo processado</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Você receberá um email assim que o pagamento for confirmado.
            </p>
            <div v-if="paymentDetails" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <p>ID do Pagamento: {{ paymentDetails.payment_id }}</p>
              <p>Status: {{ paymentDetails.status }}</p>
              <p>Referência: {{ paymentDetails.external_reference }}</p>
            </div>
            <div v-if="error" class="mt-4 text-sm text-red-600 dark:text-red-400">
              {{ error }}
            </div>
            <div v-if="loading" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Verificando status do pagamento...
            </div>
            <div class="mt-6">
              <button
                @click="goToHome"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '@/config/api'

const router = useRouter()
const route = useRoute()
const paymentDetails = ref(null)
const error = ref(null)
const loading = ref(false)

async function checkPaymentStatus(paymentId) {
  loading.value = true
  error.value = null
  
  try {
    console.log('Verificando status do pagamento:', paymentId)
    const response = await fetch(`${api.API_BASE_URL}/api/payment/${paymentId}`)
    console.log('Resposta da API:', response)
    
    if (!response.ok) {
      throw new Error(`Erro ao verificar status do pagamento: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Dados do pagamento:', data)
    return data
  } catch (err) {
    console.error('Erro detalhado:', err)
    error.value = 'Não foi possível verificar o status do pagamento. Por favor, tente novamente mais tarde.'
    return null
  } finally {
    loading.value = false
  }
}

function isPaymentApproved(status) {
  return status === 'approved' || status === 'completed' || status === 'success'
}

onMounted(async () => {
  try {
    console.log('Componente montado')
    console.log('Parâmetros da URL:', route.query)
    
    const params = route.query
    
    if (Object.keys(params).length > 0) {
      console.log('Parâmetros encontrados:', params)
      paymentDetails.value = {
        payment_id: params.payment_id,
        status: params.status,
        external_reference: params.external_reference,
        collection_status: params.collection_status,
        payment_type: params.payment_type,
        merchant_order_id: params.merchant_order_id
      }

      // Verifica o status do pagamento
      if (params.payment_id) {
        console.log('Iniciando verificação do pagamento:', params.payment_id)
        const paymentStatus = await checkPaymentStatus(params.payment_id)
        if (paymentStatus) {
          console.log('Status do pagamento atualizado:', paymentStatus)
          paymentDetails.value = {
            ...paymentDetails.value,
            status: paymentStatus.status,
            status_detail: paymentStatus.status_detail
          }

          // Se o pagamento foi aprovado, redireciona para a página de sucesso
          if (isPaymentApproved(paymentStatus.status)) {
            console.log('Pagamento aprovado, redirecionando para página de sucesso')
            router.push('/payment-success')
            return
          }
        }
      }
    } else {
      console.log('Nenhum parâmetro encontrado na URL')
      error.value = 'Nenhum dado de pagamento encontrado.'
    }
  } catch (err) {
    console.error('Erro ao processar pagamento:', err)
    error.value = 'Ocorreu um erro ao processar o pagamento. Por favor, tente novamente mais tarde.'
  }
})

function goToHome() {
  router.push('/')
}
</script> 