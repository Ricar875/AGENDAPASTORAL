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
import { HeartHandshake, Calendar, Plus, Lock } from "lucide-react"

type SessaoStatus = "agendada" | "realizada"

interface Sessao {
  id: string
  nome: string
  motivo: string
  data: string
  hora: string
  observacoes?: string
  status: SessaoStatus
  confidencial: boolean
}

const sessoesIniciais: Sessao[] = [
  {
    id: "1",
    nome: "Membro (iniciais: M.S.)",
    motivo: "Aconselhamento matrimonial",
    data: "2026-07-09",
    hora: "16:00",
    status: "agendada",
    confidencial: true,
  },
  {
    id: "2",
    nome: "Membro (iniciais: R.F.)",
    motivo: "Orientação espiritual",
    data: "2026-07-04",
    hora: "10:00",
    observacoes: "Acompanhamento contínuo, próxima sessão em 2 semanas",
    status: "realizada",
    confidencial: true,
  },
]

export function ConselheiroTab() {
  const [sessoes, setSessoes] = useState<Sessao[]>(sessoesIniciais)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [nova, setNova] = useState<Partial<Sessao>>({})

  const adicionarSessao = () => {
    if (!nova.nome || !nova.motivo || !nova.data) return

    const sessao: Sessao = {
      id: Date.now().toString(),
      nome: nova.nome,
      motivo: nova.motivo,
      data: nova.data,
      hora: nova.hora || "00:00",
      observacoes: nova.observacoes,
      status: "agendada",
      confidencial: true,
    }

    setSessoes((prev) => [...prev, sessao])
    setNova({})
    setDialogAberto(false)
  }

  const marcarRealizada = (id: string) => {
    setSessoes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "realizada" as SessaoStatus } : s)),
    )
  }

  const agendadas = sessoes.filter((s) => s.status === "agendada")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Aconselhamento</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Lock className="h-3.5 w-3.5" />
            Registros confidenciais de aconselhamento pastoral
          </p>
        </div>

        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova sessão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova sessão de aconselhamento</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Identificação (nome ou iniciais)</Label>
                <Input
                  id="nome"
                  placeholder="Ex: M.S. ou nome completo"
                  value={nova.nome || ""}
                  onChange={(e) => setNova((n) => ({ ...n, nome: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo</Label>
                <Input
                  id="motivo"
                  placeholder="Ex: Aconselhamento matrimonial"
                  value={nova.motivo || ""}
                  onChange={(e) => setNova((n) => ({ ...n, motivo: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={nova.data || ""}
                    onChange={(e) => setNova((n) => ({ ...n, data: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={nova.hora || ""}
                    onChange={(e) => setNova((n) => ({ ...n, hora: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="obs">Observações (confidencial)</Label>
                <Textarea
                  id="obs"
                  placeholder="Notas privadas da sessão"
                  value={nova.observacoes || ""}
                  onChange={(e) => setNova((n) => ({ ...n, observacoes: e.target.value }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarSessao}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Sessões agendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">{agendadas.length}</span>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {sessoes.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-start gap-3 py-4">
              <div className="mt-1 shrink-0 rounded-full bg-primary/10 p-2">
                <HeartHandshake className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{s.nome}</span>
                  <Badge variant={s.status === "agendada" ? "default" : "secondary"}>
                    {s.status === "agendada" ? "Agendada" : "Realizada"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{s.motivo}</p>

                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {s.data.split("-").reverse().join("/")} às {s.hora}
                </span>

                {s.observacoes && (
                  <p className="text-sm text-muted-foreground pt-1 italic">{s.observacoes}</p>
                )}

                {s.status === "agendada" && (
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => marcarRealizada(s.id)}>
                    Marcar como realizada
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
