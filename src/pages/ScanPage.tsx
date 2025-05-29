import styled from "styled-components";
// import BottomNavBar from "../components/BottomNavBar";
import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: relative;
  overflow: hidden;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InstructionText = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  z-index: 10;
`;

const FrameGuide = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 32px;
    height: 32px;
    border: 3px solid white;
  }

  &::before {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
  }
`;

const ScanPage = () => {
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = document.getElementById("camera") as HTMLVideoElement;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      } catch (error) {
        alert("카메라 접근 권한이 필요합니다.");
        console.error(error);
      }
    };
    startCamera();
  }, []);

  const handleDetectedProduct = (barcode: string) => {
    const product = {
      id: "p001",
      name: "쿨앤 더 주시 래스팅 틴트",
      brand: "올리브영단독",
      imageUrl:
        "https://image.oliveyoung.co.kr/uploads/images/gdasEditor/2025/05/06/2433061b71734e70b7701509b6ea84a11746527933972.png?RS=640x0&SF=webp",
      originalPrice: 12900,
      discountRate: 23,
    };
    addItem(product);
    navigate("/cart");
  };

  return (
    <>
      <PageWrapper onClick={() => handleDetectedProduct("barcode")}>
        {" "}
        {/* 테스트용 클릭 */}
        <InstructionText>화면 위에 바코드를 위치시켜 주세요</InstructionText>
        <Video id="camera" autoPlay playsInline muted />
        <FrameGuide />
      </PageWrapper>
      {/* <BottomNavBar onScanClick={() => handleDetectedProduct("barcode")} /> */}
    </>
  );
};

export default ScanPage;
