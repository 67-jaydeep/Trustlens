import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ShieldCheck, User, Eye, EyeOff  } from "lucide-react";
import { registerUser } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-4">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-900 text-white p-3 rounded-full mb-3">
            <ShieldCheck size={22} />
          </div>
          <h1 className="text-xl font-semibold text-center">
            Create your TrustLens account
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Start analyzing content trust signals
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-gray-900 bg-white">
              <Mail size={16} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none text-sm bg-white"
                required
              />
            </div>
          </div>

            {/* Password */}
            <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-gray-900 bg-white">

                <Lock size={16} className="text-gray-400 mr-2 shrink-0" />

                <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none text-sm bg-white"
                required
                />

                <div
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer transition"
                >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>

            </div>
            </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
