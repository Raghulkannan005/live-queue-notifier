export const metadata = {
    title: 'Waitless'
};

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 flex flex-col items-center">
            {/* Navbar */}
            <nav className="w-full flex justify-between items-center py-6 px-8 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-10">
                <div className="text-2xl font-extrabold text-cyan-900 tracking-wide flex items-center">
                    <span className="text-cyan-600 mr-1">⏱</span> Waitless
                </div>
                <a
                    href="https://waitless.online"
                    className="text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    waitless.online
                </a>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center mt-20 mb-16 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 drop-shadow-lg">
                    Skip the Wait. <span className="text-cyan-600">Live</span> Your Life.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl">
                    Waitless helps you avoid long queues by providing real-time wait time updates for your favorite places. Enjoy more, wait less!
                </p>
                <a
                    href="#features"
                    className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl transition duration-300 transform hover:scale-105"
                >
                    Discover Features
                </a>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mb-24"
            >
                <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-cyan-600 transition-colors duration-300">
                        <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M8 17l4 4 4-4m-4-5v9" />
                            <path d="M20.24 12.24A9 9 0 1 0 12 21" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl text-center mb-3">Real-Time Updates</h3>
                    <p className="text-slate-600 text-center">Get instant updates on current wait times at popular venues.</p>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-cyan-600 transition-colors duration-300">
                        <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl mb-3">Save Your Time</h3>
                    <p className="text-slate-600 text-center">Plan your visits efficiently and avoid unnecessary waiting.</p>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-cyan-600 transition-colors duration-300">
                        <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17 9V7a5 5 0 0 0-10 0v2" />
                            <rect x="5" y="9" width="14" height="10" rx="2" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 text-center text-xl mb-3">Smart Alerts</h3>
                    <p className="text-slate-600 text-center">Receive alerts when queues are short or your turn is near.</p>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-cyan-600 transition-colors duration-300">
                        <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12l2 2 4-4" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl mb-3">Easy to Use</h3>
                    <p className="text-slate-600 text-center">Simple, intuitive interface for a seamless experience.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-8 text-center text-slate-600 bg-white border-t border-slate-200">
                <div className="container mx-auto">
                    <div className="flex justify-center mb-4">
                        <span className="text-2xl font-bold text-cyan-700">Waitless</span>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Waitless &mdash; <a href="https://waitless.online" className="text-cyan-600 hover:text-cyan-800">waitless.online</a></p>
                </div>
            </footer>
        </main>
    );
}