# 💻 Portfólio — Gabriela Venancio

Portfólio pessoal com tema **Dark Cyber**, construído com **React.js**. Apresenta projetos, habilidades, experiência profissional, formação e um terminal interativo para explorar os projetos via comandos.

## ✨ Features

- **Tema Cyber/Neon** com animações e efeitos visuais
- **Terminal interativo** — explore projetos usando comandos como `ls`, `cat`, `grep`
- **Seção de habilidades** com filtro por categoria e conexão com projetos relacionados
- **Projetos com imagem de capa** configurável via JSON
- **Timeline de experiência** profissional
- **Formulário de contato**
- **Design 100% responsivo**
- **Dados configuráveis via JSON** — fácil de atualizar sem mexer no código

## 🛠️ Tecnologias

| Camada    | Tecnologias                                                   |
|-----------|---------------------------------------------------------------|
| Frontend  | React.js, CSS3, Framer Motion, React Icons                   |                                                  |
| Libs      | react-intersection-observer, react-type-animation             |
| Tooling   | Create React App, npm                                         |

## 📁 Estrutura do Projeto

```
portifolio/
├── package.json
├── README.md
├── public/            # Arquivos estáticos e imagens de capa
└── src/
    ├── components/    # Componentes React (Hero, About, Skills, Projects...)
    ├── data/          # JSONs configuráveis (profile, skills, projects, experience...)
    ├── styles/        # CSS por componente
    └── utils/         # Utilitários (mapeamento de ícones)
```

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## ⚙️ Configuração

Todos os dados do portfólio são gerenciados via arquivos JSON em `client/src/data/`:

| Arquivo             | Descrição                              |
|---------------------|----------------------------------------|
| `profile.json`      | Nome, título, bio, links de contato    |
| `projects.json`     | Lista de projetos e detalhes           |
| `skills.json`       | Habilidades e níveis por categoria     |
| `experience.json`   | Experiência profissional               |
| `education.json`    | Formação acadêmica                     |
| `testimonials.json` | Depoimentos                           |
| `stats.json`        | Estatísticas do hero                   |

### Adicionar imagem de capa a um projeto

1. Coloque a imagem em `client/public/`
2. Adicione `"coverImage": "/nome-da-imagem.png"` no objeto do projeto em `projects.json`

## 👩‍💻 Autora

**Gabriela Venancio** — Desenvolvedora de Software & Analista  
Segurança e Desenvolvimento Fullstack

- 📧 gabriela.v.valadao@gmail.com  
- [GitHub](https://github.com/gabriela-venancio-valadao)  
- [LinkedIn](https://linkedin.com/in/gabriela-venancio-valadao)

## 📝 Licença

Este projeto é de uso pessoal.
