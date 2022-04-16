import React, {Link} from 'react'



const IndexRecording = () => {
    // let camera_button = document.querySelector("#start-camera");
    // let video = document.querySelector("#video");
    // let start_button = document.querySelector("#start-record");
    // let stop_button = document.querySelector("#stop-record");
    // let download_link = document.querySelector("#download-video");
    
    let camera_stream = null;
    let media_recorder = null;
    let blobs_recorded = [];
    let video = document.getElementsByClassName('videoFrame');
    let download_link = document.getElementsByClassName('downloadLink');

    const startCamera = async ()=>{
        camera_stream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        video.srcObject = camera_stream;
    }
    const startRecording = ()=>{
        // set MIME type of recording as video/webm
        media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
            
        // event : new recorded video blob available 
        media_recorder.addEventListener('dataavailable', function(e) {
            blobs_recorded.push(e.data);
        });

        // event : recording stopped & all blobs sent
        media_recorder.addEventListener('stop', function() {
            // create local object URL from the recorded video blobs
            let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
            download_link.href = video_local;
        });

        // start recording with each recorded blob having 1 second video
        media_recorder.start(1000);
    }

    const stopRecording = ()=>{
        media_recorder.stop(); 
    }

    // camera_button.addEventListener('click', async function() {
    //        camera_stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    //     video.srcObject = camera_stream;
    // });
    
    // start_button.addEventListener('click', function() {
    //     // set MIME type of recording as video/webm
    //     media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
    
    //     // event : new recorded video blob available 
    //     media_recorder.addEventListener('dataavailable', function(e) {
    //         blobs_recorded.push(e.data);
    //     });
    
    //     // event : recording stopped & all blobs sent
    //     media_recorder.addEventListener('stop', function() {
    //         // create local object URL from the recorded video blobs
    //         let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
    //         download_link.href = video_local;
    //     });
    
    //     // start recording with each recorded blob having 1 second video
    //     media_recorder.start(1000);
    // });
    
    // stop_button.addEventListener('click', function() {
    //     media_recorder.stop(); 
    // });
   
    
    return (
        <div className="indexMain">
        <button className="startCamera" id="start-camera" onClick={startCamera}>Start Camera</button>
        <video className="videoFrame" id="video" width="320" height="240" ></video>
        <button className="startRecording" id="start-record"  onClick={startRecording}>Start Recording</button>
        <button className="stopRecording" id="stop-record"  onClick={stopRecording}>Stop Recording</button>
        <Link className="downloadLink" id="download-video" download="test.webm">Download Video</Link>
        </div>
    );
}

export default IndexRecording;




