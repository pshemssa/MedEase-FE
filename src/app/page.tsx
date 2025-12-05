import {
  Heart,
  Shield,
  Users,
  QrCode,
  Instagram,
  ChevronRight,
  Twitter,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="min-h-screen flex items-center relative bg-blue-900">
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
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
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
            <FeatureCard 
              icon={Heart}
              title="Medical Records"
              description="Access your complete medical history, prescriptions, and health information securely"
            />
            <FeatureCard 
              icon={Shield}
              title="Secure & Private"
              description="Your medical data is protected with Rwanda's highest security standards"
            />
            <FeatureCard 
              icon={Users}
              title="Doctor Collaboration"
              description="Seamless communication with your healthcare provider and medical team"
            />
            <FeatureCard 
              icon={QrCode}
              title="Digital Prescriptions"
              description="Receive and manage digital prescriptions with QR verification"
            />
          </div>
        </div>
      </section>

      
      <footer className="bg-blue-500 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="space-y-2 text-sm">
                <p>
                  <Link href="/" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Home
                  </Link>
                </p>
                <p>
                  <Link href="/#features" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Some of our features
                  </Link>
                </p>
                <p>
                  <Link href="/login" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Get started
                  </Link>
                </p>
                <p>
                  <span className="text-gray-400 flex items-center gap-1 cursor-not-allowed">
                    <ChevronRight className="w-3 h-3" />
                    What we do
                  </span>
                </p>
                <p>
                  <span className="text-gray-400 flex items-center gap-1 cursor-not-allowed">
                    <ChevronRight className="w-3 h-3" />
                    How it works
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-green-300">Quick Links:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <Link href="/dashboard" className="hover:underline flex items-center gap-1 transition-colors duration-200">
                    <ChevronRight className="w-3 h-3" />
                    Patient Portal
                  </Link>
                </p>
                <p>
                  <span className="text-gray-400 flex items-center gap-1 cursor-not-allowed">
                    <ChevronRight className="w-3 h-3" />
                    Pharmacy Tool
                  </span>
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
                <a href="https://twitter.com/medease" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/medease" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/medease" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-white text-gray-800 py-3 sm:py-4 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <p className="text-center sm:text-left">© 2025 SheCanCODE. All Rights Reserved</p>
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center sm:justify-end">
            <span className="text-gray-500 cursor-not-allowed">FAQ</span>
            <span className="text-gray-500 cursor-not-allowed">Privacy Policy</span>
            <span className="text-gray-500 cursor-not-allowed">Terms of Use</span>
          </div>
        </div>
      </div>
    </main>
  );
}