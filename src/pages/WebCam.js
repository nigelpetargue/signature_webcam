import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebCam = () => {
  const [captures, setCaptures] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  const webcamRef = useRef(null);

  const handleCaptureImage = () => {
    const imageURL = webcamRef.current.getScreenshot();
    setCaptures((prevCaptures) => [...prevCaptures, imageURL])
  }

  const handleClearCaptures = () => {
    setCaptures([])
  };

  const handleDevices = useCallback((devices) => {
    setDevices(devices.filter(({kind}) => kind === 'videoinput'))
  }, [setDevices])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices])

  return (
    <div       
        style={{ 
        marginTop: '20px', 
        height: '80vh', 
        width: '100vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20 
      }}
    >
      <div>
        <label>Camera Device: </label>
        <select name='camera-devices' id='camera' onChange={(event) => setSelectedDevice(event.target.value)}>
            {devices.map(item => <option value={item.deviceId}>{item.label}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 20, height: '50%', width:'50%' }}>
        {/* Signature Canvas Wrapper */}
        <div style={{ height: '100%', width: '90%', border: '1px solid black', overflow: 'hidden' }}>
         <Webcam 
            audio={false} 
            ref={webcamRef} 
            screenshotFormat='image/jpeg'
            height='100%'
            width='100%'
            videoConstraints={{deviceId: selectedDevice }}
          />
        </div>
        <div style={{ height: '100%', width: '10%', display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', border: '1px solid black', overflow: 'hidden'}}>
            {captures.map(item => <img src={item} height={50} width={80} alt='captures' />)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{ padding: '10px 20px' }} onClick={handleClearCaptures}>Clear</button>
        <button style={{ padding: '10px 20px' }} onClick={handleCaptureImage}>Capture</button>
      </div> 
    </div>
  )
}
export default WebCam