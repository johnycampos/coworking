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

## 🛠️ Tecnologias Utilizadas

- Vue 3 (Composition API)
- Vite
- Tailwind CSS
- Lucide Icons
- Google Fonts (Inter)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

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

3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

4. Para build de produção
```bash
npm run build
# ou
yarn build
```

## 📦 Estrutura do Projeto

```
coworking/
├── src/
│   ├── components/
│   │   └── CoworkingPage.vue    # Componente principal
│   ├── App.vue                  # Componente raiz
│   ├── main.js                  # Ponto de entrada
│   └── style.css               # Estilos globais
├── public/                     # Arquivos estáticos
└── index.html                  # Template HTML
```

## 🎨 Customização

- As cores principais podem ser alteradas no arquivo `src/style.css`
- As imagens da galeria podem ser modificadas no array `galleryImages` em `CoworkingPage.vue`
- Os horários disponíveis podem ser ajustados no componente de reservas

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
