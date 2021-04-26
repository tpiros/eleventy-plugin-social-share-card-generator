declare module '@11ty/eleventy' {
  interface UserConfig {
    addShortcode(name: string, callback: (...args: any[]) => any): () => any;
  }
}
