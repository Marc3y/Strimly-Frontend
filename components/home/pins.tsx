"use client"

import { PinContainer } from "@/components/ui/3d-pin";
import { AudioWaveform, Speaker } from "lucide-react";
import { Link } from "@heroui/link";

export const Pins = () => {
  return (
    <div className={"mt-[50px] flex"}>
      <PinContainer href={"./tts"} title={"Text-To-Speech"}>
        <div className={"w-[300px] h-[375px] justify-center items-center flex"}>
          <Speaker color={"rgba(255,255,255,0.4)"} size={"60px"} />
        </div>
      </PinContainer>
      {/*<PinContainer href={"./sr"} title={"Song-Requests"}>
        <div className={"w-[300px] h-[375px] justify-center items-center flex"}>
          <AudioWaveform color={"rgba(255,255,255,0.4)"} size={"60px"} />
        </div>
      </PinContainer>*/}
    </div>
  )
}