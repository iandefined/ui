import { createElement } from "react";
import { render } from "takumi-js";

/*
 * Keep this renderer in the Node-only static asset build. Importing Takumi from
 * a Worker route bundles its ~3.5 MiB WASM runtime and exceeds Cloudflare's
 * 3 MiB free-plan Worker limit. The generated PNGs are served by Workers
 * Static Assets, so do not move this back to request-time rendering or add
 * runtime WASM initialization here.
 */
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_WIDTH = 1200;

const logoMarkPath =
  "M4.465 1.465c-.528-.001-.697.71-.225.947c.78.39 1.588 1.043 2.248 1.783A3.7 3.7 0 0 0 5 3.875c-1.018 0-2.025.443-2.853 1.271c-.374.374.01.996.511.829c1-.334 2.3-.424 3.463-.272a3.74 3.74 0 0 0-1.537.916c-.72.72-1.12 1.744-1.12 2.916c0 .528.712.697.948.225C4.94 8.705 5.945 7.6 7 6.877V13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V6.877c1.055.723 2.06 1.828 2.588 2.883c.236.472.948.303.947-.225c0-1.172-.4-2.196-1.119-2.916a3.74 3.74 0 0 0-1.537-.916c1.163-.152 2.462-.062 3.463.272c.5.167.885-.455.511-.828c-.828-.83-1.835-1.272-2.853-1.272a3.7 3.7 0 0 0-1.488.32c.66-.74 1.467-1.393 2.248-1.783c.472-.236.303-.948-.225-.947c-1.172 0-2.196.4-2.916 1.119A3.6 3.6 0 0 0 8 3.42a3.6 3.6 0 0 0-.62-.836c-.719-.72-1.743-1.12-2.915-1.12";

const gridLineStyle = {
  borderColor: "#44403c",
  borderStyle: "solid",
  display: "flex",
  position: "absolute",
};

const lineClampStyle = ({ fontSize, lineClamp, lineHeight }) => ({
  maxHeight: fontSize * lineHeight * lineClamp,
  overflow: "hidden",
});

const getTitleFontSize = (title) => (title.length > 20 ? 64 : 80);
const h = createElement;

const createOgImageElement = ({ description, title }) => {
  const titleFontSize = getTitleFontSize(title);

  return h(
    "div",
    {
      style: {
        background: "#000000",
        color: "#ffffff",
        display: "flex",
        height: "100%",
        position: "relative",
        width: "100%",
      },
    },
    h("div", {
      style: {
        ...gridLineStyle,
        borderWidth: "0 1px 0 0",
        bottom: 0,
        left: 64,
        top: 0,
      },
    }),
    h("div", {
      style: {
        ...gridLineStyle,
        borderWidth: "0 1px 0 0",
        bottom: 0,
        right: 64,
        top: 0,
      },
    }),
    h("div", {
      style: {
        ...gridLineStyle,
        borderWidth: "1px 0 0",
        left: 0,
        right: 0,
        top: 64,
      },
    }),
    h("div", {
      style: {
        ...gridLineStyle,
        borderWidth: "1px 0 0",
        bottom: 64,
        left: 0,
        right: 0,
      },
    }),
    h(
      "div",
      {
        style: {
          bottom: 96,
          color: "#ffffff",
          display: "flex",
          position: "absolute",
          right: 96,
        },
      },
      h(
        "svg",
        {
          fill: "currentColor",
          height: 48,
          viewBox: "0 0 16 16",
          width: 48,
          xmlns: "http://www.w3.org/2000/svg",
        },
        h("path", { d: logoMarkPath })
      )
    ),
    h(
      "div",
      {
        style: {
          bottom: 128,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          left: 128,
          position: "absolute",
          top: 128,
          width: 896,
        },
      },
      h(
        "div",
        {
          style: {
            flexGrow: 1,
            fontSize: titleFontSize,
            fontWeight: 600,
            letterSpacing: 0,
            lineHeight: 1.1,
            textWrap: "balance",
            ...lineClampStyle({
              fontSize: titleFontSize,
              lineClamp: 2,
              lineHeight: 1.1,
            }),
          },
        },
        title
      ),
      h(
        "div",
        {
          style: {
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
          },
        },
        description
      )
    )
  );
};

export const renderOgImage = ({ description, title }) =>
  render(createOgImageElement({ description, title }), {
    format: "png",
    height: OG_IMAGE_HEIGHT,
    width: OG_IMAGE_WIDTH,
  });
