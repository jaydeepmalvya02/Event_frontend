import React from "react";
import EventPage from "./components/EventPage";
import { BrowserRouter,Routes , Route } from "react-router-dom";
import ShowUser from "./components/ShowUser";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<EventPage />}/>
      <Route  path={'/list'} element={<ShowUser/>}/>
    </Routes>
      
        
      
    </BrowserRouter>
  );
}

export default App;
