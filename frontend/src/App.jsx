import {Outlet} from "react-router-dom"
import Navigation from "./pages/auth/Navigation"
import { Toaster } from 'sonner'
import Loader from "./components/Loader"

import "react-toastify/dist/ReactToastify.css"
function App() {
  

  return (
    <>

      <Toaster richColors closeButton/>
      <Navigation/>
      <main className="py-3"> 

      <Outlet/>
      
      
      
      </main>
       
    </>
  )
}

export default App
