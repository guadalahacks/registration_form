import RegistrationForm from './pages/registrationForm'
import TermsAndConditions from './pages/termsAndConditions'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
