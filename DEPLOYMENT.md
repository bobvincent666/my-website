# Release Checks

## Development Server

Run only one Docusaurus development server for this checkout. Stop it before
running a production build, then restart it. Rspack persistent caching is
disabled through Docusaurus's DOCUSAURUS_NO_PERSISTENT_CACHE option in the site
config after repeated Windows cache failures. This does not change upload
directories or database settings.

The database stores tutorial Markdown paths, not file contents. Preserve and
back up the backend uploads directory separately from frontend build files.
Frontend archives and backend JAR files do not include uploaded content.

## Local And Cloud Configuration

The backend includes optional upload-directory overlays. Default profile
activation is unchanged. Activate the common dev profile followed by the
environment overlay so the overlay takes precedence:

```text
Local IDE program arguments: --spring.profiles.active=dev,local
Cloud JAR arguments: --spring.profiles.active=dev,cloud
```

`application-local.properties` uses the local website_back_end/uploads paths.
`application-cloud.properties` uses /root/workspace/ai/website/back_end/uploads.
CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR and CONTENT_TUTORIAL_IMAGE_UPLOAD_DIR can
override either profile's paths. Check these variables when troubleshooting.

These profiles isolate filesystem locations, NOT database writes. With a
shared database, an admin edit or upload updates production article metadata.
Use a separate development database for admin editing tests. Copy/synchronize
required upload files for read-only local previews; do not change shared paths
to local filenames. No automatic fallback to production files is enabled.

## Before Publishing

Run from the local project. A nonzero exit code blocks the release:

```powershell
npm run check:tutorials -- http://spaceseek.tech
```

Use a persistent absolute backend upload directory in the server startup
environment (or the equivalent Spring property). Do not change local settings:

```bash
export CONTENT_TUTORIAL_MARKDOWN_UPLOAD_DIR=/root/workspace/ai/website/back_end/uploads/tutorial-markdown
```

## Frontend Replacement

Run in the server's portal_website directory. The archive contains a build/
directory. Validate the extracted files before moving the old release; never
delete the live build first. Do not use --strip-components=2.

```bash
set -e
test -s ./build.tar
stage=$(mktemp -d .release.XXXXXX)
tar -xf ./build.tar -C "$stage"
test -s "$stage/build/index.html"
test -s "$stage/build/tutorials/index.html"
test -s "$stage/build/tutorials/ms-cookbook/index.html"
test -s "$stage/build/ms-cookbook/index.html"
test -s "$stage/build/ms-cookbook/assets/content.js"
ls "$stage"/build/assets/js/main.*.js >/dev/null
ls "$stage"/build/assets/js/runtime~main.*.js >/dev/null
backup="build.bak.$(date +%Y%m%d%H%M%S)"
mv ./build "$backup"
if ! mv "$stage/build" ./build; then
  mv "$backup" ./build
  exit 1
fi
sudo nginx -t && sudo nginx -s reload
echo "Rollback directory: $backup"
```

## After Publishing

Run locally against the live site. Checks include all published Markdown
articles, Codex topic order, Cookbook routes, and current build JavaScript
content types. HTTP 200 with an empty body or HTML in place of JS fails:

```powershell
npm run check:release -- http://spaceseek.tech
```

If it fails, do not mark the release successful. Restore the saved build when
the frontend is broken; restore uploads or correct the backend upload setting
when article APIs return empty bodies. Keep the backup until checks pass.
