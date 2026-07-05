"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, User, Plus, Clock, CheckCircle2, Circle } from "lucide-react"

type CompromissoTipo = "visita" | "reuniao"
type CompromissoStatus = "pendente" | "concluido"

interface Compromisso {
  id: string
  tipo: CompromissoTipo
  titulo: string
  pessoa: string
  local: string
  data: string
  hora: string
  observacoes?: string
  status: CompromissoStatus
}

const compromissosIniciais: Compromisso[] = [
  {
    id: "1",
    tipo: "visita",
    titulo: "Visita pastoral",
    pessoa: "Família Souza",
    local: "Rua das Flores, 123",
    data: "2026-07-08",
    hora: "15:00",
    observacoes: "Acompanhamento pós-hospitalar",
    status: "pendente",
  },
  {
    id: "2",
    tipo: "reuniao",
    titulo: "Reunião de conselho",
    pessoa: "Conselho de Anciãos",
    local: "Sala da administração",
    data: "2026-07-06",
    hora: "19:30",
    status: "pendente",
  },
]

export function AgendaTab() {
  const [compromissos, setCompromissos] = useState<Compromisso[]>(compromissosIniciais)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [novo, setNovo] = useState<Partial<Compromisso>>({ tipo: "visita" })

  const adicionarCompromisso = () => {
    if (!novo.titulo || !novo.pessoa || !novo.data) return

    const compromisso: Compromisso = {
      id: Date.now().toString(),
      tipo: novo.tipo as CompromissoTipo,
      titulo: novo.titulo,
      pessoa: novo.pessoa,
      local: novo.local || "",
      data: novo.data,
      hora: novo.hora || "00:00",
      observacoes: novo.observacoes,
      status: "pendente",
    }

    setCompromissos((prev) =>
      [...prev, compromisso].sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora)),
    )
    setNovo({ tipo: "visita" })
    setDialogAberto(false)
  }

  const alternarStatus = (id: string) => {
    setCompromissos((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "pendente" ? "concluido" : "pendente" } : c,
      ),
    )
  }

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
  }

  const pendentes = compromissos.filter((c) => c.status === "pendente")
  const concluidos = compromissos.filter((c) => c.status === "concluido")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Agenda Pastoral</h2>
          <p className="text-sm text-muted-foreground">Visitas e reuniões marcadas</p>
        </div>

        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo compromisso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo compromisso</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={novo.tipo === "visita" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setNovo((n) => ({ ...n, tipo: "visita" }))}
                >
                  Visita
                </Button>
                <Button
                  type="button"
                  variant={novo.tipo === "reuniao" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setNovo((n) => ({ ...n, tipo: "reuniao" }))}
                >
                  Reunião
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Visita pastoral"
                  value={novo.titulo || ""}
                  onChange={(e) => setNovo((n) => ({ ...n, titulo: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pessoa">Pessoa / grupo</Label>
                <Input
                  id="pessoa"
                  placeholder="Ex: Família Souza"
                  value={novo.pessoa || ""}
                  onChange={(e) => setNovo((n) => ({ ...n, pessoa: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="local">Local</Label>
                <Input
                  id="local"
                  placeholder="Endereço ou sala"
                  value={novo.local || ""}
                  onChange={(e) => setNovo((n) => ({ ...n, local: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={novo.data || ""}
                    onChange={(e) => setNovo((n) => ({ ...n, data: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={novo.hora || ""}
                    onChange={(e) => setNovo((n) => ({ ...n, hora: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="obs">Observações</Label>
                <Textarea
                  id="obs"
                  placeholder="Detalhes adicionais (opcional)"
                  value={novo.observacoes || ""}
                  onChange={(e) => setNovo((n) => ({ ...n, observacoes: e.target.value }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarCompromisso}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{pendentes.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{concluidos.length}</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {compromissos.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Nenhum compromisso cadastrado ainda.
            </CardContent>
          </Card>
        )}

        {compromissos.map((c) => (
          <Card key={c.id} className={c.status === "concluido" ? "opacity-60" : undefined}>
            <CardContent className="flex items-start gap-3 py-4">
              <button
                onClick={() => alternarStatus(c.id)}
                className="mt-1 shrink-0 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Alternar status"
              >
                {c.status === "concluido" ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-medium ${c.status === "concluido" ? "line-through" : ""}`}>
                    {c.titulo}
                  </span>
                  <Badge variant={c.tipo === "visita" ? "default" : "secondary"}>
                    {c.tipo === "visita" ? "Visita" : "Reunião"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {c.pessoa}
                  </span>
                  {c.local && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {c.local}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatarData(c.data)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {c.hora}
                  </span>
                </div>

                {c.observacoes && <p className="text-sm text-muted-foreground pt-1">{c.observacoes}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, User, Plus, Clock, CheckCircle2, Circle } from "lucide-react"

type CompromissoTipo = "visita" | "reuniao"
type CompromissoStatus = "pendente" | "concluido"

interface Compromisso {
  id: string
  tipo: CompromissoTipo
  titulo: string
  pessoa: string
  local: string
  data: string
  hora: string
  observacoes?: string
  status: CompromissoStatus
}

const compromissosIniciais: Compromisso[] = [
  {
    id: "1",
    tipo: "visita",
    titulo: "Visita pastoral",
    pessoa: "Família Souza",
    local: "Rua das Flores, 123",
    data: "2026-07-08",
    hora: "15:00",
    observacoes: "Acompanhamento pós-hospitalar",
    status: "pendente",
  },
  {
    id: "2",
    tipo: "reuniao",
    titulo: "Reunião de conselho",
    pessoa: "Conselho de Anciãos",
    local: "Sala da administração",
    data: "2026-07-06",
    hora: "19:30",
    status: "pendente",
  },
]

export function AgendaTab() {
  const [compromissos, setCompromissos] = useState<Compromisso[]>(compromissosIniciais)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [novo, setNovo] = useState<Partial<Compromisso>>({ tipo: "visita" })

  const adicionarCompromisso = () => {
    if (!novo.titulo || !novo.pessoa || !novo.data) return

    const compromisso: Compromisso = {
      id: Date.now().toString(),
      tipo: novo.tipo as CompromissoTipo,
      titulo: novo.titulo,
      pessoa: novo.pessoa,
      local: novo.local || "",
      data: novo.data,
      hora: novo.hora || "00:00",
      observacoes: novo.observacoes,
      status: "pendente",
    }

    setCompromissos((prev) =>
      [...prev, compromisso].sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora)),
    )
    setNovo({ tipo: "visita" })
    setDialogAberto(false)
  }

  const alternarStatus = (id: string) => {
    setCompromissos((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "pendente" ? "concluido" : "pendente" } : c,
      ),
    )
  }

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
  }

  const pendentes = compromissos.filter((c) => c.status === "pendente")
  const concluidos = compromissos.filter((c) => c.status === "concluido")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Agenda Pastoral</h2>
          <p className="text-sm text-muted-foreground">Visitas e reuniões marcadas</p>
        </div>

        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo compromisso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo compromisso</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={novo.tipo === "visita" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setNovo((n) => ({ ...n, tipo: "visita" }))}
                >
                  Visita
                </Button>
                <Button
                  type="button"
                  variant={novo.tipo === "reuniao" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setNovo((n) => ({ ...n, tipo: "reuniao" }))}
                >
                  Reunião
