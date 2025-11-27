"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, Plus } from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  date: string;
  messageCount: number;
}

interface CrmSidebarProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  currentView: "chat" | "docs";
  onViewChange: (view: "chat" | "docs") => void;
}

export default function CrmSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onNewConversation,
  currentView,
  onViewChange,
}: CrmSidebarProps) {
  return (
    <div className="w-64 bg-background border-r flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <Button onClick={onNewConversation} className="w-full mb-4">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle conversation
        </Button>

        <div className="flex gap-2">
          <Button
            variant={currentView === "chat" ? "default" : "outline"}
            onClick={() => onViewChange("chat")}
            className="flex-1"
            size="sm"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button
            variant={currentView === "docs" ? "default" : "outline"}
            onClick={() => onViewChange("docs")}
            className="flex-1"
            size="sm"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Docs
          </Button>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-semibold text-sm mb-3">Conversations</h3>

        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                selectedConversation === conv.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent border-border"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium truncate">{conv.title}</p>
                  <p className="text-xs opacity-70 mt-1">{conv.date}</p>
                </div>
                <span className="bg-background text-foreground text-xs px-2 py-1 rounded ml-2">
                  {conv.messageCount}
                </span>
              </div>
            </button>
          ))}

          {conversations.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucune conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
