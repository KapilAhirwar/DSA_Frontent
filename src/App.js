import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './UseContext/context';
import MainContain from './CardDetails/container';
import Questions from './Question/QuetionsPage';
import Header from './Header/header';
import AdminPanal from './DashBoard/Dashboard';
// import {verifyOtp} from './Login/Login_Signin/Forms';
// import SmallWindow from './Question/smallWindow';

function App() {
  const {role} = useAppContext();
  // console.log(role);
  return (
    <div className="App">
      {/* Header contain LogIn and SignUp button */}
      <Header/> 
      
      <Routes>
        <Route path='/' element={role === 'Admin' ? <AdminPanal/> : <MainContain/> } />
        <Route path='/Questions' element={<Questions/>}/>
        {/* <Route path='/Question/Notes-smallWindow' element={<SmallWindow/>} /> */}
      </Routes>
      <ToastContainer theme="dark" position="bottom-right"/>
      <Toaster position='top-center' reverseOrder={false}/>
    </div>
  );
}

export default App;
