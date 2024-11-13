import './App.css'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/homePage'
import Footer from './components/layout/footer'
import Header from './components/layout/header'
import RegisterPage from './pages/register/registerPage'
import LoginPage from './pages/login/loginPage'
import WishlistPage from './pages/wishlist/wishlistPage'
import ProductsPage from './pages/products/productsPage'
import CartPage from './pages/cart/cartPage'
import DetailPage from './pages/detailPage/detailPage'
import MyAccountPage from './pages/myAccount/myAccountPage'
import ContactAndBranches from './pages/contactAndBranches/ContactAndBranches'
import CheckoutPage from './pages/checkout/checkoutPage'
import HomePageAdmin from '../../admin/src/pages/Home/homePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useSyncLoginStatus } from './store/useCartStore'

function App() {
  // useSyncLoginStatus();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<MyAccountPage />} />
        <Route path="/contactAndBranches" element={<ContactAndBranches />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover
        draggable
      />
    </>
  )
}

export default App
