import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App()
{
  return(
    <>
    <BrowserRouter>
    <h1>Hello </h1>
    <Routes>
      <Route path="/" element= {<Home/>} />
      <Route path="/about" element= {<About/>} />
    </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App;























// function App()
// {
//   return(
//     <>
//     <h1>Hello React</h1>
//     </>
//   )
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
