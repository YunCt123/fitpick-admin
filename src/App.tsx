import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Revenue from './pages/Revenue';
import Analytics from './pages/Analytics';
import DashboardHome from './pages/DashboardHome';
import Blogs from './pages/Blogs';
import ManageUser from './pages/ManageUser';
import './App.css';
import Transactions from './pages/Transactions';

function App() {
  return (
    <Router>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard layout with nested routes */}
          <Route path="/dashboard" element={<DashBoard />}>
            <Route index element={<DashboardHome />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="users" element={<ManageUser />} />
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
        <a href="/dashboard" className="mt-6 inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default App;