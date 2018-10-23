interface FramesInterface {
    filename: string;
    frame: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    anchor: {
        x: number;
        y: number;
    };
}
export interface AtlasJsonInterface {
    frames: FramesInterface[];
    meta: {
        description: string;
        web: string;
    };
}
