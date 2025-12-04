import {
  Heart,
  Shield,
  Users,
  QrCode,
  Instagram,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/pat_bgk.png)" }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 font-bold leading-tight">
              A Secure Digital Space for Your Health Information
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl leading-relaxed">
              Empowering patients in Rwanda with secure, accessible healthcare technology
            </p>
            <Link 
              href="/login" 
              className="inline-block bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Access Patient Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-blue-500">
              Healthcare at Your Fingertips
            </h2>
            <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Experience modern healthcare management designed specifically for Rwanda's healthcare ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group p-6 sm:p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 min-h-[250px] sm:min-h-[280px]" style={{boxShadow: '-3px 0 0 #E8ECED'}}>
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold mb-3 text-blue-500 text-sm sm:text-base lg:text-lg">
                Medical Records
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Access your complete medical history, prescriptions, and health information securely
              </p>
            </div>

            <div className="group p-6 sm:p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 min-h-[250px] sm:min-h-[280px]" style={{boxShadow: '-3px 0 0 #E8ECED'}}>
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold mb-3 text-blue-500 text-sm sm:text-base lg:text-lg">
                Secure & Private
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Your medical data is protected with Rwanda's highest security standards
              </p>
            </div>

            <div className="group p-6 sm:p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 min-h-[250px] sm:min-h-[280px]" style={{boxShadow: '-3px 0 0 #E8ECED'}}>
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold mb-3 text-blue-500 text-sm sm:text-base lg:text-lg">
                Doctor Collaboration
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Seamless communication with your healthcare provider and medical team
              </p>
            </div>

            <div className="group p-6 sm:p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 min-h-[250px] sm:min-h-[280px]" style={{boxShadow: '-3px 0 0 #E8ECED'}}>
              <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold mb-3 text-blue-500 text-sm sm:text-base lg:text-lg">
                Digital Prescriptions
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Receive and manage digital prescriptions with QR verification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Home
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Some of our features
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Get started
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    What we do
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    How it works
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-green-300">Quick Links:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Patient Portal
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Pharmacy Tool
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-green-300">Contact Us:</h3>
              <div className="space-y-1 text-sm">
                <p>Address: KN 3 Ave, 30 St Kigali - Rwanda</p>
                <p>Phone: +250 788 195 705</p>
                <p>Email: medconnectrwanda@med.rw</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-green-300">Follow Us:</h3>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                  𝕏
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                  f
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-white text-gray-800 py-3 sm:py-4 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <p className="text-center sm:text-left">© 2025 SheCanCODE. All Rights Reserved</p>
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center sm:justify-end">
            <a href="#" className="hover:text-blue-500 transition-colors duration-200">FAQ</a>
            <a href="#" className="hover:text-blue-500 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors duration-200">Terms of Use</a>
          </div>
        </div>
      </div>
    </main>
  );
}