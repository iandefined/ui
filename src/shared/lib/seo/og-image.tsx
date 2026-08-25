import { fromJsx } from "takumi-js/helpers/jsx";
import { init as initTakumiWasm, Renderer } from "takumi-js/wasm";

import { LogoMark } from "@/shared/components/logo";
import { SITE } from "@/shared/constants/site";

const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_WIDTH = 1200;

type OgImageOptions = {
  description?: string;
  title?: string;
};

const gridLineStyle = {
  borderColor: "#44403c",
  borderStyle: "solid",
  display: "flex",
  position: "absolute",
} as const;

const lineClampStyle = ({
  fontSize,
  lineClamp,
  lineHeight,
}: {
  fontSize: number;
  lineClamp: number;
  lineHeight: number;
}) =>
  ({
    maxHeight: fontSize * lineHeight * lineClamp,
    overflow: "hidden",
  }) as const;

const getTitleFontSize = (title: string) => (title.length > 20 ? 64 : 80);

let renderer: Renderer | undefined;
let rendererPromise: Promise<Renderer> | undefined;

export const ogImageSize = {
  height: OG_IMAGE_HEIGHT,
  width: OG_IMAGE_WIDTH,
} as const;

const getRenderer = () => {
  rendererPromise ??= Promise.resolve()
    .then(() => initTakumiWasm())
    .then(() => {
      renderer = new Renderer();
      return renderer;
    });

  return renderer ?? rendererPromise;
};

const createOgImageElement = ({
  description = SITE.DESCRIPTION.LONG,
  title = SITE.TITLE.SHORT,
}: OgImageOptions = {}) => (
  <div
    style={{
      background: "#000000",
      color: "#ffffff",
      display: "flex",
      height: "100%",
      position: "relative",
      width: "100%",
    }}
  >
    <div
      style={{
        ...gridLineStyle,
        borderWidth: "0 1px 0 0",
        bottom: 0,
        left: 64,
        top: 0,
      }}
    />
    <div
      style={{
        ...gridLineStyle,
        borderWidth: "0 1px 0 0",
        bottom: 0,
        right: 64,
        top: 0,
      }}
    />
    <div
      style={{
        ...gridLineStyle,
        borderWidth: "1px 0 0",
        left: 0,
        right: 0,
        top: 64,
      }}
    />
    <div
      style={{
        ...gridLineStyle,
        borderWidth: "1px 0 0",
        bottom: 64,
        left: 0,
        right: 0,
      }}
    />
    <div
      style={{
        bottom: 96,
        color: "#ffffff",
        display: "flex",
        position: "absolute",
        right: 96,
      }}
    >
      <LogoMark height={48} width={48} />
    </div>
    <div
      style={{
        bottom: 128,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        left: 128,
        position: "absolute",
        top: 128,
        width: 896,
      }}
    >
      <div
        style={{
          flexGrow: 1,
          fontSize: getTitleFontSize(title),
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1.1,
          textWrap: "balance",
          ...lineClampStyle({
            fontSize: getTitleFontSize(title),
            lineClamp: 2,
            lineHeight: 1.1,
          }),
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "#a8a29e",
          flexGrow: 1,
          fontSize: 40,
          fontWeight: 500,
          lineHeight: 1.5,
          textWrap: "balance",
          ...lineClampStyle({
            fontSize: 40,
            lineClamp: 4,
            lineHeight: 1.5,
          }),
        }}
      >
        {description}
      </div>
    </div>
  </div>
);

export const createOgImageResponse = async (options?: OgImageOptions) => {
  const takumiRenderer = await getRenderer();
  const { node, stylesheets } = await fromJsx(createOgImageElement(options));
  const image = await takumiRenderer.render(node, {
    ...ogImageSize,
    format: "png",
    stylesheets,
  });
  const body = new ArrayBuffer(image.byteLength);
  new Uint8Array(body).set(image);

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "image/png",
    },
  });
};
