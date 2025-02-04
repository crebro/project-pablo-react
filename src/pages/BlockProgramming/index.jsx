import "../customBlocks/custom_blocks";
import React, { useRef, useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import "../customBlocks/custom_blocks";
import logoGenerator from "../customBlocks/custom_generator";
import toolbox from "../toolbox/toolbox";
import axios from "axios";
import toast from "react-hot-toast";
import "./index.css";

function BlockProgramming() {
  const [xml, setXml] = useState("");
  const [logoCode, setLogoCode] = useState("");
  const urlInputRef = useRef();

  const initialXml =
    '';

  function workspaceDidChange(workspace) {
    const code = logoGenerator.workspaceToCode(workspace);
    setLogoCode(code);
  }

  function beignSequence() {
    let postPromise = axios.post(urlInputRef.current.value, { program: logoCode });
    toast.promise(postPromise, {
      loading: "Sending code to the server...",
      success: "Code sent successfully!",
      error: (e) => { 
        console.log(e);
        return "An error occurred while sending the code."; },
    });
  }

  return (
    <>
      <div className="flex justify-center items-center w-[100vw]">
        <div className="flex-1 h-[100vh] flex flex-col p-5 justify-between">
          <div className="flex flex-col">

          <div className="text-2xl">Pablo - Block Programming </div>
          <div className="text-sm">Visually edit the drawing logic. </div>
          <div className="mt-4">

            <div> The following is the compiled code: </div>
            <div className="mt-4 p-2 bg-gray-700 text-white overflow-x-scroll">
              <pre>
                <code>
                  {logoCode}
                </code>
              </pre>
            </div>
          </div>
          <button className="mt-6" onClick={beignSequence}> Begin Sequence </button>
          </div>

          <div>

            <input className="mt-6" defaultValue={"http://localhost:5000/start"} ref={urlInputRef} />  
          </div>
        </div>

        <BlocklyWorkspace
          toolboxConfiguration={toolbox}
          initialXml={initialXml}
          className="h-[100vh] flex-[4]"
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
