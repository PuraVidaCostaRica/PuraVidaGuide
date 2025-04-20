document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("homeButton").addEventListener("click", to_home);
    document.querySelector(".logo-container").addEventListener("click", to_home);

    function to_home() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
            window.location.href = "index.html";
        }, 300); // Дадим полсекунды на плавную прокрутку
    };
});

window.addEventListener("scroll", function () {
    const button = document.getElementById("backToHeader");
    const monkey = button.querySelector(".monkey");

    if (window.scrollY > 300) {
        button.classList.add("show");
        monkey.classList.add("auto-swing");
    } else {
        button.classList.remove("show");
        monkey.classList.remove("auto-swing");
    }
});




