export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">Page Not Found</p>
                <a href="/dashboard" className="mt-6 inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
                    Go to Dashboard
                </a>
            </div>
        </div>
    );
}