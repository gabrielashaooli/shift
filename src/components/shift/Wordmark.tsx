// La marca es la S de flechas (el cambio de un estado al otro) y la palabra la
// pone la tipografía del sitio, para que no compita con otra fuente.
import mark from "@/assets/shift-mark.png";

export function Wordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`display-xl inline-flex items-center gap-2 leading-none ${className}`}>
      <img src={mark} alt="" aria-hidden="true" className="h-[1.15em] w-auto" />
      <span>SHIFT</span>
    </span>
  );
}
