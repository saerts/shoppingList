# End-to-End Testing with Playwright

This project includes comprehensive E2E tests using Playwright to verify the entire application works correctly from a user's perspective.

## Test Structure

```
e2e/
├── utils/
│   └── helpers.ts          # Reusable test utilities
├── onboarding.spec.ts      # User onboarding flow tests
├── item-management.spec.ts # Item CRUD and filtering tests
├── supermarket-management.spec.ts # Supermarket CRUD tests
├── persistence.spec.ts     # localStorage persistence tests
├── complete-flow.spec.ts   # Full user journey test
└── accessibility.spec.ts   # Keyboard and accessibility tests
```

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# Run all tests (unit + E2E)
npm run test:all
```

## Test Coverage

### 1. User Onboarding Flow (`onboarding.spec.ts`)
- First-time user experience
- Creating first supermarket
- Navigating to detail view
- Adding first item
- Complete onboarding workflow

### 2. Item Management (`item-management.spec.ts`)
- Adding multiple items
- Marking items as completed/uncompleted
- Visual states (checkmark, strikethrough)
- Filtering by All/Completed/Uncompleted
- Item count updates
- Empty states

### 3. Supermarket Management (`supermarket-management.spec.ts`)
- Creating multiple supermarkets with colors
- Editing supermarket name and color
- Switching items between supermarkets
- Deleting supermarkets
- Warning when deleting supermarket with items
- Item count accuracy

### 4. localStorage Persistence (`persistence.spec.ts`)
- Data saved to localStorage
- Data persists after page reload
- Data persists across multiple reloads
- UI rebuilds correctly from storage
- Completed status persists
- No data loss when adding new data

### 5. Complete User Journey (`complete-flow.spec.ts`)
Golden path test simulating a realistic workflow:
1. Create 2 supermarkets (Colruyt, Delhaize)
2. Add 3 items to Colruyt (Milk, Bread, Eggs)
3. Add 2 items to Delhaize (Wine, Cheese)
4. Mark Milk as completed
5. Filter to show only completed
6. Move Bread from Colruyt to Delhaize
7. Verify item counts
8. Refresh page and verify persistence

### 6. Keyboard Navigation & Accessibility (`accessibility.spec.ts`)
- Navigate app using keyboard
- Add items with keyboard
- Toggle completion with Space/Enter
- Close modals with Escape key
- Close forms with Escape
- All interactive elements accessible
- Focus indicators visible
- Focus trap in modals

## Helper Functions

The `e2e/utils/helpers.ts` file provides reusable functions:

- `clearLocalStorage(page)` - Clear data between tests
- `getLocalStorageData(page, key)` - Read localStorage
- `createSupermarket(page, name, colorIndex)` - Create supermarket via UI
- `navigateToSupermarket(page, name)` - Go to detail view
- `addItem(page, name)` - Add item via UI
- `toggleItemCompletion(page, name)` - Toggle checkbox
- `goToHome(page)` - Return to home screen
- `openSupermarketManager(page)` - Open manager modal
- `deleteSupermarket(page, name, confirm)` - Delete with confirmation
- `editSupermarket(page, oldName, newName, colorIndex)` - Edit supermarket

## Configuration

See `playwright.config.ts` for:
- Test directory: `./e2e`
- Browser: Chromium (Desktop Chrome)
- Base URL: `http://localhost:5173`
- Screenshots: On failure only
- Video: Retained on failure
- Traces: On first retry
- Workers: 1 (serial execution to avoid localStorage conflicts)
- Timeout: 60 seconds per test

## Best Practices

1. **Independent Tests**: Each test can run independently
2. **Clean State**: Tests clear localStorage when needed
3. **Stable Selectors**: Uses accessible labels and roles
4. **Auto-waiting**: Relies on Playwright's built-in waiting
5. **Descriptive Names**: Test names explain what's being tested
6. **Helper Functions**: Reduce duplication with reusable utilities
7. **User Behavior**: Tests focus on user actions, not implementation

## CI/CD Integration

The configuration is CI-ready:
- Runs headless by default
- Retries failed tests (2x in CI)
- Generates HTML reports
- Uploads screenshots and videos on failure

## Troubleshooting

**Tests timing out**: Increase timeout in `playwright.config.ts`

**localStorage conflicts**: Tests run serially (workers: 1) to prevent this

**Element not found**: Check if selector changed or add wait for element

**Flaky tests**: Add explicit waits or use `waitForLoadState('networkidle')`

## Total Tests

- **38 E2E tests** across 6 test files
- Tests cover all major user workflows
- Average test runtime: < 2 minutes total

## Future Enhancements

- Add cross-browser testing (Firefox, WebKit)
- Add visual regression testing
- Add performance testing
- Add mobile viewport testing
- Integrate with CI/CD pipeline (GitHub Actions)
- Add accessibility scanner (@axe-core/playwright)
