import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Ujian from './pages/Ujian'
import PrivateWrapper from './PrivateWrapper'
import Layout from './components/Layouts/Layout'
import Annoucement from './pages/Annoucement'
import Guide from './pages/Guide'
import Result from './pages/Result'
import About from './pages/About'
import Profile from './pages/Profile'
import UjianDetail from './components/Ujian/UjianDetail'
import UjianForm from './components/Ujian/UjianForm'

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateWrapper />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/exam" element={<Ujian />}></Route>
          <Route path="/exam/:examId" element={<UjianDetail />}></Route>
          <Route path="/exam/:examId/form" element={<UjianForm />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
          <Route path="/annoucement" element={<Annoucement />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        </Route>
        <Route path="/user/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default routes
