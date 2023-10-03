FROM node:alpine

# Crie um diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação para o container
COPY . ./build/

# Copie os arquivos JSON da pasta mocks para dentro do contêiner
COPY ./src/mocks/*.json .

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3003

# Comando para iniciar a aplicação
CMD ["npm", "start"]
