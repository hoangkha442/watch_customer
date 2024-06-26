import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Introduction from './pages/Introduction/Introduction';
import MenWatch from './pages/MenWatch/MenWatch';
import WomenWatch from './pages/WomenWatch/WomenWatch';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import Purchase from './pages/Purchase/Purchase';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
function App() {
  return (
    
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<Introduction />} />
        <Route path='/dong-ho-nam' element={<MenWatch />}/>
        <Route path='/dong-ho-nam' element={<MenWatch />}/>
        <Route path='/dong-ho-nu' element={<WomenWatch />}/>
        <Route path='/lien-he' element={<Contact />}/>
        <Route path='/san-pham/:id' element={<Detail />}/>
        <Route path='/gio-hang' element={<Cart />}/>
        <Route path="/thanh-toan" element={<PaymentPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/don-hang" element={<Purchase />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/quen-mat-khau" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
