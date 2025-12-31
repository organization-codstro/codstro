import React, { useState } from "react";
import {
  Star,
  ExternalLink,
  Filter,
  Search,
  Tag,
  BookOpen,
  Code,
  Smartphone,
  Server,
  Gamepad2,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import {
  extendedRecommendedPins,
  fieldTypeColors,
} from "../../data/woomoonjeong/woomoonjeongData";


const fieldTypeIcons = {
  web: Code,
  app: Smartphone,
  server: Server,
  game: Gamepad2,
  security: Shield,
  work: Briefcase,
  other: HelpCircle,
};

const RecommendedDocumentsMain: React.FC = () => {
  const [selectedFieldType, setSelectedFieldType] = useState<
    "all" | "web" | "app" | "server" | "game" | "security" | "work" | "other"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPins, setSavedPins] = useState<Set<string>>(new Set());

 

  const filteredPins = extendedRecommendedPins.filter((pin) => {
    // Filter by field type
    if (selectedFieldType !== "all" && pin.field_type !== selectedFieldType)
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !pin.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pin.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pin.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false;

    return true;
  });

  const toggleSavePin = (pinId: string) => {
    const newSavedPins = new Set(savedPins);
    if (newSavedPins.has(pinId)) {
      newSavedPins.delete(pinId);
    } else {
      newSavedPins.add(pinId);
    }
    setSavedPins(newSavedPins);

    // In real app, this would make an API call to save/unsave the pin
    console.log(
      "Toggle save pin:",
      pinId,
      newSavedPins.has(pinId) ? "saved" : "unsaved"
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Documents
            </h1>
            <p className="text-gray-600">
              Discover curated learning resources and save them to your
              collection
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Field Type:
              </span>
              {(
                [
                  "all",
                  "web",
                  "app",
                  "server",
                  "game",
                  "security",
                  "work",
                  "other",
                ] as const
              ).map((fieldType) => {
                const IconComponent =
                  fieldType !== "all" ? fieldTypeIcons[fieldType] : BookOpen;
                return (
                  <button
                    key={fieldType}
                    onClick={() => setSelectedFieldType(fieldType)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedFieldType === fieldType
                        ? "bg-[#587CF0] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    {fieldType}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-xl font-semibold text-gray-800">
                  {extendedRecommendedPins.length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Saved</p>
                <p className="text-xl font-semibold text-gray-800">
                  {savedPins.size}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Code className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Web Development</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    extendedRecommendedPins.filter(
                      (p) => p.field_type === "web"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile Development</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    extendedRecommendedPins.filter(
                      (p) => p.field_type === "app"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPins.map((pin) => {
            const IconComponent = fieldTypeIcons[pin.field_type];
            const isSaved = savedPins.has(pin.id);

            return (
              <div
                key={pin.id}
                className="overflow-hidden transition-shadow bg-white border border-purple-100 shadow-sm rounded-xl hover:shadow-md"
                onClick={() => navigator}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          pin.field_type === "web"
                            ? "bg-red-100"
                            : pin.field_type === "app"
                            ? "bg-orange-100"
                            : pin.field_type === "server"
                            ? "bg-yellow-100"
                            : pin.field_type === "game"
                            ? "bg-green-100"
                            : pin.field_type === "security"
                            ? "bg-blue-100"
                            : pin.field_type === "work"
                            ? "bg-indigo-100"
                            : "bg-purple-100"
                        }`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${
                            pin.field_type === "web"
                              ? "text-red-600"
                              : pin.field_type === "app"
                              ? "text-orange-600"
                              : pin.field_type === "server"
                              ? "text-yellow-600"
                              : pin.field_type === "game"
                              ? "text-green-600"
                              : pin.field_type === "security"
                              ? "text-blue-600"
                              : pin.field_type === "work"
                              ? "text-indigo-600"
                              : "text-purple-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {pin.title}
                        </h3>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full border mt-1 ${
                            fieldTypeColors[pin.field_type]
                          }`}
                        >
                          {pin.field_type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSavePin(pin.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isSaved
                          ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                          : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
                      }`}
                      title={
                        isSaved ? "Remove from saved" : "Save to my documents"
                      }
                    >
                      <Star
                        className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {pin.description}
                  </p>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    {pin.difficulty && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(
                          pin.difficulty
                        )}`}
                      >
                        {pin.difficulty}
                      </span>
                    )}
                    {pin.rating && (
                      <div className="flex items-center gap-1">
                        {renderStars(pin.rating)}
                        <span className="text-xs text-gray-500">
                          ({pin.rating})
                        </span>
                      </div>
                    )}
                    {pin.views && (
                      <span className="text-xs text-gray-500">
                        {pin.views} views
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {pin.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                        >
                          <Tag className="w-2 h-2" />
                          {tag}
                        </span>
                      ))}
                      {pin.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                          +{pin.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={pin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white text-sm rounded-lg hover:bg-[#4a6de8] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit
                    </a>
                    <span className="text-xs text-gray-500">
                      {new Date(pin.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPins.length === 0 && (
          <div className="p-12 text-center bg-white border border-purple-100 shadow-sm rounded-xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              No documents found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedDocumentsMain;
