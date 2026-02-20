---
applyTo: "**/*.test.js"
---

## Test Guidelines

- Use Vitest as the test runner (`npm run test`)
- Test files are colocated with source files using the `*.test.js` naming convention
- Use `describe` and `it` blocks for test organization
- Import from `vitest` for assertions (e.g., `import { describe, it, expect } from 'vitest'`)
- Focus on testing pure logic in `src/lib/`
