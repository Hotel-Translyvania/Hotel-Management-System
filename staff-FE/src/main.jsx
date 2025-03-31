import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/SignUp.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="333742733866-4asthnudql1o171esvmdahb97rjulog7.apps.googleusercontent.com">
      
      <App />
    </GoogleOAuthProvider>

  </StrictMode>,
)
