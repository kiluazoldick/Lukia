"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, TrendingUp, Clock } from "lucide-react"

interface Conversation {
  id: string
  clientName: string
  email: string
  subject: string
  lastMessage: string
  timestamp: Date
  status: "open" | "resolved"
}

export default function CrmPanel({ onSelectConversation }: { onSelectConversation: (id: string) => void }) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-001",
      clientName: "Marie Dupont",
      email: "marie.dupont@email.com",
      subject: "Problème de connexion",
      lastMessage: "Je n'arrive pas à me connecter à mon compte",
      timestamp: new Date(Date.now() - 3600000),
      status: "open",
    },
    {
      id: "conv-002",
      clientName: "Jean Martin",
      email: "jean.martin@email.com",
      subject: "Remboursement",
      lastMessage: "Je voudrais être remboursé",
      timestamp: new Date(Date.now() - 7200000),
      status: "open",
    },
  ])

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`
    setConversations((prev) => [
      {
        id: newId,
        clientName: "Nouveau Client",
        email: "nouveau@email.com",
        subject: "Nouvelle demande",
        lastMessage: "",
        timestamp: new Date(),
        status: "open",
      },
      ...prev,
    ])
    onSelectConversation(newId)
  }

  const openCount = conversations.filter((c) => c.status === "open").length
  const resolvedCount = conversations.filter((c) => c.status === "resolved").length

  return (
    <div className="w-72 border-r border-border bg-card flex flex-col shadow-sm">
      <div className="p-5 border-b border-border">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <MessageSquare className="w-4 h-4 text-primary" />
          Conversations
        </h2>
        <Button onClick={handleNewConversation} size="sm" className="w-full rounded-lg font-medium" variant="default">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle conversation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className="w-full text-left p-3 rounded-lg hover:bg-muted/80 transition-colors border border-transparent hover:border-border"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{conv.clientName}</p>
                <p className="text-xs text-muted-foreground truncate">{conv.email}</p>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium ${
                  conv.status === "open"
                    ? "bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                    : "bg-green-100/80 text-green-700 dark:bg-green-900/50 dark:text-green-200"
                }`}
              >
                {conv.status === "open" ? "Ouvert" : "Résolu"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 ml-11">{conv.subject}</p>
            <div className="flex items-center gap-1 mt-2 ml-11 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {conv.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-muted/40">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-muted-foreground">{openCount} en cours</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">{resolvedCount} résolus</span>
          </div>
        </div>
      </div>
    </div>
  )
}
