import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
        <Route path='/about' element={<About />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/projects' element={<Projects />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
      
    </>
  )
}

export default App
