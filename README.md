# Mente Sã - Gama Academmy (Dev for Tech)

App desenvolvido para o projeto indivídual da Turma 06.

## Projeto

O servidor de desenvolvimento está configurado para rodar com docker e docker-compose. Dessa forma, para iniciar o projeto basta o seguinte comando

```bash
   docker-compose up -d

   # executar migrations no diretorio de backend
   cd back && yarn prisma migrate dev
```

### Portas

**DB**: localhost:5432\
**Back**: localhost:3333\
**Front**: localhost:3000
