import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faExclamation,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HeaderComponent from "@/components/app/header";
import FooterComponent from "@/components/app/footer";

// const API_BASE_URL = "http://localhost:546";
const API_BASE_URL = "https://lean.api.picalive.io";
const TOP_K = 5;
const SYSTEM_PROMPT =
  "You are an expert in answering the question of the user. \n\nYou will be provided with some relevant text chunks from the document the user's query is being asked from.\n\nGenerate answer only from the provided chunks.\n\nAll the provided chunks may not be helpful, so analyse carefully, process the respective chunk only if it is related to the user's query.\n\nGenerate point wise precise answer. \n\nReturn with the most meaningful response in markdown format.";

const FileConversationPage = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [llmConversation, setLLMConversation] = useState([
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ]);
  const [indexData, setIndexData] = useState({
    completed: false,
    running: false,
    error: false,
    indexName: "",
    message: "",
  });
  const [isAnswering, setIsAnswering] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [topK, setTopK] = useState(TOP_K);
  const [systemPrompt, setSystemPrompt] = useState(SYSTEM_PROMPT);
  const [message, setMessage] = useState("");
  const [serverStatus, setServerStatus] = useState({
    isUp: false,
    message: "",
  });
  const [checkingServerStatus, setCheckingServerStatus] = useState(false);

  const checkServerStatus = useCallback(async () => {
    try {
      setCheckingServerStatus(true);
      await axios.get(`${API_BASE_URL}/`);
      setServerStatus({ isUp: true, message: "" });
    } catch {
      setServerStatus({
        isUp: false,
        message:
          "The server is currently unavailable. Want to try our exclusive demo? Contact us now, and we’ll have the server ready for you in no time. Don’t miss out on an amazing experience!",
      });
    } finally {
      setCheckingServerStatus(false);
    }
  }, []);

  useEffect(() => {
    checkServerStatus();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);

      const tempIndexData = { ...indexData };

      tempIndexData.completed = false;
      tempIndexData.running = true;
      tempIndexData.message = "Uploading file ...";
      setIndexData(tempIndexData);
      setMessage("Uploading file ...");

      try {
        const formData = new FormData();

        formData.append("file", file);

        const upload_res = await axios.post(
          `${API_BASE_URL}/upload_file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        tempIndexData.message =
          "File uploaded successfully! Beginning the indexing process...";
        setIndexData(tempIndexData);
        setMessage(
          "File uploaded successfully! Beginning the indexing process...",
        );

        const { file_name, file_path } = upload_res.data;

        const eventSource = new EventSource(
          `${API_BASE_URL}/index?file_name=${file_name}&file_path=${file_path}`,
        );

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);

          console.log("ssr data : ", data);

          if (data.type === "text") {
            console.log("temp index data", tempIndexData);
            tempIndexData.message = data.content;
            setIndexData(tempIndexData);
            setMessage(data.content);
          }

          if (data.type === "data" || data.type === "error") {
            console.log("final temp index", tempIndexData);
            tempIndexData.completed = true;
            tempIndexData.running = false;
            tempIndexData.message = data.content.message;
            tempIndexData.indexName = data.content.index_name;
            if (data.type === "error") tempIndexData.error = true;
            setIndexData(tempIndexData);
            setMessage(data.content.message);
          }

          if (data.type === "done") eventSource.close();
        };
      } catch (error) {
        alert("Failed to index the file. Please try again.");
      } finally {
        tempIndexData.completed = false;
        tempIndexData.message = "";
        setIndexData(tempIndexData);
        setMessage("");
      }
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (question.trim() && uploadedFile) {
      setConversation((prev) => [...prev, { role: "user", content: question }]);
      setIsAnswering(true);
      try {
        const tempLLMConversation = [...llmConversation];

        tempLLMConversation[0].content = systemPrompt;

        const res = await axios.post(`${API_BASE_URL}/search`, {
          query: question,
          index_name: indexData.indexName,
          top_k: topK,
          system_prompt: systemPrompt,
          conversation: tempLLMConversation,
        });

        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: res.data.llm_result },
        ]);

        tempLLMConversation.push({
          role: "user",
          content: res.data.user_query,
        });

        tempLLMConversation.push({
          role: "assistant",
          content: res.data.llm_result,
        });

        setLLMConversation(tempLLMConversation);
      } catch (error) {
        alert("Failed to get a response. Please try again.");
      } finally {
        setIsAnswering(false);
        setQuestion("");
      }
    } else {
      alert("Upload a PDF and type a question to proceed.");
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <Card className="w-full max-w-3xl p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Upload PDF & Ask Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* File Upload Section */}

            {serverStatus.isUp ? (
              <div className="mb-6 flex items-center justify-center text-sm font-normal text-green-600">
                <FontAwesomeIcon icon={faCircle} className="mr-2 h-2 w-2" />
                <span>Application is live</span>
              </div>
            ) : (
              <div className="mb-6 flex items-center text-sm text-yellow-600">
                <span>
                  The server is currently unavailable. Want to try our exclusive
                  demo?{" "}
                  <span
                    onClick={() =>
                      window.open(
                        "mailto:rishavraj@alumni.iitm.ac.in",
                        "_blank",
                      )
                    }
                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                  >
                    Contact us
                  </span>{" "}
                  or{" "}
                  <span
                    onClick={() => window.open("tel:+919798600997", "_blank")}
                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                  >
                    Call us
                  </span>{" "}
                  now, and we’ll have the server ready for you in no time. Don’t
                  miss out on an amazing experience!
                </span>
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="pdf-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload PDF
              </label>
              <Input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="mt-1 block w-full"
                onChange={handleFileUpload}
                disabled={
                  !serverStatus.isUp || indexData.running || indexData.completed
                }
              />

              {uploadedFile && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
                  {indexData.error ? (
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className="h-4 w-4 text-red-400"
                    />
                  ) : indexData.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <CircularProgress size={20} />
                  )}
                  <span
                    className={
                      indexData.error
                        ? "text-red-400"
                        : indexData.completed
                          ? "text-green-600"
                          : "text-yellow-500"
                    }
                  >
                    {message}
                  </span>
                </div>
              )}
            </div>

            {/* Conversation Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Conversation
                </h2>
                <FontAwesomeIcon
                  icon={faCog}
                  className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-900"
                  onClick={() => setShowSettings((prev) => !prev)}
                />
              </div>

              {showSettings && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="top-k"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Top K
                    </label>
                    <Input
                      id="top-k"
                      type="number"
                      value={topK}
                      onChange={(e) => setTopK(Number(e.target.value))}
                      className="mt-1 block w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="system-prompt"
                      className="block text-sm font-medium text-gray-700"
                    >
                      System Prompt
                    </label>
                    <Textarea
                      id="system-prompt"
                      rows={15}
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="mt-1 block w-full"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-lg overflow-x-scroll rounded-lg px-4 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "my-4 text-left text-gray-600 shadow-md"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </Markdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isAnswering && (
                  <div className="flex justify-center">
                    <CircularProgress size={24} />
                  </div>
                )}
              </div>
            </div>

            {/* Q&A Section */}
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <Textarea
                rows={2}
                placeholder="Type your question here..."
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-4 block w-full"
                disabled={!indexData.completed || isAnswering}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={!indexData.completed || isAnswering}
              >
                Ask Question
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Want to explore more?{" "}
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() =>
                    window.open("mailto:rishavraj@alumni.iitm.ac.in", "_blank")
                  }
                >
                  Contact Us
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <FooterComponent />
    </>
  );
};

export default FileConversationPage;
