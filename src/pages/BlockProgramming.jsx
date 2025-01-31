import "./customBlocks/custom_Blocks";
import React, { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import { javascriptGenerator } from "blockly/javascript";
import toolbox from "./toolbox/toolbox";

function BlockProgramming() {
  const [xml, setXml] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

  function workspaceDidChange(workspace) {
    const code = javascriptGenerator.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[20vw] h-[100vh] flex flex-col p-5">
          <div className="text-2xl">Pablo - Block Programming </div>
          <div className="text-sm">Visually edit the drawing logic. </div>
          <textarea readOnly>
            {javascriptCode}
          </textarea>
          <button className="mt-6"> Begin Sequence </button>
        </div>

        <BlocklyWorkspace
          toolboxConfiguration={toolbox}
          initialXml={initialXml}
          className="w-[80vw] h-[100vh]"
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#ccc",
              snap: true,
            },
            theme: {
              componentStyles: {
                workspaceBackgroundColour: "#1e1e1e",
                toolboxBackgroundColour: "#333",
              },
              blockStyles: {
                colour_blocks: { colourPrimary: "20" },
                list_blocks: { colourPrimary: "260" },
                logic_blocks: { colourPrimary: "210" },
                loop_blocks: { colourPrimary: "120" },
                math_blocks: { colourPrimary: "230" },
                procedure_blocks: { colourPrimary: "290" },
                text_blocks: { colourPrimary: "160" },
                variable_blocks: { colourPrimary: "330" },
                variable_dynamic_blocks: { colourPrimary: "310" },
                hat_blocks: { colourPrimary: "330", hat: "cap" },
              },
              categoryStyles: {
                colour_category: { colour: "20" },
                list_category: { colour: "260" },
                logic_category: { colour: "210" },
                loop_category: { colour: "120" },
                math_category: { colour: "230" },
                procedure_category: { colour: "290" },
                text_category: { colour: "160" },
                variable_category: { colour: "330" },
                variable_dynamic_category: { colour: "310" },
              },
            },
          }}
          onWorkspaceChange={workspaceDidChange}
          onXmlChange={setXml}
        />
      </div>
    </>
  );
}

export default BlockProgramming;
