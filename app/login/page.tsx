import Image from "next/image";
import LoginForm from "../ui/login/form";
import LinkButton from "../ui/link";

// structure for the login page
export default function LoginPage() {
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
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<LoginForm />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{" "}
					<LinkButton
						href="/signup"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						content="Signup"
					/>
                </p>
            </div>
        </div>
    );
}
