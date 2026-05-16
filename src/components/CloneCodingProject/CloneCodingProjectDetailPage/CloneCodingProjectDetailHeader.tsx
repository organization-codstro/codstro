import { Bookmark, BookmarkCheck } from "lucide-react";
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

        <div className="pt-8 pr-6">
          <button
            onClick={props.onToggleBookmark}
            className="flex-shrink-0 p-2 pr-6 transition-all rounded-lg "
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
