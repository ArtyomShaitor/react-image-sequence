import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeString = `import ImageSequence, { usePreloadImages } from "react-image-sequence";

const getImage = index => \`http://example.com/images/\$\{index\}.jpg\`;

const App = () => {
  const containerRef = useRef();
  const \{ images \} = usePreloadImages(getImage, 1, 100);
  
  return (
    <div ref={containerRef} style={{ height: '3000px' }}>
      <ImageSequence
        targetRef={containerRef}
        images={images}
        isFullPage
        isSticky
      />
    </div>
  ); 
}`;

const customStyle = {
  fontSize: '0.875rem',
  background: '#1A1A1A',
  borderRadius: '10px',
  margin: 0,
  height: '100%',
};

const STEPS_TO_LINES: Record<number, number[]> = {
  1: [3, 7, 13],
  2: [6, 11, 12, 14],
  3: [],
}

export function CodeExample({ step }: { step: number }) {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={oneDark}
      showLineNumbers
      customStyle={customStyle}
      wrapLines
      lineProps={lineNumber => {
        let style = {
          background: '#1A1A1A',
          transition: 'background-color 0.3s ease'
        };

        if (!STEPS_TO_LINES[step]) return { style };

        if (STEPS_TO_LINES[step].includes(lineNumber)) {
          // @ts-ignore
          style.background = '#383838';
        }

        return { style };
      }}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}
