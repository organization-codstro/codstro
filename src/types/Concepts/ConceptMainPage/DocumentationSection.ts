interface Site {
  name: string;
  url: string;
  desc: string;
}

interface DocCategory {
  category: string;
  sites: Site[];
}

export interface DocumentationSectionProps {
  data: DocCategory[];
}
