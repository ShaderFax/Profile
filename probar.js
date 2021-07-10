const num = document.querySelector(".number");
let counter = 0;
setInterval(() => {
    if (counter == 100){
        clearInterval();
    }
    else{
        counter += 1;
        num.textContent = counter + "%";
    }
}, 80);