export const metadata = {
    title: 'User | Waitless',
};

import { getSession } from '@/lib/actions/auth';

const UserPage = async () => {
    const session = await getSession();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">User Page</h1>
                <p className="text-gray-600 mb-2 text-center">Welcome {session.user?.name}!</p>
                <div className="flex flex-col items-center mb-4">
                        <img
                            src={session.user?.image}
                            alt="User profile photo"
                            className="w-24 h-24 rounded-full mb-2 border-2 border-gray-200 shadow"
                        />
                    <p className="text-lg font-medium text-gray-700">Name: {session.user?.name}</p>
                    <p className="text-gray-500">Email: {session.user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
