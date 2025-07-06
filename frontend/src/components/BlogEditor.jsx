import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const BlogEditor = ({text,setText}) => {

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
      <ReactQuill
        theme="snow"
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
        placeholder='Write your blog'
        className="h-72 mb-15"
      />
  );
};

export default BlogEditor;
