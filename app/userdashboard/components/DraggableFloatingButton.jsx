"use client";
import { useEffect, useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";

export default function DraggableFloatingButton() {
  const buttonRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 👉 Set initial position dynamically based on screen size
  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Default margin from edge
      const margin = 15;

      // Button size estimate (adjust if needed)
      const buttonSize = 35;

      // If screen is small (like mobile)
      if (width < 768) {
        setPosition({
          x: width - buttonSize - margin,
          y: height - buttonSize - margin,
        });
      } else {
        // Larger screen (desktop/tablet)
        setPosition({
          x: width - buttonSize - margin * 2,
          y: height - buttonSize - margin * 2,
        });
      }
    };

    updatePosition(); // Set on mount
    window.addEventListener("resize", updatePosition); // Update on resize

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // --- Disable/Enable scroll during drag ---
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };
  const enableScroll = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };

  // --- Start drag ---
  const handleStart = (e) => {
    e.preventDefault();
    setDragging(true);
    disableScroll();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  // --- Move ---
  const handleMove = (e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: clientX - offset.x,
      y: clientY - offset.y,
    });
  };

  // --- End drag + snap to side ---
  const handleEnd = () => {
    if (!dragging) return;
    setDragging(false);
    enableScroll();

    const screenWidth = window.innerWidth;
    const buttonWidth = buttonRef.current?.offsetWidth || 50;
    const snapToLeft = position.x + buttonWidth / 2 < screenWidth / 2;
    const targetX = snapToLeft ? 20 : screenWidth - buttonWidth - 20;

    setPosition((prev) => ({
      ...prev,
      x: targetX,
    }));
  };

  // --- Global move listeners ---
  useEffect(() => {
    const moveHandler = (e) => handleMove(e);
    const endHandler = () => handleEnd();

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", endHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
    };
  });

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        transition: dragging ? "none" : "all 0.3s ease",
        touchAction: "none",
      }}
      className="bg-gradient-to-r from-[#f720b0]/50 via-blue-600/50 to-cyan-500/50 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer active:scale-95"
    >
      <CiSettings className="text-white animate-spin" size={25} />
    </div>
  );
}
