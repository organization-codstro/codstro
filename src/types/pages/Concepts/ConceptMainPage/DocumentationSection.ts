interface Site {
  name: string;
  url: string;
  desc: string;
}

interface Documentation {
  category: string[];
  sites: Site[];
}

export interface DocumentationSectionProps {
  docSites: Documentation[];
}
