import FormField from '../FormField.jsx';

export default function StepReview({ data, errors, onChange }) {
  return (
    <>
      <h3>Step 3: Review and Submit</h3>
      <dl className="review">
        <dt>Name</dt><dd>{data.name}</dd>
        <dt>Email</dt><dd>{data.email}</dd>
        <dt>Password</dt><dd>{'•'.repeat(data.password.length)}</dd>
        <dt>Mobile</dt><dd>{data.phone}</dd>
        <dt>City</dt><dd>{data.city}</dd>
        <dt>Role</dt><dd>{data.role}</dd>
      </dl>
      <FormField id="agree" label="" error={errors.agree}>
        <label className="check">
          <input id="agree" name="agree" type="checkbox" checked={data.agree} onChange={onChange} />
          I accept the terms and conditions
        </label>
      </FormField>
    </>
  );
}
