<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Pagamento Aprovado!</h2>
        </div>
        <div class="px-6 py-4">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">Pagamento realizado com sucesso!</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Sua reserva foi confirmada. Você receberá um email com os detalhes.
            </p>
            <!-- Campo de informações do pagamento -->
  <div v-if="collectionId || orderId || externalReference" class="flex flex-col items-center justify-center mt-6 mb-4">
    <div class="bg-gray-100 dark:bg-gray-700 rounded p-4 w-full max-w-md text-left text-sm text-gray-800 dark:text-gray-100 shadow">
      <div v-if="collectionId"><span class="font-semibold">ID do Pagamento:</span> {{ collectionId }}</div>
      <div v-if="orderId"><span class="font-semibold">Order ID:</span> {{ orderId }}</div>
      <div v-if="externalReference"><span class="font-semibold">Referência:</span> {{ externalReference }}</div>
    </div>
  </div>
            <!-- Botão WhatsApp abaixo da mensagem -->
            <div class="flex justify-center mt-4">
              <a
                href="https://wa.me/5521995753900"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-medium shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                aria-label="Fale com atendimento no WhatsApp"
              >
                <svg viewBox="0 0 32 32" class="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.607 1.938 6.563L4 29l7.688-1.938A12.93 12.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.07 0-4.09-.563-5.833-1.625l-.417-.25-4.563 1.146 1.188-4.438-.271-.438C5.563 18.09 5 16.07 5 14c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.188-7.438c-.338-.169-2-1-2.313-1.125-.313-.125-.542-.188-.771.125-.229.313-.885 1.125-1.085 1.354-.199.229-.396.257-.734.088-.338-.169-1.429-.527-2.723-1.68-1.007-.899-1.688-2.007-1.885-2.345-.197-.338-.021-.52.148-.688.152-.151.338-.396.507-.594.169-.199.225-.338.338-.563.112-.225.056-.422-.028-.594-.084-.169-.771-1.854-1.057-2.543-.278-.669-.561-.577-.771-.588-.197-.009-.422-.011-.646-.011-.225 0-.594.084-.906.422-.313.338-1.188 1.163-1.188 2.838 0 1.675 1.215 3.293 1.384 3.522.169.229 2.395 3.66 5.813 4.988.813.351 1.447.561 1.943.717.816.26 1.56.224 2.146.136.655-.097 2.001-.818 2.285-1.607.283-.789.283-1.465.198-1.607-.084-.142-.308-.225-.646-.394z"/>
                </svg>
                Falar com atendimento no WhatsApp
              </a>
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
  
  <!-- Botão flutuante do WhatsApp -->
  <a
    href="https://wa.me/5521995753900"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed z-50 bottom-6 right-6 flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-colors"
    style="box-shadow: 0 4px 24px rgba(0,0,0,0.15);"
    aria-label="Fale conosco no WhatsApp"
  >
    <svg viewBox="0 0 32 32" class="w-8 h-8 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.607 1.938 6.563L4 29l7.688-1.938A12.93 12.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.07 0-4.09-.563-5.833-1.625l-.417-.25-4.563 1.146 1.188-4.438-.271-.438C5.563 18.09 5 16.07 5 14c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.188-7.438c-.338-.169-2-1-2.313-1.125-.313-.125-.542-.188-.771.125-.229.313-.885 1.125-1.085 1.354-.199.229-.396.257-.734.088-.338-.169-1.429-.527-2.723-1.68-1.007-.899-1.688-2.007-1.885-2.345-.197-.338-.021-.52.148-.688.152-.151.338-.396.507-.594.169-.199.225-.338.338-.563.112-.225.056-.422-.028-.594-.084-.169-.771-1.854-1.057-2.543-.278-.669-.561-.577-.771-.588-.197-.009-.422-.011-.646-.011-.225 0-.594.084-.906.422-.313.338-1.188 1.163-1.188 2.838 0 1.675 1.215 3.293 1.384 3.522.169.229 2.395 3.66 5.813 4.988.813.351 1.447.561 1.943.717.816.26 1.56.224 2.146.136.655-.097 2.001-.818 2.285-1.607.283-.789.283-1.465.198-1.607-.084-.142-.308-.225-.646-.394z"/>
    </svg>
  </a>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

function goToHome() {
  router.push('/')
}

// Extrair parâmetros da URL
const collectionId = computed(() => route.query.collection_id)
const orderId = computed(() => route.query.merchant_order_id)
const externalReference = computed(() => route.query.external_reference)
</script> 