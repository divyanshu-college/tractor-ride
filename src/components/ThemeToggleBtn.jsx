import React, { useEffect } from 'react'
import assets from '../assets/assets'

const ThemeToggleBtn = ({ theme, setTheme }) => {

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <img src={assets.sun} className='size-8.5 p-1.5 border border-gray-500 rounded-full' />
      ) : (
        <img src={assets.moon} className='size-8.5 p-1.5 border border-gray-500 rounded-full' />
      )}
    </button>
  )
}

export default ThemeToggleBtn