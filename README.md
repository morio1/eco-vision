# ECO-VISION

A React and Tailwind CSS prototype for waste collection, reporting, recycling kiosks, and payment screens, exported from Figma.

## Run locally

Install Node.js with npm, then run in this folder:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal.

## Build and preview

```sh
npm run build
npm run preview
```

Production files are generated in `dist/`.

## Prototype status

Login and payment flows are demonstrations, without real authentication or payment services. Collection requests and reports need a backend before live use.

## Update your existing GitHub repository

1. In VS Code, open the Command Palette and select **Git: Clone**. Paste your existing repository URL, choose a separate folder, and open the clone.
2. Copy this project's files into the clone, replacing corresponding old files. Include `src`, configuration files, `index.html`, `package.json`, `package-lock.json`, `.gitignore`, and documentation. Exclude `node_modules`, `dist`, and `.npm-cache`. Keep the clone's `.git` folder.
3. Run `npm ci` and `npm run build` in the clone.
4. Open **Source Control**, review and stage the intended changes, enter `Update ECO-VISION from Figma export`, and commit.
5. Click **Sync Changes** or **Push**. Sign into GitHub if prompted.

Cloning first preserves your repository history. Uploading source code does not automatically configure website hosting.

## Design and attribution

Original design: https://www.figma.com/design/4FgToIFQKhTHCgWTiEu2v5/ECO-VISION-App-Design

See `ATTRIBUTIONS.md` and `src/app/Attributions.md` for third-party notices.

## Functional local update

Pickup and report forms now save records on the current browser, with history pages and report photo attachments (up to three, under 500 KB each). Demo payment transactions persist and receipts can be downloaded or shared. Kiosk buttons open phone, map, and SMS apps using sample directory data. Profile preferences persist. No real money moves, authorities are not notified, and authentication, SMS delivery, verified kiosk data, and translation still require service integration. Browser storage is not shared between devices or users; use only test data.
