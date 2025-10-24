import Header from './components/Header'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OrderSummaryPage from './pages/OrderSummaryPage'
import Login from './pages/Login'
import Register from './pages/Register'
import AccountPage from './pages/AccountPage'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import ProductDetailsPage from './pages/ProductDetailsPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import OrderDetailPage from './pages/OrderDetailPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/order' element={<OrderSummaryPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/products/create' element={<CreateProduct />} />
          <Route path='/products/edit/:productId' element={<EditProduct />} />
          <Route path='/products/:productId' element={<ProductDetailsPage />} />
          <Route path='/orders' element={<OrderHistoryPage />} />
          <Route path='/orders/:orderId' element={<OrderDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
