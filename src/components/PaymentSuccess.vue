<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-8 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle2Icon class="h-6 w-6 text-green-600" />
          </div>
          <h2 class="mt-4 text-2xl font-bold text-gray-900">Pagamento Realizado com Sucesso!</h2>
          <p class="mt-2 text-gray-600">
            Sua reserva foi confirmada e você receberá um email com todos os detalhes.
          </p>
          
          <div class="mt-8 border-t border-gray-200 pt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Detalhes da Reserva</h3>
            <div class="space-y-2 text-left">
              <div class="flex justify-between">
                <span class="text-gray-600">Tipo de Reserva:</span>
                <span class="font-medium">{{ getReservationTypeLabel }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Datas:</span>
                <span class="font-medium">{{ formattedDates }}</span>
              </div>
              <div v-if="selectedType === 'hourly'" class="flex justify-between">
                <span class="text-gray-600">Horário:</span>
                <span class="font-medium">{{ selectedHour }}:00</span>
              </div>
              <div class="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Total Pago:</span>
                <span>R$ {{ totalAmount }},00</span>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <button @click="goToHome" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Voltar para o Início
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useReservationStore } from '../stores/reservation'
import { CheckCircle2Icon } from 'lucide-vue-next'

const router = useRouter()
const store = useReservationStore()

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

function goToHome() {
  store.clearReservation()
  router.push('/')
}
</script> 