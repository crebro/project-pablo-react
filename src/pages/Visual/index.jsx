import React, { useState, useRef } from 'react'
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
import axios from 'axios';

const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1)
      n -= 1 // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime })
  }

export default function VisualProgramming() {
  const urlInputRef = useRef();

    const config2 = {
        borderRadius: '8px',
        language: 'en',
        width: '330px',
        height: '250px',
        objectFit: 'contain',
        compressInitial: null,
        darkMode: false,
        rtl: false
    };

    const [imageSrc, setImageSrc] = useState([]);

    function beignSequence() {
        const file = dataURLtoFile(imageSrc, 'image.png');

        const data = new FormData()
        data.append('image', file, file.name)

        // now upload
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios.post(urlInputRef.current.value, data, config).then(response => {
            console.log(response.data)
        })
      }

    return (
        <>
            <div className='flex items-center justify-center flex-col w-[100vw]'>
                <div className='text-3xl font-bold my-4' >
                    Select a Program
                </div>

                {imageSrc}

                <div className='flex-col mt-10 items-center justify-center'>
                    <ReactImagePickerEditor
                        config={config2}
                        imageChanged={(newDataUri) => { setImageSrc(newDataUri) }}
                    />
                    <button className="mt-6 w-full" onClick={beignSequence}> Upload Code </button>
                    <br/>

                    <input className="mt-6" defaultValue={"http://192.168.77.183:5000/visualstart"} ref={urlInputRef} />  
                </div>
            </div>
        </>
    )
}
