import { useState } from 'react';
import StepAccount from './StepAccount.jsx';
import StepProfile from './StepProfile.jsx';
import StepReview from './StepReview.jsx';
import { validateStep } from '../../validators.js';

const STEPS = ['Account', 'Profile', 'Review'];
const EMPTY = { name: '', email: '', password: '', confirm: '', phone: '', city: '', role: '', agree: false };

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);     // ALL steps share this one state in the parent
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const next = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(step + 1);
  };
  const back = () => { setErrors({}); setStep(step - 1); };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);   // data is kept until final submit
  };
  const reset = () => { setData(EMPTY); setStep(0); setErrors({}); setDone(false); };

  if (done) {
    return (
      <div className="card">
        <h2>🎉 Welcome, {data.name}!</h2>
        <p className="success">Your onboarding is complete. Confirmation sent to {data.email} (demo).</p>
        <button className="primary" onClick={reset}>Start over</button>
      </div>
    );
  }

  const stepProps = { data, errors, onChange: handleChange };

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h2>Onboarding Wizard</h2>

      <ol className="stepper" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'current' : i < step ? 'complete' : ''}>
            <span>{i < step ? '✔' : i + 1}</span> {s}
          </li>
        ))}
      </ol>

      {step === 0 && <StepAccount {...stepProps} />}
      {step === 1 && <StepProfile {...stepProps} />}
      {step === 2 && <StepReview {...stepProps} />}

      <div className="nav">
        {step > 0 && <button type="button" className="ghost" onClick={back}>Back</button>}
        {step < STEPS.length - 1
          ? <button type="button" className="primary" onClick={next}>Next</button>
          : <button type="submit" className="primary">Submit</button>}
      </div>
    </form>
  );
}
