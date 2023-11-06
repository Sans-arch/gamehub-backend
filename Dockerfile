FROM node:alpine

# Crie um diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install --ignore-scripts && npm cache clean --force
RUN npm rebuild bcrypt

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Gerando os esquemas antecipadamente para que as tipagens deles já estejam nos arquivos .ts
RUN npx prisma generate

# Compile o código TypeScript (substitua "build" pelo comando correto, se necessário)
RUN npm run build
