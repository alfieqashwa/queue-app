"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

export function Caller({
  queueNo,
  category,
}: {
  queueNo: string;
  category: string;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    setIsSpeaking(true);

    const formattedQueueNo =
      queueNo.charAt(0) + "," + queueNo.slice(1).split("").join("-");

    const speech = new SpeechSynthesisUtterance(
      `Nomor antrian ${formattedQueueNo}, silakan menuju ke loket ${category}.`
    );
    speech.lang = "id-ID";

    speech.onend = () => {
      // Enable the button after speech ends
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  return (
    <Button
      disabled={isSpeaking}
      variant="destructive"
      onClick={speakText}
      className="disabled:pointer-events-auto disabled:cursor-not-allowed"
    >
      Caller
    </Button>
  );
}
