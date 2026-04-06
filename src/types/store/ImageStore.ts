export interface ImageStore {
  cache: Record<string, string>;
  getUrl: (src: string) => Promise<string | null>;
}
