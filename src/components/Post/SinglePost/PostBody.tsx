import React from "react";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  text: string;
}

const renderers = {
  code: ({ language, value }: { language: string; value: React.ReactNode }) => {
    return (
      <SyntaxHighlighter style={dracula} language={language} children={value} />
    );
  },
};

const PostBody: React.FC<Props> = ({ text }) => {
  return (
    <Card.Body className="pl-4 pt-2 ml-1">
      <ReactMarkdown renderers={renderers} plugins={[gfm]} children={text} />
    </Card.Body>
  );
};

export default PostBody;
