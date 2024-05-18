"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { TableCell } from "~/components/ui/table";
import { cn } from "~/lib/utils";

export function Caller({
  queueNo,
  category,
}: {
  queueNo: string;
  category: string;
}) {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const formattedQueueNo =
      queueNo.charAt(0) + "," + queueNo.slice(1).split("").join("-");

    const speech = new SpeechSynthesisUtterance(
      `Nomor antrian, ${formattedQueueNo}, silakan menuju ke loket ${category}.`
    );
    speech.lang = "id-ID";

    setSpeech(speech);

    return () => {
      synth.cancel();
    };
  }, [category, queueNo]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    if (!isSpeaking) {
      setIsSpeaking(true);
      setIsPaused(false);
      synth.speak(speech as SpeechSynthesisUtterance);
    } else {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    }
    if (speech) {
      speech.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      <TableCell className="w-[100px] text-center">
        <Button
          disabled={!speech}
          variant={isSpeaking ? "secondary" : "default"}
          onClick={handlePlay}
          className={cn(
            "disabled:pointer-events-auto disabled:cursor-not-allowed",
            isSpeaking && "text-amber-400"
          )}
        >
          {isSpeaking && !isPaused ? "Pause" : isPaused ? "Resume" : "Play"}
        </Button>
      </TableCell>
      <TableCell className="w-[100px]">
        <Button variant="destructive" onClick={handleStop}>
          Stop
        </Button>
      </TableCell>
    </>
  );
}
