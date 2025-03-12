const add = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => showUser(data));
};

const showUser = (users) => {
  const mainContainer = document.getElementById("main_container");
  const mainTitle = document.getElementById("title");
  for (const user of users) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="border border-purple-400 rounded-lg p-4">
    <h1 class="text-xl font-semibold text-purple-500">UserId: ${user.id}</h1>
    <h2 class="text-lg font-semibold text-purple-400">${user.title}</h2>
    <P class="text-gray-400">${user.body}</P>
    </div>
    `;
    mainContainer.appendChild(div);

    mainTitle.innerText = `Status Code: 200`;
  }
};

const backHome = () => {
  window.location.href = "./index.html";
};
