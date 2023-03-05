'use strict';

const debug = false;

const isSafePosition = (solution, position) => {
    for (let i = 0; i < position.row; i++) {
        const position_i = solution[i];
        const inTheSameRow = position_i.column === position.column;
        const inTheDiagonal =
            Math.abs(position_i.column - position.column) === Math.abs(position_i.row - position.row);
        const isDanger = inTheSameRow || inTheDiagonal;
        if (isDanger) {
            return false;
        }
    }
    return true;
}

const getNextSpotFromLastSafePosition = (solution, position ) => {
    debug && console.log('gns', position);
    if (!position) {
        return null;
    }

    let newPosition = { ...position };

    if (newPosition.column < 7) {
        newPosition.column++;
    } else {
        const param = solution.pop();
        if (newPosition.row >= 0) {
            newPosition = getNextSpotFromLastSafePosition(solution, param);
        } else {
            newPosition = null;
        }
    }

    return newPosition;
}

function isNotASolution(position, solution, safePosition) {
    if (!!position && solution.length < 8 && position.row > -1) {
        return true;
    }
    if (solution.length === 8 && !safePosition) {
        return true;
    }
    return false;
}

const eightQueens = () => {
    const eightQueensSolutions = [];

    const solution = [];
    let position = { row: 0, column: 0 };

    // this loop repeats for every new solution
    // until all solutions are found
    while (!!position) { // do until next position cannot be found
        let safePosition = false;

        do { // loop to find a single solution
            debug && console.log('check if position is safe', position, solution);
            safePosition = isSafePosition(solution, position);

            debug && console.log('is position safe?', safePosition);
            if (safePosition){
                solution.push({ ...position });
                position.column = 0;
                position.row++;
            } else {
                position = getNextSpotFromLastSafePosition(solution, position);
            }
        } while (isNotASolution(position, solution, safePosition));

        debug && console.log('A solution?', solution);

        // inner loop is exit when
        // a) a solution is found, or
        // b) there are no more positions to explore
        if(!!position) {
            eightQueensSolutions.push([...solution]);
            position = getNextSpotFromLastSafePosition(solution, { ...solution[7] });
        }
    }

    return eightQueensSolutions;
}

const safeArrangements = eightQueens();
safeArrangements.forEach((arrangement, index) => {
    console.log(index, arrangement);
})
