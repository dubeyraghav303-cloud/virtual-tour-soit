interface PannellumViewer {
  destroy(): void;
  mouseEventToCoords(event: MouseEvent): [number, number];
  // Add other methods if needed, but these are the ones used in the code
}

interface Window {
  pannellum: {
    viewer(container: HTMLElement | string, config: any): PannellumViewer;
  };
}
