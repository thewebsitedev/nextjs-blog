import { fetchPostCategories } from "../lib/data";
import Image from "next/image";
import { Post } from "@/app/lib/types";
import slugify from "react-slugify";
import moment from "moment";
import Markdown from 'react-markdown'

export default async function Card({ post }: { post: Post}) {
    const categories = await fetchPostCategories(post.postid);
    return (
        <article
            key={post.postid}
            className="relative isolate flex flex-col gap-4 sm:gap-8 lg:flex-row"
        >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
				<Image
					src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
					alt=""
					className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
					width={256}
					height={256}
				/>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div>
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.createdat.toISOString()} className="text-gray-500">
                        {moment(post.createdat).format('MMM D')}
                    </time>
                    {
                        categories.map((category) => (
                            <a
                                key={category.categoryid}
                                href={slugify(category.name)}
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                            >
                                {category.name}
                            </a>
                        ))
                    }
                </div>
                <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={slugify(post.title)}>
                            <span className="absolute inset-0" />
                            {post.title}
                        </a>
                    </h3>
                    <div className="min-h-[48px] mt-5 text-sm leading-6 text-gray-600">
                        <Markdown>{post.summary}</Markdown>
                    </div>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                        <Image
                            src={`https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                            alt={post.title}
                            className="h-10 w-10 rounded-full bg-gray-50"
                            width={40}
                            height={40}
                        />
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a href={``}>
                                    <span className="absolute inset-0" />
                                    Michael Foster
                                </a>
                            </p>
                            <p className="text-gray-600">Co-Founder / CTO</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
