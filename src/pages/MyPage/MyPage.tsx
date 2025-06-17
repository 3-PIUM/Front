import styled from "styled-components";
import ProfileSource from "../../assets/images/ProfileImage.jpg";
import dafaultProfileImage from "../../assets/images/dafaultProfileImage.png";
import { FiEdit2 } from "react-icons/fi";
import colors from "../../styles/colors";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState, type ChangeEvent } from "react";
import { useLocale } from "../../context/LanguageContext";

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem 0 1rem;
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

const ImgInput = styled.input`
  display: none;
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
  margin-top: 0.5rem;
`;

const Line = styled.hr`
  color: ${colors.lightGrey};
  border: 0.5px solid ${colors.lightGrey};
  margin: 0.5rem 0;
`;

export default function MyPage() {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { t } = useLocale();

  const fetchMemberInfo = async () => {
    try {
      const response = await axiosInstance.get("/member");
      const result = response.data.result;
      setMemberInfo(result);
    } catch (error) {
      console.log("사용자 정보 불러오는데 실패했습니다", error);
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, [profileImage]);

  console.log("mypage:", memberInfo);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      console.log("로그아웃 성공");
      navigate("/");
    } catch (error) {
      console.log("로그아웃 실패:", error);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files?.[0];
    if (!file) return;

    formData.append("profileImage", file);
    console.log(file);

    try {
      await axiosInstance.patch("/member/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileImage(file);
      await fetchMemberInfo();
    } catch (err) {
      console.log("프로필사진 에러:", err);
    }
    setProfileImage(profileImage);
  };

  return (
    <>
      <Header />
      <PageTitle pageName={t.mypage.pageTitle} />
      <TopWrapper>
        <ImageSection>
          <ImageBox>
            <ProfileImage
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : memberInfo?.profileImg ?? dafaultProfileImage
              }
              alt="프로필사진"
            />
          </ImageBox>
          <ImageEdit as="label" htmlFor="profileimg">
            <FiEdit2 fontSize={"1.125rem"} color={colors.white} />
          </ImageEdit>
          <ImgInput
            type="file"
            accept="image/*"
            id="profileimg"
            onChange={handleFileSelect}
          />
        </ImageSection>
        <Nickname>{memberInfo?.nickname ?? "null"}</Nickname>
      </TopWrapper>
      <Space />
      <Settings>
        <SettingBox>
          <Title>{t.mypage.personalTitle}</Title>
          <SettingItem>
            <div onClick={() => navigate("/editprofile")}>
              {t.mypage.editPersonal}
            </div>
            <div onClick={() => navigate("/mypage/editpassword")}>
              {t.mypage.changePassword}
            </div>
          </SettingItem>
        </SettingBox>
        <SettingBox>
          <Title>{t.mypage.skinProfile}</Title>
          <SettingItem>
            <div onClick={() => navigate("/mypage/skintype")}>
              {t.mypage.skinType.pageTitle}
            </div>
            <div onClick={() => navigate("/mypage/personalcolor")}>
              {t.mypage.personalColor.pageTitle}
            </div>
            <div onClick={() => navigate("/mypage/skinconcern")}>
              {t.mypage.skinConcerns}
            </div>
          </SettingItem>
        </SettingBox>
        <SettingBox>
          <Title>{t.mypage.purchase}</Title>
          <SettingItem>
            <div onClick={() => navigate("/purchase-list")}>
              {t.mypage.purchaseHistory}
            </div>
          </SettingItem>
        </SettingBox>
        <SettingBox>
          <Title>{t.mypage.language}</Title>
          <SettingItem>
            <div onClick={() => navigate("/mypage/language")}>
              {t.mypage.languageSetting}
            </div>
          </SettingItem>
        </SettingBox>
        <Line />
        <SettingBox>
          <SettingItem>
            <div onClick={handleLogout}>{t.mypage.logout}</div>
            <div onClick={() => navigate("/Withdraw")}>
              {t.mypage.deleteAccount}
            </div>
          </SettingItem>
        </SettingBox>
      </Settings>
    </>
  );
}
