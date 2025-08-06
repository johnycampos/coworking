# Coworking Jurídico

Sistema de gerenciamento e reserva de espaços para escritórios de advocacia em regime de coworking.

## 🚀 Funcionalidades

- **Página Inicial**: Apresentação do espaço com chamada para ação
- **Sistema de Reservas**: 
  - Reserva por hora
  - Reserva diária
  - Reserva mensal
  - Seleção de data e horário
- **Galeria de Fotos**: Visualização das instalações com efeitos de hover
- **Design Responsivo**: Interface adaptável para desktop e mobile
- **Analytics**: Rastreamento de eventos com Firebase Analytics

## 🛠️ Tecnologias Utilizadas

- Vue 3 (Composition API)
- Vite
- Pinia (Gerenciamento de Estado)
- Vue Router
- Firebase (Analytics e Hosting)
- Tailwind CSS
- Lucide Icons
- Google Fonts (Inter)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Firebase CLI (para deploy)

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/johnycampos/coworking.git
cd coworking
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Instale o Firebase CLI globalmente (se ainda não tiver)
```bash
npm install -g firebase-tools
```

4. Faça login no Firebase
```bash
firebase login
```

5. Configure o Firebase (apenas na primeira vez)
```bash
firebase init hosting
# Selecione o projeto: coworking-juridico
# Diretório público: dist
# Configurar como SPA: Sim
# Sobrescrever index.html: Não
```

## 🚀 Como Executar

### Desenvolvimento Local
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em: `http://localhost:5173`

### Build de Produção
```bash
npm run build
# ou
yarn build
```

### Preview do Build
```bash
npm run preview
# ou
yarn preview
```

## 🌐 Deploy no Firebase

### Deploy Completo (Build + Deploy)
```bash
npm run deploy
# ou
yarn deploy
```

### Deploy Manual
```bash
# 1. Fazer o build
npm run build

# 2. Fazer o deploy
firebase deploy
```

### Aplicação Online
A aplicação está disponível em: **https://coworking-juridico.web.app**

## 📦 Estrutura do Projeto

```
coworking/
├── src/
│   ├── components/             # Componentes Vue
│   │   ├── CoworkingPage.vue   # Página principal
│   │   ├── PaymentPage.vue     # Página de pagamento
│   │   ├── GoogleMap.vue       # Componente do mapa
│   │   └── ...                 # Outros componentes
│   ├── firebase/               # Configuração Firebase
│   │   ├── config.js           # Configuração principal
│   │   └── analytics.js        # Utilitários de Analytics
│   ├── stores/                 # Stores Pinia
│   │   └── reservation.js      # Store de reservas
│   ├── router/                 # Configuração de rotas
│   │   └── index.js
│   ├── api/                    # APIs externas
│   │   └── payment.js          # Integração MercadoPago
│   ├── App.vue                 # Componente raiz
│   ├── main.js                 # Ponto de entrada
│   └── style.css              # Estilos globais
├── public/                     # Arquivos estáticos
├── dist/                       # Build de produção
├── firebase.json              # Configuração Firebase Hosting
├── .firebaserc                # Projeto Firebase
└── index.html                 # Template HTML
```

## 🎨 Customização

- As cores principais podem ser alteradas no arquivo `src/style.css`
- As imagens da galeria podem ser modificadas no array `galleryImages` em `CoworkingPage.vue`
- Os horários disponíveis podem ser ajustados no componente de reservas
- Configurações do Firebase podem ser alteradas em `src/firebase/config.js`

## 📊 Firebase Analytics

O projeto inclui Firebase Analytics para rastreamento de eventos. Para usar:

```javascript
import { trackPageView, trackButtonClick, trackReservation } from '@/firebase/analytics'

// Exemplos de uso
trackPageView('Página Principal')
trackButtonClick('Botão Reservar')
trackReservation('Sala de Reunião')
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✒️ Autor

* **Johny Campos** - [GitHub](https://github.com/johnycampos)

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no GitHub.

## 🔗 Links Úteis

- **Aplicação Online**: https://coworking-juridico.web.app
- **Console Firebase**: https://console.firebase.google.com/project/coworking-juridico/overview
- **Analytics**: https://console.firebase.google.com/project/coworking-juridico/analytics
