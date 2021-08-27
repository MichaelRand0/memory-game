import './App.css'
import {Square} from './components/square/square.jsx'
import redBackground from './assets/photos/redBackground.jpg'
import { Menu } from './components/menu/menu'
import { useState } from 'react'
import {HashRouter} from 'react-router-dom'

function App() {
  const [isOpenedMenu, setIsOpenedMenu] = useState(true)
  const menuClickHandler = e => {
    switch (e.target.dataset.type) {
      case 'resume':
        setIsOpenedMenu(false)
        break
      case 'menu':
        setIsOpenedMenu(true)
        break
      case 'new':
        localStorage.removeItem('level')
        setIsOpenedMenu(false)
        break

      default:
        break
    }
  }
  return (
    <HashRouter>
      <div style={{backgroundImage: `url(${redBackground})`}} className="App">
        {isOpenedMenu ? <Menu clickHandler={menuClickHandler} /> : <Square clickHandler={menuClickHandler} />}
      </div>
    </HashRouter>
  )
}

export default App
