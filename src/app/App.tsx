import { ExhibitionNav } from "./components/ExhibitionNav";
import { Entrance } from "./components/Entrance";
import { FeministAtlas } from "./components/FeministAtlas";
import { SpectrumRoom } from "./components/SpectrumRoom";
import { QuizRoom } from "./components/QuizRoom";
import { ReadingArchive } from "./components/ReadingArchive";

export default function App() {
  return (
    <div style={{ background: "#0D0D0D", overflowX: "hidden" }}>
      {/* Global grain — fixed overlay on everything */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
        }}
      />

      <ExhibitionNav />
      <Entrance />
      <FeministAtlas />
      <SpectrumRoom />
      <QuizRoom />
      <ReadingArchive />
    </div>
  );
}
