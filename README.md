# Gestão de Estudantes com React

Projeto de aplicação frontend para **gerenciamento** de estudantes por meio do consumo da API Reqres.in, desenvolvido com React e Vite. A proposta contempla um CRUD completo, com separação entre interface e serviços de acesso à API. 
## Objetivo

Implementar uma interface para listar, cadastrar, editar e excluir estudantes, utilizando requisições HTTP e uma arquitetura modular.

A autenticação e a tela de login ficam fora do escopo inicial e serão consideradas na versão 2.

## Tecnologias

- React.
- Vite.
- JavaScript.
- Fetch API para requisições HTTP.
- Reqres.in como API utilizada na integração.

O template disponibilizado utiliza React e Vite, enquanto o serviço de usuários utiliza a Fetch API, sem Axios. 
## Funcionalidades previstas

- Listagem de estudantes com paginação.
- Busca por nome na interface.
- Exibição do avatar ao selecionar ou posicionar o cursor sobre um estudante.
- Cadastro com nome completo e e-mail.
- Edição dos dados de um estudante.
- Exclusão de registros com confirmação.

A busca deverá ser implementada conforme os recursos disponíveis na API. Caso não exista filtro por nome no endpoint utilizado, a interface deverá explicitar o alcance da filtragem local.

## Integração com a API

O serviço fornecido define a URL-base `https://reqres.in/api` e as seguintes operações: 
| Operação | Método | Endpoint | Função |
|---|---|---|---|
| Listar estudantes | GET | `/users?page={page}` | `fetchUsers(page)` |
| Consultar estudante | GET | `/users/{id}` | `fetchUserById(id)` |
| Cadastrar estudante | POST | `/users` | `createUser(userData)` |
| Atualizar estudante | PUT | `/users/{id}` | `updateUser(id, userData)` |
| Excluir estudante | DELETE | `/users/{id}` | `deleteUser(id)` |

Os usuários retornados pela API serão representados como estudantes na interface. A autenticação exigida pelo serviço, os filtros disponíveis e a persistência das alterações devem ser validados antes da conclusão da integração.

## Arquitetura
- `components`: apresentação dos dados e interação com o usuário.
- `hooks`: gerenciamento de estado e coordenação das operações.
- `services`: comunicação HTTP com a API.
- `App.jsx`: composição da aplicação e fornecimento das dependências.


## Pendências técnicas

- Corrigir o fechamento de blocos e funções em `userService.js`,  o arquivo fornecido apresenta chaves ausentes?
- Validar os requisitos de acesso à API.

## Evoluções previstas — V2

- Tela de login.
- Fluxo de autenticação.
- Controle de acesso às funcionalidades.
