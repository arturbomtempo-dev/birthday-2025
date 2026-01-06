export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-card border-t border-border">
      <div className="container max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground text-sm">
          Desenvolvido por{" "}
          <a 
            href="https://www.arturbomtempo.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            Artur Bomtempo
          </a>
        </p>
      </div>
    </footer>
  );
};
