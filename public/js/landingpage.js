var loadingContents = document.getElementsByClassName("loader-content");
var mainContents = document.getElementsByClassName("main-content");
var fakeloader = document.getElementById("fake-loader");
var videoContainer = document.getElementById("video");
var videoIframe = videoContainer.querySelector("iframe");

window.addEventListener('load', function() {
    particles();
    load();
});

function particles() {
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
    var loadingCompleted = false;

    Array.from(loadingContents).forEach(function(loadingContent) {
        console.log("found loader");
    
        function animationEndHandler() {
            console.log("found animationed");
    
            loadingContent.removeEventListener('animationend', animationEndHandler);
            setTimeout(function() {
                console.log("animationed done");
                loadingContent.style.display = 'none'; 
                loadingCompleted = true;
                showMainContents();
            }, 500);
        }
    
        loadingContent.addEventListener('animationend', animationEndHandler);
    });    

    videoIframe.onload = function() {
        console.log("Iframe content loaded");
        if (loadingCompleted) {
            showMainContents();
        }
    };
}

function showMainContents() {
    Array.from(mainContents).forEach(mainContent => {
        mainContent.style.display = 'flex'; 
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

function fakeload() {
    fakeloader.style.display = "flex";

    setTimeout(function() {
        fakeloader.style.display = "none";
        showVideo();
    }, 3500);
}

function showVideo() {
    videoContainer.style.display = "flex";
    addYouTubeVideo("video-container", "sNmDwVEWNDg");
}

function addYouTubeVideo(containerId, videoId) {
    // Create iframe element
    var iframe = document.createElement("iframe");

    // Set iframe attributes
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = "https://www.youtube.com/embed/" + videoId + "?si=Z3Z94FuVZuJyS03P";
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    // Get container element
    var container = document.getElementById(containerId);

    // Append iframe to container
    videoContainer.appendChild(iframe);
}

