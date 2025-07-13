import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button, ToggleSwitch, Spinner } from 'flowbite-react';

const BlogEditor = ({ text, setText }) => {
  const [showHtml, setShowHtml] = useState(false);
  const quillRef = useRef();

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }, { size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background'
  ];

 
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Blog Editor</h2>
        <ToggleSwitch
          checked={showHtml}
          label="Show HTML"
          onChange={() => setShowHtml(!showHtml)}
        />
      </div>

      {showHtml ? (
        <textarea
          className="w-full h-72 p-3 border border-gray-300 rounded-md font-mono text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={text}
          onChange={setText}
          modules={modules}
          formats={formats}
          placeholder="Write your blog..."
          className="h-100 mb-18"
        />
      )}

    </div>
  );
};

export default BlogEditor;
