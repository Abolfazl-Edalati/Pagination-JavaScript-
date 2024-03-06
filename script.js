const API = [
  { desc: "1" + "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
  { desc: "2" + "لورم ایپسوم متن ساختگی با " },
  {
    desc:
      "3" +
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
  },
  { desc: "4" + "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
  { desc: "5" + "لورم ایپسوم متن ساختگی با " },
  {
    desc:
      "6" +
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
  },
  { desc: "7" + "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
  { desc: "8" + "لورم ایپسوم متن ساختگی با " },
  {
    desc:
      "9" +
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
  },
  { desc: "10" + "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت " },
  { desc: "11" + "لورم ایپسوم متن ساختگی با " },
  {
    desc:
      "12" +
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
  },
];

const paginationElm = document.querySelector(".pagination");
const itemsElm = document.querySelector(".list-items");
const numberOfItemsPerPage = 3;

let totalPage = Math.ceil(API.length / numberOfItemsPerPage);
let currentPage = 1;

// منظق دکمه های pagionation
function generatePagination(currentPage, totalPage) {
  if (totalPage >= 6) {
    const result = [];
    let rangeStart = currentPage - 2;
    let rangeEnd = currentPage + 2;
    if (rangeStart <= 0) {
      rangeStart = 1;
    }
    if (rangeEnd > totalPage) {
      rangeEnd = totalPage;
    }
    for (let i = rangeStart; i <= rangeEnd; i++) {
      result.push(i);
    }
    if (totalPage - rangeEnd >= 3) {
      result.push("...", totalPage);
    } else if (totalPage - rangeEnd === 2) {
      result.push(totalPage - 1, totalPage);
    } else if (totalPage - rangeEnd === 1) {
      result.push(totalPage);
    }
    if (rangeStart >= 3) {
      result.unshift(1, "...");
    } else if (rangeStart >= 2) {
      result.unshift(1);
    }
    return result;
  } else if (totalPage < 6) {
    return [...Array(totalPage)].map((_, index) => index + 1);
  }
}

//  نمایش دکمه های pagination
function renderPagination() {
  const result = generatePagination(currentPage, totalPage).map((num) => {
    return `<li class="pagination-item pag-number ${
      num === currentPage ? "active" : ""
    }">${num}</li>`;
  });

  result.unshift(
    `<li class="pagination-item pag-prev ${
      currentPage === 1 ? "disabled" : ""
    }">قبلی</li>`
  );
  result.push(
    `<li class="pagination-item pag-next ${
      currentPage === totalPage ? "disabled" : ""
    }">بعدی</li>`
  );

  paginationElm.innerHTML = result.join("");
  bindEventListeners();
}

// نمایش دادن ایتم های هر صفحه
function renderItems() {
  itemsElm.innerHTML = "";
  const data = API;
  const indexEnd = currentPage * numberOfItemsPerPage;
  const indexStart = indexEnd - numberOfItemsPerPage;
  const result = data.slice(indexStart, indexEnd);
  result.map((item) => {
    itemsElm.innerHTML += `<li class="items">${item.desc}</li>`;
  });
}

// درست کردن event های دکمه ها
function bindEventListeners() {
  document.querySelectorAll(".pag-number").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.innerHTML === "...") {
        return;
      }
      document.querySelector(".active").classList.remove("active");
      item.classList.add("active");
      currentPage = +item.innerHTML;
      renderPagination();
      renderItems();
    });
  });
  document.querySelector(".pag-prev").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPagination();
      renderItems();
    }
  });
  document.querySelector(".pag-next").addEventListener("click", () => {
    if (currentPage < totalPage) {
      currentPage += 1;
      renderPagination();
      renderItems();
    }
  });
}

// رندر اولیه
renderPagination();
renderItems();
