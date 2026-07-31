import { TOKEN_NAME } from 'global/varible'
import { useMount } from 'hook/useMount'
import { useLocation, useNavigate } from 'react-router-dom'
import cache from 'util/cache'
import './App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  useMount(() => {
    !cache.getCache(TOKEN_NAME)
      ? navigate('/login')
      : location.pathname === '/'
      ? navigate('/home/teach')
      : navigate(location.pathname)
  })

  return <div className="App"></div>
}

export default App
