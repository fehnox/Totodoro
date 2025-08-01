# 🦫 Totodoro - Pomodoro Timer

<div align="center">
  
  ![Totodoro Banner](https://img.shields.io/badge/Totodoro-Pomodoro%20Timer-ff99cc?style=for-the-badge&logo=heart&logoColor=white)
  
  *Um timer Pomodoro encantador inspirado no querido Totoro do Studio Ghibli*
  
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=flat-square&logo=electron&logoColor=9FEAF9)](https://www.electronjs.org/)
  
</div>

## ✨ Sobre o Projeto

O **Totodoro** é um timer Pomodoro temático que combina produtividade com a magia do Studio Ghibli. Desenvolvido com uma interface pastel suave e animações encantadoras do Totoro, este aplicativo torna suas sessões de estudo e trabalho mais agradáveis e motivadoras.

### 🎯 Características Principais

- 🦫 **Animações do Totoro** - GIFs rotativos durante as sessões
- 🎨 **Design Pastel Harmonioso** - Interface suave e relaxante
- 🔔 **Notificações Sonoras** - Sistema de áudio com múltiplos fallbacks
- ⚡ **Aplicação Desktop** - Funciona como app nativo via Electron
- 🎛️ **Controles Personalizados** - Minimize, maximize e feche como uma janela real
- 📱 **Responsivo** - Funciona perfeitamente em diferentes tamanhos de tela

## 🚀 Instalação e Execução

### 💻 Pré-requisitos
- **Node.js** instalado (versão 14 ou superior)
- **npm** (incluído com Node.js)

### 🖥️ Executar como Aplicação Desktop
```bash
# 1. Clone o repositório
git clone https://github.com/fehnox/Totodoro.git

# 2. Navegue até a pasta
cd Totodoro

# 3. Instale as dependências
npm install

# 4. Execute a aplicação
npm start
```

### 📦 Gerar Executável (Opcional)
```bash
# Construir distribuível
npm run build
```

### � Executar no Navegador
1. Abra o arquivo `index.html` em seu navegador favorito
2. Configure o tempo desejado (1-60 minutos)
3. Clique em "Iniciar" e veja o Totoro se animar!

## 🎮 Como Usar

### ⏰ Funcionalidades do Timer
- **Configurar**: Defina entre 1 a 60 minutos
- **Iniciar**: Comece sua sessão produtiva
- **Pausar**: Interrompa temporariamente
- **Reiniciar**: Volte ao tempo inicial
- **Testar Som**: Verifique as notificações

### 🎭 Experiência Visual
- **Animações automáticas**: 3 GIFs diferentes do Totoro
- **Cores harmoniosas**: Tema pastel relaxante
- **Efeitos suaves**: Hover e transições elegantes

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura da aplicação |
| **CSS3** | Estilização e animações |
| **JavaScript ES6+** | Lógica do timer e interações |
| **Electron** | Aplicação desktop nativa |
| **Web Audio API** | Sistema de notificações sonoras |
| **Google Fonts** | Tipografia (Pacifico & Gloria Hallelujah) |

## 📁 Estrutura do Projeto

```
Totodoro/
├── 📄 index.html              # Página principal
├── 📄 main.js                 # Lógica do timer
├── 📄 notification.js         # Sistema de notificações
├── 📄 electron-main.js        # Configuração do Electron
├── 📄 electron-renderer.js    # Interface Electron
├── 📄 package.json           # Dependências e scripts
├── 🎨 CSS/
│   └── style.css             # Estilos principais
├── 🖼️ imagens/
│   ├── totoro_run.gif        # Animação 1
│   ├── totoro_corda.gif      # Animação 2
│   └── totorogif_bam.gif     # Animação 3
└── 🦫 favicon_totoro.ico     # Ícone da aplicação
```

## 🔧 Problemas comuns

**Se o Node.js não funcionar:**
1. Feche este terminal
2. Abra um novo PowerShell como administrador
3. Execute: `npm install`
4. Execute: `npm start`

**Para atualizar o app:**
1. Edite seus arquivos normalmente
2. Salve
3. Reinicie o app (`npm start`)

## 🎨 Personalização

Você pode mudar:
- Tamanho da janela em `electron-main.js` (width/height)
- Cores e estilos em `style.css`
- Lógica do timer em `main.js`
- Adicionar novos GIFs na pasta `imagens/`
