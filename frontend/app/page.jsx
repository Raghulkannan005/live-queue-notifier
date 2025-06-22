export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#d1d5db] flex flex-col items-center">
            {/* Navbar */}
            <nav className="w-full flex justify-between items-center py-6 px-8 bg-white/90 shadow-lg border-b border-gray-200">
                <div className="text-2xl font-extrabold text-[#2d3a4a] tracking-wide">
                    Waitless
                </div>
                <a
                    href="https://waitless.online"
                    className="text-[#6366f1] font-semibold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    waitless.online
                </a>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center mt-20 mb-16 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#2d3a4a] mb-6 drop-shadow-lg">
                    Skip the Wait. <span className="text-[#6366f1]">Live</span> Your Life.
                </h1>
                <p className="text-lg md:text-xl text-[#475569] mb-8 max-w-2xl">
                    Waitless helps you avoid long queues by providing real-time wait time updates for your favorite places. Enjoy more, wait less!
                </p>
                <a
                    href="#features"
                    className="bg-gradient-to-r from-[#6366f1] to-[#3b82f6] hover:from-[#4f46e5] hover:to-[#2563eb] text-white font-semibold px-8 py-3 rounded-full shadow-xl transition"
                >
                    Discover Features
                </a>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 mb-24"
            >
                <div className="bg-white rounded-2xl p-7 shadow-xl flex flex-col items-center border border-gray-100 hover:shadow-2xl transition">
                    <svg className="w-12 h-12 text-[#6366f1] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 17l4 4 4-4m-4-5v9" />
                        <path d="M20.24 12.24A9 9 0 1 0 12 21" />
                    </svg>
                    <h3 className="font-bold text-[#2d3a4a] text-lg mb-2">Real-Time Queue Updates</h3>
                    <p className="text-[#6366f1] text-center">Get instant updates on current wait times at popular venues.</p>
                </div>
                <div className="bg-white/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
                    <svg className="w-12 h-12 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    <h3 className="font-bold text-blue-700 text-lg mb-2">Save Your Time</h3>
                    <p className="text-blue-600 text-center">Plan your visits efficiently and avoid unnecessary waiting.</p>
                </div>
                <div className="bg-white/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
                    <svg className="w-12 h-12 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 9V7a5 5 0 0 0-10 0v2" />
                        <rect x="5" y="9" width="14" height="10" rx="2" />
                    </svg>
                    <h3 className="font-bold text-blue-700 text-lg mb-2">Notifications & Alerts</h3>
                    <p className="text-blue-600 text-center">Receive alerts when queues are short or your turn is near.</p>
                </div>
                <div className="bg-white/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
                    <svg className="w-12 h-12 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12l2 2 4-4" />
                    </svg>
                    <h3 className="font-bold text-blue-700 text-lg mb-2">Easy to Use</h3>
                    <p className="text-blue-600 text-center">Simple, intuitive interface for a seamless experience.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-6 text-center text-blue-600 bg-white/60">
                &copy; {new Date().getFullYear()} Waitless &mdash; <a href="https://waitless.online" className="underline">waitless.online</a>
            </footer>
        </main>
    );
}