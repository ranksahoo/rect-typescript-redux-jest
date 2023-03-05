import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@components/layouts/Navbar'
// import ProtectRoute from '@auth/ProtectRoute'
import PageNotFound from '@pages/PageNotFound'
import Home from '@pages/Home'
import Albums from '@pages/Albums'
import Cars from '@pages/Cars'
import Media from '@pages/Media'
import Song from '@pages/Song'
import Table from '@pages/Table'
import PostsManager from '@components/pagination/PostsManager'

// import { AuthProvider } from './context/AuthContext'

// const LazyAbout = React.lazy(() => import('./pages/About'))

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path='about'
            element={
              <React.Suspense fallback='loading..............'>
                <About />
              </React.Suspense>
            }
          /> */}
          <Route path="albums" element={<Albums />} />
          <Route path="cars" element={<Cars />}>
            {/* <Route index element={<FeaturedProducts />} />
            <Route path='featured' element={<FeaturedProducts />} />
            <Route path='new' element={<NewProduct />} /> */}
          </Route>
          <Route path="users" element={<Home />}>
            {/* <Route path=':userId' element={<UserDetails />} /> */}
            {/* <Route path='media' element={<Media />} /> */}
          </Route>
          <Route path="media" element={<Media />} />
          <Route
            path="songs"
            element={
              // <ProtectRoute>
              <Song />
              // </ProtectRoute>
            }
          />
          {/* <Route
            path='products'
            element={
              <React.Suspense fallback='loading..............'>
                <Products />
              </React.Suspense>
            }
          />
          <Route path='login' element={<Login />} /> */}
          <Route path="posts" element={<PostsManager />} />
          <Route path="table" element={<Table />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
