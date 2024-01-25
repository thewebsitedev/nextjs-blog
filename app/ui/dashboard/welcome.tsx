import { auth } from "@/auth"

// user welcome text in dashboard
export default async function Welcome() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const session = await auth();
    const user = session?.user;
    return <h1 className='text-xl font-bold mb-4'>Welcome, {user?.name}!</h1>;
}