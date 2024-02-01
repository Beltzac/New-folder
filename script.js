const baseImageFilename = "imagens/todos.png"; // Base image

const overlayImages =
[
    {
        "nomeImagem": "Tela",
        "arquivo": "imagens/tela.png",
        "urlLink": "https://example.com/images/tela.png"
    },
    {
        "nomeImagem": "PC",
        "arquivo": "imagens/pc.png",
        "urlLink": "https://example.com/images/pc.png"
    },
    {
        "nomeImagem": "Iluminação",
        "arquivo": "imagens/iluminacao.png",
        "urlLink": "https://example.com/images/iluminação.png"
    },
    {
        "nomeImagem": "Aparador",
        "arquivo": "imagens/aparador.png",
        "urlLink": "https://example.com/images/aparador.png"
    },
    {
        "nomeImagem": "Arquitetura",
        "arquivo": "imagens/arqui.png",
        "urlLink": "https://example.com/images/arqui.png"
    },
    {
        "nomeImagem": "Celular",
        "arquivo": "imagens/celular.png",
        "urlLink": "https://example.com/images/celular.png"
    },
    {
        "nomeImagem": "Curtas",
        "arquivo": "imagens/curtas.png",
        "urlLink": "https://example.com/images/curtas.png"
    },
    {
        "nomeImagem": "Decoração",
        "arquivo": "imagens/decoracao.png",
        "urlLink": "https://example.com/images/decoração.png"
    },
    {
        "nomeImagem": "Escritos",
        "arquivo": "imagens/escritos.png",
        "urlLink": "https://example.com/images/escritos.png"
    },
    {
        "nomeImagem": "Fone",
        "arquivo": "imagens/fone.png",
        "urlLink": "https://example.com/images/fone.png"
    },
    {
        "nomeImagem": "Camera",
        "arquivo": "imagens/camera.png",
        "urlLink": "https://example.com/images/camera.png"
    },
    {
        "nomeImagem": "Ilustrações",
        "arquivo": "imagens/ilustracoes.png",
        "urlLink": "https://example.com/images/ilustrações.png"
    },
    {
        "nomeImagem": "Jogos",
        "arquivo": "imagens/jogos.png",
        "urlLink": "https://example.com/images/jogos.png"
    },
    {
        "nomeImagem": "Livros de Arquitetura",
        "arquivo": "imagens/livros_de_arqui.png",
        "urlLink": "https://example.com/images/livros_de_arqui.png"
    },
    {
        "nomeImagem": "Livros de Arquitetura e Design",
        "arquivo": "imagens/livros_de_arqui_e_design.png",
        "urlLink": "https://example.com/images/livros_de_arqui_e_design.png"
    },
    {
        "nomeImagem": "Livros de Filosofia",
        "arquivo": "imagens/livros_filosofia.png",
        "urlLink": "https://example.com/images/livros_filosofia.png"
    },
    {
        "nomeImagem": "Margot",
        "arquivo": "imagens/margot.png",
        "urlLink": "https://example.com/images/margot.png"
    },
    {
        "nomeImagem": "Mesa",
        "arquivo": "imagens/mesa.png",
        "urlLink": "https://example.com/images/mesa.png"
    },
    {
        "nomeImagem": "Movel Planta",
        "arquivo": "imagens/movel_planta.png",
        "urlLink": "https://example.com/images/movel_planta.png"
    },
    {
        "nomeImagem": "Plantas Internas",
        "arquivo": "imagens/plantas_internas.png",
        "urlLink": "https://example.com/images/plantas_internas.png"
    },
    {
        "nomeImagem": "Star Wars",
        "arquivo": "imagens/star_wars.png",
        "urlLink": "https://example.com/images/star_wars.png"
    },
    {
        "nomeImagem": "Teclado",
        "arquivo": "imagens/tecl.png",
        "urlLink": "https://example.com/images/tecl.png"
    },
    {
        "nomeImagem": "Vinis",
        "arquivo": "imagens/vinis.png",
        "urlLink": "https://example.com/images/vinis.png"
    },
    {
        "nomeImagem": "Vitrola",
        "arquivo": "imagens/vitrola.png",
        "urlLink": "https://example.com/images/vitrola.png"
    },
    {
        "nomeImagem": "Cadeira",
        "arquivo": "imagens/cadeira.png",
        "urlLink": "https://example.com/images/cadeira.png"
    },
    {
        "nomeImagem": "Livros de Poesia",
        "arquivo": "imagens/livros_poesia.png",
        "urlLink": "https://example.com/images/livros_poesia.png"
    },
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
            if (lastNonTransparentImageIndex >= 0){
                changeCursor(true);
                showName(overlayImages[lastNonTransparentImageIndex].nomeImagem, e.clientX, e.clientY);
            }
            else{
                changeCursor(false);
                showName(null);
            }
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

        //if it would be out of the screen
        //put it at the bottom instead

        var halfDescriptionHeight = nameContainer.offsetHeight / 2;
        var halfDescriptionWidth = nameContainer.offsetWidth / 2;
        var verticalOffset = 50;
        var borderOffset = 10;

        if (y - verticalOffset - halfDescriptionHeight - borderOffset < 0){
            nameContainer.style.left = x - halfDescriptionWidth + 'px';
            nameContainer.style.top = y - halfDescriptionHeight + verticalOffset + 'px';
        }else{
            nameContainer.style.left = x - halfDescriptionWidth + 'px';
            nameContainer.style.top = y - halfDescriptionHeight - verticalOffset + 'px';
        }

        // Make the container visible
        nameContainer.style.display = 'block';
    }

    function changeCursor(enabled) {
        imageContainer.style.cursor = enabled ? 'pointer' : 'default';
    }
});
