import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'

// import ListPage from './pages/List/list'
// import OrdersPage from './pages/Orders/orders'
import ProductsPage from './pages/Products/ProductsPage'
import AddProductPage from './pages/AddProductsPage/addProductPage'
import AddbrandPage from './pages/AddBrand/addBrand'
import BrandPage from './pages/Brand/brand'
import FragranceFamilyPage from './pages/FragranceFamily/fragranceFamilyPage'
import AddFragranceFamilyComponent from './components/addFragranceFamily'
import AddConcentrationComponent from './components/addConcentration'
import ConcentrationPage from './pages/Concentration/concentration'
import UsersPage from './pages/Users/users'
import VolumePage from './pages/Volume/volume'
import AddVolumePage from './pages/AddVolume/addVolume'
import OrdersAdmin from './components/orders/ordersAdmin'

const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
        <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-full mx-auto text-gray-600 text-base'>
            <Routes>

              <Route path="/users" element={<UsersPage />} />
              <Route path='/addbrand' element={<AddbrandPage />} />
              <Route path='/addvolume' element={<AddVolumePage />} />
              <Route path='/brand' element={<BrandPage />} />
              <Route path='/fragranceFamily' element={<FragranceFamilyPage />} />
              <Route path='/concentration' element={<ConcentrationPage />} />
              <Route path='/addFragranceFamily' element={<AddFragranceFamilyComponent />} />
              <Route path='/addConcentration' element={<AddConcentrationComponent />} />
              {/* <Route path='/list' element={<ListPage />} /> */}
              <Route path='/volume' element={<VolumePage />} />
              {/* <Route path='/orders' element={<OrdersPage />} /> */}
              {/* <Route path='/users' element={<UsersPage />} /> */}
              <Route path='/products' element={<ProductsPage />} />
              <Route path="/addProduct" element={<AddProductPage />} />
              <Route path="/users/:id" element={<OrdersAdmin />} />

            </Routes>
          </div>
        </div>
      </>
    </div>
  )
}

export default App
