export interface ContentTypeFilterProps {
  contentType: "documents" | "fields";
  onChange: (type: "documents" | "fields") => void;
}
