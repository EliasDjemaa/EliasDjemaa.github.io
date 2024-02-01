const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 250;
const targetWidth = 700; // Adjust this value for the desired width

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
    repeat: -1, // Infinite loop
    duration: 2, // Adjust this value for the desired speed (in seconds)
    onUpdate: render,
    onStart: disableScroll,
});

images[0].onload = render;

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
    context.fillText("Elias Djemaa", 20, 60); // Adjust the position as needed
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

    // Render "Gasgate" with green underline
    const ForeignCirclesText = "---";
    const ForeignCirclesX = 20;
    const ForeignCirclesY = 350;
    const fcFillStyle = "white";
    const fcunderlineFillStyle = "rgba(132, 247, 121)";

    // Render text
    context.fillStyle = fcFillStyle;
    context.font = "24px Helvetica";
    context.fillText(ForeignCirclesText, ForeignCirclesX, ForeignCirclesY);

    // Underline
    const fcnderlineHeight = 2;
    context.fillStyle = fcunderlineFillStyle;
    context.fillRect(ForeignCirclesX, ForeignCirclesY + 6, context.measureText(ForeignCirclesText).width, underlineHeight);


    context.fillText("Contact", 20, 970); // Adjust the position as needed


}
