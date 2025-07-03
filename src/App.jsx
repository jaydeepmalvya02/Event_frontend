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
import AdminEvent from "./components/AdminEvent";
import AdminSpeaker from "./utils/AdminSpeaker";
import AdminJobPanel from "./jobs/AdminJobPanel";
import FindJobs from "./jobs/FindJobs";
import JobPostingForm from "./jobs/JobPostingForm";
import { ToastContainer } from "react-toastify";
import ChatComponent from "./ai/ChatComponent";

const App = () => {
  return (
    <div>
      <ToastContainer  autoClose={1000}/>
      <TrackVisitor />
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/speakers" element={<Speaker />} />{" "}
        {/* Placeholder for speakers page */}
        <Route path="/EventDetails" element={<EventDetails />} />
        <Route path="/findJobs" element={<FindJobs />} />
        <Route path="/createJobs" element={<JobPostingForm />} />
        <Route path="/liveEvents/:eventId" element={<EventWebinarPage />} />
        <Route path="about" element={<AboutPage />} />
        {/* <Route path="/chat" element={<ChatComponent />} /> */}
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
          <Route path="adminSpeaker" element={<AdminSpeaker />} />
          <Route path="stat" element={<AnalyticsDashboard />} />
          <Route path="newEvent" element={<AdminEvent />} />
          <Route path="admin-job" element={<AdminJobPanel />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
