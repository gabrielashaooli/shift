// Usa el logo completo, que ya incluye la palabra SHIFT, así que no se repite
// en texto al lado.
import logo from "@/assets/shift-logo.png";

export function Wordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      <img src={logo} alt="SHIFT" className="h-[1.2em] w-auto" />
    </span>
  );
}
