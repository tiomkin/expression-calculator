function eval() {
    // Do not use eval!!!
    return;
}

// let expr = '1 + 2) * 3';
// expressionCalculator(expr);

function expressionCalculator(expr) {
    // write your solution here

    expr = expr.replace(/\s+/g, '');

    //console.log(`Expr after replace: ${expr}`);
    let converted = convertToRpn(expr);  
    if (converted == - 1) throw new Error('ExpressionError: Brackets must be paired');
    //console.log(`Converted expr: ${converted}`); 
    let numStack = [];

    for (let i = 0; i < converted.length; i++) {
        let current = converted[i];
        if (!isNaN(current)) {
            numStack.push(current);
        }
        else {
            // let first = +converted[i - 2];
            let second = numStack.pop();
            let first = numStack.pop();
            // let second = +converted[i - 1];
            let result = operation(first, second, current);
            numStack.push(result);
        }
    }

    let result = numStack[0];

    return result;

    
}

function operation(a, b, operator) {    
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) throw TypeError("TypeError: Division by zero.");
            return a / b;
    }
}

function convertToRpn(expr) {
    let newExpr = stringToNum(expr);
    let output = [];
    let stack = [];
    const BINARY_OPERATORS = '+-*/';
    const PRIORITY = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }
    for (let i = 0; i < newExpr.length; i++) {
        let current = newExpr[i];

        if (!isNaN(current)) {

            //console.log('If !isNaN -->');
            //console.log(`Output before: ${output}`);
            output.push(current);
            //console.log(`After pushing output: ${output}`);
        }
        else if (isOpenBracket(current)) {
            //console.log('Else if isOpenBracket -->');
            //console.log(`Were in stack: ${stack}`);
            stack.push(current);
            //console.log(`After push stack: ${stack}`);
        }
        else if (isCloseBracket(current)) {
            //console.log('Else if isCloseBracket -->');
            let lastStackElement;
            let openBracketPopped = false;
            //console.log(`stack.length = ${stack.length}`);
            while (stack.length > 0) {
                //console.log('while stack.length > 0');
                lastStackElement = stack[stack.length - 1];
                if (isOpenBracket(lastStackElement)) {
                    //console.log('if isOpenBracket(lastStackElement)');
                    //console.log(`Stack before popping = ${stack}`);
                    stack.pop();
                    //console.log(`Stack after popping = ${stack}`);
                    openBracketPopped = true;
                    break;
                }
                else {
                    //console.log('else');
                    //console.log(`Stack before popping = ${stack}`);
                    //console.log(`Output before pushing = ${output}`);
                    //console.log('output.push()');
                    //console.log('stack.pop()');
                    output.push(lastStackElement);
                    stack.pop();
                    //console.log(`Stack after popping = ${stack}`);
                    //console.log(`Output after pushing = ${output}`);
                }
            }

            if (stack.length === 0 && !openBracketPopped) {
                throw new Error('ExpressionError: Brackets must be paired');
            };
        }
        else if (BINARY_OPERATORS.includes(current)) {
            //console.log('else if BINARY_OPERATORS.includes(current)');
            let lastStackElement = stack[stack.length - 1];
            //console.log(`lastStackElement: ${lastStackElement}`);
            while (PRIORITY[lastStackElement] >= PRIORITY[current] && stack.length > 0) {
                //console.log('while PRIORITY[lastStackElement] >= PRIORITY[current] && stack.length > 0');
                //console.log(`Output before pushing: ${output}`);
                //console.log(`Stack before popping: ${stack}`);
                //console.log('output.push(lastStackElement)');
                //console.log('stack.pop()');
                output.push(lastStackElement);
                stack.pop();
                //console.log(`Output after pushing: ${output}`);
                //console.log(`Stack after popping: ${stack}`);
                lastStackElement = stack[stack.length - 1];
                //console.log(`lastStackElement: ${lastStackElement}`);
            }

            stack.push(current);
        }
    }

    for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i] === '(' || stack[i] === ')') throw new Error('ExpressionError: Brackets must be paired');
        output.push(stack[i]);
        stack.pop();
    }
    //console.log(`Output: ${output}`);
    //console.log(`Stack: ${stack}`);
    return output;
}

function isOpenBracket(character) {
    if (character === "(") return true;

    return false;
}

function isCloseBracket(character) {
    if (character === ")") return true;

    return false;
}

function stringToNum(expr) {
    //console.log("StringToNum method starts");
    //console.log(`Input expr: ${expr}`);
    let output = [];
    let numberStr = '';
    for (let i = 0; i <= expr.length; i++) {
        //console.log(`Iteration N ${i}`)
        let current = expr[i];
        if (!isNaN(current)) {
            //console.log(`current: ${current}`);
            //console.log(`numberStr before: ${numberStr}`);
            numberStr += current;
            //console.log(`numberStr after: ${numberStr}`);
            continue;
        }
        else if (numberStr.length > 0) {
            //console.log(`else if numberStr.length > 0`);
            //console.log(`current: ${current}`);
            //console.log(`output before push: ${output}`);
            output.push(+numberStr);
            //console.log(`output after push numberStr: ${output}`);
            numberStr = '';
            output.push(current);
            //console.log(`output after push current: ${output}`);
        }
        else {
            //console.log('else -->');
            //console.log(`current: ${current}`);
            numberStr = '';
            output.push(current);
        }
    }
    
    //console.log(`stringToNum output: ${output}`);
    return output;
}

module.exports = {
    expressionCalculator
}