$deleteBtn = document.getElementById("delete-btn");
$inputField = document.getElementById("user-id");
$tokenField = document.getElementById("token");
$userContainer = document.getElementById("users");

document.addEventListener("load", () => {
  fetchUsers();
});

function onRemoveUser(userId) {
  let token = $tokenField.value;
  removeUser(userId, token);
  alert('performed a delete action')
  window.location.reload()
}
/**
 * @param  {} userId
 * @param  {} token
 */
function removeUser(userId, token) {
  const options = {
    method: "POST",
    // use a dummy token
    headers: { "Content-Type": "application/json", "auth-token": token },
    body: JSON.stringify({ userId }),
  };

  fetch("/remove-user", options)
    .then((data) => {
      if (!data.ok) {
        alert("could not delete user");
      }
    })
    .catch((err) => alert(error));
}

/**
 * Get registered users and display on the page
 */
function fetchUsers(token) {
  const options = { headers: { "auth-token": token } };
  fetch("/all-users", options)
    .then((data) => {
      if (data.ok) {
        let users = data.json();
        console.log(users.data.all_users);
        users.data.all_users.forEach((user) => {
          $userContainer.innerText += `<div class="card">
          <p>UserId: ${user.userId}<p/>
          <input type="text" name="token" id="token" placeholder="enter token to delete"/>
          
          <button type="button" onClick="onRemoveUser(${user.userId})">Delete user ${user.userId}</button>
          </div>`;
        });
      }
    })
    .catch((error) => alert(error));
}
