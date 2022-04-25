function newCategory(){

    let selection = document.querySelector(".form-select")

    if (selection.value=="other"){
        
        // alert("Damn");
        document.querySelector(".form-floating").classList.remove("hidden");
        document.querySelector(".file-input").classList.remove("hidden");
    }

    else {

        document.querySelector(".form-floating").classList.add("hidden");
        document.querySelector(".file-input").classList.add("hidden");
    }
}