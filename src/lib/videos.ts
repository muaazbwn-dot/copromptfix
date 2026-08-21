/**
 * Featured video content for the Promptify homepage.
 *
 * These are normal content videos (tutorials, prompt demos) — never ads.
 * Add entries here; the "Featured Videos" section renders automatically
 * and stays hidden while the list is empty.
 */

export type FeaturedVideo = {
  id: string;
  title: string;
  description: string;
  /** Poster image shown on the card (any public/CDN url). */
  thumbnail: string;
  /**
   * Player source. Either a direct video file (mp4/webm) or an embed url
   * (e.g. https://www.youtube.com/embed/XXXX). Detected automatically.
   */
  src: string;
};

export const FEATURED_VIDEOS: FeaturedVideo[] = [];

export function isEmbed(src: string) {
  return /youtube\.com\/embed|player\.vimeo\.com/.test(src);
}
