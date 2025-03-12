function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
};

function displayCategories(category) {
  const btnContainer = document.getElementById("btn_container");
  for (let cat of category) {
    const caregoryDiv = document.createElement("div");
    caregoryDiv.innerHTML = `
    <button onclick="loadCategoryVideos(${cat.category_id})"
     class="btn btn-active hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>`;
    btnContainer.append(caregoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video_container");
  videoContainer.innerHTML = "";
  for (let video of videos) {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `<div class="card bg-base-100">
            <figure>
              <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
            </figure>
            <div class="pt-5">
              <div class="flex gap-3">
                <div class="avatar">
                  <div class="w-11 h-11 rounded-full">
                    <img
                      src="${video.authors[0].profile_picture}"
                    />
                  </div>
                </div>
                <div class="">
                  <h2 class="text-[#171717] text-[16px] font-bold mb-1">
                  ${video.title}
                  </h2>
                  <div class="flex items-center gap-2 ">
                    <p class="text-[#17171770] text-[14px]">${video.authors[0].profile_name}</p>
                    <div>
                      <img class="w-5 h-5" src="./img/badge.png" alt="badge" />
                    </div>
                  </div>
                  <p class="text-[#17171770] text-[15px]">${video.others.views}</p>
                </div>
              </div>
            </div>
            <div class="py-5">
              <button class="btn btn-block">Show Details</button>
            </div>
          </div>`;
    videoContainer.append(videoDiv);
  }
};

loadCategories();
loadVideos();
