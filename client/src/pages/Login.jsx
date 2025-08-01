import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await loginAdmin(formData);
      if (user.role !== "admin") {
        setError("Access Denied: Not an admin");
        return;
      }
      login(user);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-cyan-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
        aria-label="Admin Login Form"
      >
        {/* Logo or branding */}
        <div className="flex justify-center mb-2">
          <img src="/logo.png" alt="Brand Logo" className="h-24 w-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-1 text-gray-900 text-center">
          Admin Login
        </h2>
        <p className="mb-6 text-gray-400 text-center text-sm">
          Please sign in to access your admin dashboard
        </p>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-800"
            aria-label="Email Address"
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-800"
            aria-label="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            className="absolute right-4 top-3 text-blue-600 hover:underline text-sm"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-800 active:bg-blue-900 transition-transform transform hover:-translate-y-1"
        >
          Login
        </button>
        <div className="mt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Your Company Name
        </div>
      </form>
    </div>
  );
}

export default Login;
