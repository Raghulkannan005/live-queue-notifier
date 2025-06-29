export const metadata = {
    title: 'Waitless'
};
import Features from "@/components/layout/Features";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 flex flex-col items-center">

            <section className="flex flex-col items-center text-center mt-20 mb-16 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 drop-shadow-lg">
                    Skip the Wait. <span className="text-cyan-600">Live</span> Your Life.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl">
                    Waitless helps you avoid long queues by providing real-time wait time updates for your favorite places. Enjoy more, wait less!
                </p>
                <a
                    href="/rooms"
                    className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl transition duration-100 transform hover:scale-105"
                >
                    Get Started
                </a>
            </section>

            <Features />

        </main>
    );
}