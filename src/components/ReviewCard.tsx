import styled from "styled-components";
import StarRating from "./StarRating";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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
  align-items: flex-end;
  gap: 8px;
`;

const ReviewImage = styled.img`
  width: 80px;
  height: 80px;
  /* object-fit: cover; */
  border-radius: 6px;
`;

const ActionRowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionRow = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #999;
`;

const ActionText = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  text-align: right;
`;

const LikeIcon = styled.span<{ $liked?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  color: ${({ $liked }) => ($liked ? "#e6005a" : "#999")};
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

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
  background: white;
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
  const [liked, setLiked] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // ⭐ 모달용

  const navigate = useNavigate();

  const handleLike = () => {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  const reviewData = {
    username,
    date,
    rating,
    content,
    images,
    likes,
    isMyReview,
  };

  return (
    <>
      <Card>
        <UsernameText>{username}</UsernameText>
        <TopRow>
          <StarRating rating={rating} />
          <DateText>{date}</DateText>
          {!isMyReview && (
            <LikeIcon onClick={handleLike} $liked={liked}>
              <AiOutlineLike />
              <LikeCountText>{likeCount}</LikeCountText>
            </LikeIcon>
          )}
        </TopRow>
        <Content>{content}</Content>
        <BottomRow>
          {images.length > 0 ? (
            <ImageGrid>
              {images.map((img, idx) => (
                <ReviewImage
                  key={idx}
                  src={img}
                  alt={`review-${idx}`}
                  onClick={() => setSelectedImage(img)} // ⭐ 이미지 클릭 시
                />
              ))}
            </ImageGrid>
          ) : (
            <div />
          )}

          <ActionRowWrapper>
            <ActionRow>
              {isMyReview ? (
                <ActionText
                  onClick={() =>
                    navigate("/review-write", {
                      state: { editReview: reviewData },
                    })
                  }
                >
                  수정
                </ActionText>
              ) : (
                <ActionText onClick={() => alert("신고가 접수되었습니다.")}>
                  신고
                </ActionText>
              )}
            </ActionRow>
          </ActionRowWrapper>
        </BottomRow>
      </Card>

      {/* ⭐ 모달 구현 */}
      {selectedImage && (
        <ModalBackdrop onClick={() => setSelectedImage(null)}>
          <ModalImage src={selectedImage} />
        </ModalBackdrop>
      )}
    </>
  );
};

export default ReviewCard;
