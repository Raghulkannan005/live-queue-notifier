
const Features = () => {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 17l4 4 4-4m-4-5v9" />
                    <path d="M20.24 12.24A9 9 0 1 0 12 21" />
                </svg>
            ),
            title: "Real-Time Updates",
            description: "Get instant updates on current wait times at popular venues with live notifications."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
            ),
            title: "Save Your Time",
            description: "Plan your visits efficiently and avoid unnecessary waiting with smart scheduling."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 17h5l-5 5-5-5h5v-4" />
                    <path d="M9 7H4l5-5 5 5H9v4" />
                </svg>
            ),
            title: "Smart Alerts",
            description: "Receive personalized alerts when queues are short or your turn is approaching."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l2 2 4-4" />
                </svg>
            ),
            title: "Easy to Use",
            description: "Simple, intuitive interface designed for seamless user experience across all devices."
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                        Why Choose Waitless?
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                        Experience the future of queue management with our advanced features
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors duration-200 mx-auto sm:mx-0">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg sm:text-xl text-center sm:text-left mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 text-center sm:text-left text-sm sm:text-base leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Benefits */}
                <div className="mt-12 lg:mt-16 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-3xl p-6 sm:p-8 lg:p-12">
                    <div className="text-center mb-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                            Built for Everyone
                        </h3>
                        <p className="text-slate-600 max-w-3xl mx-auto">
                            Whether you're a business owner or customer, our platform adapts to your needs
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-full mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">For Customers</h4>
                            <p className="text-slate-600 text-sm sm:text-base">
                                Join queues remotely, get real-time updates, and never waste time waiting again.
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-full mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">For Businesses</h4>
                            <p className="text-slate-600 text-sm sm:text-base">
                                Manage queues efficiently, reduce crowding, and improve customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;