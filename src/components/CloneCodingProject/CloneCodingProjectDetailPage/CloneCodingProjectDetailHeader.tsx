import { Bookmark, BookmarkCheck, Pencil, Trash2 } from "lucide-react";
import { CloneCodingProjectDetailHeaderProps } from "../../../types/pages/CloneCodingProject/CloneCodingProjectDetailPage/CloneCodingProjectDetailHeader";
import CloneCodingProjectImg from "../../../assets/images/CloneCodingProject/CloneCodingProjectBasicImg.png";

export const ProjectDetailHeader = (
  props: CloneCodingProjectDetailHeaderProps,
) => {
  return (
    <div>
      <div className="h-64 overflow-hidden bg-gray-200">
        <img
          src={props.thumbnailUrl ? props.thumbnailUrl : CloneCodingProjectImg}
          alt={props.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-start justify-between">
        <div className="w-[70%] pt-8 pl-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {props.title}
          </h1>
          <p className="text-gray-600 break-words whitespace-normal">
            {props.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 pt-8 pr-6">
          <div className="flex gap-2">
            <button
              onClick={props.onEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6de8] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              수정
            </button>
            <button
              onClick={props.onDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              삭제
            </button>
          </div>

          <button
            onClick={props.onToggleBookmark}
            className="p-2 transition-all rounded-lg"
          >
            {props.isBookmarked ? (
              <BookmarkCheck className="w-12 h-12 text-yellow-500" />
            ) : (
              <Bookmark className="w-12 h-12 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
