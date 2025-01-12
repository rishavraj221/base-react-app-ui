import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Bot = () => {
  return (
    <Dialog>
      {/* Bot Button as Trigger */}
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-600 text-white shadow-lg hover:bg-gray-700 focus:outline-none"
          aria-label="Open Bot"
          variant="default"
        >
          <FontAwesomeIcon icon={faRobot} className="text-2xl" />
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="fixed left-1/2 top-1/2 z-50 flex h-[90%] max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Lean AI</DialogTitle>
          <DialogDescription>
            AI assistant to help you code faster.
          </DialogDescription>
        </DialogHeader>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <p className="text-gray-500">Start a conversation here!</p>
          {/* Add chat messages dynamically here */}
        </div>

        {/* User Input Section */}
        <div className="border-t border-gray-200 bg-white pt-4">
          <div className="flex w-full flex-col space-y-2">
            <Textarea
              placeholder="Type your question..."
              className="flex-1 resize-none"
              rows={3}
            />
            <Button
              variant="default"
              className="flex items-center justify-center space-x-2"
              aria-label="Ask"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              <span>Ask</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Bot;
