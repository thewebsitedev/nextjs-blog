export type Post = {
    postid: string; // created on the database side
    title: string;
    slug: string; // created using slugify on title
    summary: string; // created using the first 100 characters of content
    featuredimage: string; // optional
    createdat: Date;
    updatedat: Date;
    category: string;
    content: string;
    status: "published" | "draft" | "archived";
    userid: string;
};

export type User = {
    userid: string;
    name: string;
    email: string;
    password: string;
};

export type Category = {
    categoryid: string;
    name: string;
    description: string;
};

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        title?: string[];
        content?: string[];
        status?: string[];
    };
    message?: string | null;
};

// This is temporary until @types/react-dom is updated
export type UserState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};
