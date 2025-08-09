import { useState } from "react";

// Imports shadcn/ui — ajuste os paths se seu setup não usar "@/components/ui/*"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

// Mapa centralizado de links (substituirei depois pelos URLs reais)
const LINKS = {
  email: {
    criacao: "/links/email/criacao",
    alteracao: "/links/email/alteracao",
  },
  sistemas: {
    sief: "/links/sistemas/sief",
    ecocentauro: "/links/sistemas/ecocentauro",
    horus: "/links/sistemas/horus",
    dexion: "/links/sistemas/dexion",
    datacaixa: "/links/sistemas/datacaixa",
  },
  seguranca: {
    copia_gravacoes: "/links/seguranca/copia-gravacoes",
    senha_sistema: "/links/seguranca/alteracao-senhas-sistema",
    senha_email: "/links/seguranca/alteracao-senhas-email",
    auditoria: "/links/seguranca/auditoria-acessos",
  },
} as const;

function goTo(href: string) {
  if (!href) return;
  window.location.href = href;
}

export default function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Termos de Responsabilidade e Solicitação de Acessos
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Texto institucional */}
            <section className="space-y-3">
              <p className="leading-relaxed">
                Para garantir a segurança da informação e o uso adequado dos recursos corporativos,
                é necessário que todos os usuários leiam e concordem com os Termos de
                Responsabilidade antes de realizar qualquer solicitação.
              </p>
              <p className="leading-relaxed">
                Selecione abaixo o tipo de acesso ou serviço desejado. Ao escolher uma opção, você
                será direcionado para o formulário ou procedimento correspondente.
              </p>
            </section>

            <Separator />

            {/* Aceite dos termos */}
            <section className="flex items-start gap-3">
              <Checkbox
                id="accept"
                checked={accepted}
                onCheckedChange={(v) => setAccepted(Boolean(v))}
              />
              <Label htmlFor="accept" className="leading-relaxed">
                Declaro que li e concordo com os <strong>Termos de Responsabilidade</strong>, estando
                ciente de minhas obrigações e das consequências administrativas e legais pelo uso
                indevido de credenciais, sistemas e dados corporativos.
              </Label>
            </section>

            <Separator />

            {/* 1. E-mail */}
            <section className="space-y-2">
              <Label className="font-semibold">1. E-mail</Label>
              <Select
                disabled={!accepted}
                onValueChange={(value) => {
                  const href =
                    value === "criacao"
                      ? LINKS.email.criacao
                      : value === "alteracao"
                        ? LINKS.email.alteracao
                        : "";
                  goTo(href);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={accepted ? "Selecione uma opção" : "Aceite os termos para habilitar"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Opções</SelectLabel>
                    <SelectItem value="criacao">Criação de Endereço de E-mail</SelectItem>
                    <SelectItem value="alteracao">Alteração de Endereço de E-mail</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>

            {/* 2. Acessos a Sistemas */}
            <section className="space-y-2">
              <Label className="font-semibold">2. Acessos a Sistemas</Label>
              <Select
                disabled={!accepted}
                onValueChange={(value) => {
                  const map: Record<string, string> = {
                    sief: LINKS.sistemas.sief,
                    ecocentauro: LINKS.sistemas.ecocentauro,
                    horus: LINKS.sistemas.horus,
                    dexion: LINKS.sistemas.dexion,
                    datacaixa: LINKS.sistemas.datacaixa,
                  };
                  goTo(map[value]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={accepted ? "Escolha o sistema" : "Aceite os termos para habilitar"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sistemas</SelectLabel>
                    <SelectItem value="sief">SIEF</SelectItem>
                    <SelectItem value="ecocentauro">ECOCentauro</SelectItem>
                    <SelectItem value="horus">Horus</SelectItem>
                    <SelectItem value="dexion">Dexion</SelectItem>
                    <SelectItem value="datacaixa">DataCaixa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>

            {/* 3. Solicitações de Segurança */}
            <section className="space-y-2">
              <Label className="font-semibold">3. Solicitações de Segurança</Label>
              <Select
                disabled={!accepted}
                onValueChange={(value) => {
                  const map: Record<string, string> = {
                    copia_gravacoes: LINKS.seguranca.copia_gravacoes,
                    senha_sistema: LINKS.seguranca.senha_sistema,
                    senha_email: LINKS.seguranca.senha_email,
                    auditoria: LINKS.seguranca.auditoria,
                  };
                  goTo(map[value]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={accepted ? "Selecione a solicitação" : "Aceite os termos para habilitar"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Opções</SelectLabel>
                    <SelectItem value="copia_gravacoes">Cópia de Gravações de Câmeras de Segurança</SelectItem>
                    <SelectItem value="senha_sistema">Alteração de Senhas de Sistema</SelectItem>
                    <SelectItem value="senha_email">Alteração de Senhas de E-mail</SelectItem>
                    <SelectItem value="auditoria">Auditoria de Acessos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          </CardContent>

          <CardFooter className="flex flex-col items-start gap-4">
            <p className="text-sm text-muted-foreground">
              Dica: selecione um item nos menus acima para ir direto ao formulário correspondente.
            </p>
            <Button type="button" disabled={!accepted}>
              Prosseguir
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}