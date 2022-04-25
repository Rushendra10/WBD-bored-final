function validateEmail(){

    let inp = document.querySelector(".email");

    let bt = document.querySelector(".submit-button");

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

    if (!inp.value.match(pattern)){

        inp.classList.remove("good-email");
        inp.classList.add("bad-email");

        bt.disabled = true;
    }

    else {
        inp.classList.remove("bad-email");
        inp.classList.add("good-email");

        bt.disabled = false;
    }
}
