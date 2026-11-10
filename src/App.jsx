import './App.css';
import Greeting from './components/Greeting';
const App = () => {
  const sitename = 'WSK site';
  return (
    <>
      <h1>{sitename}</h1>
      <p>jeeee</p>
      <Greeting name="DC" />
      <Greeting name="CD" />
      <Greeting name="CDC" />
    </>
  );
};
export default App;
