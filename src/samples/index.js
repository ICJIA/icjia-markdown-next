import { article01 } from "./article01";
import { welcome } from "./welcome";
import { boilerplate01 } from "./boilerplate01";
// import { boilerplate02 } from "./boilerplate02";
import { boilerplate03 } from "./boilerplate03";
import { boilerplate04 } from "./boilerplate04";

// import { fontawesome } from "./fontawesome";
import { tables } from "./tables";
// import { math } from "./math";
import { readme } from "./readme";

import { images } from "./images";
// import { pagetop } from "./pagetop";
import { mixed } from "./mixed";
import { expandable } from "./expandable";
import { icjiaTypography } from "./icjiaTypography";

const samples = [
  {
    title: "Welcome",
    body: welcome,
    selectName: "What is Markdown?"
  },
  {
    title: "ICJIA Typography",
    body: icjiaTypography,
    selectName: "ICJIA Style Guide"
  },
  {
    title: "Article Sample",
    body: article01,
    selectName: "Article 01"
  },
  {
    title: "Privacy Policy Sample",
    body: boilerplate01,
    selectName: "Privacy 01"
  },
  // {
  //   title: "Boilerplate 02",
  //   body: boilerplate02,
  //   selectName: "Privacy 02"
  // },
  {
    title: "Markdown kitchen sink",
    body: boilerplate03,
    selectName: "Getting Started"
  },
  {
    title: "Footnotes",
    body: boilerplate04,
    selectName: "Footnotes"
  },

  // {
  //   title: "Fontawesome",
  //   body: fontawesome,
  //   selectName: "Fontawesome icons"
  // },
  {
    title: "Tables",
    body: tables,
    selectName: "Tables"
  },
  // {
  //   title: "Math is fun",
  //   body: math,
  //   selectName: "Math is fun"
  // },
  {
    title: "GitHub Readme",
    body: readme,
    selectName: "GitHub README"
  },

  {
    title: "Images",
    body: images,
    selectName: "Images"
  },
  // {
  //   title: "Page top",
  //   body: pagetop,
  //   selectName: "Return to page top"
  // },
  {
    title: "Mixed HTML and Markdown",
    body: mixed,
    selectName: "Mixed HTML and Markdown"
  },
  {
    title: "Expandable details",
    body: expandable,
    selectName: "Expandable details"
  }
];

export { samples };
