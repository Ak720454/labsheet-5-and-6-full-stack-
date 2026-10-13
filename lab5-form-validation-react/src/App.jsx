import { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import Wizard from './components/wizard/Wizard.jsx';

export default function App() {
  const [tab, setTab] = useState('login');
  return (
    <main className="container">
      <h1>Lab 5: Forms in React</h1>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'login'} className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>
          Login (5.1 + 5.2)
        </button>
        <button role="tab" aria-selected={tab === 'wizard'} className={tab === 'wizard' ? 'active' : ''} onClick={() => setTab('wizard')}>
          Onboarding Wizard (5.3)
        </button>
      </div>
      {tab === 'login' ? <LoginForm /> : <Wizard />}
    </main>
  );
}
