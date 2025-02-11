import * as Blockly from 'blockly';

const logoGenerator = new Blockly.Generator('LOGO');

logoGenerator.ORDER_ATOMIC = 0;       // Numbers, variables, and other atomic expressions
logoGenerator.ORDER_FUNCTION_CALL = 2; // Function calls
logoGenerator.ORDER_UNARY_NEGATION = 1; // Unary negation (e.g., -x)
logoGenerator.ORDER_NONE = 99;        // Statements that don't return a value

// Initialize the name database for variables
logoGenerator.nameDB_ = new Blockly.Names('variable');

// Initialize the generator
logoGenerator.init = function(workspace) {
  // Clear the name database when generating code for a new workspace
  this.nameDB_.reset();
  this.nameDB_.setVariableMap(workspace.getVariableMap());
};

logoGenerator.forBlock['forward'] = function (block) {
    let stepsValue = block.getFieldValue("STEPS");
    return `fd ${!!stepsValue.trim() ?  stepsValue : 0}`;
}

logoGenerator.forBlock['backward'] = function (block) {
    let stepsValue = block.getFieldValue("STEPS");
    return `bk ${!!stepsValue.trim() ?  stepsValue : 0}`;
}

logoGenerator.forBlock['rotate_left'] = function (block) {
    let stepsValue = block.getFieldValue("STEPS");
    return `lt ${!!stepsValue.trim() ?  stepsValue : 0}`;
}

logoGenerator.forBlock['rotate_right'] = function (block) {
    let stepsValue = block.getFieldValue("STEPS");
    return `rt ${!!stepsValue.trim() ?  stepsValue : 0}`;
}

logoGenerator.forBlock['controls_repeat_ext'] = function (block) {
    let timesValue = block.getFieldValue("TIMES");
    let doValue = logoGenerator.statementToCode(block, 'DO');
    return `repeat ${!!timesValue.trim() ? timesValue : 1} [\n${doValue}\n]`;
}

logoGenerator.forBlock['variables_get'] = function (block) {
    let variable = logoGenerator.getVariableName(block.getFieldValue("VAR"));
    return [ `:${variable}`, 0];
};

logoGenerator.forBlock['variables_set'] = function (block) {
    let variable = logoGenerator.getVariableName(block.getFieldValue("VAR"));
    return `make "${variable} ${block.getFieldValue('VALUE')}`;
}

logoGenerator.forBlock['math_arithmetic'] = function(block) {
    let op = block.getFieldValue('OP');
    switch (op) {
        case 'ADD':
            op = '+'; break;
        case 'MINUS':
            op = '-'; break;
        case 'MULTIPLY':
            op = '*'; break;
        case 'DIVIDE':
            op = '/'; break;
        case "POWER":
            op = '^'; break;
        default:
            return '';
    }
    const argument0 = logoGenerator.valueToCode(block, 'A', logoGenerator.ORDER_ATOMIC) || '0';
    const argument1 = logoGenerator.valueToCode(block, 'B', logoGenerator.ORDER_ATOMIC) || '0';
    const code = `( ${argument0} ${op} ${argument1} )`;
    return [code, 2];
};

logoGenerator.forBlock['controls_for'] = function(block) {
    console.log(logoGenerator.ORDER_ATOMIC);

    // Get the variable name
    const variableName = block.getFieldValue('VAR');
    const safeVariableName = logoGenerator.nameDB_.getName(variableName, Blockly.VARIABLE_CATEGORY_NAME);

    // Get the start, end, and increment values
    const start = logoGenerator.valueToCode(block, 'FROM', logoGenerator.ORDER_ATOMIC) || '0';
    const end = logoGenerator.valueToCode(block, 'TO', logoGenerator.ORDER_ATOMIC) || '0';
    const increment = logoGenerator.valueToCode(block, 'BY', logoGenerator.ORDER_ATOMIC) || '1';

    // Get the code inside the loop
    const branch = logoGenerator.statementToCode(block, 'DO', logoGenerator.ORDER_NONE) || '';

    // Generate the Logo code for the "for" loop
    return `for [${safeVariableName} ${start} ${end} ${increment}] [\n${branch}]\n`;
};

logoGenerator.forBlock['math_change'] = function(block) {
    // Get the variable name
    const variableName = block.getFieldValue('VAR');
    const safeVariableName = logoGenerator.nameDB_.getName(variableName, Blockly.VARIABLE_CATEGORY_NAME);
  
    // Get the value to change by (e.g., 1, -2, etc.)
    const changeValue = logoGenerator.valueToCode(block, 'DELTA', logoGenerator.ORDER_ATOMIC) || '0';
  
    // Generate the Logo code for changing the variable
    return `make "${safeVariableName} (${safeVariableName} + ${changeValue})\n`;
  };


logoGenerator.forBlock['math_number'] = function(block) {
// Get the numeric value from the block
const number = block.getFieldValue('NUM');

// Return the number as a string
return [number, logoGenerator.ORDER_ATOMIC];
};


logoGenerator.scrub_ = function (block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + '\n' + logoGenerator.blockToCode(nextBlock);
    }
    return code;
};

logoGenerator.forBlock['math_single'] = function(block) {
    const operator = block.getFieldValue('OP');
    const number = logoGenerator.valueToCode(block, 'NUM', logoGenerator.ORDER_ATOMIC) || '0';
  
    switch (operator) {
      case 'ROOT':
        return [`sqrt(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'ABS':
        return [`abs(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'NEG':
        return [`-${number}`, logoGenerator.ORDER_UNARY_NEGATION];
      case 'LN':
        return [`ln(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'LOG10':
        return [`log10(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'EXP':
        return [`exp(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'POW10':
        return [`pow(10, ${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      default:
        return ['0', logoGenerator.ORDER_ATOMIC];
    }
  };


  logoGenerator.forBlock['math_constant'] = function(block) {
    const constant = block.getFieldValue('CONSTANT');
  
    switch (constant) {
      case 'PI':
        return ['3.14159265358', logoGenerator.ORDER_ATOMIC];
      case 'E':
        return ['2.71828182845', logoGenerator.ORDER_ATOMIC];
      case 'GOLDEN_RATIO':
        return ['1.61803398875', logoGenerator.ORDER_ATOMIC];
      case 'SQRT2':
        return ['sqrt(2)', logoGenerator.ORDER_FUNCTION_CALL];
      case 'SQRT1_2':
        return ['sqrt(0.5)', logoGenerator.ORDER_FUNCTION_CALL];
      case 'INFINITY':
        return ['0', logoGenerator.ORDER_ATOMIC];
      default:
        return ['0', logoGenerator.ORDER_ATOMIC];
    }
  };

logoGenerator.forBlock['math_trig'] = function(block) {
    const operator = block.getFieldValue('OP');
    const number = logoGenerator.valueToCode(block, 'NUM', logoGenerator.ORDER_ATOMIC) || '0';
  
    switch (operator) {
      case 'SIN':
        return [`sin(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'COS':
        return [`cos(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'TAN':
        return [`tan(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      case 'ATAN':
        return [`arctan(${number})`, logoGenerator.ORDER_FUNCTION_CALL];
      default:
        return ['0', logoGenerator.ORDER_ATOMIC];
    }
  };

logoGenerator.forBlock['pu'] = function (block) {
  return "pu";
}

logoGenerator.forBlock['pd'] = function (block) {
  return "pd";
}

export default logoGenerator;

