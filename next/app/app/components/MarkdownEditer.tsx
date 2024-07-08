'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string
}

export default function MarkdownEditor({content}: Props) {
  const [markdown, setMarkdown] = useState<string>(content);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <button onClick={togglePreview}>
        hogehoge
      </button>
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