import Input from "@/components/search";
import SortableNoteList from "@/components/SortableNotes";
import { Button } from "@/components/ui/button";
import { getNotes } from "@/lib/actions/notes";
import Link from "next/link";

export const revalidate = 0;

// Use this type for searchParams — no Promise here!
type SearchParams = Record<string, string | string[] | undefined>;

const page = async (props: {
     searchParams?: Promise<{
       query?: string;
       page?: string;
     }> | undefined;
   }) => {
  // Normalize query to a string safely
  const query = Array.isArray(props.searchParams?.query)
    ? props.searchParams?.query[0] ?? ""
    : props.searchParams?.query ?? "";

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch notes" };
    }
  };

  const data = await fetchNotes();

  if (data?.error && data.error !== "none") {
    return (
      <div className="flex items-center flex-col gap-4">
        <Input />
        <p>Error fetching notes: {data.error}</p>
        <Button>
          <Link href={"/notes/new"}>Create new notes</Link>
        </Button>
      </div>
    );
  }

  const unfilteredNotes = data?.data || [];

  const notes = query
    ? unfilteredNotes.filter(
        (note: { title: string; subtitle: string; tags: string }) =>
          note.title.includes(query) ||
          note.subtitle.includes(query) ||
          note.tags.includes(query)
      )
    : unfilteredNotes;

  if (notes.length === 0) {
    return (
      <div className="flex items-center flex-col gap-4">
        <Input />
        <p>{query ? "Searched note is not there" : "No notes found"}</p>
        <Button>
          <Link href={"/notes/new"}>Create new notes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Notes</h1>
      <Input />
      <SortableNoteList notes={notes} />
    </div>
  );
};

export default page;
