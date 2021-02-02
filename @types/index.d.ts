 declare global {
    var foobar: string;
    var bletch: Date;

    namespace jest {
        interface Matchers<R> {
            toBeDeepCloseTo() : R;
 	        toMatchCloseTo()  : R;
        }
    }
}

export {}
