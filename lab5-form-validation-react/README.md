# Lab 5 - Form Validation and Controlled Inputs in React

## Run
```
npm install
npm run dev
```
Open the link shown (usually http://localhost:5173).

## Tasks
| Task | Where | What it does |
|---|---|---|
| 5.1 Regex validation + error badges | `src/validators.js`, `LoginForm.jsx`, `FormField.jsx` | Email and password regex; red badge appears after the field is touched or on submit |
| 5.2 Password strength bar | `PasswordStrength.jsx` | 5 rules -> score 0-5 -> coloured progress bar and checklist |
| 5.3 Multi-step wizard | `components/wizard/` | 3 steps (Account, Profile, Review); data held in `Wizard` state until Submit; per-step validation |

## Key concepts (viva)
- **Controlled input:** `value={state}` + `onChange` updates state, so React owns the data.
- **Regex password:** lookaheads `(?=.*[a-z])`, `(?=.*[A-Z])`, `(?=.*\d)`, `(?=.*[^A-Za-z0-9\s])`, and `.{8,}`.
- **Lifting state up:** wizard steps are stateless; parent holds `data` and passes `onChange` as props.
- **touched state:** shows errors only after the user leaves a field.

Component tree diagram: `component-tree.svg`
