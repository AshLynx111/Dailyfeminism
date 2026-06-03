import { ExhibitionNav } from "./components/ExhibitionNav";
import { Entrance } from "./components/Entrance";
import { FeministAtlas } from "./components/FeministAtlas";
import { SpectrumRoom } from "./components/SpectrumRoom";
import { QuizRoom } from "./components/QuizRoom";
import { ReadingArchive } from "./components/ReadingArchive";
import { AtlasCollageFinale } from "./components/AtlasCollageFinale";
import { LanguageProvider } from "./i18n";

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ background: "var(--daily-paper)", overflowX: "hidden" }}>
        <ExhibitionNav />
        <Entrance />
        <FeministAtlas />
        <QuizRoom />
        <SpectrumRoom />
        <ReadingArchive />
        <AtlasCollageFinale />
      </div>
    </LanguageProvider>
  );
}
