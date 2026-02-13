"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import ProfileOverview from "@/components/dashboard/profile-overview"
import MedicalHistory from "@/components/dashboard/medical-history"
import MedicalInformation from "@/components/dashboard/medical-information"
import MyPrescriptions from "@/components/dashboard/my-prescriptions"
import JoinQueue from "@/components/dashboard/join-queue"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { getCurrentUser } from "@/lib/auth-middleware"
import type { PatientProfile, PatientPrescription, Allergy, ChronicDisease } from "@/lib/patient-service"

// Generate reference number if not provided
function generateReferenceNumber(userId: string | number): string {
  const prefix = "REF";
  const timestamp = Date.now().toString().slice(-6);
  const userIdStr = userId.toString().padStart(4, '0').slice(-4);
  return `${prefix}-${timestamp}-${userIdStr}`;
}

// Get initials from name
function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<PatientProfile | null>(null)
  const [prescriptions, setPrescriptions] = useState<PatientPrescription[]>([])
  const [allergies, setAllergies] = useState<Allergy[]>([])
  const [chronicDiseases, setChronicDiseases] = useState<ChronicDisease[]>([])

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get current user from auth state
        const currentUser = getCurrentUser()
        if (!currentUser) {
          setError("User not authenticated")
          return
        }

        // Fetch all patient data in parallel
        const [profileRes, prescriptionsRes, allergiesRes, diseasesRes] = await Promise.all([
          fetch('/api/patients/me'),
          fetch('/api/patients/me/prescriptions'),
          fetch('/api/patients/me/allergies'),
          fetch('/api/patients/me/chronic-diseases'),
        ])

        // Handle profile
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          const profileInfo = profileData.data || {}
          
          // Generate reference number if not present
          if (!profileInfo.referenceId && !profileInfo.referenceNumber) {
            profileInfo.referenceId = generateReferenceNumber(profileInfo.id || currentUser.id)
            profileInfo.referenceNumber = profileInfo.referenceId
          }

          // Merge with current user data as fallback
          const mergedProfile = {
            ...currentUser,
            ...profileInfo,
            name: profileInfo.name || currentUser.name || currentUser.email,
            email: profileInfo.email || currentUser.email,
            referenceId: profileInfo.referenceId || profileInfo.referenceNumber || generateReferenceNumber(currentUser.id),
          }
          setProfile(mergedProfile as PatientProfile)
        } else {
          // Fallback to current user data
          const fallbackProfile = {
            ...currentUser,
            name: currentUser.name || currentUser.email,
            email: currentUser.email,
            referenceId: generateReferenceNumber(currentUser.id),
          }
          setProfile(fallbackProfile as PatientProfile)
        }

        // Handle prescriptions
        if (prescriptionsRes.ok) {
          const prescriptionsData = await prescriptionsRes.json()
          setPrescriptions(prescriptionsData.data || [])
        }

        // Handle allergies
        if (allergiesRes.ok) {
          const allergiesData = await allergiesRes.json()
          setAllergies(allergiesData.data || [])
        }

        // Handle chronic diseases
        if (diseasesRes.ok) {
          const diseasesData = await diseasesRes.json()
          setChronicDiseases(diseasesData.data || [])
        }

      } catch (err: any) {
        console.error('Error fetching patient data:', err)
        setError(err.message || 'Failed to load patient data')
        
        // Fallback to current user data
        const currentUser = getCurrentUser()
        if (currentUser) {
          setProfile({
            ...currentUser,
            name: currentUser.name || currentUser.email,
            email: currentUser.email,
            referenceId: generateReferenceNumber(currentUser.id),
          } as PatientProfile)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </main>
    )
  }

  if (error && !profile) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  if (!profile) {
    return null
  }

  const initials = getInitials(profile.name || profile.email || '')

  return (
    <ProtectedRoute allowedRoles="patient">
      <main className="min-h-screen bg-gray-50 relative">
        <DashboardHeader />
        <div className="px-4 py-6 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProfileOverview 
                name={profile.name || profile.email || 'User'}
                initials={initials}
                referenceId={profile.referenceId || profile.referenceNumber || ''}
                dateOfBirth={profile.dateOfBirth || 'Not provided'}
                insurance={profile.insurance || 'Not provided'}
                email={profile.email || ''}
                phone={profile.phone || 'Not provided'}
              />
              <MedicalInformation 
                chronicDiseases={chronicDiseases.length > 0 ? chronicDiseases : undefined}
                allergies={allergies.length > 0 ? allergies : undefined}
              />
              <MyPrescriptions prescriptions={prescriptions.length > 0 ? prescriptions.map(p => ({
                id: p.id,
                medicineName: p.medicineName,
                dosage: p.dosage,
                frequency: p.frequency,
                duration: p.duration,
                prescribedBy: p.prescribedBy,
                date: p.date,
                instructions: p.instructions,
                status: p.status === 'Active' ? 'Active' : 'Used',
                signedAt: p.signedAt ? new Date(p.signedAt) : new Date(),
              })) : undefined} />
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <JoinQueue />
              <MedicalHistory />
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}