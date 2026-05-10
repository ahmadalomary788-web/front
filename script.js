// script.js
// helper to check login status
function isLoggedIn() {
  return localStorage.getItem('dabirha_user') !== null;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('dabirha_user'));
}

function logout() {
  localStorage.removeItem('dabirha_user');
  window.location.href = 'index.html';
}

// display simple toast (alert replacement)
function showMessage(msg, isError = false) {
  alert(msg);
}