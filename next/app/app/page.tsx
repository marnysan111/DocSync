import NoteCard from "./components/NoteCard";

interface Note {
  ID: number,
  Title: string,
  Tag: string[]
}

interface Response {
  data: Note[],
  message: string,
  result: string
}

export default async function Home() {
  const response = await getNote()
  return (
    <main className="">
      <div className="grid grid-cols-4">
      {response.data.map((value, index)=>(
        <div key={index} className="">
          <NoteCard
            id={value.ID}
            title={value.Title}
            tag={value.Tag}
          />
        </div>
      ))}
      </div>
    </main>
  );
}


const getNote = async () => {
  const res = await fetch("http://go:8080/api/notes", { cache: "no-store" })
  const response: Response = await res.json()
  return response
}