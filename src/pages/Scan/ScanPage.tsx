import styled from "styled-components";
import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";

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
  width: 320px;
  height: 250px;
  top: calc(50% - 20%);
  left: calc(50% - 160px);
  border: 2px dashed rgba(255, 255, 255, 0.7);
  z-index: 11;
  box-sizing: border-box;
  pointer-events: none;
`;

const ScanPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const scanCooldownRef = useRef(false); // 쿨다운 중인지 여부
  const { t } = useLocale();

  const dummyDatabase: Record<string, any> = {
    "8809695670114": {
      id: "p001",
      name: "쿨앤 더 주시 래스팅 틴트",
      brand: "올리브영단독",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0021/A00000021429012ko.jpg?qt=80",
      originalPrice: 12900,
      discountRate: 23,
    },
    "880000000001": {
      id: "p002",
      name: "쿨앤 더 주시 래스팅 틴트",
      brand: "아누아",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0021/A00000021429012ko.jpg?qt=80",
      originalPrice: 12900,
      discountRate: 23,
    },
  };

  const handleDetectedProduct = (barcode: string) => {
    if (scanCooldownRef.current) return;

    const product = dummyDatabase[barcode];
    if (product) {
      scanCooldownRef.current = true;
      localStorage.setItem("scannedProduct", JSON.stringify(product));
      navigate("/product-detail");

      // 쿨다운 해제 (1.5초 후)
      setTimeout(() => {
        scanCooldownRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let scanning = true;

    const scanLoop = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = video.videoWidth;
      const h = video.videoHeight;
      const guideW = 320;
      const guideH = 320;
      const sx = (w - guideW) / 2;
      const sy = (h - guideH) / 2;

      canvas.width = guideW;
      canvas.height = guideH;
      ctx.drawImage(video, sx, sy, guideW, guideH, 0, 0, guideW, guideH);

      try {
        const result = await reader.current.decodeFromCanvas(canvas);
        if (result) {
          handleDetectedProduct(result.getText());
        }
      } catch {
        // Not found → 무시
      }

      if (scanning) {
        requestAnimationFrame(scanLoop);
      }
    };

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          requestAnimationFrame(scanLoop);
        }
      })
      .catch((err) => {
        alert(t.scan.cameraPermission);
        console.error(err);
      });

    return () => {
      scanning = false;
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <PageWrapper>
      <InstructionText>{t.scan.alignBarcode}</InstructionText>
      <Video ref={videoRef} autoPlay muted playsInline />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <FrameGuide />
    </PageWrapper>
  );
};

export default ScanPage;
