import { useState } from "react";
import { Check, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Data limite: 15/01/2026 às 00:00 (horário de Brasília)
const RSVP_DEADLINE = new Date('2026-01-15T00:00:00-03:00');

const isAfterDeadline = () => {
  const now = new Date();
  return now >= RSVP_DEADLINE;
};

export const RSVPForm = () => {
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();
  const deadlinePassed = isAfterDeadline();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deadlinePassed) {
      toast({
        title: "Prazo encerrado",
        description: "O prazo para confirmação de presença já foi encerrado.",
        variant: "destructive",
      });
      return;
    }
    
    if (!fullName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite seu nome completo.",
        variant: "destructive",
      });
      return;
    }

    if (fullName.trim().length < 3) {
      toast({
        title: "Nome muito curto",
        description: "Por favor, digite seu nome completo.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("confirmations")
        .insert({ full_name: fullName.trim() });

      if (error) throw error;

      setIsConfirmed(true);
      toast({
        title: "Presença confirmada! 🎉",
        description: "Obrigado por confirmar. Esperamos você!",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro ao confirmar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfirmed) {
    return (
      <section id="confirmacao" className="py-20 px-4 bg-background">
        <div className="container max-w-xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-card border border-border shadow-card animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Presença Confirmada!
            </h2>
            <p className="text-muted-foreground text-lg">
              Obrigado, <span className="text-primary font-semibold">{fullName}</span>!<br />
              Artur fica muito feliz com sua confirmação. <br /> Te esperamos lá!
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (deadlinePassed) {
    return (
      <section id="confirmacao" className="py-20 px-4 bg-background">
        <div className="container max-w-xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-card border border-border shadow-card">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Prazo Encerrado
            </h2>
            <p className="text-muted-foreground text-lg">
              O prazo para confirmação de presença foi encerrado em <br />
              <span className="font-semibold text-foreground">15 de janeiro de 2026</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="confirmacao" className="py-20 px-4 bg-background">
      <div className="container max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Confirme sua </span>
            <span className="text-gradient">Presença</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Preencha seu nome abaixo para confirmar
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Confirmações até <span className="font-semibold text-foreground">14/01/2026 às 23:59</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border shadow-card">
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Nome Completo
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Digite seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 sm:h-14 text-base sm:text-lg bg-background border-border focus:ring-primary focus:border-primary"
                disabled={isLoading}
                maxLength={100}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-glow transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Confirmando...
                </>
              ) : (
                "Confirmar Presença"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
