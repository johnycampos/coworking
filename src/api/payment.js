import mercadopago from 'mercadopago'

// Configurar o Mercado Pago com sua chave de acesso
mercadopago.configure({
  access_token: process.env.VUE_APP_MERCADOPAGO_ACCESS_TOKEN
})

export async function createPaymentPreference(paymentData) {
  try {
    const preference = {
      items: [
        {
          title: paymentData.description,
          unit_price: paymentData.amount,
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      payer: {
        name: paymentData.payer.name,
        email: paymentData.payer.email,
        identification: paymentData.payer.identification
      },
      back_urls: {
        success: `${window.location.origin}/payment-success`,
        failure: `${window.location.origin}/payment-failure`,
        pending: `${window.location.origin}/payment-pending`
      },
      auto_return: 'approved',
      notification_url: `${process.env.VUE_APP_API_URL}/webhook`
    }

    const response = await mercadopago.preferences.create(preference)
    return response.body
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error)
    throw error
  }
} 