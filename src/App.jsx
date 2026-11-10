import './App.css';
import Home from './components/Home';
const App = () => {
  const sitename = 'My App';
  return (
    <>
      <h1>{sitename}</h1>
      <Home />
    </>
  );
};
export default App;
