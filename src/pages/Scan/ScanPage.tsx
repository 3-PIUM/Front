import styled from "styled-components";
import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
import Header from "../../components/common/Header";
import axiosInstance from "../../api/axiosInstance";

const PageWrapper = styled.div`
  width: 100%;
  height: 90vh;
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
  const scanCooldownRef = useRef(false);
  const { t } = useLocale();

  const handleDetectedBarcode = async (itemId: string) => {
    if (scanCooldownRef.current) return;
    scanCooldownRef.current = true;

    try {
      const res = await axiosInstance.get(`/item/${itemId}/info`, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });

      const product = res.data.result;
      localStorage.setItem("scannedProduct", JSON.stringify(product));
      navigate(`/product-detail?itemId=${itemId}`);
    } catch (err: any) {
      if (err.response) {
        console.warn(
          `서버 응답 오류 ${err.response.status}:`,
          err.response.data
        );
      } else {
        console.error("네트워크/파싱 오류:", err.message);
      }
    } finally {
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
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
          handleDetectedBarcode(result.getText());
        }
      } catch {}

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

          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            requestAnimationFrame(scanLoop);
          };
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
      <Header />
      <InstructionText>{t.scan.alignBarcode}</InstructionText>
      <Video ref={videoRef} autoPlay muted playsInline />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <FrameGuide />
    </PageWrapper>
  );
};

export default ScanPage;
