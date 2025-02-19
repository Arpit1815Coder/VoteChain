import React, { useState, useContext, useRef } from "react";
import { CandidateContext } from "../context/CandidateContext";
import { FaCamera } from "react-icons/fa";

const AddCandidate = () => {
  const { addCandidate } = useContext(CandidateContext);
  const [candidate, setCandidate] = useState({
    name: "",
    age: "",
    party: "",
    qualification: "",
    image: "",
  });
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCandidate(candidate);
    alert("Candidate added successfully!");
    setCandidate({ name: "", age: "", party: "", qualification: "", image: "" });
  };

  const startCamera = () => {
    setCapturing(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Mirror the image before drawing
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setCandidate({ ...candidate, image: imageData });

      setCapturing(false);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row font-mono justify-center items-center min-h-full p-8 bg-gray-900 text-white">
      {/* Candidate Form */}
      <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Candidate Name" value={candidate.name} onChange={handleChange} required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white" />
          <input type="number" name="age" placeholder="Age" value={candidate.age} onChange={handleChange} required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white" />
          <input type="text" name="party" placeholder="Party Name" value={candidate.party} onChange={handleChange} required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white" />
          <input type="text" name="qualification" placeholder="Qualification" value={candidate.qualification} onChange={handleChange} required className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none text-white" />
          
          {capturing ? (
            <div className="flex flex-col items-center">
              {/* Mirrored Video Feed */}
              <video ref={videoRef} autoPlay className="w-64 h-48 border-2 border-gray-600 rounded-lg transform scale-x-[-1]" />
              <button type="button" onClick={captureImage} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">Capture Image</button>
            </div>
          ) : (
            <div className="relative w-full cursor-pointer border-2 border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center p-3" onClick={startCamera}>
              <span className="text-gray-400 flex-grow">Upload Image</span>
              <FaCamera className="text-white text-xl" />
            </div>
          )}

          {candidate.image && (
            <div className="flex justify-center mt-4">
              <img src={candidate.image} alt="Captured" className="w-64 h-48 object-cover border-2 border-gray-600 rounded-lg" />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md">Add Candidate</button>
        </form>
      </div>

      {/* Image Placeholder */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img
          src={"/—Pngtree—job interview concept interview with_6251479.png"}
          alt="Candidate Preview"
          className="w-120 h-120 object-cover rounded-lg "
        />
      </div>
    </div>
  );
};

export default AddCandidate;
