import { auth } from "@/auth"

export default async function Welcome() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const session = await auth();
    const user = session?.user;
    return <h1 className='text-xl font-bold mb-2'>Welcome, {user?.name}!</h1>;
}