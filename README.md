# aus/fin - Aussie Personal Finance

## Description

A hobby project based around creating easy to use personal finance calculators tailored for Australians. The calculator logic has been built gradually since starting my coding journey, and so far includes services for tax, super, HECS-HELP, medicare, and also a rough estimate of time taken to reach FIRE (financial independence)!

I'm also working on a related Java Spring API to house separate the calculation logic from the front-end over [here](https://github.com/austnly/ausfin-api).

### 🚀 [Launch Live Project](https://www.astnly.com/ausfin)

## Table of Contents

-   [Screenshots](#screenshots)
-   [Goals](#goals)
-   [Tech Stack](#tech-stack)
-   [Implementation](#implementation)
    -   [Background](#background)
    -   [Plan](#planning-logic)
    -   [Issues Addressed](#issues-addressed)
-   [Future Additions](#future-additions)

## Screenshots

<!--
<figure>
<figcaption><i>Home Page</i></figcaption>
<img src="./screenshots/home.png" height="300px" alt="Home Page" />
</figure> -->

## Goals

-   To create a functional and easy-to-use page using React, Material UI, JavaScript, and TypeScript
-   To familiarise myself with principles of TypeScript
-   To explore the different components available in Material UI, and use the styled-components-inspired @emotion/styled CSS library for creating React components
-   To scrape table data from webpages using a Node script, in this case the [Australian Taxation Office](https://www.ato.gov.au/rates/individual-income-tax-rates/) website

## Tech Stack

-   HTML
-   CSS
-   JavaScript
-   TypeScript
-   Git
-   Node
-   ReactJS
-   React Router DOM
-   [Material UI](https://mui.com/)
-   [@emotion/styled](https://emotion.sh/docs/styled)

## Implementation

### Background

This project came about after years of relying on my own customised Excel Spreadsheets to calculate my projected taxes as accurately as possible as a self-employed dentist. To do this, I copied over the tax, medicare levy and HELP tables from the Australian Tax Office website.

When I discovered FIRE, I built on the original spreadsheet to create a projection of when I might be able to reach FI based on consistent income and investing. I figured this would be a handy reminder to motivate me in reaching my financial goals.

After getting into coding, I wanted to translate my work from these spreadsheets, so I started this project in Python, the first language I learnt the basics of. While learning the full-stack, I figured I could finally turn my tacky spreadsheet into a nice and functional UI other people might actually want to use. I ported my original code over to JavaScript, and recently have further developed a TypeScript iteration.

While this is still in progress, it (mostly) works! I aim to add more explanations of the calculator assumptions in future, as well as some graphed result outputs.

### Planning Logic

1. Created a JS script to run in Node that would fetch the relevant tables from the ATO website and save them in JSON format.
1. Started with basic pure-ish calculation functions - superannuation, HELP, medicare levy surcharge
1. Used these functions to plug in to a bigger function to calculate the tax, HELP, MLS liability for a financial year, and then a time to FIRE calculator function
1. Created the web UI in React, using the MUI component library
1. Created separate pages for each calculator initially
1. Eventually refactored the pages to use a generic Calculator component container which would map through a different array of inputs/results and process the data differently for each calculator type

### Issues Addressed

I encountered the following issues along the way:

-   [ ] Initially attempted to do the project in TypeScript React (TSX) - and realised I did not know TypeScript well enough
-   [x] Using the Link component from React Router DOM added default anchor styling which I wanted to overwrite globally - my solution was to created a StyledLink component using @emotion/styled to wrap the Link component
-   [x] Initial layout was messy with individual forms and calculator pages for each type - refactored code to be able to use arrays that allowed easy mapping to components for Forms
-   [x] Issue with navigating to a direct URL (e.g. /ausfin/tax) due to GitHub Pages implementation returning a 404. Fixed using redirect scripts in 404.html and index.html from [rafgraph/spa-github/pages](https://github.com/rafgraph/spa-github-pages)

### Future Additions

-   [ ] (In progress) Migrate all calculation logic to a [Java Spring API](https://github.com/austnly/ausfin-api)
-   [ ] Functionality to home page buttons as a select or radio
-   [ ] Page headings
-   [ ] Refactor to mount correct Calculator with props based on URL params to reduce React JSX components
-   [ ] Graphical results
-   [ ] Descriptive page content and explanations
