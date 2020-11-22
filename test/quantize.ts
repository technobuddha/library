import 'mocha';
//import { expect } from 'chai';
import Jimp       from 'jimp';
import quantize, {RGB}   from '../src/quantize';


(async () => {
    const image = await Jimp.read('/home/phil/Development/library/test/rainbow.png');

    const pixels: RGB[] = [];
    
    for(let x = 0; x < image.bitmap.width; ++x) {
        for(let y = 0; y < image.bitmap.height; ++y) {
            const p = image.getPixelColor(x, y);
            const {r,g,b} = {r: (p & 0xFF000000) >>> 24, g: (p & 0x00FF0000) >>> 16, b: (p & 0x0000FF00) >>> 8};
    
            pixels.push({r,g,b});
        }
    }
    
    const res = quantize(pixels, 64);
    
    
    for(let x = 0; x < image.bitmap.width; ++x) {
        for(let y = 0; y < image.bitmap.height; ++y) {
            const p = image.getPixelColor(x, y);
            const {r, g, b} = res.map({r: (p & 0xFF000000) >>> 24, g: (p & 0x00FF0000) >>> 16, b: (p & 0x0000FF00) >>> 8});
    
            image.setPixelColor((r << 24 | g << 16 | b << 8 | 0x000000FF) >>> 0, x, y);
        }
    }
    
    
    image.writeAsync('/home/phil/Development/library/test/rainbow64.png');
    
    describe(
        'quantize',
        () => {
            it(
                'Fail!',
                () => {
                    //expect(0).to.equal(1);
                }
            );
        }
    );
})();



