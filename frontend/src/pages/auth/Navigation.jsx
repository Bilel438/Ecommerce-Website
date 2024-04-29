import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {FaHeart} from "react-icons/fa"
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import '../auth/Navigation.css'
import { useSelector, useDispatch} from "react-redux";
import  {useLogoutMutation} from "../../redux/api/usersApiSlice";
import { logout  } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import {motion} from "framer-motion"
import FavoritesCount from "../Products/FavoritesCount";


const Navigation = () => {

  const  {userInfo}= useSelector (state => state.auth)
  const { cartItems } = useSelector((state) => state.cart);


  



    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const toogleDropDown = () => {
        setDropDownOpen(!dropDownOpen)
    }

    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }
    const closeSideBar = () => {
        setShowSideBar(false)
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/login');
        toast.success('Logged out successfully')
      }
      catch (error) {
        console.error(error) ;

      }
    }
  return (
    <div
    style={{ zIndex: 9999 }}
    className={`${
      showSideBar ? "hidden" : "flex"
    } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
    id="navigation-container"
  >
    <div className="flex flex-col justify-center space-y-4">
      <Link
        to="/"
        className="flex items-center transition-transform transform hover:translate-x-2"
      >
        <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
        <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}
      </Link>


      <Link
        to="/shop"
        className="flex items-center transition-transform transform hover:translate-x-2"
      >
        <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
        <span className="hidden nav-item-name mt-[3rem]">Shopping</span>{" "}
      </Link>



      <Link
        to="/cart"
        className="flex items-center transition-transform transform hover:translate-x-2"
      >
        <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
        <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
      </Link>
      


      <Link
        to="/favorites"
        className="flex items-center transition-transform transform hover:translate-x-2"
      >
        <FaHeart className="mr-2 mt-[3rem]" size={26} />
        <span className="hidden nav-item-name mt-[3rem]">Favorites</span>{" "}
        <FavoritesCount/>
      </Link>
       </div>
       <div className="relative">




        <button onClick={toogleDropDown} className="flex items-center text-gray-8000 focus:outline-none"> 
        {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${dropDownOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            >
              <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          )}
          </button>

          {dropDownOpen && userInfo && (
            <ul className=  {` absolute right-[0.5rem] mt-[-9rem] mr-14 space-y-2 bg white text-gray-600 ${!userInfo.isAdmin ? "-top-10" : "-top-60"}`}>

              {userInfo.isAdmin && (
                <>
                <li>
                  <Link to="/admin/dashboard" className="block px-4  py-2 hover:bg-gray-100  "> Dashboard</Link>
                </li>
                <li>
                  <Link
                    to="/admin/allproductslist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Users
                  </Link>
                </li>
                </>
              )}
              <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 ">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 "
              >
                Logout
              </button>
            </li>

            </ul>
          )}


       </div>


      {!userInfo && (
        <ul>
        <li>
        <Link to="/login" className=" flex items-center transition-transform transform hover:translate-x-2">
     <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
    <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>{" "}
  </Link>
        </li>
        <li>
        <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
    <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
    <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>{" "}
  </Link>
        </li>
   </ul>
        
      )}
      
       

    </div>
  )
}

export default Navigation