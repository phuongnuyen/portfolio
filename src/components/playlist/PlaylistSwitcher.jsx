import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../utils/utils.jsx";

const Indicator = () => {
  console.log("render indicator");
  return (
    <div className="bg-red-500 size-5 rounded-full absolute left-0 top-0" />
  );
};

const PlaylistSwicher = ({ albums, pointerSize, size }) => {
  const containerRef = useRef();
  const [image, setImage] = useState(null);
  const pointerRef = useRef();
  const isDragging = useRef(false);
  const [indicators, setIndicators] = useState([]);
  const circleSize = size - pointerSize;

  useEffect(() => {
    const selected = albums.find((v) => v.isSelected);
    setImage(selected?.image);
  }, [setImage, albums]);

  // set pointer position
  useEffect(() => {
    const radius = circleSize / 2;
    let x = radius - (radius * Math.sqrt(3)) / 2;
    let y = radius / 2;
    pointerRef.current.style.left = `${x}px`;
    pointerRef.current.style.top = `${y}px`;
  }, [circleSize]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  });

  useEffect(() => {
    function onMouseUp() {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMouseMove);
    }
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) {
      return;
    }

    const bound = containerRef.current.getBoundingClientRect();
    let radius = bound.width / 2;
    const mouseX = e.clientX - (radius + bound.left);
    const mouseY = e.clientY - (radius + bound.top);
    const angle = Math.atan2(mouseY, mouseX);
    const x = radius * (1 + Math.cos(angle));
    const y = radius * (1 + Math.sin(angle));
    if (x < 0 || x > radius || y < 0 || y > radius) {
      return;
    }
    pointerRef.current.style.left = `${x}px`;
    pointerRef.current.style.top = `${y}px`;
  };

  return (
    <div className={`w-[${size}px] h-[${size}px]`}>
      {/* tray */}
      <div
        className={`border-2 border-[#988686] rounded-full w-[${circleSize}px] h-[${circleSize}px] left-[${
          pointerSize / 2
        }px] top-[${pointerSize / 2}px] relative`}
        ref={containerRef}
      />

      {/* indicators */}
      {indicators.map((item, index) => {
        return <Indicator key={index} />;
      })}

      {/* pointer */}
      <div
        ref={pointerRef}
        className={`bg-black size-[${pointerSize}px] rounded-full absolute`}
        onMouseDown={onMouseDown}
      />
      {/* <img className="rounded-full w-full h-full" src={image} draggable={false} /> */}
    </div>
  );
};
export default PlaylistSwicher;

PlaylistSwicher.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  pointerSize: PropTypes.number,
  size: PropTypes.number,
};
