import styled from "styled-components";
import Header from "../../components/common/Header";
import TextIconHeader from "../../components/common/TextIconHeader ";
import { useNavigate, useParams } from "react-router-dom";
import categories from "../../data/categories.json";
import colors from "../../styles/colors";
import { useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import SortedModal from "../../components/model/SortedModal";
import { useLocale } from "../../context/LanguageContext";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const SubCategoryList = styled.div`
  overflow-x: auto;
  width: 100%;

  // 스크롤바 안 보이게
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const SubCategoryUl = styled.ul`
  display: flex;
  width: max-content;
  margin-top: 0.5rem;
  flex-wrap: nowrap;
`;

const SubCategoryLi = styled.li<{ $selected: boolean }>`
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  padding: 0.5rem;
  border-bottom: ${({ $selected }) => ($selected ? "2px solid black" : "none")};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
`;

const SortOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: end;
  margin-top: 1rem;
`;

const SortValue = styled.div`
  font-size: 0.875rem;
  color: ${colors.darkGrey};
`;

export default function CategoryList() {
  const { t } = useLocale();
  const { categoryName, subcategoryName } = useParams();

  const decodedCategory = decodeURIComponent(categoryName || "");
  const decodedSubcategory = decodeURIComponent(subcategoryName || "");

  const selectedCategory = t.category.categoryname.find(
    (cat: { name: string; items: string[] }) => cat.name === decodedCategory
  );

  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState(
    t.category.sorted.recommended ?? "Recommended"
  );
  const [openModal, setOpenModal] = useState(false);

  const handleShowSorts = () => {
    setOpenModal(true);
  };

  return (
    <Wrap>
      <Header />
      <TextIconHeader pageName={decodedCategory} />
      <SubCategoryList>
        <SubCategoryUl>
          {selectedCategory?.items.map((item: string) => (
            <SubCategoryLi
              $selected={item === decodedSubcategory}
              onClick={() =>
                navigate(
                  `/category/${encodeURIComponent(
                    decodedCategory
                  )}/${encodeURIComponent(item)}`
                )
              }
            >
              {item}
            </SubCategoryLi>
          ))}
        </SubCategoryUl>
      </SubCategoryList>
      <SortOptions onClick={handleShowSorts}>
        <SortValue>{selectedSort}</SortValue>
        <VscChevronDown fontSize={"1.2rem"} />
      </SortOptions>
      <div></div>
      {openModal && (
        <SortedModal
          closeModal={() => setOpenModal(false)}
          selectedSort={selectedSort}
          onSelectedSort={(sort) => {
            setSelectedSort(sort);
            setOpenModal(false);
          }}
        />
      )}
    </Wrap>
  );
}
