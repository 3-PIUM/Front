import styled from "styled-components";
import StarRating from "../product/StarRating";
import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ReviewCardProps {
  reviewId: number;
  username: string;
  memberId: number;
  date: string;
  rating: number;
  content: string;
  images: string[];
  likes: number;
  liked: boolean;
  surveyAnswers?: Record<string, string>;
  itemId: number;
}

const Card = styled.div`
  border: 1.5px solid #ff4081;
  border-radius: 16px;
  padding: 0.8rem;
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
  width: 70px;
  height: 70px;
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
  reviewId,
  username,
  memberId,
  date,
  rating,
  content,
  images,
  likes,
  liked: initialLiked,
  surveyAnswers,
  itemId,
}: ReviewCardProps) => {
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  let myMemberId: number | null = null;
  try {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      myMemberId = payload.memberId ?? null;
    }
  } catch (e) {
    console.error("토큰 디코딩 실패:", e);
  }
  console.log("🧾 myMemberId:", myMemberId);
  console.log("🧾 review memberId:", memberId);
  const isMyReview = Number(memberId) === Number(myMemberId);
  console.log(
    "✅ isMyReview:",
    isMyReview,
    "👉 memberId:",
    memberId,
    "👉 myMemberId:",
    myMemberId
  );

  const handleDelete = async () => {
    if (!window.confirm("리뷰를 삭제하시겠습니까?")) return;
    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/review/${reviewId}/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (err) {
      console.error("리뷰 삭제 실패", err);
    }
  };

  const handleLike = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newLiked = !liked;
    const type = newLiked ? "increase" : "decrease";

    try {
      const res = await axios.patch(
        `http://localhost:8080/review/recommend/${reviewId}/${type}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.isSuccess) {
        setLiked(newLiked);
        setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
      } else {
        alert("서버 응답 오류: 추천 상태 변경 실패");
      }
    } catch (err: any) {
      console.error("리뷰 추천 실패", err.response?.data ?? err);
      alert("리뷰 추천 처리 중 오류가 발생했습니다.");
    }
  };

  const reviewData = {
    reviewId,
    username,
    memberId,
    date,
    rating,
    content,
    images,
    likes,
    surveyAnswers,
    itemId,
  };

  console.log("📝 Rendering review:", {
    reviewId,
    username,
    memberId,
    isMyReview: memberId === myMemberId,
  });

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
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </ImageGrid>
          ) : (
            <div />
          )}

          <ActionRowWrapper>
            <ActionRow>
              {isMyReview ? (
                <>
                  <ActionText
                    onClick={() =>
                      navigate(`/review-write?itemId=${reviewData.itemId}`, {
                        state: { editReview: reviewData },
                      })
                    }
                  >
                    수정
                  </ActionText>
                  <span style={{ margin: "0 6px" }}>|</span>
                  <ActionText onClick={handleDelete}>삭제</ActionText>
                </>
              ) : (
                <ActionText onClick={() => alert("신고가 접수되었습니다.")}>
                  신고
                </ActionText>
              )}
            </ActionRow>
          </ActionRowWrapper>
        </BottomRow>
      </Card>

      {selectedImage && (
        <ModalBackdrop onClick={() => setSelectedImage(null)}>
          <ModalImage src={selectedImage} />
        </ModalBackdrop>
      )}
    </>
  );
};

export default ReviewCard;
