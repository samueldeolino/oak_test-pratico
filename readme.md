# Requisito: Cadastro e Listagem de Produtos

## Cadastro:

- Formulário com os campos abaixo:

  - Nome do produto - campo de texto
  - Descrição do produto - campo de texto
  - Valor do produto - campo de valor
  - Disponível para venda - campo com 2 opções: sim / não

## Listagem:

- Colunas da listagem: nome, valor
- Ordenação por valor do menor para o maior
- Quando cadastrar um novo produto é para abrir a listagem automaticamente
- Deve existir um botão para cadastrar um novo produto a partir da listagem

## Requisitos:
- Docker engine
- Docker compose

## Comandos utilizados:
- npm init -y
- npm install mysql2
- npm install cors
- npm install dotenv

## Docker Compose
- Passos
  - Renomear o .env.example para -> `.env`
  - Execute o comando: ```docker compose --env-file ./backend/.env up```
  - Verifique se os containers subiu: ```docker ps```

## Acessar:
- `localhost:8080/cadastro.html` 
