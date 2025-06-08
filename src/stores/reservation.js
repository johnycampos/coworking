import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    selectedDates: [],
    selectedHour: null,
    selectedType: 'hourly',
    prices: {
      hourly: 10,
      daily: 50,
      monthly: 500
    },
    paymentData: null
  }),

  getters: {
    totalAmount: (state) => {
      if (state.selectedType === 'hourly') {
        return state.prices.hourly * state.selectedDates.length
      } else if (state.selectedType === 'daily') {
        return state.prices.daily * state.selectedDates.length
      } else {
        return state.prices.monthly
      }
    },
    
    formattedDates: (state) => {
      if (state.selectedType === 'monthly') {
        return 'Mensal'
      }
      return state.selectedDates.map(date => {
        const currentDate = new Date()
        currentDate.setDate(date)
        return currentDate.toLocaleDateString('pt-BR')
      }).join(', ')
    }
  },

  actions: {
    setReservationData(dates, hour, type) {
      this.selectedDates = dates
      this.selectedHour = hour
      this.selectedType = type
    },

    setPaymentData(data) {
      this.paymentData = data
    },

    clearReservation() {
      this.selectedDates = []
      this.selectedHour = null
      this.selectedType = 'hourly'
      this.paymentData = null
    }
  }
}) 