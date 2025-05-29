import { Android, NintendoSwitch, Steam } from "react-bootstrap-icons";
import { FaXbox } from "react-icons/fa";
import {
  SiMacos,
  SiNintendo,
  SiNintendo3Ds,
  SiNintendogamecube,
  SiPlaystation,
  SiPlaystation2,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiPlaystationportable,
  SiPlaystationvita,
  SiWii,
  SiWiiu,
} from "react-icons/si";

const platformIcons = {
  PC: <Steam />,
  PlayStation: <SiPlaystation />,
  "PlayStation 2": <SiPlaystation2 />,
  "PlayStation 3": <SiPlaystation3 />,
  "PlayStation 4": <SiPlaystation4 />,
  "PlayStation 5": <SiPlaystation5 />,
  PSP: <SiPlaystationportable />,
  "PS Vita": <SiPlaystationvita />,
  Xbox: <FaXbox />,
  "Xbox 360": <FaXbox />,
  "Xbox Series S/X": <FaXbox />,

  SNES: "SNES",
  NES: "NES",
  "Game Boy": "GB",
  "Game Boy Advance": "GBA",
  "Game Boy Color": "GBC",

  "Nintendo 64": <SiNintendo />,
  GameCube: <SiNintendogamecube />,

  "Nintendo DS": <SiNintendo3Ds />,
  "Nintendo DSi": <SiNintendo3Ds />,
  "Nintendo 3DS": <SiNintendo3Ds />,
  Wii: <SiWii />,
  "Wii U": <SiWiiu />,
  "Nintendo Switch": <NintendoSwitch />,

  macOS: <SiMacos />,
  Android: <Android />,
};

export default platformIcons;
