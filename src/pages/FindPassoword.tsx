import Button from "../components/common/Button";
import Header from "../components/common/Header";
import TextHeader from "../components/common/TextHeader";
import { useLocale } from "../context/LanguageContext";

export default function FindPassoword() {
  const { t } = useLocale();
  return (
    <>
      <Header />
      <TextHeader pageName={t.login.findpassword} />
    </>
  );
}
