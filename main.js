let faqbuttons = document.querySelectorAll(".faq h3");

faqbuttons.forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.children[1].classList.toggle("active");

        button.parentElement.children[0].children[1].classList.toggle("turn");
    })
});

let button = document.getElementById("button");
let input = document.getElementById("phoneinput");
let infobox = document.querySelector(".infobox");
let copybutton = document.querySelector(".copybutton");

button.addEventListener("click", async () => {
    console.log("button is clicked");

    infobox.innerHTML = "";
    button.setAttribute("disabled", "true");
    button.classList.add("loading");
    button.innerHTML = `                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader">
                    <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                        class="active"></circle>
                    <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                        class="track"></circle>
                </svg>`

    // Checking if the input number is 10 digit
    if (!input.value || input.value.length !== 10) {
        button.classList.remove("loading");

        button.innerHTML = `                <svg viewBox="0 0 16 16" class="bi bi-lightning-charge-fill" fill="currentColor" height="16" width="16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z">
                    </path>
                </svg>
                Get info`
        button.removeAttribute("disabled", "true");

        infobox.innerHTML = `<p> Enter a 10 digit Valid Number ! </p>`
    } else {
        try {
            let number = input.value;
            console.log("Searching...");

            const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
            const apiUrl = `https://ydark.stormx.pw/index.cpp?key=dark&number=${number}`;

            const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

            // Checking Api response
            if (!response.ok) {
                throw new Error(`Error : ${response.status}`);
            } else {
                // Api sends response successfully

                const data = await response.json();
                console.log(data);

                if (data.data && Array.isArray(data.data)) {
                    console.log("Records found", data.data.length);

                    data.data.forEach(item => {
                           infobox.innerHTML = infobox.innerHTML + `
                                <div class="result-item">
                                  <p>Name: ${item.name}</p>
                                  <p>Mobile: ${item.mobile}</p>
                                  <p>Alt: ${item.alt}</p>
                                  <p>Address: ${item.address}</p>
                                  <p>Circle: ${item.circle}</p>
                                  <p>ID: ${item.id}</p>
                                  <p>Father Name: ${item.fname}</p>
                                </div>
                              `; 
                        
                    });
                } else if (data.message) {
                    infobox.innerHTML = `<p>${data.message}</p>`;
                }

                // resetting the button
                button.innerHTML = `                <svg viewBox="0 0 16 16" class="bi bi-lightning-charge-fill" fill="currentColor" height="16" width="16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z">
                    </path>
                </svg>
                Get info`

                button.classList.remove("loading");
                button.removeAttribute("disabled", "true");
            }
        } catch {
            //Api fails to send data
            infobox.innerHTML = `<p> Server running low, Try Later</p>`

            console.log("Server running low, Try again later")

            // resetting the button
            button.innerHTML = `                <svg viewBox="0 0 16 16" class="bi bi-lightning-charge-fill" fill="currentColor" height="16" width="16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z">
                    </path>
                </svg>
                Get info`

            button.classList.remove("loading");
            button.removeAttribute("disabled", "true");
        }
    }
})

copybutton.addEventListener("click", ()=> {
    let copyStr = "Number To Information | LogicX [ http://t.me/testing92747_bot ] | No refer \n\n";
    if (document.querySelectorAll(".result-item").length > 0) {

        document.querySelectorAll(".result-item").forEach(item => {
            copyStr += 
              `${item.querySelectorAll("p")[0].textContent}\n` +
              `${item.querySelectorAll("p")[1].textContent}\n` +
              `${item.querySelectorAll("p")[2].textContent}\n` +
              `${item.querySelectorAll("p")[3].textContent}\n` +
              `${item.querySelectorAll("p")[4].textContent}\n` +
              `${item.querySelectorAll("p")[5].textContent}\n` +
              `${item.querySelectorAll("p")[6].textContent}\n\n`; // Double \n between records
        });

        copyStr = copyStr + "➖➖➖➖➖➖➖➖➖➖➖➖➖"
    } else {
        copyStr = infobox.textContent.trim();
    }

    let copyinput = document.createElement("textarea");
    document.body.appendChild(copyinput);

    copyinput.value = copyStr;
    copyinput.select();
    document.execCommand("copy");
    document.body.removeChild(copyinput);
})