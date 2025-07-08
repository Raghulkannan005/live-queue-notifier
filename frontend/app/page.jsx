export const metadata = {
    title: 'Waitless Online - Skip the Queue, Live Your Life',
    description: 'Professional queue management system with real-time updates. Skip the wait and enjoy your life with smart wait time notifications.',
    keywords: 'waitless, wait times, real-time updates, queue management, online services, convenience, lifestyle, SaaS',
    openGraph: {
        title: 'Waitless Online - Skip the Queue, Live Your Life',
        description: 'Professional queue management system with real-time updates. Skip the wait and enjoy your life with smart wait time notifications.',
        url: 'https://waitless.online',
        siteName: 'Waitless',
        images: [
            {
                url: 'https://waitless.online/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Waitless Online - Skip the Wait'
            }
        ],
        type: 'website'
    }
};
import Features from "@/components/layout/Features";

export default function Home() {

    return (
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 right-1/2 w-full bg-gradient-to-r from-cyan-50 to-transparent transform skew-y-6 shadow-xl"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-20">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-4 sm:mb-6 leading-tight">
                            Skip the Wait. 
                            <br className="hidden sm:block" />
                            <span className="text-cyan-600">Live</span> Your Life.
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                            Professional queue management system with real-time updates. 
                            Avoid long queues and get instant notifications when it's your turn.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                            <a
                                href="/dashboard"
                                className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-200 text-center"
                            >
                                Get Started Free
                            </a>
                            <a
                                href="/about"
                                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-full shadow-lg border-2 border-slate-200 hover:border-cyan-300 transition-all duration-200 text-center"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <Features />

            {/* Stats Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                            Trusted by Thousands
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Join the growing community of smart queue managers
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-600 mb-2">10K+</div>
                            <div className="text-slate-600 text-sm sm:text-base">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-600 mb-2">500+</div>
                            <div className="text-slate-600 text-sm sm:text-base">Partner Venues</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-600 mb-2">2M+</div>
                            <div className="text-slate-600 text-sm sm:text-base">Hours Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-600 mb-2">99.9%</div>
                            <div className="text-slate-600 text-sm sm:text-base">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-3xl p-8 sm:p-12 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                            Ready to Skip the Wait?
                        </h2>
                        <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of users who are already saving time with our smart queue management system.
                        </p>
                        <a
                            href="/dashboard"
                            className="inline-block bg-white text-cyan-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            Start Your Journey
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}