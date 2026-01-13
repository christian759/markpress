export interface Post {
    id: string; // or number, depending on backend. Assuming string/UUID for now based on common patterns
    title: string;
    slug: string;
    content: string; // Markdown content
    html_content?: string; // Pre-rendered HTML if backend provides it
    author: {
        username: string;
        // Add avatar or other fields if needed
    };
    created_at: string;
    updated_at: string;
    published: boolean;
}

export interface User {
    username: string;
    email: string;
    token?: string;
}
