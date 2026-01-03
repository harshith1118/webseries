'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  options: Record<string, unknown>;
  onReady?: (player: Player) => void;
  onTimeUpdate?: (currentTime: number) => void;
}

export const VideoPlayer = ({ options, onReady, onTimeUpdate }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('vjs-theme-city'); // You can add custom themes
      
      if (videoRef.current) {
          videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (onReady) onReady(player);
      }));

      player.on('timeupdate', () => {
        if (onTimeUpdate) {
          const current = player.currentTime();
          onTimeUpdate(typeof current === 'number' ? current : 0);
        }
      });
    } else {
      const player = playerRef.current;
      if (options.autoplay) player.autoplay(options.autoplay as boolean);
      if (options.sources) player.src(options.sources as string);
    }
  }, [options, videoRef, onReady, onTimeUpdate]);

  // Dispose the player on unmount
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="w-full h-full">
      <div ref={videoRef} className="w-full h-full" />
    </div>
  );
};

export default VideoPlayer;
