<template>
  <div class="min-h-screen flex flex-col">
    <!-- Cabeçalho da Aplicação -->
    <header class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-20 w-full">
      <nav class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <a href="#" @click.prevent="currentPage = 'home'" class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 h-8 w-8"><path d="M2 21a8 4 0 0 1 16 0"/><path d="M9 13c-2.5 0-4-3.5-4-6 2-2.5 4-2.5 6 0 2 2.5 2 6-1 6h-1Z"/><path d="M14 13c2.5 0 4-3.5 4-6-2-2.5-4-2.5-6 0-2 2.5-2 6 1 6h1Z"/><path d="M12 21a4 4 0 0 0 8 0"/></svg>
              <span class="text-xl font-bold text-slate-800 dark:text-white">Coworking Jurídico</span>
            </a>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" @click.prevent="currentPage = 'home'" :class="{'text-blue-600 font-semibold': currentPage === 'home', 'text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400': currentPage !== 'home'}" class="px-3 py-2 rounded-md text-sm font-medium">Início</a>
              <a href="#" @click.prevent="currentPage = 'booking'" :class="{'text-blue-600 font-semibold': currentPage === 'booking', 'text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400': currentPage !== 'booking'}" class="px-3 py-2 rounded-md text-sm font-medium">Reservar</a>
              <a href="#" @click.prevent="currentPage = 'gallery'" :class="{'text-blue-600 font-semibold': currentPage === 'gallery', 'text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400': currentPage !== 'gallery'}" class="px-3 py-2 rounded-md text-sm font-medium">Galeria</a>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" type="button" class="bg-gray-100 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Abrir menu</span>
              <svg :class="{'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <!-- Menu Mobile -->
      <div v-show="mobileMenuOpen" class="md:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" @click.prevent="navigateTo('home')" class="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">Início</a>
          <a href="#" @click.prevent="navigateTo('booking')" class="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">Reservar</a>
          <a href="#" @click.prevent="navigateTo('gallery')" class="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">Galeria</a>
        </div>
      </div>
    </header>

    <main class="flex-grow w-full">
      <!-- Transição entre as páginas -->
      <transition name="fade" mode="out-in">
        <div :key="currentPage" class="w-full">
          <!-- Página Inicial (Home) -->
          <section v-if="currentPage === 'home'" class="w-full">
            <div class="relative bg-white dark:bg-gray-900 overflow-hidden w-full">
              <div class="w-full">
                <div class="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                  <main class="mt-10 mx-auto w-full px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div class="sm:text-center lg:text-left">
                      <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                        <span class="block">Seu escritório de advocacia</span>
                        <span class="block text-blue-600 dark:text-blue-400">pronto para usar.</span>
                      </h1>
                      <p class="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Ambiente profissional e totalmente equipado. Alugue por hora, dia ou mês e foque no que realmente importa: seus clientes.
                      </p>
                      <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div class="rounded-md shadow">
                          <a href="#" @click.prevent="currentPage = 'booking'" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 md:py-4 md:text-lg md:px-10">
                            Reservar Agora
                          </a>
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-3">
                          <a href="#" @click.prevent="currentPage = 'gallery'" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 md:py-4 md:text-lg md:px-10">
                            Ver o Espaço
                          </a>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
              <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="@/assets/1.jpg" alt="Escritório de coworking moderno">
              </div>
            </div>
            <!-- Mapa do Google -->
            <GoogleMap />
          </section>

          <!-- Página de Reservas -->
          <section v-if="currentPage === 'booking' || currentPage === 'payment' || currentPage === 'success'" class="py-12 bg-gray-50 dark:bg-gray-800 w-full">
            <div class="w-full px-4 sm:px-6 lg:px-8">
              <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Reservar Espaço</h2>
                
                <!-- Seleção de Tipo de Reserva -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tipo de Reserva</h3>
                  <div class="grid grid-cols-3 gap-4">
                    <button class="p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                            :class="{'bg-blue-600 text-white': selectedType === 'hourly'}"
                            @click="selectedType = 'hourly'">
                      <Clock class="w-6 h-6 mx-auto mb-2" />
                      Por Hora
                      <div class="text-sm mt-1">R$ {{ prices.hourly }},00/hora</div>
                    </button>
                    <button class="p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                            :class="{'bg-blue-600 text-white': selectedType === 'daily'}"
                            @click="selectedType = 'daily'">
                      <Calendar class="w-6 h-6 mx-auto mb-2" />
                      Diária
                      <div class="text-sm mt-1">R$ {{ prices.daily }},00/dia</div>
                    </button>
                    <button class="p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                            :class="{'bg-blue-600 text-white': selectedType === 'monthly'}"
                            @click="selectedType = 'monthly'">
                      <DollarSign class="w-6 h-6 mx-auto mb-2" />
                      Mensal
                      <div class="text-sm mt-1">R$ {{ prices.monthly }},00/mês</div>
                    </button>
                  </div>
                </div>

                <!-- Seleção de Data -->
                <div v-if="selectedType !== 'monthly'" class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Selecione as Datas</h3>
                  <div class="grid grid-cols-7 gap-2">
                    <div v-for="day in 31" :key="day" 
                         class="text-center p-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700"
                         :class="{'selected-day': selectedDate.includes(day)}"
                         @click="toggleDate(day)">
                      {{ day }}
                    </div>
                  </div>
                  <div v-if="selectedDate.length > 0" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    Datas selecionadas: {{ selectedDate.join(', ') }}
                  </div>
                </div>

                <!-- Seleção de Horário (apenas para reserva por hora) -->
                <div v-if="selectedType === 'hourly'" class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Selecione a quantidade de horas por dia</h3>
                  <div class="flex items-center space-x-4">
                    <label for="quantidade-horas" class="block text-gray-700 dark:text-gray-300">Horas por dia:</label>
                    <input
                      id="quantidade-horas"
                      type="number"
                      min="1"
                      max="12"
                      v-model.number="selectedHour"
                      class="w-24 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 2"
                    />
                  </div>
                  <div v-if="selectedHour" class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Você selecionou {{ selectedHour }} hora(s) por dia.
                  </div>
                </div>

                <!-- Resumo do Valor -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumo do Valor</h3>
                  <div class="space-y-2">
                    <div v-if="selectedType === 'hourly'">
                      <div class="flex justify-between">
                        <span>Quantidade de dias:</span>
                        <span>{{ selectedDate.length }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Horas por dia:</span>
                        <span>{{ selectedHour || 0 }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Valor unitário (hora):</span>
                        <span>R$ {{ prices.hourly }},00</span>
                      </div>
                      <div class="border-t pt-2 mt-2">
                        <div class="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>R$ {{ prices.hourly * selectedDate.length * (selectedHour || 0) }},00</span>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="flex justify-between">
                        <span>Quantidade:</span>
                        <span>{{ selectedType === 'monthly' ? '1 mês' : `${selectedDate.length} ${selectedType === 'hourly' ? 'horas' : 'dias'}` }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Valor unitário:</span>
                        <span>R$ {{ prices[selectedType] }},00</span>
                      </div>
                      <div class="border-t pt-2 mt-2">
                        <div class="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>R$ {{ calculateTotal() }},00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Botão de Confirmação -->
                <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                        @click="confirmReservation">
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </section>

          <!-- Página da Galeria -->
          <section v-if="currentPage === 'gallery'" class="py-12 bg-white dark:bg-gray-900 w-full">
            <div class="w-full px-4 sm:px-6 lg:px-8">
              <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Nossas Instalações</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div v-for="(image, index) in galleryImages" :key="index" 
                       class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img :src="image.src" 
                         :alt="image.alt"
                         class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                      <div class="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-lg font-semibold">{{ image.alt }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </transition>
    </main>

    <!-- Rodapé -->
    <footer class="bg-gray-800 dark:bg-black text-white w-full">
      <div class="w-full py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {{ new Date().getFullYear() }} Coworking Jurídico. Todos os direitos reservados.</p>
        <p class="text-gray-400 dark:text-gray-500 text-sm mt-2"> Av. Gov. Roberto Silveira, 470 - Centro, Nova Iguaçu - RJ, 26210-210</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Clock, Calendar, DollarSign, ChevronLeftIcon, ChevronRightIcon, LockIcon, CheckCircle2Icon } from 'lucide-vue-next'
import { useReservationStore } from '@/stores/reservation'
import { useRouter } from 'vue-router'
import GoogleMap from '@/components/GoogleMap.vue'

// Importação das imagens
import image1 from '@/assets/1.jpg'
import image2 from '@/assets/2.jpg'
import image3 from '@/assets/3.jpg'
import image4 from '@/assets/4.jpg'
import image5 from '@/assets/5.jpg'
import image6 from '@/assets/6.jpg'
import image7 from '@/assets/7.jpg'


const router = useRouter()
const store = useReservationStore()

// Estado da aplicação
const currentPage = ref('home')
const mobileMenuOpen = ref(false)

// Estado da reserva
const selectedDate = ref([])
const selectedHour = ref(null)
const selectedType = ref('hourly')

// Preços
const prices = store.prices

// Dados mockados
const totalDesks = 4
const bookingsData = ref([
  { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-20`, hour: 10, desks: 4 },
  { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-20`, hour: 11, desks: 2 },
  { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-22`, type: 'daily', desks: 3 },
  { date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 2).padStart(2, '0')}-01`, type: 'monthly', desks: 1 },
])

const galleryImages = ref([
  { 
    src: image2, 
    alt: 'Recepção do prédio' 
  },
  { 
    src: image1, 
    alt: 'Entrada do escritório' 
  },
  { 
    src: image3, 
    alt: 'Estações de trabalho individuais' 
  },
  { 
    src: image4, 
    alt: 'Estações de trabalho individuais' 
  },
  { 
    src: image5, 
    alt: 'Cozinha embutida' 
  },
  { 
    src: image6, 
    alt: 'Bancada de escritório' 
  },
  { 
    src: image7, 
    alt: 'Banheiro privado' 
  }
])

// Funções
function navigateTo(page) {
  currentPage.value = page
  mobileMenuOpen.value = false
}

function toggleDate(day) {
  const index = selectedDate.value.indexOf(day)
  if (index === -1) {
    selectedDate.value.push(day)
  } else {
    selectedDate.value.splice(index, 1)
  }
}

function calculateTotal() {
  if (selectedType.value === 'monthly') {
    return prices.monthly
  }
  return prices[selectedType.value] * selectedDate.value.length
}

// Função para confirmar reserva
function confirmReservation() {
  if (selectedType.value === 'monthly') {
    // Para reserva mensal, não precisa selecionar datas
    store.setReservationData([1], null, selectedType.value)
    router.push('/payment')
    return
  }

  if (selectedDate.value.length === 0) {
    alert('Por favor, selecione pelo menos uma data.')
    return
  }

  if (selectedType.value === 'hourly' && !selectedHour.value) {
    alert('Por favor, selecione a quantidade de horas por dia para a reserva por hora.')
    return
  }
  
  // Salvar dados na store
  store.setReservationData(
    selectedDate.value,
    selectedType.value === 'hourly' ? selectedHour.value : null,
    selectedType.value
  )
  
  // Redirecionar para a página de pagamento
  router.push('/payment')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.selected-day {
  background-color: #2563eb !important;
  color: white !important;
  border-radius: 50%;
}

/* Ajustes para ocupar toda a tela */
:deep(.container) {
  width: 100%;
  max-width: none;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  :deep(.container) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  :deep(.container) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style> 