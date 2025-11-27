"use client"
import { useState } from "react"
import ChatInterface from "@/components/chat-interface"
import CrmSidebar from "@/components/crm-sidebar"

interface Conversation {
  id: string
  title: string
  date: string
  messages: number
}

export default function Page() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const addConversation = (title: string) => {
    const newConv = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleDateString("fr-FR"),
      messages: 0,
    }
    setConversations([newConv, ...conversations])
    setSelectedConversation(newConv.id)
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <CrmSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onAddConversation={addConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <ChatInterface onNewConversation={addConversation} />
      </div>
    </div>
  )
}
