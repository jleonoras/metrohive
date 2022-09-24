import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home';
import Login from './page/Login';
import Error from './page/Error';
import SharedLayout from './page/SharedLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
