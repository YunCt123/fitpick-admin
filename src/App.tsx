import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import DashboardHome from "./pages/DashboardHome";
import Blogs from "./pages/Blogs";
import ManageUser from "./pages/ManageUser";
import Meal from "./pages/Meal";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import DownloadApp from "./pages/DownloadApp";
import ProtectedRoute from "./components/ProtectedRoute";
import { authService } from "./services/auth.service";
import "./App.css";

function App() {
  // Component để xử lý root route
  const RootRedirect = () => {
    const isAuthenticated = authService.isAuthenticated();
    
    // Nếu đã đăng nhập thì đến dashboard, nếu chưa thì đến home
    return <Navigate to={isAuthenticated ? "/dashboard" : "/home"} replace />;
  };

  // Component để xử lý login route khi đã đăng nhập
  const LoginRoute = () => {
    const isAuthenticated = authService.isAuthenticated();
    
    // Nếu đã đăng nhập thì redirect về dashboard
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    
    // Nếu chưa đăng nhập thì hiển thị trang login
    return <Login />;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root route dựa trên authentication status */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public routes - không cần authentication */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/download" element={<DownloadApp />} />

        {/* Login route - redirect to dashboard if already authenticated */}
        <Route path="/login" element={<LoginRoute />} />

        {/* Protected Dashboard routes - yêu cầu authentication */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="meals" element={<Meal />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

// Component cho 404 page
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
        <div className="mt-6 space-x-4">
          <a
            href="/home"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
          >
            Go to Home
          </a>
          <a
            href="/login"
            className="inline-block border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-lg hover:bg-purple-500 hover:text-white"
          >
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
