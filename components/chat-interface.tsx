"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Menu, MessageSquare, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

const SYSTEM_PROMPT = `Tu es un agent de service client professionnel et amical. 
Tu aides les clients avec leurs questions, problèmes et demandes.
Tu es courtois, empathique et efficace.
Tu essaies de résoudre les problèmes rapidement ou d'escalader si nécessaire.
Réponds toujours en français et de façon concise.`;

interface ChatInterfaceProps {
  onNewConversation?: (title: string) => void;
}

export default function ChatInterface({
  onNewConversation,
}: Readonly<ChatInterfaceProps>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationStarted, setConversationStarted] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    // Mark conversation as started
    if (!conversationStarted) {
      setConversationStarted(true);
      onNewConversation?.(
        input.slice(0, 50) + (input.length > 50 ? "..." : "")
      );
    }

    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date().toLocaleTimeString("fr-FR"),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const messagesForAPI = [
        { role: "system", content: SYSTEM_PROMPT },
        ...updatedMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesForAPI,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.reply,
        timestamp: new Date().toLocaleTimeString("fr-FR"),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je n'arrive pas à répondre. Vérifiez votre clé API.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">Lukia</h1>
              <p className="text-xs text-muted-foreground">
                Powered by Open Router
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                  <MessageSquare className="w-12 h-12 text-primary/30" />
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                Comment pouvons-nous vous aider ?
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Posez vos questions et obtenez des réponses intelligentes
                alimentées par l'IA.
              </p>
              <div className="space-y-2 text-left">
                <p className="text-xs text-muted-foreground font-medium">
                  Exemples :
                </p>
                <div className="grid gap-2 mt-4">
                  {[
                    "Problème avec ma commande",
                    "Comment réinitialiser mon mot de passe",
                    "Tarifs et plans disponibles",
                  ].map((example, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(example);
                      }}
                      className="text-left p-3 rounded-lg bg-card/50 hover:bg-card border border-border/40 text-sm text-foreground hover:border-primary/40 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border border-border/40 text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                {message.timestamp && (
                  <p
                    className={`text-xs mt-1 opacity-70 ${
                      message.role === "user"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                )}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border/40 text-foreground rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border/40 bg-card/30 backdrop-blur-xl sticky bottom-0 px-4 md:px-6 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2 max-w-4xl mx-auto"
        >
          <Input
            placeholder="Écrivez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 rounded-xl bg-background border border-border/40 text-sm focus:border-primary/40 transition-colors"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl h-10 px-4 bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          L'IA peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}
