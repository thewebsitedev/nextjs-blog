import { logout } from "@/app/lib/actions";

// logout button
export default async function Logout() {
    return (
        <form
            action={logout}
        >
            <button className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">
                Logout
            </button>
        </form>
    );
}