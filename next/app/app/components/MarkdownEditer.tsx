'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  title: string,
  tag: string[],
  content: string
}

export default function MarkdownEditor({title: props_title, tag: props_tag, content}: Props) {
  const [markdown, setMarkdown] = useState<string>(content);
  const [title, setTitle] = useState<string>(props_title)
  const [tag, setTag] = useState<string[]>(props_tag)
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col">
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