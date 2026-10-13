import { PASSWORD_RULES, passwordScore } from '../validators.js';

const LEVELS = [
  { label: 'Too short', color: '#d33' },
  { label: 'Very weak', color: '#d33' },
  { label: 'Weak', color: '#f08a24' },
  { label: 'Fair', color: '#e6c200' },
  { label: 'Good', color: '#7cb342' },
  { label: 'Strong', color: '#2e9e4f' },
];

// Task 5.2: maps password text -> score -> progress bar
export default function PasswordStrength({ password }) {
  if (!password) return null;
  const score = passwordScore(password);
  const level = LEVELS[score];

  return (
    <div className="strength">
      <div
        className="bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={score}
        aria-label="Password strength"
      >
        <div className="fill" style={{ width: `${(score / 5) * 100}%`, background: level.color }} />
      </div>
      <p className="level" style={{ color: level.color }}>Strength: {level.label}</p>
      <ul className="rules">
        {PASSWORD_RULES.map((r) => (
          <li key={r.label} className={r.test(password) ? 'ok' : ''}>
            {r.test(password) ? '✔' : '○'} {r.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
