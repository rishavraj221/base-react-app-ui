import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Loader2, ExternalLink } from "lucide-react";

// const API_BASE_URL = "http://localhost:5465";
const API_BASE_URL = "https://lead.api.picalive.io";
const SAVE_DATA_ENDPOINT = "/save-data";
const SCRAPE_SSE_ENDPOINT = "/scrape-sse";

// demo
// PicAlive
// We help find potential clients by effectively tracking the online community and discussing the problem that our clients are solving
// funded startups with 4-10 team members looking for more clients

const SOURCE_WEBSITES = [
  {
    title: "Reddit",
    link: "https://www.reddit.com",
    isReady: true,
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com",
    isReady: false,
  },
  {
    title: "Twitter (X)",
    link: "https://www.twitter.com",
    isReady: false,
  },
  {
    title: "Google News",
    link: "https://www.google.com",
    isReady: false,
  },
  {
    title: "Google Maps",
    link: "https://www.maps.com",
    isReady: false,
  },
];

const sentimentDetails = {
  anger: { emoji: "😡", bgColor: "bg-red-100", label: "Anger" },
  disgust: { emoji: "🤢", bgColor: "bg-green-100", label: "Disgust" },
  fear: { emoji: "😨", bgColor: "bg-purple-100", label: "Fear" },
  joy: { emoji: "😊", bgColor: "bg-yellow-100", label: "Joy" },
  neutral: { emoji: "😐", bgColor: "bg-gray-100", label: "Neutral" },
  sadness: { emoji: "😢", bgColor: "bg-blue-100", label: "Sadness" },
  surprise: { emoji: "😲", bgColor: "bg-pink-100", label: "Surprise" },
};

const getDominantSentiment = (sentiments) => {
  const maxSentiment = Object.keys(sentiments).reduce((a, b) =>
    sentiments[a] > sentiments[b] ? a : b,
  );

  return sentimentDetails[maxSentiment];
};

const RedditCard = ({ content, author, url, source, sentiments }) => {
  const dominantSentiment = getDominantSentiment(sentiments);

  return (
    <Card
      className={`mb-2 w-full rounded-xl ${dominantSentiment.bgColor} border border-gray-200 p-4 shadow-sm`}
    >
      <p className="text-gray-600">{content}</p>

      <CardDescription className="my-4 text-sm text-gray-500">
        Posted by{" "}
        <a
          href={author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {author.name}
        </a>
      </CardDescription>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center gap-2">
              View Post <ExternalLink size={16} />
            </Button>
          </a>

          <div className={`flex items-center gap-2 rounded-lg py-2`}>
            <span className="text-xl">{dominantSentiment.emoji}</span>
            <span className="text-sm font-medium text-gray-600">
              {dominantSentiment.label}
            </span>
          </div>
        </div>

        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Source: {source.name}
        </a>
      </div>
    </Card>
  );
};

const LeadPage = () => {
  const [results, setResults] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const [ssrProgressTexts, setSSRProgressTexts] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [live, setLive] = useState(true);
  const [loading, setLoading] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({
    businessName: "PicAlive",
    businessDescription:
      "We help find potential clients by effectively tracking the online community and discussing the problem that our clients are solving",
    targetAudience:
      "funded startups with 4-10 team members looking for more clients",
  });

  const [sourceWebsites, setSourceWebsites] = useState(SOURCE_WEBSITES);

  const isFormComplete = () => {
    return (
      businessDetails.businessName &&
      businessDetails.businessDescription &&
      businessDetails.targetAudience
    );
  };

  const handleStartProcess = async () => {
    try {
      setProcessing(true);
      setLoading(true);

      const { data: saveDataRes } = await axios.post(
        `${API_BASE_URL}${SAVE_DATA_ENDPOINT}`,
        {
          business_name: businessDetails.businessName,
          business_description: businessDetails.businessDescription,
          target_audience: businessDetails.targetAudience,
        },
      );

      if (saveDataRes?.data_storage_id) {
        const data_storage_id = saveDataRes.data_storage_id;

        const eventSource = new EventSource(
          `${API_BASE_URL}${SCRAPE_SSE_ENDPOINT}?storage-id=${data_storage_id}`,
        );

        const tempSSRProgressTexts = [];
        const tempResults = [];

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);

          //   console.log("ssr data: ", data);

          if (data.type === "text") {
            tempSSRProgressTexts.push(data.data);
            setSSRProgressTexts([...tempSSRProgressTexts]);
          }

          if (data.type === "json_data") {
            // console.log(data.data);
            tempResults.push(data.data);
            setResults([...tempResults]);
          }

          if (data.type === "done") {
            eventSource.close();
            setProcessing(false);
          }
        };
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const getResultsArr = () => {
    if (live) return results;

    return displayResults;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <h1 className="text-center text-2xl font-semibold">Lead AI</h1>

      {/* Website Selector */}
      <Card className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Source Websites</h2>

        <div className="flex items-center gap-3 overflow-x-scroll">
          {sourceWebsites.map((sw, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2 shadow-sm ${sw.isReady ? "" : "cursor-not-allowed bg-gray-100 opacity-50 shadow-sm"}`}
            >
              <div>{sw.title}</div>
              <Badge>{sw.isReady ? "Beta" : "Soon"}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Business Input */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold">Business Details</h2>
        <Input
          className="mt-4"
          placeholder="Business Name"
          value={businessDetails.businessName}
          onChange={(e) =>
            setBusinessDetails({
              ...businessDetails,
              businessName: e.target.value,
            })
          }
        />
        <Textarea
          className="mt-2"
          placeholder="Describe your business..."
          value={businessDetails.businessDescription}
          onChange={(e) =>
            setBusinessDetails({
              ...businessDetails,
              businessDescription: e.target.value,
            })
          }
        />
        <Input
          className="mt-2"
          placeholder="Target Audience"
          value={businessDetails.targetAudience}
          onChange={(e) =>
            setBusinessDetails({
              ...businessDetails,
              targetAudience: e.target.value,
            })
          }
        />

        {!processing && (
          <div className="mt-2 flex items-center justify-end">
            <Button
              onClick={handleStartProcess}
              disabled={!isFormComplete() || processing}
            >
              {loading && <Loader2 className="mr-2 animate-spin" size={20} />}
              Submit
            </Button>
          </div>
        )}
      </Card>

      {results.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Results</h2>

            <h3 className="text-md font-medium">{`Total: ${results.length}`}</h3>
          </div>

          <div className="my-2 flex items-center gap-3 overflow-x-scroll">
            <Button
              variant="outline"
              onClick={() => {
                setDisplayResults([...results]);
                setLive(true);
              }}
            >
              Live
            </Button>

            {Object.keys(sentimentDetails).map((sentKey, i) => (
              <Button
                key={i}
                variant="outline"
                className={`flex items-center ${sentimentDetails[sentKey].bgColor}`}
                onClick={() => {
                  setLive(false);
                  setDisplayResults([
                    ...results.sort(
                      (a, b) => b.sentiment[sentKey] - a.sentiment[sentKey],
                    ),
                  ]);
                }}
              >
                {sentimentDetails[sentKey].label}
              </Button>
            ))}
          </div>

          <div className="mt-4 max-h-[700px] overflow-y-scroll px-2">
            {getResultsArr().map((rs, i) => (
              <RedditCard
                key={i}
                author={rs.author}
                content={rs.content}
                url={rs.url}
                source={rs.source}
                sentiments={rs.sentiment}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Progress Section */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold">Progress</h2>

        <div className="mt-4 max-h-[300px] overflow-y-scroll px-2">
          {ssrProgressTexts.map((txt, i) => (
            <div key={i} className="py-1 text-sm text-gray-600">
              {txt}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LeadPage;
