

export default function Footer() {

    return (

        <footer className="bg-gray-950 text-gray-300">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

                    <div className="max-w-md">

                        <h2 className="text-2xl font-bold text-white">
                            Voting System
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-400">
                            Secure and transparent online voting designed
                            to make election management simple and reliable.
                        </p>

                    </div>


                    <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">

                        <div>

                            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                                Platform
                            </h3>

                            <div className="mt-4 space-y-2 text-sm">

                                <p className="text-gray-400 hover:text-white transition">
                                    Election Management
                                </p>

                                <p className="text-gray-400 hover:text-white transition">
                                    Secure Voting
                                </p>

                                <p className="text-gray-400 hover:text-white transition">
                                    Election Results
                                </p>

                            </div>

                        </div>


                        <div>

                            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                                Features
                            </h3>

                            <div className="mt-4 space-y-2 text-sm">

                                <p className="text-gray-400 hover:text-white transition">
                                    Candidate Management
                                </p>

                                <p className="text-gray-400 hover:text-white transition">
                                    Participant Management
                                </p>

                                <p className="text-gray-400 hover:text-white transition">
                                    Statistics
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="mt-10 pt-5 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Voting System. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Secure • Transparent • Reliable
                    </p>

                </div>

            </div>

        </footer>

    );

}


