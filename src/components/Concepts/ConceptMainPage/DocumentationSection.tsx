//공식 문서 링크 리스트

import { ExternalLink } from "lucide-react";
import { DocumentationSectionProps } from "../../../types/Concepts/ConceptMainPage/DocumentationSection";

export default function DocumentationSection({
  data,
}: DocumentationSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <ExternalLink className="w-6 h-6" style={{ color: "#587CF0" }} />
        <h2 className="text-2xl font-bold text-gray-900">
          Documentation Resources
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.map((section, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border border-gray-200 rounded-lg"
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {section.category}
            </h3>
            <div className="space-y-3">
              {section.sites.map((site, sIdx) => (
                <a
                  key={sIdx}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <div className="mb-1 font-medium text-gray-900">
                    {site.name}
                  </div>
                  <div className="text-sm text-gray-600">{site.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
