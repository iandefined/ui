"use client";

import { useEffect, useRef } from "react";

import { Backlight } from "@/registry/base/backlight";

export default function BacklightVideoDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !video || !context) return;

    let animationFrame = 0;
    let videoFrame = 0;

    const cancelFrame = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (videoFrame) video.cancelVideoFrameCallback(videoFrame);
      animationFrame = 0;
      videoFrame = 0;
    };

    const scheduleFrame = () => {
      if ("requestVideoFrameCallback" in video) {
        videoFrame = video.requestVideoFrameCallback(drawFrame);
      } else {
        animationFrame = requestAnimationFrame(drawFrame);
      }
    };

    const drawFrame = () => {
      animationFrame = 0;
      videoFrame = 0;

      if (
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      if (!video.paused && !video.ended) scheduleFrame();
    };

    const restartDrawing = () => {
      cancelFrame();
      drawFrame();
    };

    video.addEventListener("loadeddata", restartDrawing);
    video.addEventListener("play", restartDrawing);
    video.addEventListener("seeked", restartDrawing);
    video.addEventListener("pause", restartDrawing);
    video.addEventListener("ended", restartDrawing);
    restartDrawing();

    return () => {
      cancelFrame();
      video.removeEventListener("loadeddata", restartDrawing);
      video.removeEventListener("play", restartDrawing);
      video.removeEventListener("seeked", restartDrawing);
      video.removeEventListener("pause", restartDrawing);
      video.removeEventListener("ended", restartDrawing);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-2xl">
        <Backlight
          blur={20}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <canvas
            ref={canvasRef}
            className="size-full rounded-xl object-cover"
          />
        </Backlight>
        <div className="relative z-10 aspect-video w-full overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            aria-label="Cyberpunk demo video"
            autoPlay
            className="size-full object-cover"
            controls
            loop
            muted
            playsInline
            preload="metadata"
            src="/assets/cyberpunk-demo.mp4"
          />
        </div>
      </div>
    </div>
  );
}
