import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventPage from "./components/EventPage";
import EventWebinarPage from "./components/EventWebinarPage";
import ShowUser from "./components/ShowUser";
import Login from "./components/Login";
import UpdateVideoIdPage from "./components/UpdateVideoIdPage";
import QuestionList from "./components/QuestionList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path={"/list"} element={<ShowUser />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/Event" element={<EventWebinarPage />} />
        <Route path="/ytid" element={<UpdateVideoIdPage />} />
        <Route path="/que" element={<QuestionList />} />
      </Routes>
    </Router>
  );
}

export default App;
