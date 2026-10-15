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
- Indicadores de carregamento e mensagens de erro.

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

## Arquitetura proposta

```text
src/
├── components/
│   ├── StudentList.jsx
│   ├── StudentForm.jsx
│   └── StudentAvatar.jsx
├── hooks/
│   └── useStudents.js
├── services/
│   └── userService.js
├── App.jsx
└── main.jsx
```

A estrutura acima é uma proposta de organização:

- `components`: apresentação dos dados e interação com o usuário.
- `hooks`: gerenciamento de estado e coordenação das operações.
- `services`: comunicação HTTP com a API.
- `App.jsx`: composição da aplicação e fornecimento das dependências.

As funções do serviço deverão ser recebidas explicitamente por props ou como dependência do hook, evitando que os componentes visuais concentrem a lógica de requisição.

## Fluxo de funcionamento

1. Carregar a página de estudantes solicitada.
2. Armazenar os dados e as informações de paginação no estado.
3. Renderizar a lista e os controles de interação.
4. Validar os campos antes de cadastrar ou editar.
5. Executar a operação correspondente no serviço.
6. Atualizar o estado da interface após uma resposta bem-sucedida.
7. Exibir mensagens de erro quando a operação falhar.

A atualização visual da lista e a persistência no servidor deverão ser verificadas separadamente.

## Pendências técnicas

- Corrigir o fechamento de blocos e funções em `userService.js`, pois o arquivo fornecido apresenta chaves ausentes. 
- Validar os requisitos de acesso à API.
- Definir a estratégia de busca por nome.
- Verificar o comportamento das alterações após uma nova consulta.
- Documentar os comandos de instalação, execução e build após conferir o `package.json`.

## Evoluções previstas — V2

- Tela de login.
- Fluxo de autenticação.
- Controle de acesso às funcionalidades.
