import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const PHOTOS_OUT = "public/images/chantiers";

const nouvellesPhotos = [
  {
    src: "assets/photos-nouvelles/Construction_crew_listening_to_e…_20261012005925.jpg",
    out: "equipe-pet.jpg",
  },
  {
    src: "assets/photos-nouvelles/Workers_walking_on_construction_…_20261012005925.jpg",
    out: "equipe-en-marche.jpg",
  },
  {
    src: "assets/photos-nouvelles/Building_under_construction_in_D…_20261012005925.jpg",
    out: "immeuble-dakar.jpg",
  },
  {
    src: "assets/photos-nouvelles/Workers_constructing_building_in…_20261012005925.jpg",
    out: "gros-oeuvre-dakar.jpg",
  },
  {
    src: "assets/photos-nouvelles/School_building_in_Senegal_20261012005925.jpg",
    out: "ecole-senegal.jpg",
  },
  {
    src: "assets/photos-nouvelles/Contemporary_villa_exterior_with…_20261012005925.jpg",
    out: "villa-contemporaine.jpg",
  },
  {
    src: "assets/photos-nouvelles/Perimeter_wall_and_steel_gate_20261012005925.jpg",
    out: "cloture-maconnee.jpg",
  },
  {
    src: "assets/photos-nouvelles/Newly_paved_neighborhood_road_20261012005925.jpg",
    out: "voirie-asphalte.jpg",
  },
  {
    src: "assets/photos-nouvelles/Operator_leveling_road_with_grader_20261012005925.jpg",
    out: "niveleuse-piste.jpg",
  },
  {
    src: "assets/photos-nouvelles/Technicians_inspecting_pipeline_…_20261012005925.jpg",
    out: "epreuve-hydraulique.jpg",
  },
  {
    src: "assets/photos-nouvelles/Farmer_irrigating_crops_in_field_20261012005925.jpg",
    out: "irrigation-niayes.jpg",
  },
  {
    src: "assets/photos-nouvelles/Irrigation_pump_in_agricultural_…_20261012005925.jpg",
    out: "station-pompage-solaire.jpg",
  },
  {
    src: "assets/photos-nouvelles/Technician_performing_concrete_s…_20261012005925.jpg",
    out: "controle-qualite-beton.jpg",
  },
  {
    src: "assets/photos-nouvelles/Manager_and_client_shaking_hands_20261012005925.jpg",
    out: "partenariat-chantier.jpg",
  },
  {
    src: "assets/photos-nouvelles/Engineer_reviewing_construction_…_20261012005925.jpg",
    out: "pilotage-chantier.jpg",
  },
];

async function main() {
  await mkdir(PHOTOS_OUT, { recursive: true });

  for (const item of nouvellesPhotos) {
    if (!existsSync(item.src)) {
      console.error(`Fichier manquant: ${item.src}`);
      continue;
    }
    const dest = `${PHOTOS_OUT}/${item.out}`;
    await sharp(item.src)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(dest);
    console.log(`Optimisé: ${item.out}`);
  }
}

main().catch(console.error);
