// ?theme=film previews the film-palette variant; default is the flat poster palette.
export const isFilm =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('theme') === 'film';

if (typeof document !== 'undefined') {
  document.documentElement.dataset.theme = isFilm ? 'film' : 'poster';
}
