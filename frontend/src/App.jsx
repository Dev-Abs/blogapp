import { useState } from "react";
import Login from "./components/Login"
import Signup from "./components/SignUp"
import SuccessAlert from "./components/SuccessAlert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import Navbar from "./components/Navbar";
import MyBlogs from "./components/MyBlogs";
import Footer from "./components/Footer";
import BlogPage from "./components/BlogPage";
import DangerAlert from "./components/DangerAlert";
import AuthorSpecificBlogs from "./components/AuthorSpecificBlogs";
import SubscriptionAlert from "./components/SubscriptionAlert";
import PricingPage from "./components/PricingPage";

function App() {
  const [alert,setAlert] = useState(false)
  const [message,setMessage] = useState("")
  const [dangerAlert, setDangerAlert] = useState(false)

  const toggleSuccess = (msg) => {
    setMessage(msg);
    setAlert(!alert)
    closeAlert()
  }

  const toggleDanger = () => {
    setDangerAlert(!dangerAlert)
    closeAlert()
  }

  const closeAlert = () => {
    setTimeout(() => {
      setAlert(false)
    }, 7000)
  }

  return (
    // <>
    // <UserProfile />
    // <Signup />
    // <Login />
    // </>

    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
        <div className="flex-grow">
      {alert && <SuccessAlert message={message } />}
      {dangerAlert && <DangerAlert msg="You need to login to like a blog" />}
      <SubscriptionAlert />
    <Routes>
    <Route path="/signup" element={<Signup toggleSuccess={toggleSuccess}/>} />
    <Route path="/" element={<BlogList toggleDanger={toggleDanger} />} />
    <Route path="/myblogs" element={<MyBlogs toggleSuccess={toggleSuccess} toggleDanger={toggleDanger} />} />
    <Route path="/createblog" element={<CreateBlog toggleSuccess={toggleSuccess} />} />
    <Route path="/signin" element={<Login toggleSuccess={toggleSuccess} />} />
    <Route path="/blog/:id" component={BlogPage} element={<BlogPage />} />
    <Route path="/author/:authorId" element={<AuthorSpecificBlogs />} />
    <Route path="/pricing" element={<PricingPage />} />
    </Routes>
    </div>
    <Footer />
    </div>
  </Router>
  )
}

export default App
