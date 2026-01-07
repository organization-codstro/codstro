import { useNavigate } from "react-router-dom";
import { services } from "../../data/Concepts/thirdPartyServices";
import ConceptListHeader from "../../components/Concepts/ConceptListHeader";
import ConceptSearchBar from "../../components/Concepts/ConceptSearchBar";
import ConceptGrid from "../../components/Concepts/ConceptGrid";
import ThirdPartyCard from "../../components/Concepts/ThirdPartyListPage/ThirdPartyCard";


export default function ThirdPartyList() {
  const navigate = useNavigate();

  const handleServiceClick = (id: string) => {
    navigate(`/third-partys/${id}`);
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* 1. 헤더 섹션 */}
      <ConceptListHeader
        title="Third-party Services"
        description="External services to enhance your applications"
      />

      {/* 2. 검색 및 필터 바 */}
      <ConceptSearchBar
        onSearchChange={(val) => console.log("Service Search:", val)}
        onFilterClick={() => console.log("Service Filter Click")}
      />

      {/* 3. 서비스 카드 그리드 리스트 */}
      <ConceptGrid>
        {services.map((service) => (
          <ThirdPartyCard
            key={service.id}
            id={service.id}
            name={service.name}
            description={service.description}
            category={service.category}
            tags={service.tags}
            onClick={handleServiceClick}
          />
        ))}
      </ConceptGrid>
    </div>
  );
}
