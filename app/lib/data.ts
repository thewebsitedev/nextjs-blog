import { sql } from "@vercel/postgres";
import { User, Post, Category } from "./types";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;
const ARTICLES_PER_PAGE = 6;

// fetch user by email
export async function getUser(email: string | undefined | null) {
    try {
        // run query to get user
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        // return user
        return user.rows[0] as User;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

// fetch user by id
export async function getUserById(id: string | undefined | null) {
    try {
        // run query to get user
        const user = await sql`SELECT * FROM users WHERE userid=${id}`;
        // return user
        return user.rows[0] as User;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

// get a user's latest posts
export async function fetchLatestPosts(userId: string) {
    // disable caching
    noStore();

    try {
        // run query to get user's latest posts
        const data = await sql<Post>`
        SELECT *
        FROM posts
        WHERE posts.userid = ${userId}
        ORDER BY posts.createdat DESC
        LIMIT ${ITEMS_PER_PAGE}`;

        // return user's latest posts
        const latestPosts = data.rows;
        return latestPosts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest posts.");
    }
}

// get single post by post id
export async function fetchPostById(postId: string) {
    // disable caching
    noStore();

    try {
        // run query to get post
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.featuredimage,
            posts.content,
            posts.status,
            posts.slug
        FROM posts
        WHERE posts.postid = ${postId};`;

        // return post
        const post = data.rows[0];
        return post;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the post.");
    }
}

// get all categories
export async function fetchCategories() {
    // disable caching
    noStore();

    try {
        // run query to get categories
        const data = await sql<Category>`
        SELECT
            categories.categoryid,
            categories.name,
            categories.description
        FROM categories`;

        // return categories
        const categories = data.rows;
        return categories;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch categories.");
    }
}

/**
 * Get all published posts
 *
 * @param count posts limit
 * @returns Array array of posts
 */
export async function fetchPosts(count: number | null) {
    // disable caching
    noStore();

    try {
        // run query to get posts
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.slug,
            posts.content,
            posts.createdAt,
            posts.updatedAt,
            posts.userid
        FROM posts
        WHERE posts.status = 'published'
        ORDER BY posts.createdat DESC
        LIMIT ${count}`;

        // return posts
        const posts = data.rows;
        return posts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch posts.");
    }
}

// get post by slug
export async function fetchPostBySlug(slug: string) {
    // disable caching
    noStore();

    try {
        // run query to get post
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.summary,
            posts.featuredimage,
            posts.content,
            posts.status,
            posts.createdAt,
            posts.userid
        FROM posts
        WHERE posts.slug = ${slug};`;

        // return post
        const post = data.rows[0];
        return post;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the post.");
    }
}

// get all categories linked to a post
export async function fetchPostCategories(postid: string | null) {
    // disable caching
    noStore();

    try {
        // run query to get post categories
        const data = await sql<Category>`
        SELECT 
            categories.categoryid,
            categories.name,
            categories.description
        FROM categories
        INNER JOIN postcategories ON postcategories.categoryid = categories.categoryid
        WHERE postcategories.postid = ${postid};`;

        // return post categories
        const categories = data.rows;
        return categories;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the post.");
    }
}

// get user's total post count
export async function fetchUserPostsPages(userId: string | undefined) {
    // disable caching
    noStore();

    try {
        // run query to get post categories
        const count = await sql`SELECT COUNT(*)
            FROM posts
            WHERE posts.userid = ${userId}
        `;
        // total posts count
        const totalPosts = Number(count.rows[0].count);
        // total pages
        const totalPages = Math.ceil(
            Number(count.rows[0].count) / ITEMS_PER_PAGE
        );

        return {
            totalPages,
            totalPosts,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of user's posts.");
    }
}

// get user's paginated posts
export async function fetchUserPaginatedPosts(
    userId: string | undefined,
    query: string,
    currentPage: number
) {
    // disable caching
    noStore();
    // page offset
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        // run query to get user's paginated posts
        const posts = await sql<Post>`
        SELECT
            posts.postid,
            posts.title,
            posts.createdat,
            posts.status
        FROM posts
        WHERE
            posts.userid = ${userId}
        ORDER BY posts.createdat DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        // return posts
        return posts.rows;

    } catch ( error ) {

        console.error( "Database Error:", error );
        throw new Error( "Failed to fetch posts." );

    }
}

// get total number of posts for a search term
export async function fetchPostsPages( query: string ) {
    // disable caching
    noStore();

    try {
        // run query
        const count = await sql`SELECT COUNT(*)
        FROM posts
        WHERE 
            posts.status = 'published' AND (
            LOWER(posts.title) ILIKE LOWER(${`%${query}%`}) OR 
            LOWER(posts.summary) ILIKE LOWER(${`%${query}%`}) OR
            LOWER(posts.content) ILIKE LOWER(${`%${query}%`})
        )
    `;
        // total posts count
        const totalPosts = Number(count.rows[0].count);
        // total pages
        const totalPages = Math.ceil(
            Number(count.rows[0].count) / ARTICLES_PER_PAGE
        );

        return {
            totalPages,
            totalPosts,
        };
    } catch ( error ) {

        console.error( "Database Error:", error );
        throw new Error( "Failed to fetch total number of invoices." );

    }
}

// get paginated posts for a search term
export async function fetchPaginatedPosts(
    query: string,
    currentPage: number
) {
    // disable caching
    noStore();
    // page offset
    const offset = (currentPage - 1) * ARTICLES_PER_PAGE;

    try {
        // run query, find term in title and content
        const posts = await sql<Post>`
            SELECT
                posts.postid,
                posts.title,
                posts.summary,
                posts.createdat,
                posts.status,
                posts.userid
            FROM posts
            WHERE
                posts.status = 'published' AND (
                LOWER(posts.title) ILIKE LOWER(${`%${query}%`}) OR
                LOWER(posts.content) ILIKE LOWER(${`%${query}%`})
                )
            ORDER BY posts.createdat DESC
            LIMIT ${ARTICLES_PER_PAGE} OFFSET ${offset}
        `;
        // return posts
        return posts.rows;

    } catch ( error ) {

        console.error( "Database Error:", error );
        throw new Error( "Failed to fetch posts." );

    }
}
