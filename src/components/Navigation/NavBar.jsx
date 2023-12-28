import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const NavBar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false)
  const navigate = useNavigate()

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks)
  }

  const handleLinkClick = (path) => {
    setShowNavLinks(false)
    navigate(path)
  }

  // Menutup navbar ketika pengguna mengklik di luar area navbar
  useEffect(() => {
    const closeNavbarOnOutsideClick = (e) => {
      if (showNavLinks && !e.target.closest('.navbar-container')) {
        setShowNavLinks(false)
      }
    }

    document.addEventListener('click', closeNavbarOnOutsideClick)

    return () => {
      document.removeEventListener('click', closeNavbarOnOutsideClick)
    }
  }, [showNavLinks])

  return (
    <nav className="fixed top-0 z-50 w-full select-none bg-white bg-opacity-50 backdrop-blur-lg backdrop-filter xl:px-40 xl:py-6">
      <div className="hidden xl:flex xl:items-center xl:justify-between xl:gap-x-10">
        <div className="text-xl font-semibold tracking-wide">Stemanika Exam</div>
        <div className="xl:mr-20 xl:flex xl:items-center xl:gap-x-10">
          <Link to={'/'} className="tracking-wide">
            Beranda
          </Link>
          <Link to={'/exam'} className="tracking-wide">
            Ujian
          </Link>
          <Link to={'/guide'} className="tracking-wide">
            Panduan Ujian
          </Link>
          <Link to={'/annoucement'} className="tracking-wide">
            Pengumuman
          </Link>
          <Link to={'/result'} className="tracking-wide">
            Hasil
          </Link>
          <Link to={'/about'} className="tracking-wide">
            Tentang Kami
          </Link>

          <span
            className="cursor-pointer tracking-wide"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/user/login')
            }}
          >
            Log Out
          </span>
        </div>
        <Link to={'/profile'}>
          <img src="/profile.jpg" alt="" className="xl:w-10 xl:rounded-full" />
        </Link>
      </div>
      <div
        className={`flex items-center justify-between bg-white px-6 py-4 transition-all duration-500 ease-in-out xl:hidden ${
          showNavLinks ? 'bg-white' : 'bg-opacity-50 backdrop-blur-lg backdrop-filter'
        } navbar-container`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: 'easeInOut',
          }}
        >
          <div className="" onClick={toggleNavLinks}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </div>
          <div
            className={`absolute mt-5 flex w-full transform flex-col  space-y-6 bg-white pb-8 pl-10 pt-4 text-sm transition-transform duration-500 ease-in-out xl:hidden ${
              showNavLinks ? '-translate-x-8' : '-translate-x-[110vw]'
            }`}
          >
            <span>
              <Link to="/" onClick={() => handleLinkClick('/')} className="tracking-wide">
                Beranda
              </Link>
            </span>
            <span>
              <Link to={'/exam'} onClick={() => handleLinkClick('/ujian')} className="tracking-wide">
                Ujian
              </Link>
            </span>
            <span>
              <Link to={'/guide'} onClick={() => handleLinkClick('/guide')} className="tracking-wide">
                Panduan Ujian
              </Link>
            </span>
            <span>
              <Link to={'/annoucement'} onClick={() => handleLinkClick('/annoucement')} className="tracking-wide">
                Pengumuman
              </Link>
            </span>
            <span>
              <Link to={'/result'} onClick={() => handleLinkClick('/result')} className="tracking-wide">
                Hasil
              </Link>
            </span>
            <span>
              <Link to={'/about'} onClick={() => handleLinkClick('/about')} className="tracking-wide">
                Tentang Kami
              </Link>
            </span>

            <span
              className="cursor-pointer tracking-wide"
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/user/login')
              }}
            >
              Log Out
            </span>
          </div>
        </motion.div>
        <motion.div
          className="text-base font-medium"
          initial={{ opacity: 0, scale: 1, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Link to={'/'} onClick={() => handleLinkClick('/')}>
            Stemanika Exam
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 1, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: 'easeOut',
          }}
        >
          <Link to={'/profile'} onClick={() => handleLinkClick('/profile')}>
            <img src="/profile.jpg" alt="" className="w-8 rounded-full" />
          </Link>
        </motion.div>
      </div>
    </nav>
  )
}

export default NavBar
