"use client";
import { useState, useEffect } from "react";
import ChatInterface from "@/components/chat-interface";
import CrmSidebar from "@/components/crm-sidebar";
import CrmPanel from "@/components/crm-panel";
import Documentation from "@/components/documentation";

interface Conversation {
  id: string;
  title: string;
  date: string;
  messageCount: number;
}

export default function Page() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [currentView, setCurrentView] = useState<"chat" | "docs">("chat");

  // Charger les conversations une seule fois au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("chat_conversations");
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  }, []); // Tableau de dépendances vide = exécuté une seule fois

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "Nouvelle conversation",
      date: new Date().toLocaleDateString("fr-FR"),
      messageCount: 0,
    };
    const updated = [newConv, ...conversations];
    setConversations(updated);
    setSelectedConversation(newConv.id);
    setCurrentView("chat");
    localStorage.setItem("chat_conversations", JSON.stringify(updated));
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setCurrentView("chat");
  };

  // Cette fonction ne cause plus de boucle infinie
  const updateConversation = (conversationId: string, messageCount: number) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, messageCount } : conv
      )
    );
  };

  // Sauvegarder seulement quand les conversations changent
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("chat_conversations", JSON.stringify(conversations));
    }
  }, [conversations]); // Seulement quand conversations change

  return (
    <div className="h-screen flex bg-background">
      <CrmPanel />

      <CrmSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <div className="flex-1 flex">
        {currentView === "chat" ? (
          <ChatInterface
            selectedConversation={selectedConversation}
            onConversationUpdate={updateConversation}
          />
        ) : (
          <Documentation />
        )}
      </div>
    </div>
  );
}
