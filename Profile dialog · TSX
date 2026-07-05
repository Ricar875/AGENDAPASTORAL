"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nome?: string
  cargo?: string
  email?: string
  onSave?: (dados: { nome: string; cargo: string; email: string }) => void
}

export function ProfileDialog({
  open,
  onOpenChange,
  nome = "",
  cargo = "",
  email = "",
  onSave,
}: ProfileDialogProps) {
  const [nomeAtual, setNomeAtual] = useState(nome)
  const [cargoAtual, setCargoAtual] = useState(cargo)
  const [emailAtual, setEmailAtual] = useState(email)

  const iniciais = nomeAtual
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const salvar = () => {
    onSave?.({ nome: nomeAtual, cargo: cargoAtual, email: emailAtual })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Meu perfil</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{iniciais || "?"}</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nomeAtual} onChange={(e) => setNomeAtual(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo / função</Label>
            <Input
              id="cargo"
              placeholder="Ex: Pastor titular"
              value={cargoAtual}
              onChange={(e) => setCargoAtual(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={emailAtual}
              onChange={(e) => setEmailAtual(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={salvar}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
