import dynamic from 'next/dynamic';
const MarkdownIt = require('markdown-it');
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  },
});
export default function() {
  return (
    <div>
      <MdEditor value="# Hello" renderHTML={data => mdParser.render(data)} />
    </div>
  );
}
