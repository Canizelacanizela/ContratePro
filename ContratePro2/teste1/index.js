// Get the modal
const modal = document.getElementById("modal");

// Get the button that opens the modal
const btn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submit
const form = document.getElementById("proposal-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  console.log("Proposta enviada:", name, description);
  modal.style.display = "none";
});