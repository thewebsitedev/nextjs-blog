import { logout } from "../lib/actions";

export default function Logout() {
    return (
        <form
            action={logout}
            className="inline-flex items-center"
        >
            <button className="h-full w-full border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                <div className="hidden md:block">Logout</div>
            </button>
        </form>
    );
}