'use client'
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  id: number,
  title: string,
  tag: string[],
  content: string
}

interface Note {
  id: number,
  content: string
}

export default function MarkdownEditor({id: props_id, title: props_title, tag: props_tag, content}: Props) {
  const [markdown, setMarkdown] = useState<string>(content);
  const [title, setTitle] = useState<string>(props_title)
  const [tag, setTag] = useState<string[]>(props_tag)
  const [showPreview, setShowPreview] = useState<boolean>(true);
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ id: props_id, content: event.target.value }));
    }
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };


  const ws = useRef<WebSocket | null>(null)
  const [session, setSession] = useState<Note | "">("")
  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/note/${props_id}/ws`)

    ws.current.onopen = () => {
      console.log("open")
    }

    ws.current.onmessage = (event) => {
      setSession(event.data)
    }

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current?.close();
    };
  }, [])

  const sendMessage = (message: string) => {
    console.log(message)
    if (ws.current) {
      ws.current.send(message);
    }
  };


  return (
    <div className="container mx-auto h-screen flex flex-col">
    <button onClick={() => sendMessage('Hello WebSocket!')}>Send Message</button>
      <div className='flex'>
        <input className='w-full p-2 m-2 rounded' value={title}  onChange={titleChange}/>
        <button
          onClick={togglePreview}
          className="bg-blue-500 text-white rounded self-start"
        >
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </button>
      </div>
      <div>
        {/* {tag.map((value, index) => (
         <input className='w-full p-2 m-2 rounded' key={index} value={value}/>
        ))} */}
      </div>
      <div className="flex flex-1 space-x-4">
      <textarea 
        className={`p-2 m-2 h-full border border-gray-300 rounded resize-none ${showPreview ? "w-1/2" : 'w-full'}`}
        value={markdown}
        onChange={handleChange}
      />
      {showPreview && (
        <div className="p-2 m-2 h-full w-1/2 border border-gray-300 rounded overflow-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      )}
      </div>
    </div>
  );
}