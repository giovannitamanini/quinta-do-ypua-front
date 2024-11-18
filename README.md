# Projeto Angular 13

Este repositório contém um projeto desenvolvido com Angular 13. Siga as instruções abaixo para configurar, rodar e construir o projeto no seu ambiente local.

---

## 🛠 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

1. **Node.js**  
   - Baixe e instale a versão 14 ou superior do [Node.js](https://nodejs.org/).
   - Verifique a instalação executando os comandos:
     ```bash
     node -v
     npm -v
     ```

2. **Angular CLI**  
   - Instale globalmente com o comando:
     ```bash
     npm install -g @angular/cli
     ```
   - Confirme a instalação verificando a versão:
     ```bash
     ng version
     ```

---

## 🚀 Passo a Passo para Configurar e Rodar o Projeto

### 1. Clone o Repositório

Faça o download do projeto para o seu ambiente local:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto clonado:
```bash
cd <NOME_DO_DIRETORIO_DO_PROJETO>
```

Instale todas as bibliotecas e pacotes necessários:
```bash
npm install
```

Para iniciar o servidor de desenvolvimento, execute:
```bash
ng serve
```

O servidor estará disponível no navegador no endereço:
```bash
http://localhost:4200/
```

Para gerar os arquivos otimizados para produção, execute:
```bash
ng build
```