// ---------- Regex patterns (Task 5.1) ----------
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
// min 8 chars, 1 lowercase, 1 uppercase, 1 digit, 1 special character
export const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;
export const NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,49}$/;
export const PHONE_RE = /^[6-9]\d{9}$/; // 10-digit Indian mobile number

export function validateEmail(v) {
  if (!v.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(v)) return 'Enter a valid email, e.g. name@example.com.';
  return '';
}

export function validatePassword(v) {
  if (!v) return 'Password is required.';
  if (!PASSWORD_RE.test(v))
    return 'Min 8 chars with uppercase, lowercase, number and special character.';
  return '';
}

// ---------- Strength rules (Task 5.2) ----------
export const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: 'Lowercase letter (a-z)', test: (v) => /[a-z]/.test(v) },
  { label: 'Uppercase letter (A-Z)', test: (v) => /[A-Z]/.test(v) },
  { label: 'Number (0-9)', test: (v) => /\d/.test(v) },
  { label: 'Special character (!@#$...)', test: (v) => /[^A-Za-z0-9\s]/.test(v) },
];

export function passwordScore(v) {
  return PASSWORD_RULES.filter((r) => r.test(v)).length; // 0..5
}

// ---------- Wizard step validation (Task 5.3) ----------
export function validateStep(step, d) {
  const e = {};
  if (step === 0) {
    if (!NAME_RE.test(d.name.trim())) e.name = 'Enter your full name (letters only, 2-50 chars).';
    const em = validateEmail(d.email);
    if (em) e.email = em;
    const pw = validatePassword(d.password);
    if (pw) e.password = pw;
    if (!d.confirm) e.confirm = 'Please confirm your password.';
    else if (d.confirm !== d.password) e.confirm = 'Passwords do not match.';
  }
  if (step === 1) {
    if (!PHONE_RE.test(d.phone)) e.phone = 'Enter a valid 10-digit mobile number starting with 6-9.';
    if (!d.city.trim()) e.city = 'City is required.';
    if (!d.role) e.role = 'Please choose a role.';
  }
  if (step === 2) {
    if (!d.agree) e.agree = 'You must accept the terms to continue.';
  }
  return e;
}
