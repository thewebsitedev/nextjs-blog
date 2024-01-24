import { fetchCategories, fetchPostCategories } from "@/app/lib/data";
import { Category } from "@/app/lib/types";

export default async function InputCategory({ postid }:{
    postid: string | null
}) {
    // combine the two fetches into one
    const [categories, postCategories] = await Promise.all([
        fetchCategories(),
        postid ? fetchPostCategories(postid) : [],
    ]);
    let selected: string[] = [];

    if (postid) {
        selected = postCategories.map((category) => category.categoryid);
    }

    return (
        <div className="col-span-full">
            <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Category
            </label>
            <div className="mt-2">
                <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    multiple
                    size={5}
                    defaultValue={selected}
                >
                    {categories.map((category) => (
                        <option key={category.categoryid} value={category.categoryid}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}