# 🦫 Totodoro - App Desktop

## 📋 Como instalar e executar

### 1. **Instalar dependências** (precisa do Node.js)
```bash
npm install
```

### 2. **Executar o app**
```bash
npm start
```

### 3. **Gerar executável** (opcional)
```bash
npm run build
```

## 🚀 O que foi configurado

### ✅ **Electron funcionando**
- Janela sem bordas nativas
- Controles customizados funcionando
- Ícone do Totoro
- Tamanho inicial: 480x680px

### ✅ **Controles de janela reais**
- **Minimizar**: Minimiza a janela de verdade
- **Maximizar**: Maximiza/restaura a janela
- **Fechar**: Fecha o aplicativo

### ✅ **Características do app**
- Não tem menu (File, Edit, etc.)
- Inicia com fundo da cor do tema
- Funciona offline
- Ícone na barra de tarefas

## 🛠️ Como editar depois

Todos os seus arquivos continuam editáveis:
- `index.html` - Interface
- `CSS/style.css` - Estilos
- `main.js` - Lógica do timer
- `electron-main.js` - Configurações da janela
- `imagens/` - Seus GIFs do Totoro

## 📁 Estrutura do projeto
```
Totodoro/
├── index.html              ← Sua interface
├── main.js                 ← Lógica do timer
├── electron-main.js        ← Configuração do Electron
├── electron-renderer.js    ← Integração dos controles
├── package.json            ← Configurações do app
├── CSS/style.css           ← Seus estilos
├── imagens/                ← GIFs do Totoro
└── favicon_totoro.ico      ← Ícone do app
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
