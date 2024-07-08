'use client'
import { useEffect, useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}


export default function Note({ params }: { params: { id: string }}) {
  const id = params.id;
  const [note, setNote] = useState<Note | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    if (id) {
      fetch("http://localhost:8080/api/note/${id}", { cache: "no-store" })
        .then(res => res.json())
        .then(data => setNote(data.data));
    }
    console.log(note?.title)
    
    const socket = new WebSocket('ws://localhost:8080/ws');
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const updatedNote: Note = JSON.parse(event.data);
      if (updatedNote.id === parseInt(id, 10)) {
        setNote(updatedNote);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWs(socket);

    return () => socket.close();
  }, [id]);
  if (!note) return <div>Loading...</div>;
  return (
      <main className="">
        {note.title}
      </main>
    );
  }
  