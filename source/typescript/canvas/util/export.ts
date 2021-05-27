export function exportCanvas (canvas: HTMLCanvasElement) {
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
    // @ts-ignore
    link.delete;
}