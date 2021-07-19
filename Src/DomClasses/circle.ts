export enum Direction {
    Left,
    Right
}

export interface Circle{
    dom:HTMLDivElement,
    x:number,
    y:number,
    step:number,
    direction:Direction,
    slope:number
}