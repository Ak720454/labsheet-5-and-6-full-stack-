import FormField from '../FormField.jsx';
import PasswordStrength from '../PasswordStrength.jsx';

export default function StepAccount({ data, errors, onChange }) {
  const cls = (n) => (errors[n] ? 'invalid' : '');
  return (
    <>
      <h3>Step 1: Account</h3>
      <FormField id="name" label="Full name" error={errors.name}>
        <input id="name" name="name" value={data.name} onChange={onChange} className={cls('name')} />
      </FormField>
      <FormField id="w-email" label="Email" error={errors.email}>
        <input id="w-email" name="email" type="email" value={data.email} onChange={onChange} className={cls('email')} />
      </FormField>
      <FormField id="w-password" label="Create password" error={errors.password}>
        <input id="w-password" name="password" type="password" value={data.password} onChange={onChange} className={cls('password')} />
      </FormField>
      <PasswordStrength password={data.password} />
      <FormField id="confirm" label="Confirm password" error={errors.confirm}>
        <input id="confirm" name="confirm" type="password" value={data.confirm} onChange={onChange} className={cls('confirm')} />
      </FormField>
    </>
  );
}
