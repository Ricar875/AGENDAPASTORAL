"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Church, MapPin, Users, Plus, Phone } from "lucide-react"

interface Congregacao {
  id: string
  nome: string
  endereco: string
  membros: number
  responsavel: string
  telefone?: string
  status: "ativa" | "inativa"
}

const congregacoesIniciais: Congregacao[] = [
  {
    id: "1",
    nome: "Igreja Sede",
    endereco: "Av. Principal, 500",
    membros: 240,
    responsavel: "Pr. João Silva",
    telefone: "(75) 99999-0000",
    status: "ativa",
  },
  {
    id: "2",
    nome: "Congregação Bairro Novo",
    endereco: "Rua da Paz, 88",
    membros: 65,
    responsavel: "Pr. Marcos Lima",
    telefone: "(75) 98888-1111",
    status: "ativa",
  },
]

export function ChurchesTab() {
  const [congregacoes, setCongregacoes] = useState<Congregacao[]>(congregacoesIniciais)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [nova, setNova] = useState<Partial<Congregacao>>({})

  const adicionarCongregacao = () => {
    if (!nova.nome || !nova.endereco || !nova.responsavel) return

    const congregacao: Congregacao = {
      id: Date.now().toString(),
      nome: nova.nome,
      endereco: nova.endereco,
      membros: nova.membros || 0,
      responsavel: nova.responsavel,
      telefone: nova.telefone,
      status: "ativa",
    }

    setCongregacoes((prev) => [...prev, congregacao])
    setNova({})
    setDialogAberto(false)
  }

  const totalMembros = congregacoes.reduce((acc, c) => acc + c.membros, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Igrejas e Congregações</h2>
          <p className="text-sm text-muted-foreground">Gestão das unidades e congregações</p>
        </div>

        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova congregação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova congregação</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Congregação Central"
                  value={nova.nome || ""}
                  onChange={(e) => setNova((n) => ({ ...n, nome: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  placeholder="Rua, número, bairro"
                  value={nova.endereco || ""}
                  onChange={(e) => setNova((n) => ({ ...n, endereco: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Pastor/Responsável</Label>
                <Input
                  id="responsavel"
                  placeholder="Ex: Pr. João Silva"
                  value={nova.responsavel || ""}
                  onChange={(e) => setNova((n) => ({ ...n, responsavel: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="membros">Nº de membros</Label>
                  <Input
                    id="membros"
                    type="number"
                    placeholder="0"
                    value={nova.membros ?? ""}
                    onChange={(e) => setNova((n) => ({ ...n, membros: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    value={nova.telefone || ""}
                    onChange={(e) => setNova((n) => ({ ...n, telefone: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarCongregacao}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Congregações</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{congregacoes.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de membros</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{totalMembros}</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {congregacoes.map((c) => (
          <Card key={c.id}>
            <CardContent className="flex items-start gap-3 py-4">
              <div className="mt-1 shrink-0 rounded-full bg-primary/10 p-2">
                <Church className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{c.nome}</span>
                  <Badge variant={c.status === "ativa" ? "default" : "secondary"}>
                    {c.status === "ativa" ? "Ativa" : "Inativa"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {c.endereco}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {c.membros} membros
                  </span>
                  {c.telefone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {c.telefone}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">Responsável: {c.responsavel}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
