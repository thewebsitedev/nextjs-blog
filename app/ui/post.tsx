import Image from "next/image";
import { Post } from "@/app/lib/types";
import slugify from "react-slugify";

export default function Post({ post }: { post: Post}) {
    return (
        <article
            key={post.id}
            className="relative isolate flex flex-col gap-8 lg:flex-row"
        >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
				<Image
					src={post.imageUrl}
					alt=""
					className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
					width={256}
					height={256}
				/>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div>
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                    </time>
                    <a
                        href={slugify(post.category.title)}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                        {post.category.title}
                    </a>
                </div>
                <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={slugify(post.title)}>
                            <span className="absolute inset-0" />
                            {post.title}
                        </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                        {post.description}
                    </p>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                        <Image
                            src={post.author.imageUrl}
                            alt={post.title}
                            className="h-10 w-10 rounded-full bg-gray-50"
                            width={40}
                            height={40}
                        />
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a href={post.author.href}>
                                    <span className="absolute inset-0" />
                                    {post.author.name}
                                </a>
                            </p>
                            <p className="text-gray-600">{post.author.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
