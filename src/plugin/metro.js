import Metro from "metro";

const babelTransformerPath = require.resolve("./transformer");
const sourceExts = ["js", "ts", "jsx", "tsx"];
const imageExts = ["bmp", "gif", "png", "jpg", "jpeg", "webp", "svg"];
const assetExts = [...imageExts, "css"];

export const bundle = async (filename) => {
  const config = await Metro.loadConfig();
  config.resolver.sourceExts = [...sourceExts, ...assetExts];
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => !assetExts.includes(ext)
  );
  config.transformer.babelTransformerPath = babelTransformerPath;

  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "web",
    minify: true,
  });
  return code;
};
