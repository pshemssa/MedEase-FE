"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email && formData.password) {
      setIsLoading(true);
      router.push("/dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#090A0A" }}>
      <div className="w-full max-w-md">
        <div 
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
          style={{ width: "100%", maxWidth: "600px", minHeight: "639px" }}
        >
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-4">
                <div 
                  className="rounded-xl flex items-center justify-center shadow-lg" 
                  style={{
                    background: 'linear-gradient(45deg, #0ea5e9 0%, #06b6d4 100%)',
                    width: '66px',
                    height: '66px'
                  }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-500 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Sign in to access your medical dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="px-4 sm:px-12">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="px-4 sm:px-12">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between px-4 sm:px-12">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <div className="px-4 sm:px-12">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center px-4 sm:px-12">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}