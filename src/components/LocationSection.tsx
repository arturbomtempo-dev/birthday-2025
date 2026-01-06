import { MapPin, Navigation } from "lucide-react";

export const LocationSection = () => {
  return (
    <section id="local" className="py-20 px-4 bg-card">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">O </span>
            <span className="text-gradient">Local</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Um ambiente aconchegante e especial para celebrarmos juntos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Restaurant Image */}
          <div className="rounded-2xl overflow-hidden shadow-card border border-border">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
              alt="TripFood Sapucaí - ambiente elegante"
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Info Card */}
          <div className="p-6 rounded-2xl bg-background border border-border shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-accent">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  TripFood Sapucaí
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rua Sapucaí, 383 - Floresta<br />
                  Belo Horizonte - MG
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=TripFood+Sapucai+Belo+Horizonte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all"
            >
              <Navigation className="w-4 h-4" />
              Como chegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
