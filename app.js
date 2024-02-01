const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 250;
const targetWidth = 700; 

const currentFrame = (index) => `./bkg/${(index + 1).toString()}.png`;
const images = [];
let bkg = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

gsap.to(bkg, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    repeat: -1, 
    duration: 2, 
    onUpdate: render,
    onStart: disableScroll,
});

images[0].onload = render;

// Add click event listener to the "Contact" text
canvas.addEventListener("click", function(event) {
    const contactTextPosition = { x: 20, y: 970, width: context.measureText("Contact").width, height: 24 };
    const boundingBoxPadding = 100; 

    // Adjust the bounding box size
    const enlargedBoundingBox = {
        x: contactTextPosition.x - boundingBoxPadding,
        y: contactTextPosition.y - boundingBoxPadding,
        width: contactTextPosition.width + 2 * boundingBoxPadding,
        height: contactTextPosition.height + 2 * boundingBoxPadding
    };

    // Check if the click occurred within the enlarged bounding box
    if (
        event.clientX >= enlargedBoundingBox.x &&
        event.clientX <= enlargedBoundingBox.x + enlargedBoundingBox.width &&
        event.clientY >= enlargedBoundingBox.y &&
        event.clientY <= enlargedBoundingBox.y + enlargedBoundingBox.height
    ) {
        // Open the default email client with a new email to the specified address
        window.location.href = "mailto:info@djemaa.co.uk";
    }
});

function render() {
    // Fill the canvas with a black background
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Get the current image and resize it
    const currentImage = images[Math.floor(bkg.frame)];
    
    // Calculate the position to center the image
    const x = (canvas.width - targetWidth) / 2;
    const y = (canvas.height - (targetWidth / currentImage.width) * currentImage.height) / 2;

    // Draw the resized image centered on the screen
    context.drawImage(currentImage, x, y, targetWidth, (targetWidth / currentImage.width) * currentImage.height);

    // Render text
    context.fillStyle = "white";
    context.font = "24px Helvetica";
    context.fillText("Elias Djemaa", 20, 60);
    context.fillText("I am a full stack developer working on building reliable and scalable", 20, 120); 
    context.fillText("digital products for workflow automation.", 20, 160); 

    context.fillText("Experience:", 20, 245); 

    // Render "Gasgate" with green underline
    const gasgateText = "Gasgate";
    const gasgateX = 20;
    const gasgateY = 300;
    const textFillStyle = "white";
    const underlineFillStyle = "rgba(0, 255, 0, 0.5)";

    // Render text
    context.fillStyle = textFillStyle;
    context.font = "24px Helvetica";
    context.fillText(gasgateText, gasgateX, gasgateY);

    // Underline
    const underlineHeight = 2;
    context.fillStyle = underlineFillStyle;
    context.fillRect(gasgateX, gasgateY + 6, context.measureText(gasgateText).width, underlineHeight);

    // Render "Contact" text
    context.fillStyle = "white";
    context.font = "24px Helvetica";
    context.fillText("Contact", 20, 970);
}
