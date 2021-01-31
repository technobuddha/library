import { compareNumbers } from './compareNumbers';
import PriorityQueue    from './priority-queue';

// TODO THis needs cleanup, and consolidation of the comments and copyright notices

/*
 * quantize.js Copyright 2008 Nick Rabinowitz
 * Ported to node.js by Olivier Lesnicki
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Basic Javascript port of the MMCQ (modified median cut quantization)
 * algorithm from the Leptonica library (http://www.leptonica.com/).
 * Returns a color map you can use to map original pixels to the reduced
 * palette. Still a work in progress.
 *
 * @author Nick Rabinowitz
 * @example
 */

const SIGNIFICANT_BITS      = 5;
const SHIFT                 = 8 - SIGNIFICANT_BITS;
const MAX_ITERATIONS        = 1000;
const FRACTION_POPULATIONS  = 0.75;

//#region RGB
export type RGB = { r: number; g: number; b: number };
//#endregion
//#region VBox
class VBox {
    constructor(public min: RGB, public max: RGB, public histogram: Histogram) {
    }

    private cachedVolume:     null | number  = null;
    private cachedCount:      null | number  = null;
    private cachedColorCount: null | number  = null;
    private cachedAvg:        null | RGB     = null;

    public copy() {
        return new VBox({ ...this.min }, { ...this.max }, this.histogram);
    }

    public volume() {
        if(this.cachedVolume === null)
            this.cachedVolume = ((this.max.r - this.min.r + 1) * (this.max.g - this.min.g + 1) * (this.max.b - this.min.b + 1));

        return this.cachedVolume;
    }

    public pixelCount() {
        if(this.cachedCount === null) {
            let nPixels = 0;
            for(let { r } = this.min; r <= this.max.r; r++) {
                for(let { g } = this.min; g <= this.max.g; g++) {
                    for(let { b } = this.min; b <= this.max.b; b++)
                        nPixels += this.histogram.get(r, g, b);
                }
            }
            this.cachedCount = nPixels;
        }
        return this.cachedCount;
    }

    public colorCount() {
        if(this.cachedColorCount === null) {
            let nColors = 0;
            for(let { r } = this.min; r <= this.max.r; r++) {
                for(let { g } = this.min; g <= this.max.g; g++) {
                    for(let { b } = this.min; b <= this.max.b; b++)
                        nColors += this.histogram.get(r, g, b) === 0 ? 0 : 1;
                }
            }
            this.cachedColorCount = nColors;
        }
        return this.cachedColorCount;
    }

    public averageColor() {
        if(this.cachedAvg === null) {
            const mult = 1 << SHIFT;
            let   sum  = 0;
            let   sumR = 0;
            let   sumG = 0;
            let   sumB = 0;

            for(let { r } = this.min; r <= this.max.r; r++) {
                for(let { g } = this.min; g <= this.max.g; g++) {
                    for(let { b } = this.min; b <= this.max.b; b++) {
                        const hval = this.histogram.get(r, g, b);
                        sum  += hval;
                        sumR += (hval * (r + 0.5) * mult);
                        sumG += (hval * (g + 0.5) * mult);
                        sumB += (hval * (b + 0.5) * mult);
                    }
                }
            }

            if(sum)
                this.cachedAvg = { r: ~~(sumR / sum), g: ~~(sumG / sum), b: ~~(sumB / sum) };
            else
                this.cachedAvg = { r: ~~(mult * (this.min.r + this.max.r + 1) / 2), g: ~~(mult * (this.min.g + this.max.g + 1) / 2), b: ~~(mult * (this.min.b + this.max.b + 1) / 2) };
        }
        return this.cachedAvg;
    }

    public contains(pixel: RGB) {
        const r = pixel.r >> SHIFT;
        const g = pixel.g >> SHIFT;
        const b = pixel.b >> SHIFT;

        return (
            r >= this.min.r && r <= this.max.r &&
            g >= this.min.g && g <= this.max.g &&
            b >= this.min.b && b <= this.max.b
        );
    }

    public static fromPixels(pixels: RGB[], histogram: Histogram) {
        let rmin = 255 >> SHIFT;
        let rmax = 0;
        let gmin = 255 >> SHIFT;
        let gmax = 0;
        let bmin = 255 >> SHIFT;
        let bmax = 0;

        for(const pixel of pixels) {
            const r = pixel.r >> SHIFT;
            const g = pixel.g >> SHIFT;
            const b = pixel.b >> SHIFT;

            if(r < rmin) rmin = r;
            if(r > rmax) rmax = r;

            if(g < gmin) gmin = g;
            if(g > gmax) gmax = g;

            if(b < bmin) bmin = b;
            if(b > bmax) bmax = b;
        }

        return new VBox({ r: rmin, g: gmin, b: bmin }, { r: rmax, g: gmax, b: bmax }, histogram);
    }
}
//#endregion
//#region ColorMap
type ColorData = {
    vbox: VBox;
    color: RGB;
};

class ColorMap {
    constructor(queue: PriorityQueue<VBox>) {
        this.data = new PriorityQueue<ColorData>(
            (a, b) => compareNumbers(b.vbox.pixelCount(), a.vbox.pixelCount()),
            queue.map(q => ({ vbox: q, color: q.averageColor() }))
        );
    }

    private readonly data: PriorityQueue<ColorData>;

    public palette() {
        return this.data.map(vb => vb.color);
    }

    public get size() {
        return this.data.size;
    }

    public map(color: RGB) {
        for(const datum of this.data) {
            if(datum.vbox.contains(color))
                return datum.color;
        }
        return this.nearest(color);
    }

    public nearest(color: RGB) {
        let diff                = Infinity;
        let pColor: RGB | null  = null;

        for(const datum of this.data) {
            const d = Math.sqrt((datum.color.r - color.r) ** 2 +
                                (datum.color.g - color.g) ** 2 +
                                (datum.color.b - color.b) ** 2);

            if(d < diff) {
                diff = d;
                pColor = datum.color;
            }
        }
        return pColor;
    }
}
//#endregion
//#region Histogram
class Histogram {
    constructor(pixels: RGB[]) {
        this.histogram = new Array<number>(1 << (3 * SIGNIFICANT_BITS)).fill(0);

        for(const pixel of pixels)
            this.histogram[Histogram.getColorIndex(pixel.r >> SHIFT, pixel.g >> SHIFT, pixel.b >> SHIFT)] += 1;
    }

    private readonly histogram: number[];

    public get(r: number, g: number, b: number) {
        return this.histogram[Histogram.getColorIndex(r, g, b)] || 0;
    }

    public colors() {
        return this.histogram.reduce((a, v) => a + (v > 0 ? 1 : 0), 0);
    }

    private static getColorIndex(r: number, g: number, b: number) {
        return (r << (2 * SIGNIFICANT_BITS)) + (g << SIGNIFICANT_BITS) + b;
    }
}
//#endregion
//#region medianCut
function medianCut(histo: Histogram, vbox: VBox) {
    const deltar = vbox.max.r - vbox.min.r + 1;
    const deltag = vbox.max.g - vbox.min.g + 1;
    const deltab = vbox.max.b - vbox.min.b + 1;
    const maxw   = Math.max(deltar, deltag, deltab);

    /* Find the partial sum arrays along the selected axis. */
    let   total                  = 0;
    let   color: 'r' | 'g' | 'b';
    const partialsum: number[]   = [];

    if(maxw === deltar) {
        for(let { r } = vbox.min; r <= vbox.max.r; r++) {
            for(let { g } = vbox.min; g <= vbox.max.g; g++) {
                for(let { b } = vbox.min; b <= vbox.max.b; b++)
                    total += histo.get(r, g, b);
            }
            partialsum[r] = total;
        }
        color = 'r';
    } else if(maxw === deltag) {
        for(let { g } = vbox.min; g <= vbox.max.g; g++) {
            for(let { r } = vbox.min; r <= vbox.max.r; r++) {
                for(let { b } = vbox.min; b <= vbox.max.b; b++)
                    total += histo.get(r, g, b);
            }
            partialsum[g] = total;
        }
        color = 'g';
    } else { /* maxw == bw */
        for(let { b } = vbox.min; b <= vbox.max.b; b++) {
            for(let { r } = vbox.min; r <= vbox.max.r; r++) {
                for(let { g } = vbox.min; g <= vbox.max.g; g++)
                    total += histo.get(r, g, b);
            }
            partialsum[b] = total;
        }
        color = 'b';
    }

    let vbox1: VBox | null = vbox.copy();
    let vbox2: VBox | null = vbox.copy();

    for(let i = vbox.min[color]; i <= vbox.max[color]; i++) {
        if(partialsum[i] > total / 2) {
            const left  = i - vbox.min[color];
            const right = vbox.max[color] - i;

            const d2    = (left <= right)
                ? Math.min(vbox.max[color] - 1, ~~((i + vbox.max[color]) / 2))
                : Math.max(vbox.min[color],     ~~((vbox.min[color] + i) / 2));

            // set dimensions
            vbox1.max[color] = d2;
            vbox2.min[color] = d2 + 1;

            if(vbox2.colorCount() === 0)
                vbox2 = null;

            if(vbox1.colorCount() === 0) {
                vbox1 = vbox2;
                vbox2 = null;
            }

            break;
        }
    }

    return [ vbox1, vbox2 ];
}
//#endregion
//#region quantize
export function quantize(pixels: RGB[], maxcolors: number) {
    if(!pixels.length || maxcolors < 2 || maxcolors > 256)
        return undefined;

    // TODO: check color content and convert to grayscale if insufficient

    const histogram = new Histogram(pixels);

    // check that we aren't below maxcolors already
    const nColors = histogram.colors();
    if(nColors <= maxcolors) {
        // TODO: generate the new colors from the histo and return
    }

    // get the beginning vbox from the colors
    const vb = VBox.fromPixels(pixels, histogram);
    const pq   = new PriorityQueue<VBox>((a, b) => compareNumbers(b.colorCount(), a.colorCount()));
    pq.push(vb);

    // inner function to do the iteration
    function split(target: number) {
        let numColors   = pq.size;
        let nIterations = 0;

        while(nIterations < MAX_ITERATIONS) {
            if(nIterations++ > MAX_ITERATIONS || numColors >= target)
                break;

            const vbox = pq.pop();
            if(vbox?.pixelCount()) {
                // do the cut
                const vboxes = medianCut(histogram, vbox)!;
                const [ vbox1, vbox2 ]  = vboxes;

                if(vbox1) {
                    pq.push(vbox1);
                    if(vbox2) {
                        pq.push(vbox2);
                        numColors++;
                    }
                }
            }
        }
    }

    // first set of colors, sorted by population
    split(FRACTION_POPULATIONS * maxcolors);

    // Re-sort by the product of pixel occupancy times the size in color space.
    pq.reorder((a, b) => compareNumbers(b.colorCount() * b.volume(), a.colorCount() * a.volume()));

    // next set - generate the median cuts using the (npix * vol) sorting.
    split(maxcolors);

    // calculate the actual colors
    return new ColorMap(pq);
}
//#endregion

export default quantize;
