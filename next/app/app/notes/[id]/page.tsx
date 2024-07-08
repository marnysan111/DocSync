import MarkdownEditor from "@/app/components/MarkdownEditer";
import NoteEdit from "@/app/components/NoteEdit";


export default function Note({ params }: { params: { id: string }}) {
  const id = params.id;
  return (
    <div>
      <NoteEdit 
        id={id}
      />
      <MarkdownEditor 
        content="jhoge"
      />
    </div>
  )
}