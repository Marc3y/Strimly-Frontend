"use client"
import { useEffect, useState } from "react";

export default function TTS() {

  const [overlayId, setOverlayId] = useState("")
  let socket;

  const initSocket = async (id:string) => {
    socket = new WebSocket("wss://strimlyws.marcey.xyz:7455?code=" + id + "&type=tts");
    socket.onopen = () => {
      console.log("connected to websocket");
    }
    socket.onmessage = (e: MessageEvent) => {
      console.log(e.data);
    }
  }

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    if(params.has("id")){
      let id = params.get("id");
      setOverlayId(id!);
      initSocket(id!);
    }
  }, []);

    return (
        <div className={"justify-center items-center flex flex-col"}>
            <h1>Overlay TTS: {overlayId}</h1>
        </div>
    );
}
