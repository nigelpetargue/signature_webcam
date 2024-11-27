import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export const Signature = () => {
  const [captures, setCaptures] = useState([]);

  const sigCanvasRef = useRef(null);

  const handleClearCaptures = () => {
    setCaptures([])
  };

  const handleCaptureImage = () => {
    if (sigCanvasRef.current) {
        const imageURL = sigCanvasRef.current.toDataURL('image/png');
        console.log(imageURL)

        setCaptures((prevCaptures) => [...prevCaptures, imageURL]);
        sigCanvasRef.current.clear();
      }
  }

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
      <div style={{ display: 'flex', gap: 20, height: '50%', width:'50%' }}>
        {/* Signature Canvas Wrapper */}
        <div style={{ height: '100%', width: '90%', border: '1px solid black', overflow: 'hidden' }}>
          <SignatureCanvas
            ref={sigCanvasRef}
            canvasProps={{
                className: 'sigCanvas',
                width: 1000, 
                height: 500
            }}
          />
        </div>
        <div style={{ height: '100%', width: '10%', display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid black', overflowY: 'auto'}}>
            {captures.map(item => <img src={item} height={50} width={80} alt='captures' />)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{ padding: '10px 20px' }} onClick={handleClearCaptures}>Clear</button>
        <button style={{ padding: '10px 20px' }} onClick={handleCaptureImage}>Capture</button>
      </div> 
    </div>
  );
};
