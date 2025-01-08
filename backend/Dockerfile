# Escolher uma imagem base com Node.js
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY . .

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do backend para o container
COPY . .

# Expor a porta que o backend estará ouvindo (geralmente 3000)
EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "server.js"]
