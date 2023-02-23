import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import ProtectRoute from './components/auth/ProtectRoute'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import OrderConfirmed from './pages/OrderConfirmed'
import Products from './pages/Products'
import FeaturedProducts from './pages/FeaturedProducts'
import NewProduct from './pages/NewProduct'
import Users from './pages/Users'
import UserDetails from './pages/UserDetails'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
// import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import About from './pages/About'
// import RemoteUsers from './components/remote/RemoteUsers'

// const LazyAbout = React.lazy(() => import('./pages/About'))

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="about"
            element={
              <React.Suspense fallback="loading..............">
                <About />
              </React.Suspense>
            }
          />
          <Route path="order-confirmed" element={<OrderConfirmed />} />
          <Route path="products" element={<Products />}>
            <Route index element={<FeaturedProducts />} />
            <Route path="featured" element={<FeaturedProducts />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          <Route path="users" element={<Users />}>
            <Route path=":userId" element={<UserDetails />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            path="profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route
            path="products"
            element={
              <React.Suspense fallback="loading..............">
                <Products />
              </React.Suspense>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
