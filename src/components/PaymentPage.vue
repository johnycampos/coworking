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
          <form id="payment-form" class="space-y-4" @submit.prevent="processPayment">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" v-model="paymentData.name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">CPF</label>
                <input type="text" v-model="paymentData.cpf" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" v-model="paymentData.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Telefone</label>
              <input type="tel" v-model="paymentData.phone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Botão para inicializar o Brick -->
            <div v-if="!brickBuilder && mpInstance" class="mt-4">
              <button 
                type="button" 
                @click="initializeBrick"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                :disabled="!paymentData.name || !paymentData.cpf || !paymentData.email || !paymentData.phone || isLoading"
              >
                {{ isLoading ? 'Carregando...' : 'Continuar para Pagamento' }}
              </button>
            </div>

            <!-- Loading state -->
            <div v-if="!mpInstance" class="mt-4 text-center text-gray-600">
              Carregando Mercado Pago...
            </div>

            <!-- Brick do Mercado Pago -->
            <div id="paymentBrick_container"></div>

            <!-- Botões de Ação -->
            <div class="mt-6 flex justify-between">
              <button type="button" @click="goBack" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useReservationStore } from '../stores/reservation'
import { useRouter } from 'vue-router'
import { API_ENDPOINTS } from '../config/api'

const router = useRouter()
const store = useReservationStore()

// Estados
const isLoading = ref(false)
const mpInstance = ref(null)
const brickBuilder = ref(null)

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
    if (!paymentData.value.name || !paymentData.value.cpf || !paymentData.value.email || !paymentData.value.phone) {
      alert('Por favor, preencha todos os campos.')
      return
    }

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

    // Salvar dados do pagamento na store
    store.setPaymentData({
      ...paymentData.value,
      preferenceId: result.id
    })

  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    alert('Erro ao processar pagamento. Por favor, tente novamente.')
  }
}

// Função para carregar o SDK do Mercado Pago
async function loadMercadoPagoSDK() {
  try {
    // Verificar se já foi carregado
    if (window.MercadoPago) {
      mpInstance.value = new window.MercadoPago('TEST-48ab8777-e358-44be-8527-04239cd67317')
      return
    }

    // Carregar o script do SDK
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    
    await new Promise((resolve, reject) => {
      script.onload = () => {
        if (window.MercadoPago) {
          mpInstance.value = new window.MercadoPago('TEST-48ab8777-e358-44be-8527-04239cd67317')
          resolve()
        } else {
          reject(new Error('Mercado Pago SDK não foi carregado corretamente'))
        }
      }
      script.onerror = reject
      document.head.appendChild(script)
    })

  } catch (error) {
    console.error('Erro ao carregar SDK do Mercado Pago:', error)
    alert('Erro ao carregar o sistema de pagamento. Tente recarregar a página.')
  }
}

// Função para inicializar o Brick
async function initializeBrick() {
  if (isLoading.value || !mpInstance.value || brickBuilder.value) return

  try {
    isLoading.value = true

    if (!paymentData.value.name || !paymentData.value.cpf || !paymentData.value.email || !paymentData.value.phone) {
      alert('Por favor, preencha todos os campos antes de prosseguir.')
      isLoading.value = false
      return
    }

    // Destruir brick anterior se existir
    if (brickBuilder.value) {
      try {
        await brickBuilder.value.unmount()
      } catch (e) {
        console.log('Brick anterior já foi removido')
      }
      brickBuilder.value = null
    }

    // Limpar e recriar container
    const container = document.getElementById('paymentBrick_container')
    if (container) {
      container.innerHTML = ''
      // Aguardar um pouco para garantir que o DOM foi limpo
      await new Promise(resolve => setTimeout(resolve, 100))
    }

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

    // Verificar se o container ainda existe
    if (!document.getElementById('paymentBrick_container')) {
      throw new Error('Container do pagamento não encontrado')
    }

    // Configurar o Brick
    const settings = {
      initialization: {
        preferenceId: result.id,
        amount: totalAmount.value
      },
      callbacks: {
        onReady: () => {
          console.log('Brick pronto')
          isLoading.value = false
        },
        onError: (error) => {
          console.error('Erro no Brick:', error)
          isLoading.value = false
          alert('Erro no formulário de pagamento. Tente novamente.')
        },
        onSubmit: (cardFormData) => {
          return new Promise((resolve, reject) => {
            fetch(API_ENDPOINTS.createPayment + '/process', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...cardFormData,
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
            .then(response => response.json())
            .then(result => {
              if (result.status === 'approved') {
                router.push('/payment-success')
                resolve()
              } else {
                router.push('/payment-failure')
                reject()
              }
            })
            .catch(error => {
              console.error('Erro ao processar pagamento:', error)
              reject()
            })
          })
        },
      },
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          bankTransfer: ['pix']
        },
        visual: {
          style: {
            theme: 'default',
            customVariables: {
              formBackgroundColor: '#FFFFFF',
              baseColor: '#3B82F6'
            }
          }
        }
      }
    }

    // Criar nova instância do bricks
    const bricks = mpInstance.value.bricks()
    
    // Criar o Brick
    brickBuilder.value = await bricks.create('payment', 'paymentBrick_container', settings)

  } catch (error) {
    console.error('Erro ao inicializar Brick:', error)
    alert('Erro ao inicializar o formulário de pagamento. Por favor, tente novamente.')
    isLoading.value = false
    brickBuilder.value = null
  }
}

onMounted(async () => {
  await loadMercadoPagoSDK()
})

// Observar mudanças nos dados do formulário para auto-inicializar
let timeoutId = null
watch(paymentData, (newValue) => {
  // Cancelar timeout anterior se existir
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  if (newValue.name && newValue.cpf && newValue.email && newValue.phone && mpInstance.value && !brickBuilder.value && !isLoading.value) {
    // Delay para evitar múltiplas chamadas
    timeoutId = setTimeout(() => {
      if (!brickBuilder.value && !isLoading.value) {
        initializeBrick()
      }
    }, 1000) // Aumentei o delay para 1 segundo
  }
}, { deep: true })

// Cleanup quando o componente for desmontado
onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (brickBuilder.value) {
    try {
      brickBuilder.value.unmount()
    } catch (e) {
      console.log('Erro ao desmontar brick:', e)
    }
  }
})
</script>

<style scoped>
/* Estilos específicos do componente */
.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>