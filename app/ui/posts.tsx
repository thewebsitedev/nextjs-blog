import Post from "./post";

const posts = [
    {
        id: 1,
        title: "Boost your conversion rate",
        href: "#",
        description:
            "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
        imageUrl:
            "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        category: { title: "Marketing", href: "#" },
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
];

export default function Posts() {
    return (
        <div className="py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        The Latest
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                    <div className="mt-8 space-y-12 lg:mt-12 lg:space-y-12">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
