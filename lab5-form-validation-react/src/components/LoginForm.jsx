import { useState } from 'react';
import FormField from './FormField.jsx';
import PasswordStrength from './PasswordStrength.jsx';
import { validateEmail, validatePassword } from '../validators.js';

export default function LoginForm() {
  // controlled inputs: React state is the single source of truth
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [success, setSuccess] = useState('');

  const errors = {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSuccess('');
  };
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (errors.email || errors.password) return;
    setSuccess(`Login successful for ${values.email} (demo - no server).`);
  };

  const show = (name) => touched[name] && errors[name];

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      <FormField id="email" label="Email" error={show('email')}>
        <input
          id="email" name="email" type="email" autoComplete="email"
          value={values.email} onChange={handleChange} onBlur={handleBlur}
          className={show('email') ? 'invalid' : ''}
        />
      </FormField>

      <FormField id="password" label="Password" error={show('password')}>
        <div className="pw-row">
          <input
            id="password" name="password" type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            value={values.password} onChange={handleChange} onBlur={handleBlur}
            className={show('password') ? 'invalid' : ''}
          />
          <button type="button" className="ghost" onClick={() => setShowPw(!showPw)}>
            {showPw ? 'Hide' : 'Show'}
          </button>
        </div>
      </FormField>

      <PasswordStrength password={values.password} />

      <button type="submit" className="primary">Login</button>
      {success && <p className="success" role="status">✔ {success}</p>}
    </form>
  );
}
