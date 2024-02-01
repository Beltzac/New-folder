const baseImageFilename = "moveis meu site2.png"; // Base image

const overlayImages =
[
    {
        "nomeImagem": "pc colorido",
        "arquivo": "pc colorido.png",
        "urlLink": "https://example.com/images/pc%20colorido.png"
    },
    {
        "nomeImagem": "luminaria colorido",
        "arquivo": "luminaria colorido.png",
        "urlLink": "https://example.com/images/luminaria%20colorido.png"
    },
    {
        "nomeImagem": "tela pc colorida",
        "arquivo": "tela pc colorida.png",
        "urlLink": "https://example.com/images/tela%20pc%20colorida.png"
    },
    {
        "nomeImagem": "arqui trecos colorido",
        "arquivo": "arqui trecos colorido.png",
        "urlLink": "https://example.com/images/arqui%20trecos%20colorido.png"
    },
    {
        "nomeImagem": "star wars preto e branco",
        "arquivo": "star wars preto e branco.png",
        "urlLink": "https://example.com/images/star%20wars%20preto%20e%20branco.png"
    },
    {
        "nomeImagem": "celular colorido",
        "arquivo": "celular colorido.png",
        "urlLink": "https://example.com/images/celular%20colorido.png"
    },
    {
        "nomeImagem": "deco colorido",
        "arquivo": "deco colorido.png",
        "urlLink": "https://example.com/images/deco%20colorido.png"
    },
    {
        "nomeImagem": "escritos colorido",
        "arquivo": "escritos colorido.png",
        "urlLink": "https://example.com/images/escritos%20colorido.png"
    },
    {
        "nomeImagem": "fone colorido",
        "arquivo": "fone colorido.png",
        "urlLink": "https://example.com/images/fone%20colorido.png"
    },
    {
        "nomeImagem": "camera colorido",
        "arquivo": "camera colorido.png",
        "urlLink": "https://example.com/images/camera%20colorido.png"
    },
    {
        "nomeImagem": "ilustra colorido",
        "arquivo": "ilustra colorido.png",
        "urlLink": "https://example.com/images/ilustra%20colorido.png"
    },
    {
        "nomeImagem": "livros filosofia colorido",
        "arquivo": "livros filosofia colorido.png",
        "urlLink": "https://example.com/images/livros%20filosofia%20colorido.png"
    },
    {
        "nomeImagem": "livros no chao",
        "arquivo": "livros no chao.png",
        "urlLink": "https://example.com/images/livros%20no%20chao.png"
    },
    {
        "nomeImagem": "maquina de escrever colorida",
        "arquivo": "maquina de escrever colorida.png",
        "urlLink": "https://example.com/images/maquina%20de%20escrever%20colorida.png"
    },
    {
        "nomeImagem": "mesa colorida",
        "arquivo": "mesa colorida.png",
        "urlLink": "https://example.com/images/mesa%20colorida.png"
    },
    {
        "nomeImagem": "mesa vinil colorida",
        "arquivo": "mesa vinil colorida.png",
        "urlLink": "https://example.com/images/mesa%20vinil%20colorida.png"
    },
    {
        "nomeImagem": "movel planta colorido",
        "arquivo": "movel planta colorido.png",
        "urlLink": "https://example.com/images/movel%20planta%20colorido.png"
    },
    {
        "nomeImagem": "discos colorido",
        "arquivo": "discos colorido.png",
        "urlLink": "https://example.com/images/discos%20colorido.png"
    },
    {
        "nomeImagem": "vitrola colorida",
        "arquivo": "vitrola colorida.png",
        "urlLink": "https://example.com/images/vitrola%20colorida.png"
    },
    {
        "nomeImagem": "conteole de video game colorido",
        "arquivo": "conteole de video game colorido.png",
        "urlLink": "https://example.com/images/conteole%20de%20video%20game%20colorido.png"
    },
    {
        "nomeImagem": "cadeira preta e branca",
        "arquivo": "cadeira preta e branca.png",
        "urlLink": "https://example.com/images/cadeira%20preta%20e%20branca.png"
    }
]


document.addEventListener("DOMContentLoaded", function() {

    let lastNonTransparentImageIndex = -1; // To keep track of the last non-transparent image

    const imageContainer = document.getElementById('imageContainer');
    let containerRect = imageContainer.getBoundingClientRect();
    // Assume `overlays` is an array of image elements and `overlayElements` is an array of corresponding DOM elements
    let preProcessedOverlays = [];

    // Create and append the base image to the container directly
    const baseImg = document.createElement('img');
    baseImg.src = baseImageFilename;
    baseImg.classList.add('imageLayer');
    baseImg.style.zIndex = 1; // Ensure the base image is at the bottom
    imageContainer.appendChild(baseImg);

    let overlayElements = [];
    overlayImages.forEach((overlay, index) => {
        const img = document.createElement('img');
        img.src = overlay.arquivo;
        img.classList.add('imageLayer', 'overlayImage'); // Add a class for overlays
        img.style.zIndex = index + 2; // Adjust z-index as necessary
        img.style.display = 'none'; // Start with overlay images hidden
        imageContainer.appendChild(img);
        overlayElements.push(img);
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
        containerRect = imageContainer.getBoundingClientRect();
        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
    }

    // Call resizeCanvas on load and window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Preload overlay images
    const overlays = overlayImages.map(overlay => {
        const img = new Image();
        img.src = overlay.arquivo;
        return img;
    });

    let loadedOverlays = 0;
    overlays.forEach((img, index) => {
        img.onload = () => {
            preProcessOverlays(img, index);
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
            if (lastNonTransparentImageIndex >= 0)
                showName(overlayImages[lastNonTransparentImageIndex].nomeImagem, e.clientX, e.clientY);
            else
                showName(null);
        });

        // Setup click event listener
        imageContainer.addEventListener('click', function() {
            if (lastNonTransparentImageIndex >= 0) {
                var filename = overlayImages[lastNonTransparentImageIndex].nomeImagem;
                //console.log(filename);
                //showToast(filename); // Show toast with the filename

                // Redirect to the URL in the same tab
                var url = overlayImages[lastNonTransparentImageIndex].urlLink;
                window.location.href = url;
            }
        });
    }

    // Pre-process overlays
    function preProcessOverlays(overlay, index) {
        const offScreenCanvas = document.createElement('canvas');
        const ctx = offScreenCanvas.getContext('2d');

        offScreenCanvas.width = overlay.naturalWidth;
        offScreenCanvas.height = overlay.naturalHeight;

        ctx.drawImage(overlay, 0, 0);

        const imageData = ctx.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);
        preProcessedOverlays[index] = { imageData, ctx };

        console.log(`Pre-processed overlay ${index}:`, preProcessedOverlays[index]);
    }

    // Adjusted function to use pre-processed data
    function checkPixelColor(x, y) {
        const startTime = performance.now();

        lastNonTransparentImageIndex = -1;

        const containerRect = imageContainer.getBoundingClientRect();
        if (canvas.width !== containerRect.width || canvas.height !== containerRect.height) {
            canvas.width = containerRect.width;
            canvas.height = containerRect.height;
        }

        for (let i = overlays.length - 1; i >= 0; i--) {
            const overlay = overlays[i];
            const preProcessed = preProcessedOverlays[i];
            const scale = Math.min(canvas.width / overlay.naturalWidth, canvas.height / overlay.naturalHeight);
            const scaledWidth = overlay.naturalWidth * scale;
            const scaledHeight = overlay.naturalHeight * scale;
            const offsetX = (canvas.width - scaledWidth) / 2;
            const offsetY = (canvas.height - scaledHeight) / 2;

            const adjustedX = Math.floor((x - offsetX) / scale);
            const adjustedY = Math.floor((y - offsetY) / scale);

            if (adjustedX < 0 || adjustedX >= preProcessed.ctx.canvas.width || adjustedY < 0 || adjustedY >= preProcessed.ctx.canvas.height) {
                continue; // Skip this iteration early
            }

            const pixelIndex = (adjustedY * preProcessed.ctx.canvas.width + adjustedX) * 4;
            const pixel = preProcessed.imageData.data.slice(pixelIndex, pixelIndex + 4);

            if (pixel[3] !== 0) { // Check alpha value
                overlayElements[i].style.display = '';
                lastNonTransparentImageIndex = i;
                break;
            } else {
                overlayElements[i].style.display = 'none';
            }
        }

        const endTime = performance.now();
        console.log(`checkPixelColor execution time with pre-processing: ${endTime - startTime} milliseconds`);
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
