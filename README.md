# Shopping List App

A modern, responsive shopping list application built with React, TypeScript, and Vite. Organize your shopping by supermarket and never forget an item again.

## Features

- 📝 Create and manage shopping lists for multiple supermarkets
- 🏪 Organize items by supermarket with custom colors
- ✅ Mark items as complete/incomplete
- 🏷️ Categorize items (Vegetables, Dairy, Meat, etc.)
- 🔄 Move items between supermarkets
- 💾 Automatic local storage persistence
- 📱 Fully responsive design
- ♿ Keyboard navigation and accessibility support

## Test Coverage

![Coverage: 96%](https://img.shields.io/badge/coverage-96%25-brightgreen)

Current coverage metrics:
- **Lines**: 96.63%
- **Statements**: 96.63%
- **Functions**: 77.2%
- **Branches**: 94.54%

### Running Tests

```bash
# Run unit tests (watch mode)
npm run test

# Run unit tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with coverage in watch mode
npm run test:coverage:watch

# Run E2E tests
npm run test:e2e

# Run all tests (unit + E2E)
npm run test:all
```

### Viewing Coverage Reports

After running `npm run test:coverage`, open `coverage/index.html` in your browser to view a detailed interactive coverage report showing line-by-line coverage for each file.

### Coverage Thresholds

The project enforces minimum coverage thresholds:
- Lines: 95%
- Functions: 76%
- Branches: 86%
- Statements: 95%

Tests will fail if coverage drops below these thresholds, ensuring code quality is maintained.

### Files Excluded from Coverage

The following files are excluded from coverage analysis:
- Test files (`*.test.tsx`, `*.spec.ts`)
- Type definitions (`*.d.ts`)
- Entry point (`main.tsx`)
- Configuration files
- E2E tests

### Coverage Analysis

**High Coverage Areas** (95-100%):
- All component files have excellent coverage
- Context and hooks are well-tested
- Form components have comprehensive test suites
- Page components (`ShoppingListDetail`) well-tested at 82%

**Areas for Improvement**:
- Some styled component functions (used for conditional styling)
- Handler callbacks in `ShoppingListDetail.tsx` (lines 158-163, 167-171)
- Index.ts re-export files (low priority - minimal logic)

The app is thoroughly tested with 169 unit tests and comprehensive E2E test coverage using Playwright.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
