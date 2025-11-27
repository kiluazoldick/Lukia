"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Ticket, Plus, Search } from "lucide-react";

type TicketStatus = "open" | "pending" | "resolved";

interface Ticket {
  id: string;
  title: string;
  customer: string;
  status: TicketStatus;
  createdAt: Date;
}

export default function CrmPanel() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("crm_tickets");
    if (saved) {
      setTickets(
        JSON.parse(saved).map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }))
      );
    } else {
      // Données exemple
      const exampleTickets: Ticket[] = [
        {
          id: "1",
          title: "Problème de connexion",
          customer: "Marie Dupont",
          status: "open",
          createdAt: new Date(),
        },
        {
          id: "2",
          title: "Question facturation",
          customer: "Jean Martin",
          status: "pending",
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: "3",
          title: "Demande remboursement",
          customer: "Sophie Lambert",
          status: "resolved",
          createdAt: new Date(Date.now() - 172800000),
        },
      ];
      setTickets(exampleTickets);
      localStorage.setItem("crm_tickets", JSON.stringify(exampleTickets));
    }
  }, []);

  const createNewTicket = () => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: "Nouvelle demande",
      customer: "Nouveau client",
      status: "open",
      createdAt: new Date(),
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem("crm_tickets", JSON.stringify(updated));
  };

  const updateStatus = (id: string, status: TicketStatus) => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status } : t));
    setTickets(updated);
    localStorage.setItem("crm_tickets", JSON.stringify(updated));
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "pending").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
    }
  };

  return (
    <div className="w-80 bg-background border-r flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg mb-4">CRM</h2>

        <Button onClick={createNewTicket} className="w-full mb-4">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau ticket
        </Button>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-blue-500" />
                <span>Total</span>
              </div>
              <p className="text-xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-red-500" />
                <span>Ouverts</span>
              </div>
              <p className="text-xl font-bold">{stats.open}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-yellow-500" />
                <span>En cours</span>
              </div>
              <p className="text-xl font-bold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-green-500" />
                <span>Résolus</span>
              </div>
              <p className="text-xl font-bold">{stats.resolved}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tickets */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm flex-1">{ticket.title}</h3>
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  ticket.status
                )} ml-2 mt-1`}
              />
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              {ticket.customer}
            </p>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {ticket.status === "open"
                  ? "Ouvert"
                  : ticket.status === "pending"
                  ? "En cours"
                  : "Résolu"}
              </Badge>

              {ticket.status !== "resolved" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs"
                  onClick={() =>
                    updateStatus(
                      ticket.id,
                      ticket.status === "open" ? "pending" : "resolved"
                    )
                  }
                >
                  {ticket.status === "open" ? "Prendre" : "Résoudre"}
                </Button>
              )}
            </div>
          </Card>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Ticket className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aucun ticket</p>
          </div>
        )}
      </div>
    </div>
  );
}
