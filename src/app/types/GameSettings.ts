export interface GameSettings {
    /**
     * probability of a cell being set
     */
    difficulty: number, 
    /**
     * side length of the grid
     */
    gridSize: number,
    /**
     * number of allowed wrong moves.
     * if equal to -1, ignore
     */
    errorLimit: number,
    enableScore: boolean
};