
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BillingProvider } from "../src/context/BillingContext.jsx";
createRoot(document.getElementById("root")).render(

<BillingProvider>
  <App />
</BillingProvider>

);