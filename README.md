# My Finances

![Banner](https://user-images.githubusercontent.com/73085387/139689681-a286fd1d-7237-4eb5-a802-1f8de22410cb.png)

### Aplicativo de finanças pessoais desenvolvido em React Native

# Como usar o aplicativo:

**Expo:** https://expo.dev/@victorborzaquel/myfinances  
**Play Store:** Em Breve  

**OBS: Para usar o aplicativo com Expo é preciso baixar o app do Expo:**


**Android:** https://play.google.com/store/apps/details?id=host.exp.exponent  
**Iphone:** https://apps.apple.com/br/app/expo-go/id982107779  

# Algumas Tecnologias utilizadas

- **Victory Native:** Criação de gráficos
- **Styled Components:** Separar a estilização do Componente e Criação de modo Dark
- **Modalize:** Criação de Modal
- **Async Storage:** Armazenar dados do usuario depois de fechar o App
- **Datetimepicker:** Usuário Selecionar datas
- **Navigation:** Criação de navegação entre telas
- **Inline Dotenv:** Segurança de dados sensiveis
- **Date Fns:** Modificar datas
- **Localization:** Pegar as configurações de idioma do usuario
- **I18n:** Tradução do Aplicativo em português e inglês

# Como editar o aplicativo

## 1º Criar um conta no Expo e no Google Cloud

- Expo: https://expo.dev
- Google Cloud: https://console.cloud.google.com

## 2º Instalar o Expo no seu Computador

no terminar digite:
```
npm install --global expo-cli
```

Depois verifique se instalou corretamente digitando:
```
expo whoami
```
Se tiver baixado o expo ira aparecer no terminal: **"Not logged in"**

Para fazer o login digite no terminal o comando e em seguida faça o login:
```
expo login
```

Para verificar se está logado digite:
```
expo whoami
```

Se tudo ocorreu certo aparecera no terminal: **Logged in as [YOUR_EXPO_NAME]**

## 3º No terminal digite os comandos:

- git clone https://github.com/VictorBorzaquel/myfinances
- cd myfinances
- yarn

## 3º Dentro do editor de códigos:

### Renomeie o arquivo ( .env.example ) para ( .env )

![.env](https://user-images.githubusercontent.com/73085387/139705199-f61782e2-652e-4682-a102-53b320e83f95.png)

### No arquivo .env você tera que substituir:

- [YOUR_GOOGLE_CREDENTIAL]
- [YOUR_EXPO_NAME]

### Para pegar [YOUR_EXPO_NAME] digite no terminal:

```
expo whoami
```
aparecera no terminal: **Logged in as [YOUR_EXPO_NAME]**

### Para pegar [YOUR_GOOGLE_CREDENTIAL] acesse: 
https://console.cloud.google.com/apis/credentials

- Clique em: **+ CRIAR CREDENCIAIS**
- Selecione: **ID do cliente OAuth**
- Selecione o tipo: **Aplicativo da Web**
- Nome: **myfinances**
- Origens JavaScript autorizadas: **https://auth.expo.io**

- URIs de redirecionamento autorizados: **https://auth.expo.io/@[YOUR_EXPO_NAME]/myfinances**

![code](https://user-images.githubusercontent.com/73085387/139708638-7d7020ed-c001-4eb3-a1d7-1ec7f78618fe.png)

## 4º Execute o aplicativo:

**No seu smartfone baixe o aplicativo do expo:**
**Android:** https://play.google.com/store/apps/details?id=host.exp.exponent
**Iphone:** https://apps.apple.com/br/app/expo-go/id982107779

### dentro da pasta do projeto: myfinances

**Digite no terminal**
```
expo start
```
**Escaneie o QR Code que apareceu no terminal**
**Android:** abra o app do expo, clique em Scan QR Code
**Iphone:** abra a camera do iphone, e aponte para o QR Code
