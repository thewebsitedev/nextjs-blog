import { MetadataRoute } from "next";
import { fetchPosts } from "@/app/lib/data";
import { BASE_URL } from "@/app/lib/constants";

// This function is called at build time to generate the list of sitemaps
export async function generateSitemaps() {
    return [{ id: 0 }, { id: 1 }, { id: 2 }];
}

// This function is called at build time to generate the sitemap for the given sitemap id
export default async function sitemap({
    id,
}: {
    id: number;
}): Promise<MetadataRoute.Sitemap> {
    // Fetch posts from db
    const posts = await fetchPosts(null);
    if (id === 2) {
        // Return list of dynamic post routes 
        return posts.map((post) => ({
            url: `${BASE_URL}${post.slug}`,
            lastModified: post.updatedat.toISOString(),
            changeFrequency: "daily",
            priority: 1,
        }));
    } else if (id === 1) {
        // Return list of static page routes
        return [
            {
                url: `${BASE_URL}`,
                lastModified: new Date().toISOString(),
                changeFrequency: "daily",
                priority: 1,
            },
            {
                url: `${BASE_URL}about`,
                lastModified: new Date().toISOString(),
                changeFrequency: "monthly",
                priority: 0.5,
            },
            {
                url: `${BASE_URL}contact`,
                lastModified: new Date().toISOString(),
                changeFrequency: "monthly",
                priority: 0.5,
            },
            {
                url: `${BASE_URL}login`,
                lastModified: new Date().toISOString(),
                changeFrequency: "monthly",
                priority: 0.5,
            },
        ];
    } else {
        // Return index page
        return [
            {
                url: `${BASE_URL}`,
                lastModified: new Date().toISOString(),
                changeFrequency: "daily",
                priority: 1,
            },
        ];
    }
}
