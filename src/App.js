import MyHeader from "./components/header/MyHeader";
import StartComp from "./components/start-section/StartComp";
import PipeLine from "./components/UI/pipleline/PipeLine";
import Harvard from "./assets/harvard.png";
import Microsoft from "./assets/microsoft.svg";
import Nasa from "./assets/nasa.svg";
import Payoneer from "./assets/payoneer.svg";
import Yale from "./assets/yale.svg";
import TraditionComp from "./components/tradition-comp";
import ForProjects from "./components/for-projects/ForProjects.tsx";
function App() {
  const images = [
      Harvard, Microsoft, Nasa, Yale, Payoneer 
  ]
  return (
    <div className="App">
      <MyHeader/>
        <StartComp/>
        <PipeLine title="In the pipeline" images={images}/>
        <TraditionComp/>
        <ForProjects/>
    </div>
  );
}

export default App;