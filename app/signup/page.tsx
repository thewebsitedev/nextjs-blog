import Image from "next/image";
import SignupForm from "@/app/ui/signup/form";
import LinkButton from "@/app/ui/link";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// structure for the signup page
export default function SignupPage() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    className="mx-auto h-10 w-auto"
                    src="/logo.png"
                    alt="blog logo"
                    width="100"
                    height="100"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create a new account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <SignupForm />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{" "}
                    <LinkButton
                        href="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        content="Login"
                    />
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}
