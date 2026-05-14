import { PersonalityInformationSectionProps } from "../../../types/pages/Mbit/PersonalityEncyclopediaDetailPage/PersonalityInformationSection";

export const PersonalityInformationSection = ({
  title,
  info,
}: PersonalityInformationSectionProps) => {
  return (
    <section className="p-6 pt-4 pb-4 rounded-xl">
      <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
        {title}
      </h3>
      <p className="text-gray-700">{info}</p>
    </section>
  );
};
