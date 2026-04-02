"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function VirtualTour() {
  const viewerRef = useRef<PannellumViewer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Function to calculate HFOV to fit height
  const calculateHfov = () => {
    if (typeof window === "undefined") return 75;
    const vaov = 60; // The vertical angle of view from your config
    const aspect = window.innerWidth / window.innerHeight;
    // hfov = 2 * atan(tan(vfov/2) * aspect)
    const hfov = 2 * Math.atan(Math.tan((vaov / 2) * (Math.PI / 180)) * aspect) * (180 / Math.PI);
    return Math.max(10, Math.min(hfov, 120)); // Cap between 10 and 120
  };

  useEffect(() => {
    // We need to wait for the external Pannellum script to load on the window
    const initViewer = () => {
      if (window.pannellum && containerRef.current && !viewerRef.current) {
        const initialHfov = calculateHfov();
        
        viewerRef.current = window.pannellum.viewer(containerRef.current, {
          "default": {
            "firstScene": "soit_main",
            "author": "Raghav Dubey",
            "sceneFadeDuration": 1000,
            "autoLoad": true,
            "type": "equirectangular",
            "haov": 360,
            "vaov": 60,
            "vOffset": 0,
            "minHfov": 10,
            "hfov": initialHfov,
            "autoRotate": 2,
            "autoRotateInactivityDelay": 3000,
            // Assuming your images are in the 'public/panoramas' folder
            "basePath": "/panoramas/" 
          },

          "scenes": {
            "soit_main": {
                "title": "SOIT Main",
                "panorama": "SOIT_main.jpeg",
                "hotSpots": [
                    { "pitch": -5, "yaw": -132, "type": "scene", "text": "Go to Ground Floor", "sceneId": "ground_floor" }
                ]
            },
            "ground_floor": {
                "title": "Ground Floor",
                "panorama": "Ground_floor.jpeg",
                "hotSpots": [
                    { "pitch": 0, "yaw": 70, "type": "scene", "text": "Exit to Main", "sceneId": "soit_main" },
                    { "pitch": 0, "yaw": -145, "type": "scene", "text": "To Stairs (1st Floor)", "sceneId": "stairs_1st" }
                ]
            },
            "stairs_1st": {
                "title": "Stairs to 1st Floor",
                "panorama": "Stairs_to_1st_Floor.jpeg",
                "hotSpots": [
                    { "pitch": -10, "yaw": 170, "type": "scene", "text": "Back to Ground Floor", "sceneId": "ground_floor" },
                    { "pitch": 10, "yaw": -140, "type": "scene", "text": "Up to 1st Floor", "sceneId": "first_floor" }
                ]
            },
            "first_floor": {
                "title": "First Floor",
                "panorama": "First floor.jpeg",
                "hotSpots": [
                    { "pitch": -10, "yaw": 160, "type": "scene", "text": "Down Stairs", "sceneId": "stairs_1st" },
                    { "pitch": 0, "yaw": -110, "type": "scene", "text": "Cyber Lab", "sceneId": "cyber_lab" },
                    { "pitch": 0, "yaw": -170, "type": "scene", "text": "Washroom", "sceneId": "washroom" },
                    { "pitch": 0, "yaw": 45, "type": "scene", "text": "Office", "sceneId": "office" },
                    { "pitch": 0, "yaw": 120, "type": "scene", "text": "Way to 2nd Floor", "sceneId": "way_2nd" }
                ]
            },
            "cyber_lab": {
                "title": "Cyber Lab",
                "panorama": "Cyber_Lab.jpeg",
                "hotSpots": [{ "pitch": 0, "yaw": 120, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" }]
            },
            "washroom": {
                "title": "Washroom",
                "panorama": "Washroom.jpeg",
                "hotSpots": [
                    { "pitch": 0, "yaw": 20, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" },
                    { "pitch": 0, "yaw": -146, "type": "scene", "text": "To BS 1st", "sceneId": "bs_1st" }
                ]
            },
            "bs_1st": {
                "title": "BS 1st",
                "panorama": "BS_1st.jpeg",
                "hotSpots": [
                    { "pitch": 0, "yaw": 20, "type": "scene", "text": "Back to Washroom", "sceneId": "washroom" },
                    { "pitch": 0, "yaw": -100, "type": "scene", "text": "To BS 2nd", "sceneId": "bs_2nd" }
                ]
            },
            "bs_2nd": {
                "title": "BS 2nd",
                "panorama": "BS_2nd.jpeg",
                "hotSpots": [
                    { "pitch": 0, "yaw": 36, "type": "scene", "text": "Back to BS 1st", "sceneId": "bs_1st" },
                    { "pitch": 0, "yaw": -35, "type": "scene", "text": "DS Lab", "sceneId": "ds_lab" }
                ]
            },
            "ds_lab": {
                "title": "DS Lab",
                "panorama": "DS_Lab.jpeg",
                "hotSpots": [{ "pitch": 0, "yaw": 80, "type": "scene", "text": "Back to BS 2nd", "sceneId": "bs_2nd" }]
            },
            "office": {
                "title": "Office",
                "panorama": "Office.jpeg",
                "hotSpots": [
                    { "pitch": 0, "yaw": 82, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" },
                    { "pitch": 0, "yaw": 170, "type": "scene", "text": "Conference Hall", "sceneId": "conf_hall" },
                    { "pitch": 0, "yaw": -18, "type": "scene", "text": "Staff Room", "sceneId": "staff_room" }
                ]
            },
            "conf_hall": {
                "title": "Conference Hall",
                "panorama": "Conference_Hall.jpeg",
                "hotSpots": [{ "pitch": 0, "yaw": -60, "type": "scene", "text": "Back to Office", "sceneId": "office" }]
            },
            "staff_room": {
                "title": "Staff Room",
                "panorama": "Staff room.jpeg",
                "hotSpots": [{ "pitch": 0, "yaw": -140, "type": "scene", "text": "Back to Office", "sceneId": "office" }]
            },
            "way_2nd": {
                "title": "Way to 2nd Floor",
                "panorama": "Way_2nd_Floor.jpeg",
                "hotSpots": [
                    { "pitch": -10, "yaw": 140, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" },
                    { "pitch": 10, "yaw": 0, "type": "scene", "text": "Up to 2nd Floor", "sceneId": "corr_2nd" }
                ]
            },
            "corr_2nd": {
                "title": "2nd Floor Corridor",
                "panorama": "2nd_Floor_Corridoor.jpeg",
                "hotSpots": [
                    { "pitch": -10, "yaw": 80, "type": "scene", "text": "Down to Way 2nd Floor", "sceneId": "way_2nd" },
                    { "pitch": 0, "yaw": 128, "type": "scene", "text": "Terrace", "sceneId": "terrace" },
                    { "pitch": 0, "yaw": -15, "type": "scene", "text": "AIML Class", "sceneId": "aiml_class" }
                ]
            },
            "terrace": {
                "title": "Terrace",
                "panorama": "Terrace.jpeg",
                "hotSpots": [{ "pitch": 0, "yaw": 180, "type": "scene", "text": "Back to 2nd Floor", "sceneId": "corr_2nd" }]
            },
            "aiml_class": {
                "title": "AIML Class",
                "panorama": "AIML_Class.jpeg",
                "hotSpots": [{ "pitch": 0, "yaw": 90, "type": "scene", "text": "Back to 2nd Floor", "sceneId": "corr_2nd" }]
            }
          }
        });

        // Resize Listener
        const handleResize = () => {
          if (viewerRef.current) {
            viewerRef.current.setHfov(calculateHfov());
          }
        };
        window.addEventListener('resize', handleResize);

        // The Custom Event Listener to find coordinates safely
        if (containerRef.current) {
          containerRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            if (viewerRef.current) {
              const coords = viewerRef.current.mouseEventToCoords(e);
              console.log("Pitch: " + coords[0].toFixed(2) + ", Yaw: " + coords[1].toFixed(2));
            }
          });
        }

        // Cleanup function for listeners
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    };

    // Polling interval to check when Pannellum has finished loading from the CDN
    const checkPannellum = setInterval(() => {
      if (typeof window !== "undefined" && window.pannellum) {
        const cleanup = initViewer();
        clearInterval(checkPannellum);
        return cleanup;
      }
    }, 100);

    // Cleanup function to avoid memory leaks if the component unmounts
    return () => {
      clearInterval(checkPannellum);
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
      />
      
      <Script 
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js" 
        strategy="beforeInteractive"
      />

      <main className="w-full h-screen m-0 p-0 overflow-hidden bg-black flex items-center justify-center">
        {/* The div where Pannellum will mount */}
        <div ref={containerRef} className="w-full h-full" />
      </main>
    </>
  );
}