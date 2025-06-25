

const UnderConstruction = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 flex flex-col items-center justify-center">
            <section className="flex flex-col items-center text-center px-4 max-w-2xl animate-fade-in">
                <div className="relative mb-8">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-cyan-100 rounded-full blur-2xl opacity-70"></span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 drop-shadow-lg z-10 relative">
                        Under <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">Construction</span>
                    </h1>
                    <p className="text-base text-cyan-700 font-semibold tracking-wide uppercase mb-2 z-10 relative">
                        Coming Soon
                    </p>
                </div>
                <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
                    This page is currently being developed. Please check back later for updates and new features!
                </p>
                <a
                    href="/"
                    className="bg-white border border-cyan-200 text-cyan-700 hover:bg-cyan-50 font-medium px-8 py-3 rounded-full shadow transition duration-200 flex items-center justify-center"
                >
                    ← Back to Home
                </a>
            </section>
        </main>
    );
};

export default UnderConstruction;


// export default function NotFound() {
//     return (
//         <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 flex flex-col items-center justify-center">
//             <section className="flex flex-col items-center text-center px-4">
//                 <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-600 mb-4 drop-shadow-lg">404</h1>
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Page Not Found</h2>
//                 <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl">
//                     The page you are looking for does not exist.
//                 </p>
//                 <a
//                     href="/"
//                     className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition duration-300 transform hover:scale-105"
//                 >
//                     Go Home
//                 </a>
//             </section>
//         </main>
//     );
// }