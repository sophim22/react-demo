import './index.css';
import { useCookies } from "react-cookie";
import Navigation from './components/navbar/NavbarComponent';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import LogoutPage from './components/pages/LogoutPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserNav from './components/navbar/UserNav';
import UserProfile from './components/pages/UserProfile';
function App() {
  const [cookies] = useCookies();
  const token = cookies.token;
  
  return (
    <div className="App relative">
      <Router>
        {
          (token === undefined || token === '') ? <Navigation /> : <UserNav/>
        }
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/user' element={<UserNav />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/logout' element={<LogoutPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
