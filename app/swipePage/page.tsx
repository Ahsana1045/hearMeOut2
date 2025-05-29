import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";

export default async function SwipePage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">Welcome to the Swipe Page!</h1>
                {/* TODO: Add swiping UI here */}
            </main>
        </>
    );
}
