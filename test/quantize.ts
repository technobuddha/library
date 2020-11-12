import 'mocha';
import { expect } from 'chai';
import Jimp       from 'jimp';
import quantize, {RGB}   from '../quantize';

const start = Date.now();

(async () => {
    const image = await Jimp.read('/home/phil/Development/library/test/rainbow.png');

    console.log('read', Date.now() - start);
    const pixels: RGB[] = [];
    
    for(let x = 0; x < image.bitmap.width; ++x) {
        for(let y = 0; y < image.bitmap.height; ++y) {
            const p = image.getPixelColor(x, y);
            const {r,g,b} = {r: (p & 0xFF000000) >>> 24, g: (p & 0x00FF0000) >>> 16, b: (p & 0x0000FF00) >>> 8};
    
            pixels.push({r,g,b});
        }
    }
    console.log('extract', Date.now() - start);
    
    const res = quantize(pixels, 64);
    
    console.log('quantize', Date.now() - start);
    
    for(let x = 0; x < image.bitmap.width; ++x) {
        for(let y = 0; y < image.bitmap.height; ++y) {
            const p = image.getPixelColor(x, y);
            const {r, g, b} = res.map({r: (p & 0xFF000000) >>> 24, g: (p & 0x00FF0000) >>> 16, b: (p & 0x0000FF00) >>> 8});
    
            image.setPixelColor((r << 24 | g << 16 | b << 8 | 0x000000FF) >>> 0, x, y);
        }
    }
    
    console.log('write', Date.now() - start);
    
    image.writeAsync('/home/phil/Development/library/test/rainbow64.png');
    console.log(res.palette()[0])
    
    describe(
        'quantize',
        () => {
            it(
                'Fail!',
                () => {
                    expect(0).to.equal(1);
                }
            );
        }
    );
})();



