/**
 * Joint une liste en français, en minuscule après le premier élément
 * (sauf sigles : VRD, QHSE…). Ex. « Logements, écoles et universités, murs de clôture ».
 */
export function listeFrancaise(elements: string[]) {
  return elements
    .map((e, i) => (i === 0 || /^[A-ZÀ-Ý]{2,}\b/.test(e) ? e : e.charAt(0).toLowerCase() + e.slice(1)))
    .join(", ");
}
