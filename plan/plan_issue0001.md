# Plan: Criar API Node.js Express com Hello World

## Objetivo
Criar uma API simples em Node.js com Express contendo uma rota GET que retorna "Hello World". O projeto será estruturado seguindo boas práticas, incluindo configuração do npm, instalação de dependências, criação do servidor Express com a rota especificada e alinhamento com o fluxo de qualidade já integrado ao SonarCloud.

## Passos de Implementação

### 1. Inicializar o projeto Node.js
- Garantir versão mínima de Node.js e npm compatível (ex.: Node 20 LTS) e registrar essa exigência no README
- Executar `npm init -y` para gerar `package.json` com valores padrão e, em seguida, ajustar nome, versão, descrição e engines conforme necessário
- Incluir scripts básicos (`start`, `test` placeholder) antecipando verificações no pipeline
- Corrigir o script `test` gerado pelo `npm init -y` para não quebrar o CI (usar `exit 0` em vez do `exit 1` padrão, ex.: `"test": "echo \"No tests yet\" && exit 0"`)

### 2. Instalar dependências
- Executar `npm install express` para adicionar o Express como dependência de produção
- Opcionalmente, executar `npm install --save-dev nodemon` caso se decida adotar auto-reload em desenvolvimento
- Confirmar que `package.json` e `package-lock.json` foram atualizados corretamente

### 3. Criar arquivo .gitignore
- Adicionar `node_modules/` para excluir dependências do controle de versão
- Registrar outros arquivos temporários (logs, cache, cobertura) para evitar ruído nas análises do SonarCloud

### 4. Implementar o servidor Express
- Criar `src/app.js` com a configuração do Express e definição de rotas (separado do servidor para facilitar testes futuros)
- Criar `src/server.js` como ponto de entrada que importa `app.js` e inicia o `listen`
- Implementar a rota GET `/` que retorna JSON: `{ "message": "Hello World" }` (formato idiomático para APIs REST)
- Configurar o servidor para escutar em uma porta específica (porta padrão 3000 com fallback para variável `PORT`)
- Testar manualmente a resposta (via `curl` ou navegador) para assegurar comportamento esperado

### 5. Configurar scripts de execução
- Adicionar script `start` no package.json para executar o servidor (`node src/server.js`)
- Adicionar script `lint` (mesmo que placeholder) para satisfazer o pipeline SonarCloud
- Documentar a decisão sobre dependências de desenvolvimento (ex.: adicionar `nodemon` como opção e registrar uso do script `dev` se adotado)

### 6. Atualizar documentação
- Atualizar `README.md` com requisitos de ambiente (versão Node/npm) e passos de preparação
- Documentar comandos de instalação (`npm install express`) e execução (`npm start`)
- Registrar opção de uso de `npm run dev` caso `nodemon` seja adotado
- Descrever a rota disponível (`GET /`) e o formato da resposta (JSON)

### 7. Atualizar `sonar-project.properties`
- Verificar e ajustar `sonar.sources=src` para que o SonarCloud analise o código na pasta correta
- Adicionar `sonar.exclusions=node_modules/**,coverage/**` para excluir artefatos da análise
- Confirmar que as configurações existentes (chave do projeto, organização) permanecem válidas

### 8. Validar qualidade e integrações
- Executar `npm start` e `npm test` para garantir que scripts referenciados existem e não falham
- Rodar análise local do SonarCloud (se aplicável) ou verificar pipeline no GitHub Actions após push
- Documentar no README como o projeto se integra ao workflow de qualidade existente

## Considerações Adicionais

### Estrutura do Projeto
- **Opção escolhida**: Usar estrutura com pasta `src/` para melhor organização
- Separar `src/app.js` (configuração Express + rotas) de `src/server.js` (inicialização do servidor) para permitir importação do app em testes sem levantar o servidor
- Facilita escalabilidade futura do projeto
- Mencionar no README a estrutura final para orientar contribuições

### Configuração do Servidor
- **Porta padrão**: 3000
- Possibilidade de configurar via variável de ambiente `PORT`
- Registrar no README como alterar a porta e exemplos de uso

### Dependências de Desenvolvimento
- Considerar adicionar `nodemon` para desenvolvimento com auto-reload
- Documentar critério de adoção (opcional ou obrigatório) e respectivo script de execução
- Avaliar necessidade de linter (ex.: ESLint) ou outras ferramentas para sustentar futuras análises do SonarCloud

## Estrutura de Arquivos Esperada

```
/
├── src/
│   ├── app.js            # Configuração Express e rotas
│   └── server.js         # Ponto de entrada (listen)
├── plan/
│   └── plan_issue0001.md # Este arquivo
├── package.json          # Configuração do projeto Node.js
├── .gitignore           # Arquivos ignorados pelo Git
├── README.md            # Documentação atualizada
├── sonar-project.properties  # Atualizado com sonar.sources=src
└── .github/
    └── workflows/
        └── build.yml
```

## Validações Finais

- Executar `npm install` para garantir instalação limpa
- Rodar `npm start` e confirmar resposta `{ "message": "Hello World" }` em `http://localhost:3000/`
- Executar scripts auxiliares (`npm run lint`, `npm test`) assegurando que não falhem antes do push
- Confirmar que `sonar-project.properties` aponta `sonar.sources=src`
- Confirmar passagem do pipeline do GitHub Actions/SonarCloud após envio para a branch de feature
