import FormField from '../FormField.jsx';

export default function StepProfile({ data, errors, onChange }) {
  const cls = (n) => (errors[n] ? 'invalid' : '');
  return (
    <>
      <h3>Step 2: Profile</h3>
      <FormField id="phone" label="Mobile number" error={errors.phone}>
        <input id="phone" name="phone" inputMode="numeric" maxLength={10} value={data.phone} onChange={onChange} className={cls('phone')} />
      </FormField>
      <FormField id="city" label="City" error={errors.city}>
        <input id="city" name="city" value={data.city} onChange={onChange} className={cls('city')} />
      </FormField>
      <FormField id="role" label="I am a" error={errors.role}>
        <select id="role" name="role" value={data.role} onChange={onChange} className={cls('role')}>
          <option value="">-- Select --</option>
          <option>Student</option>
          <option>Developer</option>
          <option>Teacher</option>
          <option>Other</option>
        </select>
      </FormField>
    </>
  );
}
