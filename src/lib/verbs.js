/**
 * Load Czech verb dictionary from public JSON asset.
 *
 * The data includes:
 *  - pronouns: list of Czech pronoun forms (já, ty, on/ona/ono, my, vy, oni)
 *  - verbs: array of verb objects, each with infinitive, group, and forms
 *
 * @returns {Promise<{ pronouns: string[], verbs: Array<{ infinitive: string, group: string, forms: Record<string, string> }> }>}
 */
export async function loadVerbs() {
  const base = import.meta.env.BASE_URL;
  const response = await fetch(`${base}verbs.json`);
  return response.json();
}
