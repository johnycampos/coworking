import { analytics } from './config';
import { logEvent } from 'firebase/analytics';

// Função para registrar eventos personalizados
export const trackEvent = (eventName, parameters = {}) => {
  try {
    logEvent(analytics, eventName, parameters);
    console.log(`Evento registrado: ${eventName}`, parameters);
  } catch (error) {
    console.error('Erro ao registrar evento:', error);
  }
};

// Funções específicas para eventos comuns
export const trackPageView = (pageName) => {
  trackEvent('page_view', { page_name: pageName });
};

export const trackButtonClick = (buttonName) => {
  trackEvent('button_click', { button_name: buttonName });
};

export const trackFormSubmit = (formName) => {
  trackEvent('form_submit', { form_name: formName });
};

export const trackReservation = (reservationType) => {
  trackEvent('reservation_created', { reservation_type: reservationType });
}; 