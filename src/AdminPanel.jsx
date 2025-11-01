import React from "react";
import { resolveAssetPath } from "./utils/assetPaths";

const KASZTA_IMAGE = resolveAssetPath("assets/kaszta.png");
const SZUFLADA_IMAGE = resolveAssetPath("assets/kaszta_szuflada.png");

export default function AdminPanel({ onCalibrate }) {
  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h2
        style={{
          fontFamily: "GrohmanGrotesk-Classic",
          fontSize: "2rem",
          color: "#000",
        }}
      >
        Panel administracyjny
      </h2>
      <h3
        style={{
          fontFamily: "GrohmanGrotesk-Classic",
          fontSize: "1.66rem",
          color: "#000",
        }}
      >
        Wybierz kasztę do kalibracji:
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "1rem",
        }}
      >
        <img
          src={KASZTA_IMAGE}
          alt="Kaszta"
          style={{ width: "400px", cursor: "pointer" }}
          onClick={() => onCalibrate("kaszta")}
        />
        <img
          src={SZUFLADA_IMAGE}
          alt="Kaszta szuflada"
          style={{ width: "400px", cursor: "pointer" }}
          onClick={() => onCalibrate("szuflada")}
        />
      </div>
    </div>
  );
}

