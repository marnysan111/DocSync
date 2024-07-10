import Link from "next/link"

type Props = {
    id: number,
    title: string,
    tag:  string[]
}

export default async function NoteCard({id, title, tag}: Props) {
    const url = "/notes/" + id
    return (
    <Link href={url}>
    <div className="max-w-sm h-40 p-5 m-2 bg-white border border-gray-200 rounded-lg shadow hover:scale-105">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
    {tag.map((value, index)=>(
        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {value}
        </span>
    ))}
    </div>
    </Link>

    )
}