import { logout } from "../lib/actions";

// logout button
export default function Logout({className}:{className?:string}) {
    return (
        <form
            action={logout}
        >
            <button className={className}>
                Logout
            </button>
        </form>
    );
}