import React, { useState } from "react";
import LetterComposer from "./LetterComposer";
import PageComposer from "./PageComposer";
import PrintModule from "./PrintModule";
import LetterFieldEditor from "./LetterFieldEditor";
import Intro from "./Intro";

export default function App() {
  // Każdy ciąg znaków z wierszownika to tablica liter (obiektów), np. [{char, img, width}]
  const [lines, setLines] = useState([]);
  const [module, setModule] = useState("intro");
  const [kasztaVariant, setKasztaVariant] = useState("kaszta");

  const kasztaSettings = {
    kaszta: {
      image: "assets/kaszta.png",
      poz: "poz.json",
      label: "Kaszta podstawowa",
    },
    szuflada: {
      image: "assets/kaszta_szuflada.png",
      poz: "poz_szuflada.json",
      label: "Szuflada",
    },
  };

  function handleSelect(variant) {
    setKasztaVariant(variant);
    setModule("letter");
  }

  function handleOpenEditor() {
    setModule("editor");
  }

  // Dodaj nową linię (ciąg liter) do PageComposer
  function addLine(line) {
    if (line && line.length > 0) {
      setLines(prev => [...prev, line]);
    }
  }

  function clearLines() {
    setLines([]);
  }

  return (
    <>
      {module === "intro" && (
        <Intro onSelect={handleSelect} onOpenEditor={handleOpenEditor} />
      )}
      {module === "letter" && (
        <LetterComposer
          onMoveLineToPage={line => {
            addLine(line);
            setModule("page");
          }}
          onBack={() => setModule("intro")}
          kasztaImage={kasztaSettings[kasztaVariant].image}
          pozSrc={kasztaSettings[kasztaVariant].poz}
        />
      )}
      {module === "editor" && (
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #e2e8f0 0%, #f8fafc 100%)",
            padding: "32px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              background: "rgba(255,255,255,0.95)",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 40px 120px rgba(15, 23, 42, 0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={() => setModule("intro")}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(15, 23, 42, 0.2)",
                  background: "rgba(241, 245, 249, 0.9)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Powrót do intro
              </button>

              <label
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontWeight: 500,
                  color: "#1e293b",
                }}
              >
                Wybierz kasztę:
                <select
                  value={kasztaVariant}
                  onChange={event => setKasztaVariant(event.target.value)}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(148, 163, 184, 0.7)",
                    padding: "6px 12px",
                    fontWeight: 600,
                    color: "#0f172a",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {Object.entries(kasztaSettings).map(([value, option]) => (
                    <option key={value} value={value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <LetterFieldEditor
              kasztaImage={kasztaSettings[kasztaVariant].image}
              pozSrc={kasztaSettings[kasztaVariant].poz}
            />
          </div>
        </div>
      )}
      {module === "page" && (
        <PageComposer
          lines={lines}
          onLinesChange={setLines} // <-- MUSI BYĆ! INACZEJ NIE DZIAŁA!
          onBack={() => setModule("letter")}
          onClearLines={clearLines}
          onGoToPrint={() => setModule("print")}
        />
      )}

      {module === "print" && (
        <PrintModule
          lines={lines}
          onBack={() => setModule("page")}
        />
      )}

    </>
  );
}
