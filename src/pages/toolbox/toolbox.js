const toolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      "kind": "CATEGORY",
      "name": "General",
      "contents": [
        {
          'kind': 'block',
          'type': 'forward'
        },
        {
          'kind': 'block',
          'type': 'backward'
        },
        {
          'kind': 'block',
          'type': 'rotate_left'
        },
        {
          'kind': 'block',
          'type': 'rotate_right'
        },
        {
          'kind': 'block',
          'type': 'pu'
        },
        {
          'kind': 'block',
          'type': 'pd'
        },
      ],
      "colour": "210",
    },


    {
      "kind": "CATEGORY",
      "name": "Variables",
      "categorystyle": "variable_category",
      "custom": "VARIABLE"
    },
    {
      "kind": "CATEGORY",
      "contents": [
        {
          "kind": "BLOCK",

          "type": "math_number",
          "gap": "32"
        },
        {
          "kind": "BLOCK",

          "type": "math_arithmetic"
        },
        {
          "kind": "BLOCK",

          "type": "math_single"
        },
        {
          "kind": "BLOCK",

          "type": "math_trig"
        },
        {
          "kind": "BLOCK",

          "type": "math_constant"
        },
      ],
      "name": "Math",
      "categorystyle": "math_category"
    },
    {
      "kind": "CATEGORY",
      "contents": [
        {
          "kind": "BLOCK",

          "type": "controls_for"
        },
        {
          'kind': "block",
          'type': "controls_repeat_ext"
        },
      ],
      "name": "Loops",
      "categorystyle": "loop_category"
    },
  ]
};

export default toolbox;