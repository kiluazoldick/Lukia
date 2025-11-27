# Lukia CRM - Chatbot Intelligent pour Service Client

## 🎯 Présentation du Projet

Lukia CRM est une application de démonstration qui combine un chatbot IA avec un système de gestion de la relation client (CRM). L'outil permet de gérer les conversations clients et suivre les demandes via un système de tickets intégré.

## ✨ Fonctionnalités Principales

### 🤖 Chatbot Intelligent

- Assistant IA pour le service client
- Réponses en temps réel en français
- Historique des conversations sauvegardé
- Interface de chat intuitive

### 📋 Gestion CRM

- **Système de tickets** : Création et suivi des demandes clients
- **Statuts** : Ouvert → En cours → Résolu
- **Recherche** : Trouvez rapidement les tickets par client ou sujet
- **Tableau de bord** : Statistiques en temps réel

### 💾 Gestion des Données

- Stockage local dans le navigateur (localStorage)
- Export des données en JSON
- Réinitialisation facile pour la démonstration
- Données d'exemple incluses

## 🛠️ Architecture Technique

### Frontend

- **Framework** : Next.js 14 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Composants UI** : Bibliothèque personnalisée

### Intelligence Artificielle

- **API** : OpenRouter
- **Modèle** : GPT-4o-mini
- **Traitement** : Langage naturel en français

### Stockage

- **Persistance** : localStorage du navigateur
- **Structure** : Données JSON organisées
- **Sauvegarde** : Export manuel disponible

## 🎨 Interface Utilisateur

L'application propose une interface trois panneaux :

1. **Panneau CRM** (Gauche)

   - Tableau de bord avec statistiques
   - Liste des tickets avec filtres
   - Actions rapides sur les tickets

2. **Sidebar** (Centre)

   - Liste des conversations
   - Navigation entre chat et documentation
   - Création de nouvelles conversations

3. **Zone Principale** (Droite)
   - Interface de chat avec l'IA
   - Page de documentation complète

## 🚀 Cas d'Usage

### Pour la Démontration

- Simulation de service client avec IA
- Gestion visuelle des demandes clients
- Présentation des capacités d'un CRM simple

### Pour le Développement

- Exemple d'intégration d'IA dans une application
- Démonstration de gestion d'état avec React
- Architecture modulaire et extensible

## 📊 Données Gérées

L'application stocke localement :

- Conversations avec l'assistant IA
- Tickets CRM avec statuts et priorités
- Métadonnées des clients
- Historique des interactions

## 💡 Points Forts

- **Simple** : Interface épurée et intuitive
- **Moderne** : Stack technique actuelle
- **Flexible** : Facilement extensible
- **Autonome** : Aucun backend requis pour la démo

---

_Solution de démonstration pour chatbot CRM avec intelligence artificielle_
