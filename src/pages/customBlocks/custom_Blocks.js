import * as Blockly from 'blockly';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
    "type": "forward",
    "message0": "Move Forward By: %1 Units",
    "args0": [
        {
            "type": "field_input",
            "name": "STEPS",
            "check": "Number",
            "value": 0
        },
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 230,
},
{
    "type": "backward",
    "message0": "Move Backwards By: %1 Units",
    "args0": [
        {
            "type": "field_input",
            "name": "STEPS",
            "check": "Number",
            "value": 0
        },
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 230,
},
{
    "type": "rotate_right",
    "message0": "Rotate Right By: %1 Degrees",
    "args0": [
        {
            "type": "field_input",
            "name": "STEPS",
            "check": "Number",
            "value": 0
        },
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 230,
},
{
    "type": "rotate_left",
    "message0": "Rotate Left By: %1 Degrees",
    "args0": [
        {
            "type": "field_input",
            "name": "STEPS",
            "check": "Number",
            "value": 0
        },
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 230,
},
{
    "type": "controls_repeat_ext",
    "message0": "repeat %1 times",
    "args0": [
        {
            "type": "field_input", 
            "name": "TIMES",
            "check": "Number",
            "value": 0
        }
    ],
    "message1": "do %1",
    "args1": [
        { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
}
]);


Blockly.common.defineBlocks(blocks);
