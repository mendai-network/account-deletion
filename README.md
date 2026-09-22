# Mendai Account Deletion — GitHub Pages

Ready-to-publish static site for Mendai's external account deletion request flow.

## 1. Configure the page

Open `config.js`.

The Supabase Edge Function endpoint is already set to the production Mendai project used in checklist item #16.

Optionally add public URLs for:

- Privacy Policy
- Terms
- Support

Leave any optional URL blank and the corresponding footer link stays hidden.

## 2. Put it on GitHub

Recommended repository layout if you want the final URL to be:

`https://mendai-network.github.io/account-deletion/`

Create a GitHub repository named `account-deletion` under the `mendai-network` account/organization and upload the contents of this folder to the repository root:

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `assets/mendai-logo.png`

Then in GitHub:

1. Open the repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Click **Save**.
6. Wait for GitHub Pages to publish the site.

## 3. Supabase CORS

The `account-deletion-request` Edge Function should allow:

`https://mendai-network.github.io`

For the implementation prepared in checklist item #16, set:

`ACCOUNT_DELETION_WEB_ORIGINS=https://mendai-network.github.io`

Do not place service-role keys or any other secret in this GitHub repository.

## 4. Test

Open the published URL, submit a request for a disposable test account, and verify the request appears in `public.account_deletion_web_requests`.

After the live test succeeds, use the final GitHub Pages URL for Mendai's `ACCOUNT_DELETION_URL` and for the Google Play account-deletion web resource.

## UI source

The page uses Mendai's app tokens from the Flutter project:

- Primary: `#5B3FF5`
- Primary dark: `#4B2EF1`
- Primary light: `#8D76FF`
- Soft purple: `#CFABF4`
- Light background: `#F9F8FF`
- Error/destructive: `#D84A5B`
- Large radius: `24px`

The page also supports the same light/dark palette family automatically through the browser's color-scheme preference.
