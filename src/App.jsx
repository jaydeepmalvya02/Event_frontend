import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/PublicNavbar";
import EventWebinarPage from "./components/EventWebinarPage";
import EventDetails from "./components/EventDetails";
import RegistrationForm from "./components/RegistrationForm";
import Speaker from "./components/Speaker";
import AboutPage from "./components/AboutPage";
import ShowUser from "./components/ShowUser";
import QuestionList from "./components/QuestionList";
import UpdateVideoIdPage from "./components/UpdateVideoIdPage";
import ProtectedRoute from "./utils/PrivateRoute";
import TrackVisitor from "./utils/TrackVisitor";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AdminHomePage from "./utils/AdminHomePage";
import AdminLayout from "./utils/AdminLayout";

const App = () => {
  return (
    <div>
      <TrackVisitor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/speakers" element={<Speaker />} />{" "}
        {/* Placeholder for speakers page */}
        <Route path="/events" element={<EventDetails />} />
        <Route path="/liveEvents" element={<EventWebinarPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="list" element={<ShowUser />} />
          <Route path="que" element={<QuestionList />} />
          <Route path="ytid" element={<UpdateVideoIdPage />} />

          <Route path="stat" element={<AnalyticsDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
