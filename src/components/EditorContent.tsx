"use client"

import { useRef, useImperativeHandle, forwardRef } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false
});

const EditorContent = forwardRef(({ onChange, value }: { onChange: (val: string) => void, value: string }, ref) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);


  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.getContent() ?? ""
  }));

  return (
    <Editor
      apiKey='bz3urjzlizvtdzbphi5hwa07np43jrclcx5zh1eerq72cobg'
      onInit={(_evt, editor) => editorRef.current = editor}
      initialValue={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 500,
        menubar: false,
        language: 'pt_BR',
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
});

EditorContent.displayName = 'EditorContent';
export default EditorContent;
