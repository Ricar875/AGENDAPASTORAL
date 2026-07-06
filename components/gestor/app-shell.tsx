"use client"

import { useState } from "react"
import { AgendaTab } from "@/components/gestor/agenda-tab"
import { ChurchesTab } from "@/components/gestor/churches-tab"
import { ConselheiroTab } from "@/components/gestor/conselheiro-tab"
import { Button } from "@/components/ui/button"
import { ProfileDialog } from "@/components/gestor/profile-dialog"
import { Calendar, Church, HeartHandshake, User } from "lucide-react"

type Aba = "agenda" | "igrejas" | "aconselhamento"

export function AppShell() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("agenda")
  const [perfilAberto, setPerfilAberto] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Gestor Pastoral</h1>
          <Button variant="outline" size="icon" onClick={() => setPerfilAberto(true)}>
            <User className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mx-auto flex max-w-5xl gap-1 px-4">
          <Button
            variant={abaAtiva === "agenda" ? "secondary" : "ghost"}
            className="rounded-b-none"
            onClick={() => setAbaAtiva("agenda")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Agenda
          </Button>
          <Button
            variant={abaAtiva === "igrejas" ? "secondary" : "ghost"}
            className="rounded-b-none"
            onClick={() => setAbaAtiva("igrejas")}
          >
            <Church className="mr-2 h-4 w-4" />
            Igrejas
          </Button>
          <Button
            variant={abaAtiva === "aconselhamento" ? "secondary" : "ghost"}
            className="rounded-b-none"
            onClick={() => setAbaAtiva("aconselhamento")}
          >
            <HeartHandshake className="mr-2 h-4 w-4" />
            Aconselhamento
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {abaAtiva === "agenda" && <AgendaTab />}
        {abaAtiva === "igrejas" && <ChurchesTab />}
        {abaAtiva === "aconselhamento" && <ConselheiroTab />}
      </main>

      <ProfileDialog open={perfilAberto} onOpenChange={setPerfilAberto} />
    </div>
  )
}
