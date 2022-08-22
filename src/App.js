import './styles/App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from './components/Layout';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Quiz from './components/pages/Quiz';
import Result from './components/pages/Result';
import { AuthProvider } from './Contexts/AuthContext';

import PrivateOutlet from './components/PrivateOutlet';
import PublicOutlet from './components/PublicOutlet';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<PublicOutlet />}>
              <Route path='signup' element={<Signup />} />
              <Route path='login' element={<Login />} />
            </Route>
            <Route path='/*' element={<PrivateOutlet />}>
              <Route path='quiz/:id' element={<Quiz />} />
              <Route path='result/:id' element={<Result />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
