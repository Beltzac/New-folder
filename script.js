const baseImageFilename = "moveis meu site2.png"; // Base image

const overlayImageFilenames = [
    "pc colorido.png",
    "luminaria colorido.png",
    "tela pc colorida.png",
    "arqui trecos colorido.png",
    "star wars preto e branco.png",
    "celular colorido.png",
    "deco colorido.png",
    "escritos colorido.png",
    "fone colorido.png",
    "camera colorido.png",
    "ilustra colorido.png",
    "livros filosofia colorido.png",
    "livros no chao.png",
    "maquina de escrever colorida.png",
    "mesa colorida.png",
    "mesa vinil colorida.png",
    "movel planta colorido.png",
    "discos colorido.png",
    "vitrola colorida.png",
    "conteole de video game colorido.png",
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

    //canvas.width = 2492;
    //canvas.height = 872;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Ignore mouse events on the canvas
    //hide canvas
    canvas.style.display = 'none';

    document.body.appendChild(canvas);

    // Function to adjust canvas size
    function resizeCanvas() {
        const containerRect = imageContainer.getBoundingClientRect();
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
    }

    // Call resizeCanvas on load and window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
            // Determine the scaling mode: width-based or height-based
            const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
            const offsetX = (rect.width - canvas.width * scale) / 2; // Centering offset for width
            const offsetY = (rect.height - canvas.height * scale) / 2; // Centering offset for height
            const x = (e.clientX - rect.left - offsetX) / scale;
            const y = (e.clientY - rect.top - offsetY) / scale;
            checkPixelColor(x, y);
        });

        imageContainer.addEventListener('mousemove', function(e) {
            showName(overlayImageFilenames[lastNonTransparentImageIndex], e.clientX, e.clientY);
        });

        // Setup click event listener
        imageContainer.addEventListener('click', function() {
            if (lastNonTransparentImageIndex >= 0) {
                var filename = overlayImageFilenames[lastNonTransparentImageIndex];
                console.log(filename);
                showToast(filename); // Show toast with the filename
            }
        });
    }

    function checkPixelColor(x, y) {
        const startTime = performance.now(); // Start timing

        lastNonTransparentImageIndex = -1; // Reset if no non-transparent pixel was found

        const containerRect = imageContainer.getBoundingClientRect();

        canvas.width = containerRect.width;
        canvas.height = containerRect.height;

        // loop to hide all images
        for (let i = overlays.length - 1; i >= 0; i--) {
            document.querySelectorAll('.overlayImage')[i].style.display = 'none';
        }

        for (let i = overlays.length - 1; i >= 0; i--) {
            // Clear the off-screen canvas for each overlay
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Assuming each overlay image has the same original size, adjust as needed
            const originalWidth = overlays[i].naturalWidth;
            const originalHeight = overlays[i].naturalHeight;

            // Calculate the scale factor to maintain aspect ratio
            const scaleWidth = canvas.width / originalWidth;
            const scaleHeight = canvas.height / originalHeight;
            const scale = Math.min(scaleWidth, scaleHeight);

            // Calculate the centered position for the image
            const scaledWidth = originalWidth * scale;
            const scaledHeight = originalHeight * scale;
            const offsetX = (canvas.width - scaledWidth) / 2;
            const offsetY = (canvas.height - scaledHeight) / 2;

            // Draw the image scaled and centered on the off-screen canvas
            ctx.drawImage(overlays[i], offsetX, offsetY, scaledWidth, scaledHeight);

            // Adjust the mouse coordinates for the scaled image
            const adjustedX = x - offsetX;
            const adjustedY = y - offsetY;

            if (adjustedX >= 0 && adjustedX <= scaledWidth && adjustedY >= 0 && adjustedY <= scaledHeight) {
                // Only check the pixel if the mouse is within the bounds of the scaled image
                const pixel = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;

                if (pixel[3] !== 0) {
                    document.querySelectorAll('.overlayImage')[i].style.display = ''; // Show this image
                    lastNonTransparentImageIndex = i; // Update the last non-transparent image index
                    break;
                }
            }
        }

        const endTime = performance.now(); // End timing
        console.log(`checkPixelColor execution time: ${endTime - startTime} milliseconds`);
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

    function showName(name, x, y) {
        const nameContainer = document.getElementById('objectDescription');

        if (!name) {
            nameContainer.style.display = 'none';
            return;
        }

        // Set the text content
        nameContainer.textContent = name;

        // Position the container at the mouse coordinates with an offset
        //at the center bottom of the container

        nameContainer.style.left = x - nameContainer.offsetWidth / 2 + 'px';
        nameContainer.style.top = y + -50 + 'px';

        // Make the container visible
        nameContainer.style.display = 'block';
    }
});
