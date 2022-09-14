class CanvasWorker {
    public options = {
        drawing: {
            width: 2,
            color: "black",
            blur: false,
            blurWidth: 1,
        },
    };
    private elem: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private config = {
        height: 84,
        width: 244,
        frame: {
            borderWidth: 2,
        },
        background: {
            stripeDistance: 16,
            stripeOffset: 3
        }
    }

    constructor(elem: HTMLCanvasElement, isInput: boolean = false) {
        this.elem = elem
        this.ctx = this.elem.getContext('2d')!
        this.calcDPI(this.ctx)
        this.ctx.imageSmoothingEnabled = this.options.drawing.blur
        this.generateBackground(this.ctx)
        this.elem.addEventListener("mousemove", e => {
            if (e.buttons !== 1) return
            const toX = e.offsetX, toY = e.offsetY, fromX = toX - e.movementX, fromY = toY - e.movementY;
            this.strokeLine(this.ctx, fromX, fromY, toX, toY);
        })
        //FIXME
        // - Send Button functionality
        // - Get Button functionality
        if (!isInput) return
        document.getElementById("reset")!.addEventListener("click", () => {
            this.clearCanvas(this.ctx);
            this.generateBackground(this.ctx)
        })
    }

    protected calcDPI(ctx: CanvasRenderingContext2D) {
        const dpr = window.devicePixelRatio || 1; //Display Pixel Ratio
        const rect = ctx.canvas.getBoundingClientRect();
        ctx.canvas.width = rect.width * dpr;
        ctx.canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }

    protected generateBackground(ctx: CanvasRenderingContext2D) {
        if (ctx.canvas == null) throw Error("[function generateBackground] canvas is null")

        const distance = this.config.background.stripeDistance,
            offset = this.config.background.stripeOffset,
            lineCount = Math.floor(ctx.canvas.height / distance);

        this.clearCanvas(ctx)

        ctx.strokeStyle = "lightGrey"
        ctx.lineWidth = 1

        // Draw background stripes
        for (let index = 1; index < lineCount; index++) {
            let offsetY = distance * index + offset;
            this.strokeLine(ctx, 0, offsetY, ctx.canvas.width, offsetY)
        }

        // Frame Border
        ctx.strokeStyle = this.options.drawing.color
        ctx.lineWidth = 2 * this.config.frame.borderWidth

        this.strokeRoundedRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, 5)
    }

    private clearCanvas(ctx: CanvasRenderingContext2D) {
        if (ctx.canvas == null) throw Error("[function clearCanvas] canvas is null")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    private strokeLine(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
        ctx.beginPath()
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.closePath();
        ctx.stroke();
    }

    private strokeRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.closePath();
        ctx.stroke();
    }

    //TODO Create new functions
    // - for sending new Pictures
    // - and receiving past once
}