# EduTech

Página de catálogo de cursos de tecnologia desenvolvida em React como atividade da disciplina de Engenharia de Software (UCSal).

## Componentes

| Componente | Onde aparece |
| --- | --- |
| Acordeão | Dúvidas frequentes |
| Paginação | Lista de cursos |
| Barra de progresso | Envio do certificado de horas complementares |
| Abas | Detalhes do curso selecionado |
| Menu suspenso | Filtro por área e ordenação do catálogo |
| Notificação toast | Matrícula, envio de certificado e erros de validação |

As notificações usam a **Context API** (`ToastProvider` + hook `useToast`), o que permite disparar um toast a partir de qualquer componente sem passar props entre eles.

## Tecnologias

- React com Vite
- CSS Modules
- Sem bibliotecas de UI externas

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├── components/   componentes reutilizáveis (Accordion, Dropdown, Pagination, ProgressBar, Tabs, Toast, CourseItem)
├── context/      contexto global das notificações
├── data/         dados fictícios de cursos, instrutores e FAQ
├── hooks/        hook useToast
├── layout/       Header e Footer
├── sections/     seções da página
└── App.jsx       componente principal
```
