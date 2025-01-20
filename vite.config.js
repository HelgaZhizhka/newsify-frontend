export default {
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        about: "about.html",
        headlines: 'top-headlines.html',
      },
    },
  },
};