'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Edit2, 
  Save,
  Camera,
  GraduationCap,
  MapPin,
  Phone,
  LucideIcon
} from 'lucide-react'
import { useStudentData } from '../layout'

interface FormData {
  name: string
  email: string
  semester: string
  university: string
  course: string
  bio: string
  phone: string
  location: string
}

interface Stat {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

interface Activity {
  title: string
  time: string
  score?: string
  papers?: string
  topics?: string
}

interface Achievement {
  title: string
  description: string
  icon: string
  unlocked: boolean
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const { student, isLoading } = useStudentData()
  const [formData, setFormData] = useState<FormData>({
    name: student?.name ?? 'Error',
    email: student?.email ?? 'Error',
    semester: student?.semester.toString() ?? '0',
    university: 'Assam Engineering College',
    course: student?.departmentId.name ?? 'Error',
    bio: 'Ready to ace your exams!',
    phone: '+91 9707269210',
    location: 'Guwahati, Assam'
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Stats animation
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power3.out'
        })
      }

      // Cards stagger animation
      gsap.from(cardsRef.current.filter(Boolean), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.4,
        ease: 'power3.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleEdit = () => {
    const newEditState = !isEditing
    setIsEditing(newEditState)
    
    if (!newEditState) {
      // Save animation
      gsap.to(cardsRef.current.filter(Boolean), {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const stats: Stat[] = [
    { label: 'Courses', value: '8', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Topics', value: '42', icon: GraduationCap, color: 'bg-purple-500' },
    { label: 'Papers', value: '15', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Questions', value: '247', icon: Trophy, color: 'bg-yellow-500' }
  ]

  const recentActivities: Activity[] = [
    { title: 'Completed Data Structures Mock Test', time: '2 hours ago', score: '85%' },
    { title: 'Uploaded Algorithm Design PYQ', time: '1 day ago', papers: '3' },
    { title: 'Studied Operating Systems', time: '2 days ago', topics: '5' }
  ]

  const achievements: Achievement[] = [
    { title: 'First Upload', description: 'Uploaded your first PYQ', icon: '📚', unlocked: true },
    { title: 'Test Master', description: 'Completed 10 mock tests', icon: '🎯', unlocked: true },
    { title: 'Streak Champion', description: 'Maintain 7-day streak', icon: '🔥', unlocked: false },
    { title: 'Perfect Score', description: 'Score 100% in a test', icon: '⭐', unlocked: false }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-linear-to-br from-white via-purple-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl shadow-sm dark:shadow-black/30 p-8 mb-6 relative overflow-hidden border border-white/40 dark:border-slate-700">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
          
          <div className="relative flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-purple-600 p-2.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-700 hover:scale-110 shadow-lg">
                  <Camera size={18} />
                </button>
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-purple-600 mb-2">
                  {formData.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} />
                    <span>{formData.course}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Semester {formData.semester}</span>
                  </div>
                </div>
                <p className="text-purple-600 font-medium">{formData.bio}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              {isEditing ? (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              ) : (
                <>
                  <Edit2 size={18} />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-100">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group cursor-pointer">
                  <div className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Profile Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div 
            ref={(el) => {
              cardsRef.current[0] = el
            }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl shadow-sm dark:shadow-black/30 p-6 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-300 border border-white/40 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Personal Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl font-medium">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl flex items-center gap-2 font-medium">
                    <Mail size={16} className="text-purple-500" />
                    {formData.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl flex items-center gap-2 font-medium">
                    <Phone size={16} className="text-purple-500" />
                    {formData.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl flex items-center gap-2 font-medium">
                    <MapPin size={16} className="text-purple-500" />
                    {formData.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div 
            ref={(el) => {
              cardsRef.current[1] = el
            }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl shadow-sm dark:shadow-black/30 p-6 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-300 border border-white/40 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Academic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl font-medium">
                    {formData.university}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl font-medium">
                    {formData.course}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Semester
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl font-medium">
                    Semester {formData.semester}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-slate-100 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl font-medium">
                    {formData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div 
            ref={(el) => {
              cardsRef.current[2] = el
            }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl shadow-sm dark:shadow-black/30 p-6 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-300 border border-white/40 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Recent Activity</h2>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-purple-50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-purple-600 transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    {activity.score && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                        {activity.score}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div 
            ref={(el) => {
              cardsRef.current[3] = el
            }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl shadow-sm dark:shadow-black/30 p-6 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-300 border border-white/40 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Achievements</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    achievement.unlocked 
                      ? 'bg-purple-50 border-purple-200 hover:border-purple-400 hover:shadow-md' 
                      : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-slate-100 text-sm mb-1">{achievement.title}</h3>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}