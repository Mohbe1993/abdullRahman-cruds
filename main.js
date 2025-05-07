let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let Disc = document.getElementById("Disc");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let temp;
let searchMood = "title";

let mood = "create";

function getTotal() {
  if (price.value != "" && price.value >= 0) {
    let result = +price.value + +tax.value + +ads.value - +Disc.value + " AED";
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "0 AED";

    total.style.background = "#a00d02";
  }
}

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function name(params) {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    Disc: Disc.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };

  if (title.value != "" && newPro.count <= 100) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  Disc.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}

function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].Disc}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelateAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelateAll.innerHTML = `<button  onclick='deleteAll()'>Delete All (${dataPro.length}) </button>`;
  } else {
    btnDelateAll.innerHTML = "";
  }
}

showData();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  tax.value = dataPro[i].tax;
  ads.value = dataPro[i].ads;
  Disc.value = dataPro[i].Disc;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({ top: 0, behavior: "smooth" });
}

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }

  search.placeholder = "search by " + searchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].Disc}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].Disc}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
