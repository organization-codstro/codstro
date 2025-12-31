interface ReactMarkdownProps {
  content: string;
}

export default function ReactMarkdown({ content }: ReactMarkdownProps) {
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let inList = false;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1 my-3">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="text-xl font-bold text-gray-900 mt-5 mb-2">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={idx} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {line.substring(4)}
          </h3>
        );
      } else if (line.match(/^\d+\.\s+\*\*/)) {
        flushList();
        const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*:\s*(.+)$/);
        if (match) {
          elements.push(
            <div key={idx} className="my-2">
              <span className="font-semibold text-gray-900">{match[1]}:</span>{' '}
              <span className="text-gray-700">{match[2]}</span>
            </div>
          );
        }
      } else if (line.startsWith('- ')) {
        inList = true;
        listItems.push(line.substring(2).replace(/\*\*(.+?)\*\*/g, '$1'));
      } else if (line.trim() === '') {
        flushList();
      } else if (line.trim() !== '') {
        flushList();
        const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p key={idx} className="text-gray-700 my-2" dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      }
    });

    flushList();
    return elements;
  };

  return <div className="markdown-content">{renderContent(content)}</div>;
}
