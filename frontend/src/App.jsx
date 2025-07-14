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
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Post from './pages/Post';
import Search from './pages/Search';

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
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/create-post' element={<CreatePost />}/>
        </Route>

        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/update-post/:postId' element={<UpdatePost />}/>
        </Route>

        <Route path='/post/:postSlug' element={<Post />}/>
       
        <Route path='/about' element={<About />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/projects' element={<Projects />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
      
    </>
  )
}

export default App
