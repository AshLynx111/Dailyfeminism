import { ExhibitionNav } from "./components/ExhibitionNav";
import { Entrance } from "./components/Entrance";
import { FeministAtlas } from "./components/FeministAtlas";
import { LineageRoom } from "./components/LineageRoom";
import { SpectrumRoom } from "./components/SpectrumRoom";
import { QuizRoom } from "./components/QuizRoom";
import { ReadingArchive } from "./components/ReadingArchive";
import { ThoughtRings } from "./components/ThoughtRings";
import { AtlasCollageFinale } from "./components/AtlasCollageFinale";
import { LanguageProvider } from "./i18n";
import { ReflectionProvider } from "./reflections";

export default function App() {
  return (
    <LanguageProvider>
      <ReflectionProvider>
        <div style={{ background: "var(--daily-paper)", overflowX: "hidden" }}>
          <ExhibitionNav />
          <Entrance />
          <FeministAtlas />
          <QuizRoom />
          <LineageRoom />
          <SpectrumRoom />
          <ReadingArchive />
          <ThoughtRings />
          <AtlasCollageFinale />
        </div>
      </ReflectionProvider>
    </LanguageProvider>
  );
}
