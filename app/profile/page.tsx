import * as React from "react"

// Mock user and character data
const mockUser = {
    id: 1,
    firstName: "Jane",
    username: "janedoe",
    email: "jane@example.com"
}

const mockCharacters = [
    {
        id: 1,
        name: "Aria the Brave",
        description: "A fearless warrior from the north.",
        picture: "https://via.placeholder.com/100x100?text=Aria"
    },
    {
        id: 2,
        name: "Luna the Wise",
        description: "A sage with knowledge of ancient magic.",
        picture: "https://via.placeholder.com/100x100?text=Luna"
    }
]

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
            <section className="w-full max-w-2xl bg-white rounded-lg shadow p-6 mb-8">
                <h1 className="text-2xl font-bold mb-2">{mockUser.firstName}'s Profile</h1>
                <p className="text-gray-600">Username: <span className="font-mono">{mockUser.username}</span></p>
                <p className="text-gray-600">Email: <span className="font-mono">{mockUser.email}</span></p>
            </section>
            <section className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Your Characters</h2>
                {mockCharacters.length === 0 ? (
                    <p className="text-gray-500">No characters created yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {mockCharacters.map(character => (
                            <li key={character.id} className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-sm">
                                <img
                                    src={character.picture}
                                    alt={character.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover mb-2 border border-gray-300"
                                    loading="lazy"
                                />
                                <h3 className="text-lg font-bold mb-1">{character.name}</h3>
                                <p className="text-gray-700 text-sm text-center">{character.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}
