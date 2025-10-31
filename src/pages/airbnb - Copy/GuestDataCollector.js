import React, { useState } from "react";
import axios from "axios";
import { useNotification } from "../../components/Notification";

import tipiOspite from "./data/tipo_alloggiato.json";

import { CheckCircle } from "lucide-react"; // optional icons

import DocumentsUploader from "./DocumentUploader";
import DataReview from "./DataReview";
import IdentityVerification from "./IdentityVerification";
const DocumentUpload = ({
  host_id,
  apartment_id,
  booking_id,
  token,
  fetchGuests,
}) => {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  
  
  const [message, setMessage] = useState("");
  const [newGuestForm, setNewGuestForm] = useState(false);
  const { showNotification } = useNotification();
  const [selectedStep, setSelectedStep] = useState(0);
  const [error,setError] = useState({})
  const [frontDocumentKey,setFrontDocumentKey] = useState(null)
  const [backDocumentKey,setBackDocumentKey] = useState(null)
  
  const [formData, setFormData] = useState({
    guest_id: null,
    booking_id: booking_id || "",
    guest_type: "",
    guest_type_code: "",
    name: "",
    last_name: "",
    birthdate: "",
    gender: "",
    comune_nascita: "",
    comune_nascita_code: "",
    provincia_nascita: "",
    paese_nascita: "",
    paese_nascita_code: "",
    cittadinanza: "",
    cittadinanza_code: "",
    tipo_documento: "",
    tipo_documento_code: "",
    numero_documento: "",
    luogo_rilascio: "",
    luogo_rilascio_code: "",
  });
  const [guestId, setGuestId] = useState(null);


  

  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name.includes("_code") && {
        [name.replace("_code", "")]: options[selectedIndex]?.text || "",
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://cnho0zr7e8.execute-api.eu-central-1.amazonaws.com/prod/airbnb/api/guest/guest",
        formData,
        {
          headers: { Authorization: token },
        }
      );

      showNotification({ text: "🎯 Data successfully saved!", error: false });
      fetchGuests();
      const guestId = res.data["guest_id"];
      setGuestId(guestId);
      if (['16','17','18'].includes(formData.guest_type_code)){
        setSelectedStep(3);
      } else{

         setNewGuestForm(false)
        showNotification({ text: "🎯 Identity successfully validated!", error: false });
      }
      
      setFormData((prev) => ({ ...prev, name: "", last_name: "" })); 
    } catch (err) {
      showNotification({ text: "⚠️ Something went wrong...", error: true });
      setError(err.response.data)
      console.error(err);
    }
  };

  const getPresignedUrl = async (fileName, contentType) => {
    console.log(fileName, contentType);
    const res = await axios.post(
      "https://cnho0zr7e8.execute-api.eu-central-1.amazonaws.com/prod/airbnb/api/guest/uploadurl",
      {
        fileName: fileName,
        bnb_id: host_id,
        apartment_id: apartment_id,
        booking_id: booking_id,
        content_type: contentType,
      },
      {
        headers: { Authorization: token },
      }
    );
    return res.data;
  };

  const uploadToS3 = async (file, label) => {
    if (!file) return;
    var uploadResponse = await getPresignedUrl(file.name, file.type);
    console.log(uploadResponse);
    const presignedUrl = uploadResponse.uploadUrl;
    const fileKey = uploadResponse.fileKey;
    const response = await axios.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    });

    setMessage((prev) => prev + `${label} uploaded successfully.\n`);
    return fileKey;
  };







  const Title =()=>{

    return (
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">Checking Procedure</h1>
            <p className="text-sm text-gray-500">Please follow the steps to complete guest registration.</p>
          </div>
    )
  }


  const GuestTypeSelection = ()=>{
    return(

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Guest Type</h2>
      
      <div className="mb-6">
        <label htmlFor="guest_type_code" className="block text-sm font-medium text-gray-700 mb-2">
          Guest Type
        </label>
        <div className="relative">
          <select
            id="guest_type_code"
            name="guest_type_code"
            value={formData.guest_type_code}
            onChange={handleChange}
            required
            className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md \${
              'guest_type_code' in error ? 'border-red-300' : ''
            }`}
          >
            <option value="">Select a type</option>
            {tipiOspite.map(({ Codice, Descrizione }) => (
              <option key={Codice} value={Codice}>
                {Descrizione}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {'guest_type_code' in error && (
          <p className="mt-2 text-sm text-red-600">{error['guest_type_code']}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          ['16', '17', '18'].includes(formData.guest_type_code)
            ? setSelectedStep(1)
            : setSelectedStep(2)
        }
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        Next
      </button>
    </div>
    )
  }



  if (newGuestForm) {
    return (
      <div className="absolute w-full min-h-screen bg-indigo-400  top-0 start-0 z-50 mt-0" style={{marginTop:'0px'}}>

     
      <div className="absolute top-1/2 start-1/2  mx-auto p-4  rounded-2xl  space-y-4  -translate-x-1/2  -translate-y-1/2 w-full md:w-3/4 lg:w-1/2 ">
        <div className=" mx-auto">

        
         {/* <Title/> */}
       
            {
              selectedStep === 0 &&(
                <GuestTypeSelection/>
              )
            }
          {selectedStep === 1 && (
          // <DocumentsUploader/>

         <DocumentsUploader setSelectedStep={setSelectedStep} formData={formData} setFormData={setFormData} setFrontDocumentKey={setFrontDocumentKey} setBackDocumentKey={setBackDocumentKey} uploadToS3={uploadToS3} token={token}/>
          )}

          {selectedStep === 2 && (
          <DataReview formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
          )}

          {selectedStep === 3 && (
          <IdentityVerification uploadToS3={uploadToS3} frontDocumentKey={frontDocumentKey} guestId={guestId} backDocumentKey={backDocumentKey} token={token} setNewGuestForm={setNewGuestForm} showNotification={showNotification}/>
          )}
        </div>
      </div>
       </div>
    );
  } else {
    return (
      <div>
        <button
          className="btn border-green-500 border p-3 rounded-md"
          onClick={() => (setSelectedStep(0),setNewGuestForm(true))}
        >
          Add a new guest
        </button>
      </div>
    );
  }
};

export default DocumentUpload;
