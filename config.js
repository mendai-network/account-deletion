window.MENDAI_ACCOUNT_DELETION_CONFIG = Object.freeze({
  // Public endpoint for the Supabase Edge Function created in checklist item #16.
  // This is not a secret and is safe to expose in a public GitHub Pages site.
  requestEndpoint:
    'https://cvsvgufcupscsyalgnvl.supabase.co/functions/v1/account-deletion-request',

  // Optional public Mendai links. Leave a value blank to hide that footer link.
  privacyPolicyUrl: '',
  termsUrl: '',
  supportUrl: '',
});
