import { Search } from "lucide-react";

type EmptySearchStateProps = {
  searchQuery: string;
};

export const EmptySearchState = ({ searchQuery }: EmptySearchStateProps) => (
  <div className="py-12 text-center">
    <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
    <p className="text-gray-500">'{searchQuery}'에 대한 결과가 없습니다</p>
  </div>
);
