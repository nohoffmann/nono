import { CellCoordinate } from './CellCoordinate';

export interface Hint {
    length: number;
    done: boolean;
    start: CellCoordinate;
    end: CellCoordinate;
};
