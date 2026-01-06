import { PartyPopper, Calendar, Clock } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
            <PartyPopper className="w-4 h-4" />
            <span>Você está convidado!</span>
          </div>
        </div>

        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <span className="text-foreground">Meu</span>{" "}
          <span className="text-gradient">Aniversário</span>
        </h1>

        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          É com grande alegria que convido você para celebrar mais um ano de vida comigo. 
          Sua presença tornará esse momento ainda mais especial e memorável.
        </p>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <div className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-card shadow-card border border-border">
            <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Data</p>
              <p className="font-semibold text-foreground text-xs sm:text-sm">17 de Janeiro de 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-card shadow-card border border-border">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Horário</p>
              <p className="font-semibold text-foreground text-xs sm:text-sm">19:00</p>
            </div>
          </div>
        </div>

        <div 
          className="mt-16 animate-fade-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <a 
            href="#confirmacao"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base sm:text-lg hover:opacity-90"
          >
            Confirmar Presença
          </a>
        </div>
      </div>
    </section>
  );
};
