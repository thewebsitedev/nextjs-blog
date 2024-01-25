export default function Newsletter() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="mx-auto max-w-4xl border-t border-gray-900/10 pt-8 lg:flex lg:items-center lg:justify-between">
                <div>
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        Subscribe to our newsletter
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                        The latest news, articles, and resources, sent to your
                        inbox weekly.
                    </p>
                </div>
                <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        required
                        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-56 sm:text-sm sm:leading-6"
                        placeholder="Enter your email"
                    />
                    <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
