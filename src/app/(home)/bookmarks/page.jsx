export default function BookmarksPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md animate-pulse">
          🔖 Bookmarks
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
          Save and revisit your favorite posts anytime 
        </p>
      </div>
    </div>
  );
}
