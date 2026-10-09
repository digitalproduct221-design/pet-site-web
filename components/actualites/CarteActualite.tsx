import Image from "next/image";
import type { Actualite } from "@/lib/contenu";

const formatDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Une nouvelle du quotidien : photo, date, titre et texte court. */
export function CarteActualite({ actualite, grande = false }: { actualite: Actualite; grande?: boolean }) {
  const { photo } = actualite;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-panneau bg-blanc ombre-carte">
      {photo ? (
        <div className={`relative ${grande ? "aspect-[16/10]" : "aspect-[4/3]"} bg-sable-soutenu`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={grande ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover"
            style={{ objectPosition: photo.focale }}
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <time dateTime={actualite.date} className="cote text-[0.9375rem] text-royal">
          {formatDate.format(new Date(actualite.date))}
        </time>
        <h3 className={`mt-2 titre leading-[0.98] text-nuit ${grande ? "text-[2rem]" : "text-[1.625rem]"}`}>{actualite.titre}</h3>
        <p className="mt-3 whitespace-pre-line text-[1.0625rem] leading-relaxed text-encre-douce">{actualite.texte}</p>
      </div>
    </article>
  );
}
