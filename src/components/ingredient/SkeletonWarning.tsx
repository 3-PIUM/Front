import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 100%;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  background-color: white;
  padding-top: 1.5rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const TagSkeleton = styled(SkeletonBase)`
  width: 5.5rem;
  height: 1.8rem;
  border-radius: 999px;
`;

export default function SkeletonWarning() {
  return (
    <Wrapper>
      <TagContainer>
        {Array.from({ length: 6 }).map((_, i) => (
          <TagSkeleton key={i} />
        ))}
      </TagContainer>
    </Wrapper>
  );
}
