import { ExternalLink, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { recommendedConcepts } from "../../data/Concepts/recommendedConcepts";
import { documentationSites } from "../../data/Concepts/documentationSites";

export default function ConceptMain() {
  const navigate = useNavigate();

  const handleConceptClick = (type: string, id: string) => {
    let viewRoute = "";
    switch (type) {
      case "library":
        viewRoute = `/libraries/${id}`;
        break;
      case "concept":
        viewRoute = `/basic-concepts/${id}`;
        break;
      case "tool":
        viewRoute = `/coding-tools/${id}`;
        break;
      case "service":
        viewRoute = `/third-party/${id}`;
        break;
      default:
        viewRoute = "/concepts";
    }
    navigate(viewRoute);
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Coding Concept Library
        </h1>
        <p className="text-gray-600">
          Learn and organize coding concepts, libraries, and frameworks
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6" style={{ color: "#587CF0" }} />
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended For You
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recommendedConcepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => handleConceptClick(concept.type, concept.id)}
              className="p-5 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
            >
              <div className="mb-2 text-xs text-gray-500">
                {concept.category}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {concept.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {concept.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs text-blue-600 rounded-full bg-blue-50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <ExternalLink className="w-6 h-6" style={{ color: "#587CF0" }} />
          <h2 className="text-2xl font-bold text-gray-900">
            Documentation Resources
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {documentationSites.map((section, idx) => (
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
    </div>
  );
}
