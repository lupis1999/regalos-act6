const gifts = [
    "Lego",
    "Bicicleta",
    "Videojuego",
    "Tablet",
    "Audifonos",
    "Drone",
    "Smartwatch"
];

const giftList = document.getElementById("giftList");
const processList = document.getElementById("process");
const resultDiv = document.getElementById("result");

renderGifts();

function renderGifts() {
    giftList.innerHTML = "";

    gifts.forEach((gift) => {
        const li = document.createElement("li");
        li.textContent = gift;
        giftList.appendChild(li);
    });
}

function addGift() {
    const input = document.getElementById("giftInput");

    const value = input.value.trim();

    if (value !== "") {
        gifts.push(value);
        input.value = "";
        renderGifts();
    }
}

function recursiveSearch(giftName, index = 0) {

    const step = document.createElement("li");
    step.textContent = `Revisando posición ${index}`;
    processList.appendChild(step);

    // Caso base: llegó al final
    if (index === gifts.length) {
        return -1;
    }

    // Caso base: encontrado
    if (
        gifts[index].toLowerCase() ===
        giftName.toLowerCase()
    ) {
        return index;
    }

    // Llamada recursiva
    return recursiveSearch(giftName, index + 1);
}

function startSearch() {

    processList.innerHTML = "";
    resultDiv.innerHTML = "";

    document
        .querySelectorAll("#giftList li")
        .forEach(item => item.classList.remove("found"));

    const giftName =
        document.getElementById("searchGift")
        .value.trim();

    if (giftName === "") {
        resultDiv.innerHTML =
            "<span class='error'>Ingrese un regalo.</span>";
        return;
    }

    const position = recursiveSearch(giftName);

    if (position !== -1) {

        document
            .querySelectorAll("#giftList li")[position]
            .classList.add("found");

        resultDiv.innerHTML =
            `<span class="success">
                ✅ El regalo "${giftName}"
                fue encontrado en la posición ${position}.
            </span>`;
    }
    else {
        resultDiv.innerHTML =
            `<span class="error">
                ❌ El regalo "${giftName}"
                no está en la lista.
            </span>`;
    }
}