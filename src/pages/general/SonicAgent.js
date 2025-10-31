// src/pages/general/VanillaS2sChat.jsx
import React, { useCallback,useEffect ,useState} from 'react';
import { io } from 'socket.io-client';
import { AudioPlayer } from './play/AudioPlayer.js'
import { ChatHistoryManager } from './util/ChatHistoryManager.js';
import './../../s2s.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversation } from '@11labs/react';
import agents from '../../data/agents.js';
import AgentInfoPanel from '../../components/AgentInfo.js';
import { FaRocket } from 'react-icons/fa'; // You can swap with other icons

export default function SonicAgent() {
  const [error,setError] = useState(null)
  const [showInfo,setShowInfo] = useState(false)
  // State to store the selected language
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // default language set to English

  // List of available languages
  const languages = [
    { code: 'en', name: 'English' },
    {code:"it","name":"Italian"},
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    // Add more languages here
  ];


  const [agent,setAgent] = useState(
    { id:'restaurant-demo',
      model_id: 'EXgCBwZRjETqU7vthcPz',
      name: 'Restaurant Concierge Agent',
      description: 'Assists customers with menus, dietary preferences, opening hours, reservations, and real-time table availability.',
   
   
       prompt:`You are a professional and courteous AI assistant working for a restaurant. Help customers explore the menu, accommodate dietary preferences, share opening hours, assist with reservations, and provide real-time table availability if requested. Be warm, knowledgeable, and attentive—like a top-tier maître d’.
       Begin each conversation by saying 'Hello! How can I assist you today?'
       `
    }
  )



  const {
    startSession,
    endSession,
    isSpeaking,
    status,
  } = useConversation({
    onConnect: () => console.log('✅ Connected to Agent'),
    onDisconnect: () => {
      console.log('❌ Disconnected from Agent');
 
    },
    onMessage: (message) => {
      console.log('📨 Message received:', message);
    },
    onError: (error) => {
      console.error('⚠️ Error:', error);
    },
  });


  useEffect(() => {
    // pick agent from ?id=
    const params = new URLSearchParams(window.location.search);
    const agentId = params.get('id');
    const found = agents.find(a => a.id === agentId);
    if (!found) {
      setError(`Agent “${agentId}” not found.`);
      return;
    }
    setAgent(found);
  }, []);

const startConversation = useCallback(async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
 
          const id = await startSession({
            agentId: agent.model_id,
            language: selectedLanguage
          });

        } catch (error) {
          console.error('Failed to start conversation:', error);
        }
      }, [startSession, agent]);
    
      const endConversation = useCallback(async () => {
        try {
          await endSession();
   
        } catch (error) {
          console.error('Failed to end conversation:', error);
        }
      }, [endSession]);
      

  useEffect(() => {
    
      
    
    const socket = io("wss://ag-digitalexpert.com", {
      transports: ["websocket"],
      withCredentials: true
    });

    // DOM elements
    const startButton     = document.getElementById('start');
    const stopButton      = document.getElementById('stop');
    const statusElement   = document.getElementById('status');
    const chatContainer   = document.getElementById('chat-container');
 

    // Chat history management
    let chat = { history: [] };
    const chatRef = { current: chat };
    const chatHistoryManager = ChatHistoryManager.getInstance(
      chatRef,
      (newChat) => {
        chat = { ...newChat };
        chatRef.current = chat;
        updateChatUI();
      }
    );

    // Audio processing variables
    let audioContext;
    let audioStream;
    let isStreaming = false;
    let processor;
    let sourceNode;
    let waitingForAssistantResponse = false;
    let waitingForUserTranscription   = false;
    let userThinkingIndicator = null;
    let assistantThinkingIndicator = null;
    let transcriptionReceived = false;
    let displayAssistantText  = false;
    let role;
    const audioPlayer = new AudioPlayer();
    let sessionInitialized = false;

    let samplingRatio = 1;
    const TARGET_SAMPLE_RATE = 16000;
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    let SYSTEM_PROMPT = "You are a friend. The user and you will engage in a spoken "
      + "dialog exchanging the transcripts of a natural real-time conversation. "
      + "Keep your responses short, generally two or three sentences.";

    async function initAudio() {
      try {
        // statusElement.textContent = "Requesting microphone access...";
        // statusElement.className = "connecting";
        console.log("Requesting microphone access...")

        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation:true, noiseSuppression:true, autoGainControl:true }
        });

        if (isFirefox) {
          audioContext = new AudioContext();
        } else {
          audioContext = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE });
        }

        samplingRatio = audioContext.sampleRate / TARGET_SAMPLE_RATE;
        console.log(`AudioContext sampleRate: ${audioContext.sampleRate} ratio: ${samplingRatio}`);

        await audioPlayer.start();

        // statusElement.textContent = "Microphone ready. Click Start to begin.";
        // statusElement.className = "ready";
        startButton.disabled = false;
      } catch (err) {
        console.error(err);
        // statusElement.textContent = "Error: " + err.message;
        // statusElement.className = "error";
      }
    }


    async function initializeSession(){
      if(sessionInitialized) return;
      console.log("Initializing session...")

      socket.emit('promptStart');

      socket.emit('systemPrompt', agent.prompt);
      // socket.emit("contentStart")
      // socket.emit("textInput",'Hi, how can I help you?')
      // socket.emit("contentEnd")

      socket.emit('audioStart');

      


      sessionInitialized=true;
      console.log('session initialized')
    }

    async function startStreaming(){
      if(isStreaming) return;
      if(!sessionInitialized) await initializeSession();
      sourceNode = audioContext.createMediaStreamSource(audioStream);
      processor  = audioContext.createScriptProcessor(512,1,1);
      sourceNode.connect(processor); processor.connect(audioContext.destination);
      processor.onaudioprocess = e=>{
        if(!isStreaming) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        for(let i=0;i<inputData.length;i++) pcmData[i] = inputData[i]*0x7FFF;
        let binary=''; new Uint8Array(pcmData.buffer).forEach(b=>binary+=String.fromCharCode(b));
        socket.emit('audioInput', btoa(binary));
      };
      isStreaming=true; startButton.disabled=true; stopButton.disabled=false;

    }

    function stopStreaming(){
      if(!isStreaming) return;
      processor.disconnect(); sourceNode.disconnect();
      socket.emit('stopAudio');
      isStreaming=false; startButton.disabled=false; stopButton.disabled=true;

      audioPlayer.stop(); chatHistoryManager.endTurn();
    }

    function arrayBufferToBase64(buffer){
      const bytes=new Uint8Array(buffer), binary=[];
      for(let b of bytes) binary.push(String.fromCharCode(b));
      return btoa(binary.join(''));
    }

    function base64ToFloat32Array(base64){
      const binary=atob(base64), bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
      const i16=new Int16Array(bytes.buffer), f32=new Float32Array(i16.length);
      for(let i=0;i<i16.length;i++) f32[i]=i16[i]/32768;
      return f32;
    }

    function handleTextOutput(data){

      if(data.content) chatHistoryManager.addTextMessage({role:data.role, message:data.content});
    }

    function updateChatUI(){
      chatContainer.innerHTML='';
      chatRef.current.history.forEach(item=>{
        const d=document.createElement('div');
        d.className=`message ${item.role.toLowerCase()}`;
        d.innerHTML=`<div class="role-label">${item.role}</div><div>${item.message}</div>`;
        chatContainer.appendChild(d);
      });
    }

    socket.on('textOutput', handleTextOutput);
    socket.on('audioOutput', d=>{
      const samples=base64ToFloat32Array(d.content);
      audioPlayer.playAudio(samples);
    });
    socket.on('contentEnd', (data) => {
   
  
      if (data.type === 'TEXT') {
          if (role === 'USER') {
              // When user's text content ends, make sure assistant thinking is shown
              
              console.log("Waiting...")
          }
          else if (role === 'ASSISTANT') {
              // When assistant's text content ends, prepare for user input in next turn
              console.log("Waiting...")
          }
  
          // Handle stop reasons
          if (data.stopReason && data.stopReason.toUpperCase() === 'END_TURN') {
              chatHistoryManager.endTurn();
          } else if (data.stopReason && data.stopReason.toUpperCase() === 'INTERRUPTED') {
              console.log("Interrupted by user");
              audioPlayer.bargeIn();
          }
      }
      else if (data.type === 'AUDIO') {
          // When audio content ends, we may need to show user thinking indicator
          if (isStreaming) {
              console.log("Waiting...")
          }
      }
  });
    socket.on('connect',()=>statusElement.textContent="Connected");
    socket.on('disconnect',()=>statusElement.textContent="Disconnected");



    startButton .addEventListener('click', startStreaming);
    stopButton  .addEventListener('click', stopStreaming);
    


    initAudio();

    return ()=>{
      socket.disconnect();
    };
  }, [agent]);

  function handleAgentChange(id) {
    const found = agents.find(a => a.id === id);
    if (found) setAgent(found);
  }
  
    

  return (



    <div className="flex flex-col fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white z-50 p-10 overflow-y-auto pb-5">
      {agent?(
          <div className="flex flex-col items-center py-4">
          <h1 className="text-2xl font-bold text-center">{agent.name}</h1>
           <button
      onClick={() => setShowInfo(true)}
      className="flex items-center gap-2 px-5 py-3 my-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 via-blue-500 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out group"
    >
      <span>See what I can do</span>
      <FaRocket className="group-hover:translate-x-1 transition-transform duration-300" />
    </button>
          {showInfo&&(
 <AgentInfoPanel agent={agent} setShowInfo={setShowInfo}/>
          )}

          {/* <div>
        <label>Select Language: </label>
        <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage}
          
          className="p-3 rounded-lg bg-gray-900 text-white border border-cyan-500 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400/70 transition-all duration-300 backdrop-blur-sm hover:shadow-cyan-500/30"
          
          >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div> */}
         
          </div>
   ):"Loading..."}
 

     <div className="flex justify-center space-x-4 py-2">
      {agent &&(
    <select
  className="p-3 rounded-lg bg-gray-900 text-white border border-cyan-500 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400/70 transition-all duration-300 backdrop-blur-sm hover:shadow-cyan-500/30"
  onChange={(e) => handleAgentChange(e.target.value)}
  value={agent.id} // Use `value` instead of manually setting `selected`
>
  {agents.map((a) =>
    a.model_id ? (
      <option key={a.id} value={a.id}>
        {a.name}
      </option>
    ) : null
  )}
</select>

      )}
  
    </div>

<div className="">
      <div id="status" className='hidden'>Loading…</div>
      <div id="chat-container" className='hidden' style={{ height:200, overflowY:'auto', border:'1px solid #666', margin:'10px 0' }} />

    </div>
    {/* Conversation area */}
    <div className="flex-1 relative flex items-center justify-center">
      {/* Animated background when speaking */}
      <AnimatePresence>
        {true && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              
            }}
          />
        )}
      </AnimatePresence>

      {/* Voice level bars */}
      <div className="flex space-x-1 items-end h-24 z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-indigo-500 w-2 rounded"
            animate={{ height: true ? [10, 100, 10] : 10 }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>

   
  <div className={`p-6 border-gray-700 flex items-center justify-center space-x-4 ${agent.aws_sonic?'visible':"hidden"}`}>
      <button
       
     id="start"
        className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50 transition"
      >
        Start
      </button>
      <button
      id='stop'
      
      
        className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-500 disabled:opacity-50 transition"
      >
        End
      </button>
    </div>
   
        <div
  className={`p-6 hadow-lg flex items-center justify-center space-x-6 transition-all ${
    agent.aws_sonic ? 'hidden' : 'visible'
  }`}
>
  <button
    onClick={() => startConversation()}
    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 hover:shadow-md disabled:opacity-50 transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    Start
  </button>

  <button
    onClick={() => endConversation()}
    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 hover:shadow-md disabled:opacity-50 transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    End
  </button>
</div>


  

    {/* Back to Home button */}
    <div className="absolute bottom-4 right-4">
    <button
  onClick={() => window.location.href = '/'}
  className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-full text-white bg-opacity-60 font-semibold shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back
</button>
    </div>

 

  </div>


   
  );
}
