import MarkdownEditor from "@/app/components/MarkdownEditer";
import NoteEdit from "@/app/components/NoteEdit";

interface Note {
  ID:      number;
  Title:   string;
  Tag:     string[];
  Content: string;
}

interface Response {
  result: string,
  message: string,
  data: Note
}

export default async function Note({ params }: { params: { id: string }}) {
  const id = params.id;
  const res = await fetch("http://go:8080/api/note/"+id, { cache: 'no-store' })
  const response: Response = await res.json()
  return (
    <div>
      <MarkdownEditor 
        title={response.data.Title}
        tag={response.data.Tag}
        content={response.data.Content}
      />
    </div>
  )
}