export default function NotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 flex flex-col items-center justify-center">
            <section className="flex flex-col items-center text-center px-4">
                <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-600 mb-4 drop-shadow-lg">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Page Not Found</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl">
                    The page you are looking for does not exist.
                </p>
                <a
                    href="/"
                    className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition duration-300 transform hover:scale-105"
                >
                    Go Home
                </a>
            </section>
        </main>
    );
}