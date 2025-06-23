

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Header = () => {
    return (
        
            <nav className="w-full flex justify-between items-center py-6 px-8 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-10">
                <div className="text-2xl font-extrabold text-cyan-900 tracking-wide flex items-center">
                    <span className="text-cyan-600 mr-1">   ⏱</span> Waitless
                </div>
                <div className="flex items-center space-x-4">
                    <a
                        href="/"
                        className="text-cyan-600 mx-4 text-lg font-semibold hover:text-cyan-800 transition-colors"
                    >
                        Home
                    </a>
                    <a
                        href="/about"
                        className="text-cyan-600 mx-4 text-lg font-semibold hover:text-cyan-800 transition-colors"
                    >
                        About
                    </a>
                    <div>
                        <SignedOut>
                        <SignInButton>
                            <button className="bg-cyan-600 cursor-pointer text-white mx-4 px-4 py-2 rounded-lg font-semibold shadow hover:bg-cyan-700 transition-colors mr-2">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="bg-white cursor-pointer border mx-4  border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-cyan-50 transition-colors">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    </div>
                   <div>
                     <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "ring-2 ring-cyan-600 hover:ring-cyan-800 transition-all",
                                },
                            }}
                            afterSignOutUrl="/"
                        />
                    </SignedIn>
                   </div>
                </div>
            </nav>

    )
}

export default Header;