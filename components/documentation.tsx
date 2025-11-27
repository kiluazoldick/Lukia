"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, RefreshCw } from "lucide-react";

export default function Documentation() {
  const handleExport = () => {
    const data = {
      conversations: JSON.parse(
        localStorage.getItem("chat_conversations") || "[]"
      ),
      tickets: JSON.parse(localStorage.getItem("crm_tickets") || "[]"),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `crm-export-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm("Supprimer toutes les données ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleReset = () => {
    if (confirm("Réinitialiser avec des données exemple ?")) {
      localStorage.clear();
      setTimeout(() => window.location.reload(), 100);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Documentation</h1>
          <p className="text-muted-foreground">Guide d'utilisation du CRM</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités</CardTitle>
              <CardDescription>Ce que vous pouvez faire</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">💬 Chat IA</h3>
                <p className="text-sm text-muted-foreground">
                  Discutez avec l'assistant IA pour répondre aux questions
                  clients. Toutes les conversations sont sauvegardées
                  automatiquement.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎫 Tickets CRM</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez les demandes clients avec un système de tickets simple.
                  Suivez l'état (Ouvert → En cours → Résolu) de chaque demande.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Statistiques</h3>
                <p className="text-sm text-muted-foreground">
                  Visualisez le nombre de tickets par statut en temps réel.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des données</CardTitle>
              <CardDescription>Exportez et gérez vos données</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button onClick={handleExport} className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter toutes les données
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="justify-start"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réinitialiser la démo
                </Button>
                <Button
                  onClick={handleClear}
                  variant="destructive"
                  className="justify-start"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Tout supprimer
                </Button>
              </div>

              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Stockage :</strong> Toutes les données sont
                  sauvegardées dans votre navigateur. Pensez à exporter
                  régulièrement vos données importantes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
