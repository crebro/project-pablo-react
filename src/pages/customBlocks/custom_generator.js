import * as Blockly from 'blockly';

const logoGenerator = new Blockly.Generator('LOGO');

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

logoGenerator.scrub_ = function (block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + '\n' + logoGenerator.blockToCode(nextBlock);
    }
    return code;
};

export default logoGenerator;

