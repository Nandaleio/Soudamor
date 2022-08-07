import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Box, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Account from './components/Auth/Account';
import { SignIn } from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Header from './components/Header';
import { Todo } from './components/Todo/Todo';
import { Welcome } from './components/Welcome';

function App() {


  const theme = createTheme();

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Routes>
                <Route path="*" element={<Welcome />} />
                <Route path="todo" element={<Todo />} />


                <Route path="login" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="account" element={<Account />} />
              </Routes>
            </Box>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
