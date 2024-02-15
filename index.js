//From 1 to maximum
const MAX_NORMAL_NUMBERS = 39;

//Number to draw
const NUM_NORMAL_NUMBERS = 5;

//If static numbers true, use these every time (no lucky dip)
const sameNumbersMain = [2, 11, 18, 35, 40];

const playLotto = (useStaticNumbers) => {
    let matchCounts = {
        zero: 0,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
    };

    let matches = 0; 
    let currentNumbers;

    //Not matched all numbers
    while (matches < NUM_NORMAL_NUMBERS) {
        //If lucky dip, create new numbers, otherwise use the static ones
        const mainNumbers = useStaticNumbers? sameNumbersMain : generateNumbers(NUM_NORMAL_NUMBERS);

        //Make the draw
        const mainNumbersDrawn = generateNumbers(NUM_NORMAL_NUMBERS);

        matches = checkAllNumbers(mainNumbers, mainNumbersDrawn);

        switch (matches) {
            case 0:
                matchCounts.zero++;
                break;
            case 1:
                matchCounts.one++;
                break;
            case 2:
                matchCounts.two++;
                break;
            case 3:
                matchCounts.three++;
                break;
            case 4:
                matchCounts.four++;
                break;
            case 5:
                matchCounts.five++;
                break;
            case 6:
                matchCounts.six++;
                break;
            
        }

        currentNumbers = mainNumbers;
    }

    console.log('You finally won! The winning numbers are: ', currentNumbers);
    console.log('You got zero numbers ' + matchCounts.zero + ' times.')
    console.log('You got one numbers ' + matchCounts.one + ' times.')
    console.log('You got two numbers ' + matchCounts.two + ' times.')
    console.log('You got three numbers ' + matchCounts.three + ' times.')
    console.log('You got four numbers ' + matchCounts.four + ' times.')
    console.log('You got five numbers ' + matchCounts.five + ' times.')

};

//Generate a set of unique numbers
const generateNumbers = (totalNumbers) => {
    let numbers = [];

    for (let i = 0; i < totalNumbers; i++) {
        let number = drawNumber(MAX_NORMAL_NUMBERS);

        if (numbers.length === 0) {
            numbers.push(number);

            continue;
        }

        while (isDuplicate(numbers, number)) {
            number = drawNumber(MAX_NORMAL_NUMBERS);
        }

        numbers.push(number);
    }

    numbers.sort((a, b) => a - b);

    return numbers;

};

//Get random number
const drawNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
};


const isDuplicate = (numbers, number) => {
    for (let i = 0; i < numbers.length; i++) {
        const currentNumber = numbers[i];

        if (currentNumber === number) {
            return true;
        }

    }
    return false;
};

const checkAllNumbers = (mainNumbers, mainNumbersDrawn) => {
    const mainMatches = checkNumbers(mainNumbers, mainNumbersDrawn);

    return mainMatches;
};

const checkNumbers = (numbers, drawnNumbers) => {
    let matchCounter = 0;

    //Count number of matches
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];

        for (let i = 0; i < drawnNumbers.length; i++) {
            const numDrawn = drawnNumbers[i];

            if (num === numDrawn) {
                matchCounter++;
                break;
            }

        }

    }

    return matchCounter;
}

playLotto(true);