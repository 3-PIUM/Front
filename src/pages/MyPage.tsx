import styled from "styled-components";
import ProfileSource from "../assets/images/ProfileImage.jpg";
import { FiEdit2 } from "react-icons/fi";
import colors from "../styles/colors";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin-top: 3.5rem;
`;

const ImageSection = styled.div`
  display: flex;
  position: relative;
`;

const ImageBox = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 6.125rem;
  height: 6.125rem;
  border-radius: 50%;
`;

const ImageEdit = styled.div`
  display: flex;
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: ${colors.mainPink};
  border-radius: 50%;
  bottom: 0;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 0;
`;

const Nickname = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1.75rem;
`;

const Space = styled.div`
  display: flex;
  width: 100%;
  height: 1rem;
  background-color: #f5f5f5;
`;

const Settings = styled.div`
  padding: 0 1rem;
  margin-top: 2rem;
  padding-bottom: 80px;
`;

const SettingBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.mediumGrey};
  height: 2rem;
`;

const SettingItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1rem;
`;

const Line = styled.hr`
  color: ${colors.lightGrey};
  border: 0.5px solid ${colors.lightGrey};
  margin: 0.5rem 0;
`;

export default function MyPage() {
  const nickname = "겸손한 치타";
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <TopWrapper>
        <ImageSection>
          <ImageBox>
            <ProfileImage src={ProfileSource} alt="프로필사진" />
          </ImageBox>
          <ImageEdit>
            <FiEdit2 fontSize={"1.125rem"} color={colors.white} />
          </ImageEdit>
        </ImageSection>
        <Nickname>{nickname}</Nickname>
      </TopWrapper>
      <Space />
      <Settings>
        <SettingBox>
          <Title>개인정보</Title>
          <SettingItem>
            <div>개인정보 수정</div>
          </SettingItem>
        </SettingBox>
        <SettingBox>
          <Title>나의 피부 정보</Title>
          <SettingItem>
            <div>피부 타입 / 퍼스널컬러</div>
            <div>피부 고민</div>
          </SettingItem>
        </SettingBox>
        <SettingBox>
          <Title>구매</Title>
          <SettingItem>
            <div onClick={() => navigate("/purchase-list")}>구매 내역</div>
          </SettingItem>
        </SettingBox>
        <SettingBox>
          <Title>언어</Title>
          <SettingItem>
            <div onClick={() => navigate("/settings/language")}>언어 설정</div>
          </SettingItem>
        </SettingBox>
        <Line />
        <SettingBox>
          <SettingItem>
            <div>로그아웃</div>
            <div onClick={() => navigate("/Withdraw")}>탈퇴</div>
          </SettingItem>
        </SettingBox>
      </Settings>
    </>
  );
}
