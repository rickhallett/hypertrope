document.addEventListener("DOMContentLoaded", function() {
  if (document.body.clientWidth > 414 && window.location.pathname !== '/preventDesktops') {
    window.location.href = '/preventDesktops';
  }
});
