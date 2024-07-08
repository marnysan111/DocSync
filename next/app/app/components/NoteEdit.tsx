'use client'

import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
interface Props {
    id: string
}

interface Note {
    ID:      number;
    Title:   string;
    Tag:     string[];
    Content: string;
  }

export default function NoteEdit({id}: Props) {
    const [note, setNote] = useState<Note | null>(null);
    useEffect(() => {
        const url = process.env.API_HOST
        fetch("http://localhost:8080/api/note/"+id, { cache: "no-store" })
            .then(res => res.json())
            .then(data => setNote(data.data));
    }, [id])

    if (!note) return <div>Loading...</div>; 
    return (
        <>
        <ReactMarkdown
            
        />
        </>
    )
}