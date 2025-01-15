import { useRef } from "react";
import PropTypes from "prop-types";
import song from "../../assets/songs/christmas.mp3";

let animationController;

const MusicVisualizer = ({
  width,
  height,
  waveMaxHeight = 36,
}) => {
  const canvasRef = useRef();
  const audioRef = useRef();
  const source = useRef();
  const analyser = useRef();
  const radius = width / 2 - waveMaxHeight;
  const spacing = 1;

  const handleAudioPlay = () => {
    let audioContext = new AudioContext();
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current);
      analyser.current = audioContext.createAnalyser();
      source.current.connect(analyser.current);
      analyser.current.connect(audioContext.destination);
      analyser.smoothingTimeConstant = 1;
    }
    visualizeData();
  };

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData);
    if (audioRef.current.paused) {
      return cancelAnimationFrame(animationController);
    }
    analyser.fftSize = 256;
    const songData = new Uint8Array(Math.floor(180 / spacing) + 1);
    analyser.current.getByteFrequencyData(songData);

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#E5E8E8"

    // ctx.arc(width / 2, height / 2, width / 2 - (waveMaxHeight + 25), 0, Math.PI * 2)
    // ctx.stroke();
    // ctx.setLineDash([]);

    // const gradient = ctx.createLinearGradient(0, 0, 0, height);
    // gradient.addColorStop("0", "#C6E7FF");
    // gradient.addColorStop("1.0", "#D4F6FF");
    ctx.strokeStyle = "#E5E8E8";

    let lax, lay;
    let rax, ray;

    const lAbovePath = new Path2D();
    // const lBellowPath = new Path2D();
    const rAbovePath = new Path2D();
    // const rBellowPath = new Path2D();

    for (let i = 0; i < songData.length; i++) {
      const angle = ((-i * spacing + 90) * Math.PI) / 180;
      let data = (songData[i] / 128) * waveMaxHeight;

      if (data < waveMaxHeight) {
        data = waveMaxHeight + 1;
      }

      let tDiff = radius - waveMaxHeight + data;

      lax = tDiff * Math.cos(angle);
      lay = tDiff * Math.sin(angle);
      rax = tDiff * Math.cos(-angle);
      ray = tDiff * Math.sin(-angle);

      lAbovePath.lineTo(width / 2 - lax, height / 2 - lay);
      rAbovePath.lineTo(width / 2 + rax, height / 2 + ray);
    }

    // ctx.setLineDash([2, 1]);
    ctx.lineWidth = 2;
    ctx.stroke(lAbovePath);
    ctx.stroke(rAbovePath);
    ctx.closePath();
  };

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
      <audio ref={audioRef} preload="auto" onPlay={handleAudioPlay} controls>
        <source src={song} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default MusicVisualizer;

MusicVisualizer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  waveMaxHeight: PropTypes.number,
  // rgb: { r: number, g: number, b: number },
};
