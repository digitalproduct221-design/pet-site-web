import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { Icone } from "@/components/ui/Icone";

interface ElementCollage {
  titre: string;
  slug: string;
  icone: string;
  photo: typeof photos.immeubleDakar;
  className: string;
}

const elements: ElementCollage[] = [
  {
    titre: "Bâtiment",
    slug: "batiment",
    icone: "batiment",
    photo: photos.immeubleDakar,
    className: "col-span-12 sm:col-span-7 row-span-2 h-[15rem] sm:h-[18rem] lg:h-[20rem]",
  },
  {
    titre: "TP & VRD",
    slug: "travaux-publics-vrd",
    icone: "route",
    photo: photos.vrdAsphalteBoulevard,
    className: "col-span-6 sm:col-span-5 h-[9rem] sm:h-[11rem] lg:h-[12rem]",
  },
  {
    titre: "Hydraulique",
    slug: "hydraulique",
    icone: "eau",
    photo: photos.hydrauliqueCanalisationsPose,
    className: "col-span-6 sm:col-span-5 h-[9rem] sm:h-[11rem] lg:h-[12rem]",
  },
  {
    titre: "Génie Civil",
    slug: "genie-civil",
    icone: "genie-civil",
    photo: photos.genieCivilReservoirBeton,
    className: "col-span-6 sm:col-span-6 h-[10rem] sm:h-[12rem] lg:h-[13rem]",
  },
  {
    titre: "Assainissement",
    slug: "assainissement",
    icone: "assainissement",
    photo: photos.dalotRegard,
    className: "col-span-6 sm:col-span-6 h-[10rem] sm:h-[12rem] lg:h-[13rem]",
  },
];

/**
 * Collage officiel des savoir-faire PET pour la section hero :
 * Réunit visuellement les 5 piliers techniques de l'entreprise (Bâtiment, TP & VRD, Hydraulique, Génie Civil, Assainissement).
 */
export function CollageSavoirFaire() {
  return (
    <div className="relative w-full max-w-[42rem] lg:max-w-none">
      {/* Filet décoratif et lueur d'ambiance */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-royal/30 via-ciel/20 to-jaune/25 blur-2xl opacity-60"
      />

      <div className="relative grid grid-cols-12 gap-3 sm:gap-4 p-2 sm:p-3 rounded-3xl bg-blanc/5 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(7,18,43,0.35)]">
        {elements.map((el) => (
          <Link
            key={el.slug}
            href={`/savoir-faire/${el.slug}`}
            className={`group relative overflow-hidden rounded-2xl bg-nuit shadow-md border border-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:border-jaune/60 ${el.className}`}
          >
            <Image
              src={el.photo.src}
              alt={el.photo.alt}
              fill
              placeholder="blur"
              quality={70}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-chantier group-hover:scale-110"
              style={{ objectPosition: el.photo.focale }}
            />
            {/* Voile assombrissant progressif */}
            <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/30 to-transparent transition-opacity duration-300 group-hover:from-nuit/95" />

            {/* Badge de savoir-faire */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between text-blanc">
              <div className="flex items-center gap-2">
                <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-jaune text-nuit shadow-sm">
                  <Icone nom={el.icone} size={16} weight="bold" />
                </span>
                <span className="font-display font-extrabold text-[0.875rem] sm:text-[1rem] tracking-tight text-blanc group-hover:text-jaune transition-colors">
                  {el.titre}
                </span>
              </div>
              <span className="hidden sm:flex size-6 items-center justify-center rounded-full bg-white/10 text-blanc opacity-0 group-hover:opacity-100 transition-opacity">
                <Icone nom="fleche" size={12} weight="bold" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
