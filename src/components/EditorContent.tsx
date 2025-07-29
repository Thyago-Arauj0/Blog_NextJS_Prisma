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
      value={value}
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
        content_style: `
          body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            padding: 10px;
          }
          p {
            margin: 0 0 16px 0;
          }
          h1, h2, h3, h4, h5, h6 {
            margin: 24px 0 16px 0;
            font-weight: bold;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          ul, ol {
            margin: 0 0 16px 0;
            padding-left: 30px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 16px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
        `,
        // Garante que o HTML gerado seja semântico e limpo
        valid_elements: '*[*]',
        valid_styles: {
          '*': 'color,text-align,font-size,font-weight,font-style,text-decoration,float,margin,margin-top,margin-right,margin-bottom,margin-left,padding,padding-top,padding-right,padding-bottom,padding-left'
        },
        // Remove span's desnecessários
        extended_valid_elements: 'span[!class]',
        convert_fonts_to_spans: false,
        // Mantém classes importantes
        keep_styles: true,
      }}
    />
  );
});

EditorContent.displayName = 'EditorContent';
export default EditorContent;