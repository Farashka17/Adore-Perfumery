
import './App.css'

import {Routes,Route} from 'react-router-dom'
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

function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/products" element={<ProductsPage/>} />
      <Route path={`/product/:id`} element={<DetailPage/>} />
      <Route path="/cart" element={<CartPage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/account" element={<MyAccountPage/>} />

      <Route path="/wishlist" element={<WishlistPage/>} />

      <Route path="*" element={<HomePage/>} />
    </Routes>
    <Footer/>
  
    </>
  )
}

export default App
