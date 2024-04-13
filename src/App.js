import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";
import Tasks from './components/Tasks';
import Important from './components/Important';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Tasks />}/>
        <Route path='/important' element={<Important />}/>
      </Routes>
    </div>
  );
}

export default App;
