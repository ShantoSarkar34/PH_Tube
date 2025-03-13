function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function removeActiveClass() {
  const activeClass = document.getElementsByClassName("active");
  for (let btn of activeClass) btn.classList.remove("active");
}

function loadVideos(searcText = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searcText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn_all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickBtn = document.getElementById(`btn_${id}`);
      clickBtn.classList.add("active");

      displayVideos(data.category);
    });
};

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
    class="w-full h-[200px] object-cover"
      src="${video.thumbnail}"
      alt="imges" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-2xl font-bold">${video.title}</h2>
    <p class=" text-[#c7c7c7] pt-3">${video.description}</p>
  </div>
</div>
  `;
};

function displayCategories(category) {
  const btnContainer = document.getElementById("btn_container");
  for (let cat of category) {
    const caregoryDiv = document.createElement("div");
    caregoryDiv.innerHTML = `
    <button id="btn_${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})"
     class="btn btn-active hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>`;
    btnContainer.append(caregoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video_container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="pt-20 flex justify-center col-span-full">
            <div class="flex flex-col gap-5 items-center">
              <img src="./img/Icon.png" alt="icon" class="w-28 h-28" />
              <h2 class="text-center text-[#17171790] font-bold text-xl">
                Oops!! Sorry, There is no <br />
                content here
              </h2>
            </div>
          </div>`;
    return;
  }
  for (let video of videos) {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `<div class="card bg-base-100">
            <figure>
              <img class="w-full h-[150px] object-cover" src="${
                video.thumbnail
              }" />
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
                    <p class="text-[#17171770] text-[14px]">${
                      video.authors[0].profile_name
                    } 
                    </p>
                    
                    <div>
                    ${
                      video.authors[0].verified == true
                        ? `<img class="w-5 h-5" src="./img/badge.png" alt="badge" />`
                        : ``
                    }
                     
                    </div>
                  </div>
                  <p class="text-[#17171770] text-[15px]">${
                    video.others.views
                  }</p>
                </div>
              </div>
            </div>
            <div class="py-5">
              <button onclick="loadVideoDetails('${
                video.video_id
              }')" class="btn btn-block">Show Details</button>
            </div>
          </div>`;
    videoContainer.append(videoDiv);
  }
};

document.getElementById("search_input").addEventListener("keyup", function (e) {
  const input = e.target.value;
  loadVideos(input);
});
loadCategories();
loadVideos();
