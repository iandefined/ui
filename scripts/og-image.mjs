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
  "M247.94 79.21a8 8 0 0 0-4.36-6.37L197.29 49.7C191.54 39.24 177.21 32 160 32c-22.43 0-40 12.3-40 28a20.8 20.8 0 0 0 1.06 6.53l-19.52 9.76A53.7 53.7 0 0 0 80 72c-22.43 0-40 12.3-40 28a20.8 20.8 0 0 0 1.06 6.53l-28.64 14.31A8 8 0 0 0 8 128v64a8 8 0 0 0 4.42 7.16l64 32a8 8 0 0 0 7.16 0l160-80A8 8 0 0 0 248 144V80a4.5 4.5 0 0 0-.06-.79M80 151.06L33.89 128L51 119.45c7.24 5.29 17.48 8.55 29 8.55c22.43 0 40-12.3 40-28a21.77 21.77 0 0 0-4.35-12.88L131 79.45c7.24 5.29 17.48 8.55 29 8.55c18.38 0 33.49-8.26 38.35-19.88L222.11 80ZM160 48c12.23 0 21.69 5 23.63 10.12c0 .09.07.18.11.28A5.3 5.3 0 0 1 184 60c0 5.66-10.26 12-24 12c-9.66 0-17.6-3.14-21.46-7a7 7 0 0 0-.86-.93A6.66 6.66 0 0 1 136 60c0-5.66 10.26-12 24-12M80 88a37 37 0 0 1 17.13 3.87a7.5 7.5 0 0 0 1 .56c3.69 2.21 5.87 5 5.87 7.57c0 5.66-10.26 12-24 12c-9.67 0-17.61-3.14-21.47-7a7.5 7.5 0 0 0-.84-.93A6.62 6.62 0 0 1 56 100c0-5.66 10.26-12 24-12m-56 52.94l48 24v46.12l-48-24Z";

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
          fill: "#ffffff",
          height: 48,
          viewBox: "0 0 256 256",
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
