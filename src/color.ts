import toRadians from './toRadians';
import toDegrees from './toDegrees';

//#region RGB
export class RGB {
    constructor(public r: number, public g: number, public b: number) {
    }

    public compareTo(that: RGB): number {
        const rmean  = (this.r + that.r) / 2;
        const r      = this.r - that.r;
        const g      = this.g - that.g;
        const b      = this.b - that.b;
        return Math.sqrt(((2 + (rmean / 256)) * r * r) + (4 * g * g) + ((2 + ((255 - rmean) / 256)) * b * b));

        //return this.toXYZ().toLAB().compareTo(that.toXYZ().toLAB());
    }

    public toHSL(): HSL {
        const r     = this.r / 255;
        const g     = this.g / 255;
        const b     = this.b / 255;
        const min   = Math.min(r, g, b);
        const max   = Math.max(r, g, b);
        const delta = max - min;
        let   h     = 0;
        let   s     = 0;
        const l     = (max + min) / 2;

        if(delta !== 0) {       //gray
            //Chromatic
            if(l < 0.5) s = delta / (max + min);
            else        s = delta / (2 - max - min);

            const deltaR = (((max - r) / 6) + (max / 2)) / max;
            const deltaG = (((max - g) / 6) + (max / 2)) / max;
            const deltaB = (((max - b) / 6) + (max / 2)) / max;

            if(r === max)
                h = deltaB - deltaG;
            else if(g === max)
                h = (1 / 3) + deltaR - deltaB;
            else if(b === max)
                h = (2 / 3) + deltaG - deltaR;

            if(h < 0) h += 1;
            if(h > 1) h -= 1;
        }

        return new HSL(h, s, l);
    }

    public toHSV(): HSV {
        const r     = (this.r / 255);
        const g     = (this.b / 255);
        const b     = (this.b / 255);
        const min   = Math.min(r, g, b);
        const max   = Math.max(r, g, b);
        const delta = max - min;
        let   h     = 0;
        let   s     = 0;
        const v     = max;

        if(delta !== 0) {                    //gray
            //chromatic
            s = delta / max;

            const deltaR = (((max - r) / 6) + (max / 2)) / max;
            const deltaG = (((max - g) / 6) + (max / 2)) / max;
            const deltaB = (((max - b) / 6) + (max / 2)) / max;

            if(r === max)
                h = deltaB - deltaG;
            else if(g === max)
                h = deltaR - deltaB + (1 / 3);
            else if(b === max)
                h = deltaG - deltaR + (2 / 3);

            if(h < 0) h += 1;
            if(h > 1) h -= 1;
        }

        return new HSV(h, s, v);
    }

    public toXYZ(): XYZ {
        let r = this.r / 255;
        let g = this.g / 255;
        let b = this.b / 255;

        if(r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4) * 100; else r = r / 0.1292;
        if(g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4) * 100; else g = g / 0.1292;
        if(b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4) * 100; else b = b / 0.1292;

        const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
        const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
        const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

        return new XYZ(x, y, z);
    }

    public toLAB(): LAB {
        return this.toXYZ().toLAB();
    }
}
//#endregion
//#region HSL
export class HSL {
    constructor(public h: number, public s: number, public l: number) {
    }

    public toRGB(): RGB {
        let r = 0;
        let g = 0;
        let b = 0;

        if(this.s === 0) {
            r = this.l * 255;
            g = this.l * 255;
            b = this.l * 255;
        } else {
            const v2 = (this.l < 0.5) ? this.l * (1 + this.s) : (this.l + this.s) - (this.s * this.l);
            const v1 = 2 * this.l - v2;

            r = 255 * hue2RGB(v1, v2, this.h + (1 / 3));
            g = 255 * hue2RGB(v1, v2, this.h);
            b = 255 * hue2RGB(v1, v2, this.h - (1 / 3));
        }

        return new RGB(r, g, b);
    }
}
//#endregion
//#region HSV
export class HSV {
    constructor(public h: number, public s: number, public v: number) {
    }

    public toRGB(): RGB {
        let r    = 0;
        let g    = 0;
        let b    = 0;

        if(this.s === 0) {
            r = this.v * 255;
            g = this.v * 255;
            b = this.v * 255;
        } else {
            let   h  = this.h * 6;    if(h === 6) h = 0;      //h must be < 1
            const i  = Math.floor(h);
            const v1 = this.v * (1 - this.s);
            const v2 = this.v * (1 - this.s * (h - i));
            const v3 = this.v * (1 - this.s * (1 - (h - i)));

            if(i === 0) {
                r = this.v;    g = v3;        b = v1;
            } else if(i === 1) {
                r = v2;        g = this.v;    b = v1;
            } else if(i === 2) {
                r = v1;        g = this.v;    b = v3;
            } else if(i === 3) {
                r = v1;        g = v2;        b = this.v;
            } else if(i === 4) {
                r = v3;        g = v1;        b = this.v;
            } else {
                r = this.v;    g = v1;        b = v2;
            }
        }

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return new RGB(r, g, b);
    }
}
//#endregion
//#region XYZ
export class XYZ {
    constructor(public x: number, public y: number, public z: number) {
    }

    public toLAB(): LAB {
        let x = this.x / 95.047;
        let y = this.y / 100;
        let z = this.z / 108.883;

        if(x > 0.008856) x = Math.pow(x, 1 / 3); else x = (7.787 * x) + (16 / 116);
        if(y > 0.008856) y = Math.pow(y, 1 / 3); else y = (7.787 * y) + (16 / 116);
        if(z > 0.008856) z = Math.pow(z, 1 / 3); else z = (7.787 * z) + (16 / 116);

        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);

        return new LAB(l, a, b);
    }
}
//#endregion
//#region LAB
export class LAB {
    constructor(public l: number, public a: number, public b: number) {
    }

    //function cieLab2Hue(a, b) {            //Function returns CIE-H° value
    //    let bias = 0
    //    if(a >= 0 && b == 0 ) return 0;
    //    if(a <  0 && b == 0 ) return 180;
    //    if(a == 0 && b >  0 ) return 90;
    //    if(a == 0 && b <  0 ) return 270;
    //    if(a >  0 && b >  0 ) bias = 0;
    //    if(a <  0           ) bias = 180;
    //    if(a >  0 && b <  0 ) bias = 360;
    //    return toDegrees( Math.atan( b / a ) ) + bias;

    public compareTo(that: LAB) {
        //let c1    = Math.sqrt((this.a*this.a) + (this.b*this.b));
        //let c2    = Math.sqrt((that.a*that.a) + (that.b*that.b));
        //let dc    = c1-c2;
        //let dl    = this.l - that.l;
        //let da    = this.a - that.a;
        //let db    = this.b - that.b;
        //let dh    = Math.sqrt((da*da) + (db*db) + (dc*dc));
        //let v1    = dl;
        //let v2    = dc / (1+(0.045 * c1));
        //let v3    = dh / (1+(0.015 * c1));
        //return Math.sqrt((v1*v1) + (v2*v2) + (v3*v3));
        return this.deltaE1994(that);
    }

    public deltaE(that: LAB) {
        return Math.sqrt(Math.pow(this.l - that.l, 2) + Math.pow(this.a - that.b, 2) + Math.pow(this.b - that.b, 2));
    }

    public deltaE1994(that: LAB) {
        const wL = 1.00;
        const wC = 1.00;
        const wH = 1.00;

        const c1 = Math.sqrt((this.a * this.a) + (this.b * this.b));
        const c2 = Math.sqrt((that.a * that.a) + (that.b * that.b));
        let   dl = this.l - that.l;
        let   dc = c1 - c2;
        const de = Math.sqrt(Math.pow(this.l - that.l, 2) + Math.pow(this.a - that.a, 2) + Math.pow(this.b - that.b, 2));
        let   dh = (Math.sqrt(de) > (Math.sqrt(Math.abs(dl)) + Math.sqrt(Math.abs(dc))))
            ? Math.sqrt((de * de) + (dl * dl) + (dc * dc))
            : 0;
        const sc = 1 + (0.045 * c1);
        const sh = 1 + (0.015 * c1);

        dl /= wL;
        dc /= wC * sc;
        dh /= wH * sh;

        return Math.sqrt((dl * dl) + (dc * dc) + (dh * dh));
    }

    public deltaE2000(that: LAB) {
        //let wL        = 1.00;
        //let wC        = 1.00;
        //let wH        = 1.00;

        //let c1        = Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.b, 2));
        //let c2        = Math.sqrt(Math.pow(that.a, 2) + Math.pow(that.b, 2));
        //let cx        = (c1 + c2)/2;
        //let gx        = 0.5 * (1 - Math.sqrt(Math.pow(cx, 7) / (Math.pow(cx, 7) + Math.pow(25, 7))));
        //let nn        = (1 + gx) * this.a;
        //c1            = Math.sqrt(Math.pow(nn, 2) + Math.pow(this.b, 2));
        //let h1        = cieLab2Hue(nn, this.b);
        //nn            = (1 + gx) * that.a;
        //c2            = Math.sqrt(Math.pow(nn, 2) + Math.pow(that.b, 2));
        //let h2        = cieLab2Hue(nn, that.b);
        //let dl        = that.l - this.l;
        //let dc        = c2 - c1;
        //let dh;

        //if((c1 * c2) === 0)
        //    dh = 0;
        //else
        //{
        //    nn = /*round12*/h2 - h1;
        //    if(Math.abs(nn) <= 180)
        //        dh = h2 - h1;
        //    else
        //    if(nn > 180)
        //        dh = h2 - h1 - 360;
        //    else
        //        dh = h2 - h1 + 360;
        //}
        //dh            = 2 * Math.sqrt(c1 * c2) * Math.sin(toRadians(dh/2));
        //let lx        = (this.l + that.l) / 2;
        //let cy        = (c1 + c2) / 2;
        //let hx;

        //if((c1*c2) === 0)
        //    hx = h1 + h2;
        //else
        //{
        //    nn = Math.abs(/*round12*/h1 - h2);
        //    if(nn > 180)
        //    {
        //        if((h2 + h1) < 360)
        //            hx = h1 + h2 + 360;
        //        else
        //            hx = h1 + h2 - 360;
        //    }
        //    else
        //        hx = h1 + h2;
        //    hx /= 2;
        //}

        //let tx    = 1 - (0.17 * (Math.cos(toRadians(hx - 30))     + 0.24)
        //                    * (Math.cos(toRadians(hx * 2))      + 0.32)
        //                    * (Math.cos(toRadians(hx * 3 + 6))  - 0.20)
        //                    * (Math.cos(toRadians(hx * 4 - 63))));
        //let ph    = 30 * Math.exp( -Math.pow((hx - 275)/25, 2) );
        //let rc    = 2 * Math.sqrt(Math.pow(cy, 7)/(Math.pow(cy, 7) + Math.pow(25, 7)));
        //let sl    = 1 + ((0.015 * Math.pow(lx-50, 2) / Math.sqrt(20 + Math.pow(lx-50, 2))));
        //let sc    = 1 + (0.045 * cy);
        //let sh    = 1 + (0.015 * cy * tx);
        //let rt    = -Math.sin(toRadians(2*ph)) * rc;
        //dl        = dl / (wL * sl);
        //dc        = dc / (wC * sc);
        //dh        = dh / (wH * sh);

        //return Math.sqrt(Math.pow(dl, 2) + Math.pow(dc, 2) + (rt*dc*dh));

        const c1  = Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.b, 2));
        const c2  = Math.sqrt(Math.pow(that.a, 2) + Math.pow(that.b, 2));

        const c_  = (c1 + c2) / 2.0;

        const g   = 0.5 * (1 - Math.sqrt(Math.pow(c_, 7) / (Math.pow(c_, 7) + Math.pow(25, 7))));

        const a1$ = (1.0 + g) * this.a;
        const a2$ = (1.0 + g) * this.b;

        const c1$ = Math.sqrt(Math.pow(a1$, 2) + Math.pow(this.b, 2));
        const c2$ = Math.sqrt(Math.pow(a2$, 2) + Math.pow(that.b, 2));

        let h1$;
        if(this.b === 0 && a1$ === 0) { h1$ = 0; } else {
            h1$ = toDegrees(Math.atan2(this.b, a1$));
            if(h1$ < 0)
                h1$ += 360;
        }

        let h2$;
        if(that.b === 0 && a2$ === 0) { h2$ = 0; } else {
            h2$ = toDegrees(Math.atan2(that.b, a2$));
            if(h2$ < 0)
                h2$ += 360;
        }

        const dl$ = that.l - this.l;

        const dc$ = c2$ - c1$;

        let dh$;
        if((c1$ * c2$) === 0) { dh$ = 0; } else {
            dh$ = h2$ - h1$;
            if(dh$ < -180)
                dh$ += 360;
            else if(dh$ > 180)
                dh$ -= 360;
        }
        dh$ = 2 * Math.sqrt(c1$ * c2$) * Math.sin(toRadians(dh$ / 2));

        const l_$ = (this.l + that.l) / 2;
        const c_$ = (c1$ + c2$) / 2;

        let h_$;
        if((c1$ * c2$) === 0)  h_$ = h1$ + h2$;  else if(Math.abs(h1$ - h2$) < 180)  h_$ = (h1$ + h2$) / 2;  else if((h1$ + h2$) < 360)
            h_$ = (h1$ + h2$ + 360) / 2;
        else
            h_$ = (h1$ + h2$ - 360) / 2;

        const t  = 1 - (0.17 * Math.cos(h_$ - toRadians(30)))    +
                        (0.24 * Math.cos(toRadians(2 * h_$)))     +
                        (0.32 * Math.cos(toRadians(3 * h_$ + 6))) +
                        (0.20 * Math.cos(toRadians(4 * h_$ - 63)));
        const dt = 30 * toDegrees(Math.exp(-Math.pow(toRadians((h_$ - 275) / 25), 2)));
        const rc = 2 * Math.sqrt(Math.pow(c_$, 7) / (Math.pow(c_$, 7) + Math.pow(25, 7)));
        const sl = 1 + ((0.015 * Math.pow(l_$ - 50, 2)) / Math.sqrt(20 + Math.pow(l_$ - 50, 2)));
        const sc = 1 + (0.045 * c_$);
        const sh = 1 + (0.015 * c_$ * t);
        const rt = -Math.sin(toRadians(2 * dt)) * rc;

        return Math.sqrt(
            Math.pow(dl$ / (Number(sl)), 2) +
            Math.pow(dc$ / (Number(sc)), 2) +
            Math.pow(dh$ / (Number(sh)), 2) +
            (rt + (dc$ / (Number(sc))) * (dh$ / (Number(sh))))
        );
    }

    public toXYZ(): XYZ {
        let y = (this.l + 16) / 116;
        let x = (this.a / 500) + y;
        let z = y - (this.b / 200);

        if(y * y * y > 0.008856) y = y * y * y; else y = (y - 16 / 116) / 7.787;
        if(x * x * x > 0.008856) x = x * x * x; else x = (x - 16 / 116) / 7.787;
        if(z * z * z > 0.008856) z = z * z * z; else z = (z - 16 / 116) / 7.787;

        return new XYZ(x * 95.047, y * 100.000, z * 108.883);
    }
}
//#endregion
//#region Support...
function hue2RGB(v1: number, v2: number, vH: number): number {
    if(vH < 0) vH += 1;
    if(vH > 1) vH -= 1;
    if((6 * vH) < 1) return (v1 + (v2 - v1) * 6 * vH);
    if((2 * vH) < 1) return (v2);
    if((3 * vH) < 2) return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
    return (v1);
}
//#endregion

export default { RGB, HSL, HSV, XYZ, LAB };
