// enquiry-form.js
// Client-side validation and inline result summary for enquiry form

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  const result = document.getElementById('enquiryResult');
  if (!form || !result) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const topic = form.querySelector('[name="topic"]').value;
    const qty = parseInt(form.querySelector('[name="quantity"]').value, 10) || 1;
    const date = form.querySelector('[name="date"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !topic || !message) {
      result.innerHTML = '<p class="error" style="color:#a00;">Please fill in all required fields.</p>';
      return;
    }

    // Example estimate: if topic is product, estimate cost per quantity (change values for real use)
    let estimate = 0;
    if (topic === 'product') {
      estimate = qty * 150; // example estimate per item
    }

    const availability = date ? (new Date(date) >= new Date() ? 'Requested date OK' : 'Requested date is in the past - please choose another date') : 'No date provided';

    result.innerHTML = `
      <h3>Enquiry Summary</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
      <p><strong>Quantity:</strong> ${qty}</p>
      ${estimate ? `<p><strong>Estimated cost:</strong> R ${estimate.toFixed(2)}</p>` : ''}
      <p><strong>Requested date:</strong> ${escapeHtml(date || 'Not specified')} — <em>${availability}</em></p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
      <p class="note"><em>This is an estimate only. Final cost and availability will be confirmed by staff.</em></p>
    `;

    // Keep the form values (user can edit and submit again). Optionally implement mailto if desired.
  });

  // Small helper to prevent HTML injection in displayed summary
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]));
  }
});