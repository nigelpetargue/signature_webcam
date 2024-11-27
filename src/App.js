import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas';
import Webcam from 'react-webcam';
import WebCam from './pages/WebCam';
import { Signature } from './pages/Signature';

function SignaturePad() {
  const [imageSrc, setImageSrc] = useState(null);

  const sigCanvas = useRef(null);
  const webCamRef = useRef(null);

  const handleClearCanvas = () => {
    sigCanvas.current.clear()
  }

  const handleDownloadSignature = () => {
    const dataURL = sigCanvas.current.toDataURL('image/png')
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png'; // 
    link.click(); 
  }

  const handleCaptureImage = () => {
    const src = webCamRef.current.getScreenshot();
    setImageSrc(src)
  }

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signature">Signature</Link></li>
          <li><Link to="/webcam">Webcam</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/signature' element={<Signature />} />
        <Route path='/webcam' element={<WebCam />} />
      </Routes>
    </Router>
  );
}

export default SignaturePad;
