# PET – Film de présentation (storyboard à valider)

**Message :** PET construit durablement, avec rigueur et sécurité, partout au Sénégal. Ton posé, rassurant, premium.
**Formats :** 16:9 (1920×1080, site) + 9:16 (1080×1920, réseaux). Durée visée : ~46 s. Sous-titres français intégrés.
**Moteur :** HTML `seek(t)` + Chrome + ffmpeg (`claude-motion-design`), frames pures du temps, rendu 30 fps puis master 60 fps.
**Identité :** bleu nuit #0B1B3F, bleu royal #21409A, jaune chantier #F7C61C, ciel #5B9BD5. Titres condensés gras, équerres du logo comme cadres.

## Script voix off (≈ 100 mots)
1. « PET, Partenaire Entreprise Travaux. »
2. « Depuis 2016, nous construisons le Sénégal de demain. »
3. « Bâtiment, travaux publics, voiries et réseaux divers. »
4. « Hydraulique et assainissement : l'eau acheminée et traitée avec rigueur. »
5. « Génie civil, électricité et peinture : des ouvrages durables, jusqu'aux finitions. »
6. « Une équipe qualifiée, forte de plus de quarante ans d'expérience cumulée. »
7. « Qualité, sécurité, respect des lieux, tenue des délais. »
8. « PET : votre allié de confiance. Parlons de votre projet. »

## Table des plans
| # | Temps | Image (photos du site) | Mouvement | Texte à l'écran | Son |
|---|---|---|---|---|---|
| 1 | 0–5 s | terrassement-engins | push lent + équerres qui se dessinent | PET / PARTENAIRE ENTREPRISE TRAVAUX | impact doux, nappe |
| 2 | 5–10 s | immeuble-dakar | tilt montant sur la grue | Depuis 2016 | whoosh léger |
| 3 | 10–17 s | grande-avenue-urbaine-dakar + gros-oeuvre-dakar | travelling avant, 2 plans | Bâtiment · Travaux publics · VRD | tick par mot |
| 4 | 17–24 s | hydraulique-canalisations-pose, station-pompage-solaire | glissement latéral | Hydraulique et assainissement | eau/ambiance très basse |
| 5 | 24–31 s | genie-civil-reservoir-beton, immeuble-grue | pan + masque en volet | Génie civil · Électricité et peinture | tick |
| 6 | 31–38 s | equipe-pet | push, compteur « 40+ ans » | 40+ ans d'expérience cumulée | montée musicale |
| 7 | 38–43 s | briefing-securite-equipe | dérive lente, valeurs en cascade | Qualité · Sécurité · Respect des lieux · Délais | |
| 8 | 43–48 s | logo-pet-inverse sur bleu nuit | équerres se referment | Votre allié de confiance + téléphone + e-mail | accord final, hit |

Version 9:16 : mêmes plans recadrés sur le sujet, texte réagencé en bas, sous-titres en gros.

## Sources et sons
- Photos : uniquement celles déjà sur le site (`public/images/chantiers/`, `public/brand/`). Aucun chiffre ni client inventé : seuls « depuis 2016 » et « 40+ ans cumulés » (entreprise.json).
- Musique et effets : libres de droits à usage commercial (Mixkit), licence consignée dans `LICENSES.md`.
- Voix : ElevenLabs, voix française de la Voice Library, neutre, sans accent marqué, posée et chaleureuse. Je vous fais écouter 3 candidates sur 2 phrases avant de choisir.

## Risques
- Photos 1376×768 : léger zoom max 1,15 avec voile, pas de plein cadre brut.
- Appels API ElevenLabs payants : ~600 caractères par essai de voix, ~700 pour la version finale. Je demande avant.
- Polices Barlow Condensed non installées localement : je les embarque en woff2.

## Approbation
[ ] Approuvé par l'utilisateur le ____
