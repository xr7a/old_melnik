import MyButton1 from "./components/UI/button/MyButton1";
import MyButton2 from "./components/UI/button/MyButton2";
import MyHeader from "./components/header/MyHeader";
import StartComp from "./components/start-comp/StartComp";
import PipeLine from "./components/UI/pipleline/PipeLine";
function App() {
  
  return (
    <div className="App">
      <MyHeader/>
        <StartComp/>
        <PipeLine title="In the pipeline" images={ [
          {src: '../../../img/harvard.png'}
        ]}/>
      <png src="img/harvard.png" alt=""/>
    </div>
  );
}

export default App;