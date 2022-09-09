
import { Box } from '@mui/material';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './components/Auth/Account';
import EditAccount from './components/Auth/EditAccount';
import { SignIn } from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { Game } from './components/Game/Game';
import Header from './components/Header';
import { Todo } from './components/Todo/Todo';
import { Welcome } from './components/Welcome';

function App() {


  return (
    <BrowserRouter>
      <Header />

      <Routes>

        <Route path="/game" element={<Game />} />

        <Route element={
          <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "15px" }}>
            <Outlet />
          </Box>}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/editaccount" element={<EditAccount />} />
          <Route path="*" element={<Welcome />} />
          <Route path="/todo" element={<Todo />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
