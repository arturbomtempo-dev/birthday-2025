import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Users, ArrowLeft, Loader2, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface Confirmation {
  id: string;
  full_name: string;
  created_at: string;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      fetchConfirmations();
    } else {
      setError("Senha incorreta");
    }
  };

  const fetchConfirmations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("confirmations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setConfirmations(data || []);
    } catch (error) {
      console.error("Error fetching confirmations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchConfirmations();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <ThemeToggle />
        
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Área do Organizador
            </h1>
            <p className="text-muted-foreground">
              Digite a senha para acessar
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 rounded-3xl bg-card border border-border shadow-card space-y-6">
            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 text-lg bg-background border-border"
              />
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 rounded-xl"
            >
              Entrar
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-primary text-sm inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao convite
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <ThemeToggle />
      
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Lista de Confirmados
            </h1>
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-primary text-sm inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao convite
            </Link>
          </div>
          
          <Button
            onClick={fetchConfirmations}
            variant="outline"
            className="gap-2"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Atualizar
          </Button>
        </div>

        {/* Stats Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-card mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-accent">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total de Confirmados</p>
              <p className="font-display text-4xl font-bold text-gradient">
                {confirmations.length}
              </p>
            </div>
          </div>
        </div>

        {/* Guests List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : confirmations.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-2xl bg-card border border-border">
            <UserCheck className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Nenhuma confirmação ainda
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      #
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Nome
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Data da Confirmação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {confirmations.map((confirmation, index) => (
                    <tr 
                      key={confirmation.id} 
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {confirmation.full_name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(confirmation.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
