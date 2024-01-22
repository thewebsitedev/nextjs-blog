export type Post = {
	postid: string; // created on the database side
    title: string;
    slug: string; // created using slugify on title
    summary: string; // created using the first 100 characters of content
    featuredimage: string; // optional
    createdat: Date;
    category: string;
    content: string;
    status: 'published' | 'draft' | 'archived';
    userid: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Category = {
    categoryid: string;
    name: string;
    description: string;
}