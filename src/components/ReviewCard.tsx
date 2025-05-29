import styled from "styled-components";
import StarRating from "./StarRating";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

interface ReviewCardProps {
  username: string;
  date: string;
  rating: number;
  content: string;
  images: string[];
  likes: number;
  isMyReview: boolean;
}

const Card = styled.div`
  border: 1.5px solid #ff4081;
  border-radius: 16px;
  padding: 16px;
  margin-top: 0.8rem;
  background-color: #fff;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
`;

const DateText = styled.span`
  color: #999;
  font-weight: 600;
  font-size: 0.8rem;
`;

const Content = styled.p`
  margin: 8px 0;
  font-size: 15px;
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ReviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4.5rem;
  font-size: 14px;
  font-weight: bold;
  color: #999;
  gap: 12px;
`;

const ActionText = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LikeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  color: #999;
  font-weight: normal;
`;
const UsernameText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
`;

const LikeCountText = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
`;

const ReviewCard = ({
  username,
  date,
  rating,
  content,
  images,
  likes,
  isMyReview,
}: ReviewCardProps) => {
  const [likeCount, setLikeCount] = useState<number>(likes);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
  };

  return (
    <Card>
      <UsernameText>{username}</UsernameText>
      <TopRow>
        <StarRating rating={rating} />
        <DateText>{date}</DateText>
        {!isMyReview && (
          <LikeIcon onClick={handleLike}>
            <AiOutlineLike /> <LikeCountText>{likeCount}</LikeCountText>
          </LikeIcon>
        )}
      </TopRow>
      <Content>{content}</Content>
      <BottomRow>
        <ImageGrid>
          {images.map((img, idx) => (
            <ReviewImage key={idx} src={img} alt={`review-${idx}`} />
          ))}
        </ImageGrid>
        <ActionRow>
          {isMyReview ? (
            <ActionText>수정</ActionText>
          ) : (
            <ActionText onClick={() => alert("신고가 접수되었습니다.")}>
              신고
            </ActionText>
          )}
        </ActionRow>
      </BottomRow>
    </Card>
  );
};

export default ReviewCard;
