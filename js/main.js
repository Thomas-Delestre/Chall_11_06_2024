document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('pizzaVideo');
    const overlay = document.getElementById('overlay');

    let loggedPredictions = {};

    cocoSsd.load().then(model => {
        console.log("Model loaded successfully");
        video.addEventListener('play', () => {
            console.log("Video is playing");
            const detect = () => {
                model.detect(video).then(predictions => {
                    overlay.innerHTML = '';
                    predictions.forEach(prediction => {
                        // Create a unique key for each prediction based on its class and bounding box
                        let key = `${prediction.class}-${prediction.bbox.join('-')}`;

                        // Only log the prediction if it hasn't been logged before
                        if (!loggedPredictions[key]) {
                            console.log(prediction);
                            loggedPredictions[key] = true;
                        }
                    });

                    predictions.forEach(prediction => {
                        if (['pizza'].includes(prediction.class)) {
                            createClickableArea(prediction);
                            console.log("PIZZZZZZZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                            
                        }
                    });
                });
                requestAnimationFrame(detect);
            };
            detect();
        });
    });
});

function createClickableArea(prediction) {
    const [x, y, width, height] = prediction.bbox;
    const clickableArea = document.createElement('div');
    clickableArea.className = 'clickable';
    clickableArea.style.left = `${x}px`;
    clickableArea.style.top = `${y}px`;
    clickableArea.style.width = `${width}px`;
    clickableArea.style.height = `${height}px`;
    clickableArea.style.border = '2px solid red'; // Add this line
    clickableArea.onclick = () => alert(`${prediction.class} cliquée !`);
    overlay.appendChild(clickableArea);
}