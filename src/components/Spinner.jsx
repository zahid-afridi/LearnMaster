import { BookOpen, Sparkles } from 'lucide-react'
import React from 'react'

export default function Spinner() {
  return (
    <>
    
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
              <div className="text-center space-y-6">
                  <div className="relative">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                          <BookOpen size={40} className="text-white animate-bounce" />
                      </div>
                      <div className="absolute -top-2 -right-2 text-yellow-400 animate-spin">
                          <Sparkles size={20} />
                      </div>
                      <div className="absolute -bottom-2 -left-2 text-purple-400 animate-ping">
                          <Sparkles size={16} />
                      </div>
                  </div>
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Loading Your Course
                      </h3>
                      <p className="text-slate-600 text-lg">
                          Preparing an amazing learning experience...
                      </p>
                      <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}
