import styled from "styled-components";

interface ChatSuggestionsProps {
  onSelect: (type: "recommend" | "compare") => void;
  recommendLabel: string;
  compareLabel: string;
}

const SuggestionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const SuggestionButton = styled.button`
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 0.5rem 0.3rem;
  background-color: #fff0f5;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  width: 6rem;
`;

const ChatSuggestions = ({
  onSelect,
  recommendLabel,
  compareLabel,
}: ChatSuggestionsProps) => {
  return (
    <SuggestionContainer>
      <SuggestionButton onClick={() => onSelect("recommend")}>
        {recommendLabel}
      </SuggestionButton>
      <SuggestionButton onClick={() => onSelect("compare")}>
        {compareLabel}
      </SuggestionButton>
    </SuggestionContainer>
  );
};

export default ChatSuggestions;
