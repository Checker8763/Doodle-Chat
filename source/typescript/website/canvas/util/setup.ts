export function setupHighDpiCanvas (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height *dpr;
    let ctx = canvas.getContext('2d');
    // @ts-ignore
    ctx.scale(dpr, dpr);
    return ctx;
}