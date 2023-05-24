import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NotFound from './pages/NotFound';
import TeamStats from './pages/TeamStats'
import RecentGame from './pages/RecentGame'

import PlayerStats from './pages/PlayerStats'

import Header from './components/Header'

function App() {
	return  (
    <>
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element = { <RecentGame /> } />
          <Route path='/teamstats' element = { <TeamStats /> } />
          <Route path='/player/:name' element = { <PlayerStats />} />
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </div>
		</Router>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      /* Default */
    />

    </>

    
  )

}

export default App;
