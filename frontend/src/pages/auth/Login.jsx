import {useState , useEffect} from 'react'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import {  toast } from 'sonner'
import Loader from '../../components/Loader'
import '../auth/Login.css'
import { motion } from 'framer-motion'

const Login = () => {
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login , {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const {search}  = useLocation()

    const sp = new URLSearchParams(search)

    const redirect = sp.get('redirect') || '/' 

    useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }  
    }, [navigate , redirect , userInfo]) ; 


    const submitHandler = async (e) => {
        e.preventDefault()
        
        try {
            const res = await login({email , password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Logged in successfully')

        }

        catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className='my-[5rem] bg-rgba(0, 0, 0, 0.945)'>
      {isLoading && <Loader/>}
        <section className=' pl-[10rem] flex flex-wwrap'>
          <div className=' mr-[4rem] mt-[5rem ]'>


            <h1 className="text-2xl font-semibold mb-4 text-white">Sign Up</h1>   


            <form onSubmit={submitHandler} className='container w-[40rem] '>  

            <div className="my-[2rem]">
                <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>
                <input type="email" id='email' className='mt-1 p-2 border rounded -full  w-80' value={email} onChange={(e) => setEmail(e.target.value)}/>
                
            </div>   

               <div className="my-[2rem]">
                <label htmlFor="password" className='block text-sm font-medium text-white'>Password </label>
                <input type="password" id='email' className='mt-1 p-2 border rounded -full  w-80' value={password} onChange={(e) => setPassword(e.target.value)}/>
                
            </div>
            <button disabled={isLoading} type='submit' className=' bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] '>{isLoading ? 'signing in...' : 'Sign In'}</button>
              
              
       
            </form> 

            <div className="mt-4">
                <p className="text-white">
                    Don't have an account ? Please Click Here To  {""}<Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-blue-500 hover:underline'>Register</Link>
                </p>
            </div>
            
         </div>  

        </section>
    </motion.div>
  )
}

export default Login