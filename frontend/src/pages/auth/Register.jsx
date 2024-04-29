import { useEffect, useState } from "react"
import {Link , useNavigate , useLocation} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "sonner"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"
import { motion } from "framer-motion"




const Register = () => {
    const [email , setEmail ] = useState('')
    const [username , setUsername ] = useState('')
    const [password , setPassword ] = useState('')
    const [confirmPassword , setConfirmPassword ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register , {isLoading}] = useRegisterMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const {search}  = useLocation()

    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'
       

    useEffect(() => {
      if (userInfo) {
        navigate(redirect)
}
    },[navigate, redirect, userInfo])


    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("User successfully registered");
          } catch (err) {
            console.log(err);
            toast.error(err.data.message);
          }
        }
      };


  return (
    <section className="pl-[10rem] flex flex-wrap">
   < motion.div className="mr-[4rem] mt-[5rem]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
  
        <h1 className="text-2xl font-semibold gap-2"> Register</h1>

        <form onSubmit={submitHandler} className="container w-[40rem] mb-[2rem] grid gap-5 mt-5  ">
            <div className="my-[2rrem]">
                <label htmlFor="name" className="block text-sm font-medium text-white">Name </label>
                <input type="text" id="name" className="mt-1 p-2 border rounded w-80" placeholder="Enter your Name" value={username} 
                onChange={e => setUsername(e.target.value)} />
            </div>




            <div className="my-[2rrem]">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email Adress </label>
                <input type="email" id="email" className="mt-1 p-2 border rounded w-80" placeholder="Enter your Email" value={email} 
                onChange={e => setEmail(e.target.value)} />
            </div>




            <div className="my-[2rrem]">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password </label>
                <input type="password" id="password" className="mt-1 p-2 border rounded w-80" placeholder="Enter your Password" value={password} 
                onChange={e => setPassword(e.target.value)} />
            </div>




            <div className="my-[2rrem]">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white ">Confirm your Password </label>
                <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded  w-80" placeholder="Confirm your Password" value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <button disabled={isLoading} type="submit" className="bg-blue-500 text-whie px-4 py-2 rounded cursor-pointer my-[1rem] w-[81px]">
                {isLoading ? 'Registering...' : 'Register'}</button>

            {isLoading && <Loader/>}


        </form>

        <div className="mt-4">
            <p className="text-white">
                Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-500 hover:underline">Login</Link>
            </p>
        </div>


   </motion.div>
  
   </section>
  );
};

export default Register