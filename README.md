# CMD Lab App Library

A lightweight app showcase for CMD Lab members at EdUHK. The library introduces tools for composition, interactive media, music education, AI, recording, production, and live performance.

The website uses plain HTML, CSS, JavaScript, and JSON. It has no framework, package manager, backend, or build step.

## File structure

```text
cmd-lab-app-library/
├── index.html       # Homepage, search, filters, and app cards
├── app.html         # Reusable detail page loaded with an app ID
├── styles.css       # Layout, responsive design, and visual styles
├── script.js        # Data loading, filters, search, and detail-page logic
├── data/
│   └── apps.json    # All app information
├── README.md        # Project and maintenance instructions
└── .nojekyll        # Tells GitHub Pages to serve files directly
```

## Preview locally

Because the site loads `data/apps.json`, preview it through a small local web server rather than opening `index.html` directly.

1. Open a terminal in this project folder.
2. Run `python3 -m http.server 8000`.
3. Visit `http://localhost:8000` in a browser.
4. Stop the server with `Control-C` when finished.

## Update or add an app

All entries are inside the `apps` array in `data/apps.json`.

1. Copy an existing app object, including its opening and closing braces.
2. Add a comma between adjacent app objects.
3. Give the app a unique lowercase `id`, using hyphens instead of spaces—for example, `logic-pro`.
4. Complete every field. Keep descriptions concise and verify external links.
5. Use one of the category names already used by the homepage filters.
6. Preview both the homepage and `app.html?id=your-app-id`.

JSON requires double quotation marks around text. A missing comma or quotation mark can stop the whole library from loading. Use a JSON validator if the page reports a loading problem.

## Make changes through GitHub's website

1. Sign in to the CMD Lab GitHub account and open this repository.
2. Select the file you want to edit.
3. Select the pencil icon labelled **Edit this file**.
4. Make a focused change and use the **Preview** tab when available.
5. Select **Commit changes**. A commit is a saved version of the project; write a short message explaining the change.
6. Keep the option to commit directly to `main` only for small, reviewed changes. For larger changes, create a new branch and pull request so another committee member can review them first.

## GitHub Pages configuration

The intended configuration is:

- Repository visibility: Public
- Source branch: `main`
- Source folder: `/` (repository root)
- Custom build process: None

In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub will display the published website address after deployment finishes.

The empty `.nojekyll` file prevents GitHub Pages from processing the site with Jekyll and ensures the static files are served directly.

## Maintenance guide

- Review app descriptions and links once per semester.
- Assign an owner/contact only when that person agrees to support the entry.
- Keep categories consistent; if a category changes, also update `CATEGORIES` in `script.js`.
- Check new tools for educational or creative value before adding them.
- For AI tools, review current access terms, privacy, copyright, and classroom suitability.
- Preview changes on desktop and mobile before committing them.
- Avoid adding frameworks or dependencies unless the committee has a clear maintenance plan.
- Give committee members repository access through **Settings → Collaborators and teams**. Use the lowest permission level that supports their role.
