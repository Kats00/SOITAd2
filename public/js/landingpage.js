window.addEventListener('load', function() {
    particles();
    load();
});

var loadingContents = document.getElementsByClassName("loader-content");
var mainContents = document.getElementsByClassName("main-content");
var fakeloader = document.getElementById("fake-loader");
var video = document.getElementById("video");

function particles(){
    var particlesjson;

    fetch("/get-json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("File content found:", data);
        particlesjson = data;
        particlesJS('particles-js', particlesjson, function() {
          console.log('callback - particles.js config loaded');
        });
      })
      .catch(error => {
        console.error("Error fetching JSON:", error);
      });
}

function load() {
    Array.from(loadingContents).forEach(function(loadingContent) {
        console.log("found loader");
    
        function animationEndHandler() {
            console.log("found animationed");
    
            loadingContent.removeEventListener('animationend', animationEndHandler);
            setTimeout(function() {
                console.log("animationed done");
                loadingContent.style.display = 'none'; 
                Array.from(mainContents).forEach(mainContent => {
                    mainContent.style.display = 'flex'; 
                });
            }, 500);
        }
    
        loadingContent.addEventListener('animationend', animationEndHandler);
    });    
}

function verify() {
    event.preventDefault();
    var input = document.getElementById("password").value;

    fetch("/get-password")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            console.log("File content:", data);
            var password = data;

            if (input === password) {
                console.log("correct password");
                fakeload();
            } else {
                console.error("incorrect password");
            }
        })
        .catch(error => {
            console.error("Error fetching password:", error);
        });
}

function fakeload(){
    fakeloader.style.display = "flex";

    setTimeout(function() {
        fakeloader.style.display = "none";
       showVideo();
    }, 3500);
}

function showVideo(){
    video.style.display = "flex";
}
