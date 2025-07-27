export type Note = {
    id: string;
    userId: string;
    title: string;
    subtitle: string | null;
    createdAt: Date | null;
    description: string;
    tags: string;
}