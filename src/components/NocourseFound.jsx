import { BookOpen } from "lucide-react";
import Link from "next/link";


export default function NocourseFound() {
  return (
     <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 
                       border-r border-slate-200/60 h-screen sticky top-0 flex 
                       items-center justify-center text-center p-6">
           <div>
             <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
             <h2 className="text-lg font-semibold text-slate-700">
               No course found
             </h2>
             <p className="text-sm text-slate-500 mt-2">
               The course you’re looking for doesn’t exist or has no modules yet.
             </p>
             <Link
                  href="/courses/all"
               className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow 
                        hover:bg-indigo-700 transition"
             >
               Go back to courses
             </Link>
           </div>
         </div>
  )
}
