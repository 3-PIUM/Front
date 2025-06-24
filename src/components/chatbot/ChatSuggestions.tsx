import styled from "styled-components";

interface ChatSuggestionsProps {
  onSelect: (type: "recommend" | "compare") => void;
  recommendLabel: string;
  compareLabel: string;
}

const SuggestionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  justify-content: center;
`;

const SuggestionButton = styled.button`
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem 0.3rem;
  background-color: #fff0f5;
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
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
