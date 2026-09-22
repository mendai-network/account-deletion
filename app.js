(() => {
  'use strict';

  const config = window.MENDAI_ACCOUNT_DELETION_CONFIG || {};
  const form = document.getElementById('deletion-form');
  const button = document.getElementById('submit-button');
  const buttonLabel = document.getElementById('button-label');
  const status = document.getElementById('status');

  const setOptionalLink = (id, url) => {
    const element = document.getElementById(id);
    if (!element || !url) return;
    element.href = url;
    element.classList.add('visible');
  };

  setOptionalLink('privacy-link', config.privacyPolicyUrl);
  setOptionalLink('terms-link', config.termsUrl);
  setOptionalLink('support-link', config.supportUrl);

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = `status ${type}`;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const setLoading = (loading) => {
    button.disabled = loading;
    button.classList.toggle('loading', loading);
    button.setAttribute('aria-busy', String(loading));
    buttonLabel.textContent = loading ? 'Submitting request…' : 'Request account deletion';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'status';
    status.textContent = '';

    if (!form.reportValidity()) return;

    const endpoint = config.requestEndpoint;
    if (!endpoint) {
      showStatus('Account deletion requests are temporarily unavailable. Please contact Mendai support.', 'error');
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20000);

      let response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: document.getElementById('email').value.trim(),
            username: document.getElementById('username').value.trim(),
            reason: document.getElementById('reason').value.trim(),
            website: document.getElementById('website').value,
            confirmed: document.getElementById('confirmed').checked,
          }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeout);
      }

      let payload = {};
      try {
        payload = await response.json();
      } catch (_) {
        // Keep a generic message when the server did not return JSON.
      }

      if (!response.ok) {
        throw new Error(payload.message || 'Could not submit your request. Please try again.');
      }

      const reference = payload.request_id ? ` Reference: ${payload.request_id}.` : '';
      showStatus(
        `${payload.message || 'Your account deletion request has been received.'}${reference}`,
        'success',
      );
      form.reset();
    } catch (error) {
      const message = error?.name === 'AbortError'
        ? 'The request timed out. Please check your connection and try again.'
        : (error?.message || 'Could not submit your request. Please try again.');
      showStatus(message, 'error');
    } finally {
      setLoading(false);
    }
  });
})();
