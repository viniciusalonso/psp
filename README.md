# Payment Service Provider

## Arquitetura
Os conceitos de arquitetura utilizados foram baseados em clean architecture.
![Arquitetura limpa](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg "").

Vale lembrar que como o foco era backend foi optado por desenvolver uma API.

## Instalação

Primeiramente é necessário ter instalado o git, docker e o docker-compose para conseguir rodar o projeto.
Após instalar os mesmos basta seguir os comandos abaixo:
```sh
git clone git@github.com:viniciusalonso/psp.git
cd psp/
make setup
make build_db
```

Com esses comandos o rodados o ambiente estará pronto para ser conferido, acessando a url http://localhost:3000.

## Testes

Os testes da aplicação podem ser rodados acessando o bash do container, conforme o exemplo abaixo:

```sh
make bash
$ npm test
```

Toda a suite de testes será rodada exibindo a cobertura de testes no fim.

## Diretórios mais relevantes

config/
Configurações

helpers/
Helpers responsáveis por formatar saidas de json e respostas dos controllers

routes/
Arquivos de rotas

test/
Testes da aplicação. Cada teste foi pensado para que se possa enxergar os requisitos sendo cumpridos neles.

controllers/
Controladores

models/
Models que representam entidades no banco, validações, associações, etc.

services/
Classes de serviços responsáveis por executar as regras de negócios
