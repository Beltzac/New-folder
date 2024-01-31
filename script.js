const baseImageFilename = "moveis meu site2.png"; // Base image

const overlayImageFilenames = [
   // "moveis meu site2.png", // Base image
    "arqui trecos colorido.png",
    "celular colorido.png",
    "conteole de video game colorido.png",
    "deco colorido.png",
    "discos colorido.png",
    "escritos colorido.png",
    "fone colorido.png",
    "ilustra colorido.png",
    "livros filosofia colorido.png",
    "livros no chao.png",
    "maquina de escrever colorida.png",
    "mesa colorida.png",
    "mesa vinil colorida.png",
    "movel planta colorido.png",
    "pc colorido.png",
    "tela pc colorida.png",
    "vitrola colorida.png",
    "cadeira preta e branca.png",
];

document.addEventListener("DOMContentLoaded", function() {

    let lastNonTransparentImageIndex = -1; // To keep track of the last non-transparent image

    const imageContainer = document.getElementById('imageContainer');

    // Create and append the base image to the container directly
    const baseImg = document.createElement('img');
    baseImg.src = baseImageFilename;
    baseImg.classList.add('imageLayer');
    baseImg.style.zIndex = 1; // Ensure the base image is at the bottom
    imageContainer.appendChild(baseImg);

    overlayImageFilenames.forEach((filename, index) => {
        const img = document.createElement('img');
        img.src = filename;
        img.classList.add('imageLayer', 'overlayImage'); // Add a class for overlays
        img.style.zIndex = index + 2; // Adjust z-index as necessary
        img.style.display = 'none'; // Start with overlay images hidden
        imageContainer.appendChild(img);
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 2492;
    canvas.height = 872;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Ignore mouse events on the canvas

    document.body.appendChild(canvas);

    // Preload overlay images
    const overlays = overlayImageFilenames.map(filename => {
        const img = new Image();
        img.src = filename;
        return img;
    });

    let loadedOverlays = 0;
    overlays.forEach(img => {
        img.onload = () => {
            if (++loadedOverlays === overlays.length) {
                setupMouseHover();
            }
        };
    });

    function setupMouseHover() {
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            checkPixelColor(x, y);
        });

        // Setup click event listener
        imageContainer.addEventListener('click', function() {
            if (lastNonTransparentImageIndex >= 0) { // Ensure there's a last hovered image
                var filename = overlayImageFilenames[lastNonTransparentImageIndex];
                console.log(filename);
                showToast(filename); // Show toast with the filename
            }
        });
    }

    function checkPixelColor(x, y) {
        let isNonTransparentFound = false;
        for (let i = overlays.length - 1; i >= 0; i--) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(overlays[i], 0, 0);
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            if (!isNonTransparentFound && pixel[3] !== 0) { // If alpha channel is not 0 (transparent)
                //console.log(overlayImageFilenames[i]);
                document.querySelectorAll('.overlayImage')[i].style.display = ''; // Show this image
                isNonTransparentFound = true;
                lastNonTransparentImageIndex = i; // Update the last non-transparent image index
            } else {
                document.querySelectorAll('.overlayImage')[i].style.display = 'none'; // Hide this image if not hovered
            }
        }

        // If no non-transparent pixel was found, reset the last index
        if (!isNonTransparentFound) {
            lastNonTransparentImageIndex = -1;
        }
    }

    // New showToast function
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;

        // Add the toast to the container
        toastContainer.appendChild(toast);

        // Show the toast
        setTimeout(() => {
            toast.style.opacity = 1;
        }, 100);

        // Hide and remove the toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => toastContainer.removeChild(toast), 500); // Ensure fade out completes
        }, 3000);
    }
});
