# <p align = "center"> Projeto Singmeasong </p>

<p align="center">
   <img src="https://www.shareicon.net/download/2017/06/17/887171_music.ico"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Audrey_Costa-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Audrey-Costa/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

Projeto Desenvolvido como experiência da aplicação dos conhecimentos adquiridos das blibiotecas de teste, Jest e SuperTest, Cypress, aprendidos durantes as aulas da Driven Education. Projeto de número 21 Singmeasong trata-se de uma para recomendações de vídeos musicais onde é possível votar se você gosta ou não da recomendação. 

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Postgres with Prisma
- Cypress

***

## :rocket: Rotas

    
```yml 
POST /recommendations/
    - Rota para inserir recomendações
    - headers: {}
    - body: {
    "name": "lorem",
    "youtubeUrl": "www.loremipsum.com"
    }
```
    
```yml 
POST /recommendations/:id/upvote
    - Rota para dar gostei numa recomendação
    - headers: {}
    - body: {}
```

```yml 
POST /recommendations/:id/downvote
    - Rota para dar não gostei numa recomendação
    - headers: {}
    - body: {}
```


```yml
GET recommendations/random
    - Rota para listar uma recomendação aleatória.
    - headers: {}
    - body: {}
``` 

```yml
GET recommendations/top/:amount
    - Rota para listar as recomendações por maior numero de gostei.
    - headers: {}
    - body: {}
``` 

```yml
GET recommendations/:id
    - Rota para listar uma recomendação pelo id.
    - headers: {}
    - body: {}
``` 

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Node](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/Audrey-Costa/projeto21-singmeasong.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias no front e back.

```
npm install
```

Finalizado o processo, é só inicializar o servidor do back e do front
```
npm run start
```
