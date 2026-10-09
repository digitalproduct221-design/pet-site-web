import { valeurs } from "@/content/site";

/**
 * Ruban de chantier jaune, légèrement incliné, qui fait défiler nos valeurs à
 * cheval entre deux sections. Décoratif (les valeurs sont listées juste avant) :
 * masqué aux lecteurs d'écran, figé sous mouvement réduit, en pause au survol.
 */
export function RubanValeurs() {
  const suite = valeurs.map((v) => v.titre);
  return (
    <div aria-hidden className="relative z-10 -my-7 overflow-hidden py-4">
      <div className="ruban -mx-6 -rotate-[1.6deg] bg-jaune py-3.5 ombre-flottante">
        <div className="ruban-piste flex w-max">
          {[0, 1].map((copie) => (
            <ul key={copie} className="flex shrink-0 items-center">
              {suite.map((t) => (
                <li key={t} className="flex items-center titre text-[1.375rem] leading-none text-nuit sm:text-[1.625rem]">
                  <span className="px-6">{t}</span>
                  <span className="size-2.5 rotate-45 bg-nuit" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
