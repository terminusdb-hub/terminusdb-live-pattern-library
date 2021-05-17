
export const handleWidthChange = (sz, setWidth) => {
    const maxWidth = 1000;
    const padding = 225;
    const paneWidth = maxWidth - sz - padding;
    setWidth({ width: paneWidth + "px" });
}