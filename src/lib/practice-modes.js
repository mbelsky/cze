export const MODE_VERBS = "verbs";
export const MODE_MONTHS = "months";

export function resolveModeFromHash(hash) {
  return hash === "#/months" ? MODE_MONTHS : MODE_VERBS;
}

export function hashForMode(mode) {
  return mode === MODE_MONTHS ? "/months" : "/verbs";
}
