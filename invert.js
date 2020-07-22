// input element
const input = document.querySelector('input');
// event fires when file has been chosen
input.addEventListener('change', e => {
    let files = e.target.files;
    //invert image for every image in files array
    for (let i = 0; i < files.length; i++) {
        // original image
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // inverted image
        let canvas2 = document.createElement('canvas');
        let ctx2 = canvas2.getContext('2d');

        let image = new Image();
        image.src = URL.createObjectURL(files[i]);

        image.onload = function () {
            // change canvas size to image size
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas2.width = image.naturalWidth;
            canvas2.height = image.naturalHeight;

            //draw images obviously
            ctx.drawImage(image, 0, 0);
            ctx2.drawImage(image, 0, 0);

            // get image data to manipulate it
            let imagedata = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            let data = imagedata.data;
            // color invert logic
            for (i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            // change the image with new data
            ctx2.putImageData(imagedata, 0, 0);
        }
        document.body.appendChild(canvas);
        document.body.appendChild(canvas2);
        URL.revokeObjectURL(image);
    }
    // click an image to view it in fullscreen
    let c = document.querySelectorAll('canvas');
    c.forEach(c => {
        c.addEventListener('click', e => {
            c.requestFullscreen();
        })
    })
})