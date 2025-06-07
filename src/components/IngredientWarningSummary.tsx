import styled from "styled-components";
import colors from "../styles/colors";

const Wrapper = styled.div`
  background-color: white;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const Highlight = styled.span`
  color: ${colors.mainPink};
`;

const IngredientList = styled.div`
  display: flex;
  gap: 2.6rem;
  overflow-x: auto;

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const IngredientItem = styled.div`
  flex: 0 0 auto;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const IngredientCircle = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #ddd;
`;

const IngredientName = styled.div`
  font-size: 0.875rem;
  text-align: center;
`;

interface Ingredient {
  name: string;
  image: string;
}

export default function IngredientWarningSummary() {
  const warningData = {
    skinType: "민감성 피부",
    warningIngredients: [
      {
        name: "알레르기 유발",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHQgcsUecY-ieBX_lFA12lwTXQSy8erIWddF48JeloIANeMRFPVrRYxQW7ZATLPsEcWw&usqp=CAU",
      },
      {
        name: "성분 이름",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHQgcsUecY-ieBX_lFA12lwTXQSy8erIWddF48JeloIANeMRFPVrRYxQW7ZATLPsEcWw&usqp=CAU",
      },
      {
        name: "성분 이름",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHQgcsUecY-ieBX_lFA12lwTXQSy8erIWddF48JeloIANeMRFPVrRYxQW7ZATLPsEcWw&usqp=CAU",
      },
      {
        name: "성분 이름",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHQgcsUecY-ieBX_lFA12lwTXQSy8erIWddF48JeloIANeMRFPVrRYxQW7ZATLPsEcWw&usqp=CAU",
      },
      {
        name: "성분 이름",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHQgcsUecY-ieBX_lFA12lwTXQSy8erIWddF48JeloIANeMRFPVrRYxQW7ZATLPsEcWw&usqp=CAU",
      },
    ],
  };

  const { skinType, warningIngredients } = warningData;

  return (
    <Wrapper>
      <Title>
        <Highlight>{skinType}</Highlight> 주의 성분 요약
      </Title>
      <IngredientList>
        {warningIngredients.map((item: Ingredient, idx: number) => (
          <IngredientItem key={idx}>
            <IngredientCircle src={item.image} alt={item.name} />
            <IngredientName>{item.name}</IngredientName>
          </IngredientItem>
        ))}
      </IngredientList>
    </Wrapper>
  );
}
