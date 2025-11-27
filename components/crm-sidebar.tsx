"use client"

import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  date: string
  messages: number
}

interface CrmSidebarProps {
  conversations: Conversation[]
  selectedConversation: string | null
  onSelectConversation: (id: string | null) => void
  onAddConversation: (title: string) => void
  isOpen: boolean
  onToggle: () => void
}

export default function CrmSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  isOpen,
  onToggle,
}: CrmSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "hidden md:flex flex-col h-screen w-64 bg-card border-r border-border/40 transition-all duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="border-b border-border/40 p-4">
          <Button
            variant="secondary"
            className="w-full justify-start gap-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border-0"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Nouvelle conversation</span>
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Aucune conversation</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors text-sm",
                  selectedConversation === conv.id
                    ? "bg-primary/10 border border-primary/20 text-foreground"
                    : "hover:bg-muted/50 border border-border/20 text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{conv.title}</p>
                    <p className="text-xs opacity-70">{conv.date}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 p-4 space-y-2">
          <div className="bg-card-foreground/5 rounded-lg p-3">
            <p className="text-xs font-medium text-foreground mb-1">À propos</p>
            <p className="text-xs text-muted-foreground">
              Chatbot IA pour service client avec traitement du langage naturel.
            </p>
          </div>
        </div>
      </div>

      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => onToggle()} />}
    </>
  )
}
