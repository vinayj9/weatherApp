# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

```
vite-project
├─ .env
├─ .oxlintrc.json
├─ .prettierignore
├─ .prettierrc
├─ components.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ geocoding.ts
│  │  └─ openMeteo.ts
│  ├─ App.tsx
│  ├─ assets
│  │  └─ Logo.tsx
│  ├─ components
│  │  ├─ SearchDialog.tsx
│  │  ├─ ThemeDropdown.tsx
│  │  ├─ ThemeProvider.tsx
│  │  ├─ TopAppBar.tsx
│  │  ├─ ui
│  │  │  ├─ button.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ dropdown-menu.tsx
│  │  │  ├─ input-group.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ item.tsx
│  │  │  ├─ kbd.tsx
│  │  │  ├─ separator.tsx
│  │  │  └─ textarea.tsx
│  │  ├─ UnitDropdown.tsx
│  │  └─ WeatherProvider.tsx
│  ├─ config
│  │  └─ index.ts
│  ├─ index.css
│  ├─ lib
│  │  ├─ utils.ts
│  │  └─ weatherMapper.ts
│  ├─ main.tsx
│  └─ types
│     ├─ index.ts
│     └─ openMeteo.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```