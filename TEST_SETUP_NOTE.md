# Test Setup Note

## Current Status

The property-based test for the Button component has been created at:
`src/components/__tests__/Button.property.test.jsx`

## Node.js Version Issue

The current Node.js version (14.21.3) is incompatible with the latest Vitest (4.0.18) which requires Node.js >= 20.

### Error Encountered
```
SyntaxError: Unexpected token '??='
```

This is because the nullish coalescing assignment operator (??=) was introduced in Node.js 15.

## Solutions

### Option 1: Upgrade Node.js (Recommended)
Upgrade to Node.js 20 or later to use the latest testing tools:
```bash
# Install Node.js 20 LTS or later
# Then reinstall dependencies
npm install
```

### Option 2: Use Compatible Versions
Downgrade to older compatible versions:
```bash
npm uninstall vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event fast-check
npm install --save-dev vitest@0.34.6 jsdom@22.1.0 @testing-library/react@13.4.0 @testing-library/dom@9.3.3 @testing-library/jest-dom@6.1.5 @testing-library/user-event@14.5.1 fast-check@3.15.0
```

## Running the Tests

Once the Node.js version issue is resolved, run the tests with:

```bash
# Run all tests
npm test

# Run only Button property tests
npm test -- src/components/__tests__/Button.property.test.jsx

# Run tests in watch mode
npm run test:watch
```

## Test Coverage

The property-based test validates:
- **Property 1: Touch-Friendly Interactive Elements** (Validates Requirements 2.5)
  - Minimum 44px height for all button variants and sizes
  - Minimum 44px width for all button variants and sizes
  - Minimum 44px height for link buttons (with href)
  - Minimum 44px width for link buttons (with href)

The test runs 100 iterations for each property, testing all combinations of:
- Variants: primary, secondary, whatsapp, outline
- Sizes: small, medium, large
- Random text content
- Random URLs (for link buttons)
