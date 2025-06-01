import styled from "styled-components";
import TextHeader from "../components/TextHeader";
import Header from "../components/Header";

export default function SettingLanguange() {
  const languages = ["한국어", "English", "日本語"];

  return (
    <>
      <Header />
      <TextHeader pageName="언어 설정" />
      <div></div>
    </>
  );
}
