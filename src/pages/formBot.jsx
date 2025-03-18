import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";
import { io } from "socket.io-client";

const WS_BASE_URL = "ws://localhost:5466";

const BotFormUI = () => {
  const [messages, setMessages] = useState([]); // Chat messages
  const [input, setInput] = useState(""); // Text input
  const [isRecording, setIsRecording] = useState(false); // Speech-to-text
  const [socket, setSocket] = useState(null);
  const [transcription, setTranscription] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socketClient = io("http://localhost:5466"); // Adjust host/port if needed
    setSocket(socketClient);

    socketClient.on("connect", () => {
      console.log("Connected to server");
    });

    let tempTranscription = "";
    socketClient.on("transcription", (data) => {
      tempTranscription += ` ${data}`;
      setTranscription(tempTranscription); // Append new transcription
    });

    socketClient.on("error", (data) => {
      console.error("Server error:", data.message);
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);

  const startRecording = async () => {
    if (!socket) return;

    // Request access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    recorder.ondataavailable = (event) => {
      console.log("audio chunk", event.data);
      if (event.data.size > 0) {
        socket.emit("audio_chunk", event.data);
      }
    };

    recorder.start(250); // Send audio chunks every 250ms
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
    setIsRecording(false);
  };

  // Simulate sending a message to the bot and receiving a response
  const sendMessage = async (message) => {};

  const handleVoiceInput = () => {
    if (isRecording) return stopRecording();

    return startRecording();
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      {/* Chat Section */}
      <Card className="flex h-[70vh] flex-1 flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 max-w-[70%] rounded-lg p-2 ${
                msg.sender === "user"
                  ? "self-end bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div className={`mb-2 max-w-[70%] rounded-lg bg-gray-200 p-2`}>
            {transcription}
          </div>
        </CardContent>
        <div className="flex gap-2 border-t p-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={() => sendMessage(input)}>
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="secondary" onClick={handleVoiceInput}>
            <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BotFormUI;
