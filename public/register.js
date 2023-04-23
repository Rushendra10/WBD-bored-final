function validateEmail(){

    let inp = document.querySelector(".email");

    let bt = document.querySelector(".btn-success");

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

    if (!inp.value.match(pattern)){
        inp.classList.add("bad-email");

        bt.disabled = true;
    }

    else {
        inp.classList.remove("bad-email");
        inp.classList.add("good-email");

        bt.disabled = false;
    }
}

function validatePassword(){

    let inp = document.querySelector(".password");

    let bt = document.querySelector(".btn-success");

    let pattern = /(?=.{8,})/;

    if (!inp.value.match(pattern)){

        alert("Password should be of minimum 8 characters");

        bt.disabled = true;
    }

    else {
        bt.disabled = false;
    }
}

function validateConfirmPassword(){

    let inp1 = document.querySelector(".password");

    let inp2 = document.querySelector(".confirm-password");

    let bt = document.querySelector(".btn-success");

    if (inp1.value!=inp2.value){
        alert("Confirm password should be same as password");
        bt.disabled = true;
    }

    else {
        bt.disabled = false;
    }
}

function validateUsername(){

    let inp = document.querySelector(".username");

    let bt = document.querySelector(".btn-success");

    let pattern = /^([\w\-]{5})$/ 

    if (!inp.value.match(pattern)){

        bt.disabled = true;
    }

    else {

        bt.disabled = false;
    }
}

