import styled from "styled-components";
import colors from "../../styles/colors";

const ButtonWrap = styled.button<{ $isActivated: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  align-items: center;
  border: 1px solid
    ${({ $isActivated }) => ($isActivated ? colors.mainPink : colors.lightGrey)};
  border-radius: 1.25rem;
  gap: 0.625rem;
  width: 100%;
  padding: 1.5rem 0;
  grid-column: auto;
`;

const ButtonName = styled.div<{ $isActivated: boolean }>`
  font-size: 0.825rem;
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
  isWide?: boolean;
  isActivated: boolean;
  onClick: () => void;
}

export default function PersonalColorButton({
  buttonName,
  colors,
  isActivated,
  onClick,
}: PersonalColorProps) {
  return (
    <ButtonWrap onClick={onClick} $isActivated={isActivated}>
      <ButtonName $isActivated={isActivated}>{buttonName}</ButtonName>
      {colors && colors.length > 0 && (
        <ColorPalette>
          {colors?.map((color, idx) => (
            <Dot key={idx} color={color} />
          ))}
        </ColorPalette>
      )}
    </ButtonWrap>
  );
}
