export function formatStringToArray(str:string):string[] {
    if (!str) return [];
    return str.split(',').map(item => item.trim()).filter(item => item.length > 0);
}
export const parseMarkdown = (text:string) :string => {
    const html = text
      // Headings
      .replace(/^# (.*$)/gim, '<h1 style="color:#4ADE80;">$1</h1>')
      // Lists
      .replace(/^[-*] (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gims, '<ul style="list-style-type: disc; margin-left: 1.5rem;">$1</ul>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong style="color:#FACC15;">$1</strong>')
      // Italic
      .replace(/_(.*?)_/gim, '<em style="color:#38BDF8;">$1</em>')
      // Inline code
      .replace(/`(.*?)`/gim, '<code style="background:#1e293b; color:#93c5fd; padding:2px 4px; border-radius:4px;">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color:#C084FC;" target="_blank">$1</a>')
      // Paragraphs (lines not already handled)
      .replace(/^(?!<(h1|ul|li|p|code|strong|em|a))(.+)/gm, '<p>$2</p>')
      // Line breaks
      .replace(/\n/g, '<br>')

    return html
  }