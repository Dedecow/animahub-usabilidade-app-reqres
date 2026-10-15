# Gestão de Estudantes com React

Projeto de aplicação frontend para **gerenciamento** de estudantes por meio do consumo da API Reqres.in, desenvolvido com React e Vite. A proposta contempla um CRUD completo, com separação entre interface e serviços de acesso à API. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/506787188/e5ee0f10-64d7-4a91-a3ab-26b4631bc23b/README.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=ASIA2F3EMEYEUCBNZGCF%2F20261015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261015T124807Z&X-Amz-Expires=3010&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLWVhc3QtMSJHMEUCIFq09lNFqCdmTTqQR27nmDbFyfKTzfB0iKxwtHA6Fqf9AiEAnkmXU2o9CIKVwqN%2BpZ3yY7ceIArQhMiaWKRjz9r04jQqiQUIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDEZYHw7IKCi4HCimLCrdBEB3X9%2BHEestgXe5%2BUKlPDz%2FXV%2FdhWQq632NeP8JaubguZsbsIdtwKgwyCKyDngt6p1TSt9iey99td6e9RPg4s90%2BK6imAuDw2nZcjfwN5uHMY0X6f7Uxt7KZxlXrYeFzPt9WiNkFoRa2lTW7aCWGZE6R%2FyE7L0a6cVWVy9rgLloH%2FN4a4cvNPziuBPP%2FHvpt6Go5LlpFr32qRJszThfIgJv885d9RyHJe7LzoutRiB%2B6WOAfdR6JVQjYSJZFCpKTGxR84KkGMeQUEY4%2BgG28JoCvLqVUmDPTt4irgNQpqMlP8yFVQWtSoC8%2BeNwBJQNEIwp6RnvHiOcl0TPS8rNVnbLhe1j0otsjVMN%2Byr%2BBX%2FDjyZpVjcLL8OdFFsKCfP%2F87Li%2B3j0LiwlkQ58nAJpk070HD2CUEszwL7OKAWefJjFuxTdclSwgpwPoqV%2FFJOlw5Y2EEGn81MCq0Oi1IFVyGCVXLz74ws0s1LEORSos2z5HAV%2Ba0rPax77XUC2vrF90Aqa7AIKpfuyJ84BR%2FSEJ8T5DELQjYHWuICkYVOWfHidQgJmD%2BC4HbZQtUOpVrnlP%2BBvOjhYfN%2FbWGtgxttdtfEUtOGmW1s4OPBxR2FFUrOl7Qt3%2B%2BFY6yEXlk26K0OhpNeMndsIuzKuTMmgjQbmvfneN17JOfXz%2BZn6WuGfJilqq9Nz99SI0tkWVlOibUDsDlFZKOvLznCqYpXxjy13XX6Kyfr0I21FKrIxuTY9WyDYpxR1WxshmJ%2Fl%2FleWMap5XuqKsfOnU0AXLGM8KhavZ1%2B1%2BjxYKLgj1r9TSguuMPaSw9YGOpgBsb4ONoJTcZgsTsEMDd%2BSuLuTp82HhiZ2KfD27bvkdedGiu%2Bz6qC3i%2BoCIP4UOo5ZXEtGdTrAO6fPjpPn1l0kOa52%2FVULTeNil1PHZTTCeVzD%2BPjWRmFZI1KL46Ey6pZGQD17HLctFDxTIMgI6x4Jh5cdUi6bMr4U18qqYdpvf8ZHxEvsiQxVxM%2BgGFxCH316CAdtugMxkJI%3D&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=0d9f0069bcbf2c64e115edfe4da93aa623739de186662d2e30b6a3c1596e561c)

## Objetivo

Implementar uma interface para listar, cadastrar, editar e excluir estudantes, utilizando requisições HTTP e uma arquitetura modular.

A autenticação e a tela de login ficam fora do escopo inicial e serão consideradas na versão 2.

## Tecnologias

- React.
- Vite.
- JavaScript.
- Fetch API para requisições HTTP.
- Reqres.in como API utilizada na integração.

O template disponibilizado utiliza React e Vite, enquanto o serviço de usuários utiliza a Fetch API, sem Axios. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/506787188/e5ee0f10-64d7-4a91-a3ab-26b4631bc23b/README.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=ASIA2F3EMEYEUCBNZGCF%2F20261015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261015T124807Z&X-Amz-Expires=3010&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLWVhc3QtMSJHMEUCIFq09lNFqCdmTTqQR27nmDbFyfKTzfB0iKxwtHA6Fqf9AiEAnkmXU2o9CIKVwqN%2BpZ3yY7ceIArQhMiaWKRjz9r04jQqiQUIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDEZYHw7IKCi4HCimLCrdBEB3X9%2BHEestgXe5%2BUKlPDz%2FXV%2FdhWQq632NeP8JaubguZsbsIdtwKgwyCKyDngt6p1TSt9iey99td6e9RPg4s90%2BK6imAuDw2nZcjfwN5uHMY0X6f7Uxt7KZxlXrYeFzPt9WiNkFoRa2lTW7aCWGZE6R%2FyE7L0a6cVWVy9rgLloH%2FN4a4cvNPziuBPP%2FHvpt6Go5LlpFr32qRJszThfIgJv885d9RyHJe7LzoutRiB%2B6WOAfdR6JVQjYSJZFCpKTGxR84KkGMeQUEY4%2BgG28JoCvLqVUmDPTt4irgNQpqMlP8yFVQWtSoC8%2BeNwBJQNEIwp6RnvHiOcl0TPS8rNVnbLhe1j0otsjVMN%2Byr%2BBX%2FDjyZpVjcLL8OdFFsKCfP%2F87Li%2B3j0LiwlkQ58nAJpk070HD2CUEszwL7OKAWefJjFuxTdclSwgpwPoqV%2FFJOlw5Y2EEGn81MCq0Oi1IFVyGCVXLz74ws0s1LEORSos2z5HAV%2Ba0rPax77XUC2vrF90Aqa7AIKpfuyJ84BR%2FSEJ8T5DELQjYHWuICkYVOWfHidQgJmD%2BC4HbZQtUOpVrnlP%2BBvOjhYfN%2FbWGtgxttdtfEUtOGmW1s4OPBxR2FFUrOl7Qt3%2B%2BFY6yEXlk26K0OhpNeMndsIuzKuTMmgjQbmvfneN17JOfXz%2BZn6WuGfJilqq9Nz99SI0tkWVlOibUDsDlFZKOvLznCqYpXxjy13XX6Kyfr0I21FKrIxuTY9WyDYpxR1WxshmJ%2Fl%2FleWMap5XuqKsfOnU0AXLGM8KhavZ1%2B1%2BjxYKLgj1r9TSguuMPaSw9YGOpgBsb4ONoJTcZgsTsEMDd%2BSuLuTp82HhiZ2KfD27bvkdedGiu%2Bz6qC3i%2BoCIP4UOo5ZXEtGdTrAO6fPjpPn1l0kOa52%2FVULTeNil1PHZTTCeVzD%2BPjWRmFZI1KL46Ey6pZGQD17HLctFDxTIMgI6x4Jh5cdUi6bMr4U18qqYdpvf8ZHxEvsiQxVxM%2BgGFxCH316CAdtugMxkJI%3D&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=0d9f0069bcbf2c64e115edfe4da93aa623739de186662d2e30b6a3c1596e561c)

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

O serviço fornecido define a URL-base `https://reqres.in/api` e as seguintes operações: [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/506787188/49b7a47d-0559-4217-a720-ba1802678773/userService.js?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=ASIA2F3EMEYEUCBNZGCF%2F20261015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261015T124807Z&X-Amz-Expires=3010&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLWVhc3QtMSJHMEUCIFq09lNFqCdmTTqQR27nmDbFyfKTzfB0iKxwtHA6Fqf9AiEAnkmXU2o9CIKVwqN%2BpZ3yY7ceIArQhMiaWKRjz9r04jQqiQUIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDEZYHw7IKCi4HCimLCrdBEB3X9%2BHEestgXe5%2BUKlPDz%2FXV%2FdhWQq632NeP8JaubguZsbsIdtwKgwyCKyDngt6p1TSt9iey99td6e9RPg4s90%2BK6imAuDw2nZcjfwN5uHMY0X6f7Uxt7KZxlXrYeFzPt9WiNkFoRa2lTW7aCWGZE6R%2FyE7L0a6cVWVy9rgLloH%2FN4a4cvNPziuBPP%2FHvpt6Go5LlpFr32qRJszThfIgJv885d9RyHJe7LzoutRiB%2B6WOAfdR6JVQjYSJZFCpKTGxR84KkGMeQUEY4%2BgG28JoCvLqVUmDPTt4irgNQpqMlP8yFVQWtSoC8%2BeNwBJQNEIwp6RnvHiOcl0TPS8rNVnbLhe1j0otsjVMN%2Byr%2BBX%2FDjyZpVjcLL8OdFFsKCfP%2F87Li%2B3j0LiwlkQ58nAJpk070HD2CUEszwL7OKAWefJjFuxTdclSwgpwPoqV%2FFJOlw5Y2EEGn81MCq0Oi1IFVyGCVXLz74ws0s1LEORSos2z5HAV%2Ba0rPax77XUC2vrF90Aqa7AIKpfuyJ84BR%2FSEJ8T5DELQjYHWuICkYVOWfHidQgJmD%2BC4HbZQtUOpVrnlP%2BBvOjhYfN%2FbWGtgxttdtfEUtOGmW1s4OPBxR2FFUrOl7Qt3%2B%2BFY6yEXlk26K0OhpNeMndsIuzKuTMmgjQbmvfneN17JOfXz%2BZn6WuGfJilqq9Nz99SI0tkWVlOibUDsDlFZKOvLznCqYpXxjy13XX6Kyfr0I21FKrIxuTY9WyDYpxR1WxshmJ%2Fl%2FleWMap5XuqKsfOnU0AXLGM8KhavZ1%2B1%2BjxYKLgj1r9TSguuMPaSw9YGOpgBsb4ONoJTcZgsTsEMDd%2BSuLuTp82HhiZ2KfD27bvkdedGiu%2Bz6qC3i%2BoCIP4UOo5ZXEtGdTrAO6fPjpPn1l0kOa52%2FVULTeNil1PHZTTCeVzD%2BPjWRmFZI1KL46Ey6pZGQD17HLctFDxTIMgI6x4Jh5cdUi6bMr4U18qqYdpvf8ZHxEvsiQxVxM%2BgGFxCH316CAdtugMxkJI%3D&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=92f6c05fbab5eb2bf5be987e751ca9bb261290f220b83f18c9042c3ef4162a21)

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

- Corrigir o fechamento de blocos e funções em `userService.js`, pois o arquivo fornecido apresenta chaves ausentes. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/506787188/49b7a47d-0559-4217-a720-ba1802678773/userService.js?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=ASIA2F3EMEYEUCBNZGCF%2F20261015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261015T124807Z&X-Amz-Expires=3010&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLWVhc3QtMSJHMEUCIFq09lNFqCdmTTqQR27nmDbFyfKTzfB0iKxwtHA6Fqf9AiEAnkmXU2o9CIKVwqN%2BpZ3yY7ceIArQhMiaWKRjz9r04jQqiQUIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDEZYHw7IKCi4HCimLCrdBEB3X9%2BHEestgXe5%2BUKlPDz%2FXV%2FdhWQq632NeP8JaubguZsbsIdtwKgwyCKyDngt6p1TSt9iey99td6e9RPg4s90%2BK6imAuDw2nZcjfwN5uHMY0X6f7Uxt7KZxlXrYeFzPt9WiNkFoRa2lTW7aCWGZE6R%2FyE7L0a6cVWVy9rgLloH%2FN4a4cvNPziuBPP%2FHvpt6Go5LlpFr32qRJszThfIgJv885d9RyHJe7LzoutRiB%2B6WOAfdR6JVQjYSJZFCpKTGxR84KkGMeQUEY4%2BgG28JoCvLqVUmDPTt4irgNQpqMlP8yFVQWtSoC8%2BeNwBJQNEIwp6RnvHiOcl0TPS8rNVnbLhe1j0otsjVMN%2Byr%2BBX%2FDjyZpVjcLL8OdFFsKCfP%2F87Li%2B3j0LiwlkQ58nAJpk070HD2CUEszwL7OKAWefJjFuxTdclSwgpwPoqV%2FFJOlw5Y2EEGn81MCq0Oi1IFVyGCVXLz74ws0s1LEORSos2z5HAV%2Ba0rPax77XUC2vrF90Aqa7AIKpfuyJ84BR%2FSEJ8T5DELQjYHWuICkYVOWfHidQgJmD%2BC4HbZQtUOpVrnlP%2BBvOjhYfN%2FbWGtgxttdtfEUtOGmW1s4OPBxR2FFUrOl7Qt3%2B%2BFY6yEXlk26K0OhpNeMndsIuzKuTMmgjQbmvfneN17JOfXz%2BZn6WuGfJilqq9Nz99SI0tkWVlOibUDsDlFZKOvLznCqYpXxjy13XX6Kyfr0I21FKrIxuTY9WyDYpxR1WxshmJ%2Fl%2FleWMap5XuqKsfOnU0AXLGM8KhavZ1%2B1%2BjxYKLgj1r9TSguuMPaSw9YGOpgBsb4ONoJTcZgsTsEMDd%2BSuLuTp82HhiZ2KfD27bvkdedGiu%2Bz6qC3i%2BoCIP4UOo5ZXEtGdTrAO6fPjpPn1l0kOa52%2FVULTeNil1PHZTTCeVzD%2BPjWRmFZI1KL46Ey6pZGQD17HLctFDxTIMgI6x4Jh5cdUi6bMr4U18qqYdpvf8ZHxEvsiQxVxM%2BgGFxCH316CAdtugMxkJI%3D&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=92f6c05fbab5eb2bf5be987e751ca9bb261290f220b83f18c9042c3ef4162a21)
- Implementar os componentes e o gerenciamento de estado.
- Validar os requisitos de acesso à API.
- Definir a estratégia de busca por nome.
- Verificar o comportamento das alterações após uma nova consulta.
- Documentar os comandos de instalação, execução e build após conferir o `package.json`.

## Evoluções previstas — V2

- Tela de login.
- Fluxo de autenticação.
- Controle de acesso às funcionalidades.
