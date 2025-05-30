import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";

const ButtonWrap = styled.button<{ $isActivated: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border: 1px solid
    ${({ $isActivated }) => ($isActivated ? colors.mainPink : colors.lightGrey)};
  border-radius: 1.25rem;
  gap: 0.625rem;
  width: 10rem;
  padding: 1.5rem 0;
`;

const ButtonName = styled.div<{ $isActivated: boolean }>`
  font-size: 1rem;
  color: ${({ $isActivated }) =>
    $isActivated ? colors.mainPink : colors.lightGrey};
  font-weight: ${({ $isActivated }) => ($isActivated ? 700 : 400)};
`;

const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

const Dot = styled.div<{ color: string }>`
  display: flex;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

interface PersonalColorProps {
  buttonName: string;
  colors?: string[];
}

export default function PersonalColorButton({
  buttonName,
  colors,
}: PersonalColorProps) {
  const [isActivated, setIsActived] = useState(false);

  const handleActive = () => {
    if (isActivated === false) {
      setIsActived(true);
    } else {
      setIsActived(false);
    }
  };
  return (
    <ButtonWrap onClick={handleActive} $isActivated={isActivated}>
      <ButtonName $isActivated={isActivated}>{buttonName}</ButtonName>
      <ColorPalette>
        {colors?.map((color, idx) => (
          <Dot key={idx} color={color} />
        ))}
      </ColorPalette>
    </ButtonWrap>
  );
}
