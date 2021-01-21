import './App.css';
import BottomLinks from './components/bottom-links';
//import Dinner from './components/dinner';
import VegAndFruit from './components/VegAndFruit';
import PickingPanel from './components/PickingPanel';

function App() {
  return (
    <div>
      <div className="App">
        <PickingPanel />
        <VegAndFruit />

      </div>
      <BottomLinks />
    </div>
  );
}

export default App;
