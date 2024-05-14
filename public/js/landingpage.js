var loadingContents = document.getElementsByClassName("loader-content");
var mainContents = document.getElementsByClassName("main-content");
var fakeloader = document.getElementById("fake-loader");
var videoContainer = document.getElementById("video");
var videoIframe = videoContainer.querySelector("iframe");
var errorDiv = document.getElementById("error");
var audio = document.getElementById("bgAudio");

window.addEventListener('load', function() {
    particles();
    load();
});

window.onload = function() {
    addVideo();
    document.addEventListener('click', playVideoOnClick, { once: true });
  };



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
    Array.from(loadingContents).forEach(function(loadingContent) {
    
        function animationEndHandler() {
    
            loadingContent.removeEventListener('animationend', animationEndHandler);
            setTimeout(function() {
                loadingContent.style.display = 'none'; 
                loadingCompleted = true;
                showMainContents();
            }, 500);
        }
    
        loadingContent.addEventListener('animationend', animationEndHandler);
    });    

}

function showMainContents() {
    Array.from(mainContents).forEach(mainContent => {
        mainContent.style.display = 'contents'; 
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
            var password = data;

            if (input === password) {
                console.log("correct password");
                fakeload();
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error("Error fetching password:", error);
        });
}

function fakeload() {
    Array.from(mainContents).forEach(mainContent => {
        mainContent.style.display = 'none'; 
    });
    fakeloader.style.display = "contents";

    setTimeout(function() {
        fakeloader.style.display = "none";
        showVideo();
    }, 5000);
}

function showVideo() {
    videoContainer.style.display = "contents";
    //addVideo();
}

function showError() {
    Array.from(mainContents).forEach(mainContent => {
        mainContent.style.display = 'none'; 
    });
    errorDiv.style.display = "contents";

    setTimeout(function() {
        errorDiv.style.display = "none";
        showMainContents();
    }, 3000);
}

/*
function addVideo() {
    var iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = "assets/video.mp4";
    iframe.title = "Video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    videoContainer.appendChild(iframe);

    var audio = document.getElementById("bgAudio");
    audio.volume = 0.2;

    var targetVolume = 0;
    var interval = 100;
    var step = 0.05;

    var fadeInterval = setInterval(function() {
        if (audio.volume > targetVolume) {
            audio.volume = Math.max(audio.volume - step, targetVolume);
        } else {
            clearInterval(fadeInterval);
        }
    }, interval);

    iframe.addEventListener('load', function() {
        var video = iframe.contentWindow.document.querySelector('video');
        video.addEventListener('ended', function() {
            targetVolume = 0.2;
            var fadeInterval = setInterval(function() {
                if (audio.volume < targetVolume) {
                    audio.volume = Math.min(audio.volume + step, targetVolume);
                } else {
                    clearInterval(fadeInterval);
                }
            }, interval);
        });
    });
}*/

function addVideo() {
    var iframe = document.createElement("iframe");
    iframe.width = "0";
    iframe.height = "0";
    iframe.src = "https://www.youtube.com/embed/MqlbVmKOkNM?si=Lu60H48THKXtMoVu";
    iframe.title = "Video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; loop";
    iframe.allowFullscreen = true;

    var videoContainer = document.getElementById("videoContainer");
    videoContainer.appendChild(iframe);
  }

  function playVideoOnClick() {
    var iframe = document.querySelector("iframe");
    if (iframe) {
      var src = iframe.src;
      iframe.src = src + "&autoplay=1"; 
    }
  }


