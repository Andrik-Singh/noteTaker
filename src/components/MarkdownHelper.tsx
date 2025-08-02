import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const MarkdownHelper = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button>Open Markdown Helper</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] md:w-[400px]">
          <code>Enter # for h1 heading ,## for h2 heading</code>
          <br />
          <code>Wrap your words over *italic* and **bold**</code> <br />
          <code>Write - or 1 for lists</code> <br />
          <code>Use [text](link) for links</code> <br />
          <code>Use ![alt text](image link) for images</code> <br />
          <code>Use `code` for inline code</code>
          <code>
            For tables :
            <br />| Column 1 | Column 2 | Column 3 |
            <br />
            |----------|----------|----------| 
            <br />
            | Row 1 | Data | More | 
            <br />
            | Row 2 | More | Data |
          </code>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MarkdownHelper;
