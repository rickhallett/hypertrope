// document.addEventListener('DOMContentLoaded', function() {
    
// });

const toggleHide = (id1, id2 = null) => {
    let el = document.getElementById(id1);
    if (el.type === "password") {
      el.type = "text";
    } else {
      el.type = "password";
    }

    if(id2) {
        let el = document.getElementById(id2);
        if (el.type === "password") {
        el.type = "text";
        } else {
        el.type = "password";
        }
    }
}

