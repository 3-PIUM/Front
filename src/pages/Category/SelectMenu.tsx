import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import colors from "../../styles/colors";
import { useState } from "react";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colors.white};
  margin-top: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTd = styled.td<{ $selected?: boolean }>`
  border: 1px solid #ddd;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.875rem;
  width: 33.33%;
  color: ${({ $selected }) => ($selected ? colors.black : colors.mediumGrey)};
  background-color: ${({ $selected }) =>
    $selected ? colors.white : "#f6f6f6"};
  font-weight: ${({ $selected }) => ($selected ? "700" : "normal")};
  cursor: pointer;
`;

const ToggleButton = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${colors.darkGrey};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.8rem;
`;

export default function SelectMenu({
  onSelect,
}: {
  onSelect: (name: string) => void;
}) {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);

  const options = t.category.options;
  const rows = [];

  for (let i = 0; i < options.length; i += 3) {
    const rowItems = options.slice(i, i + 3);
    rows.push(rowItems);
  }

  const visibleRows = expanded ? rows : rows.slice(0, 3);

  const [selectedId, setSelectedId] = useState<string>(
    options[0]?.value ?? "전체"
  );

  return (
    <Wrapper>
      <StyledTable>
        <tbody>
          {visibleRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item: { id: number; name: string; value: string }) => (
                <StyledTd
                  key={item.id}
                  $selected={item.value === selectedId}
                  onClick={() => {
                    setSelectedId(item.value);
                    onSelect(item.value);
                  }}
                >
                  {item.name}
                </StyledTd>
              ))}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, idx) => (
                  <StyledTd key={`empty-${idx}`} />
                ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <ToggleButton onClick={() => setExpanded(!expanded)}>
        <div>
          {expanded ? t.category.optionBtnClose : t.category.optionBtnOpen}
        </div>
        {expanded ? (
          <VscChevronUp style={{ fontSize: "1.2rem" }} />
        ) : (
          <VscChevronDown style={{ fontSize: "1.2rem" }} />
        )}
      </ToggleButton>
    </Wrapper>
  );
}
