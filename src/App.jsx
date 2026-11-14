import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './views/Layout';
import Home from './views/Home';
import './App.css';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
const App = () => {
  const sitename = 'My App';
  return (
    <>
      <h1>{sitename}</h1>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
