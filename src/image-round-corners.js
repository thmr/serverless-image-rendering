class ImageCorners {

  constructor(Sharp) {
    this.sharp = Sharp;
  }


  round(image, radius) {

    const roundedCorners = Buffer.from(
        '<svg><rect x="0" y="0" width="' + parseInt(radius) + '" height="' + parseInt(radius) + '" rx="' + (parseInt(radius)/2) +'" ry="' + (parseInt(radius)/2) +'"/></svg>'
    );

    if (!image) throw new Error('An Image must be specified');
    if (!radius) throw new Error('Image radius must be specified');


    return new Promise((res, rej) => {
      this.sharp(new Buffer(image.buffer))
        .resize(parseInt(radius), parseInt(radius))
        .overlayWith(roundedCorners, { cutout: true })
        .png()
        .toBuffer()
        .then(data => {
          return res({
            image: data,
            contentType: 'image/png',
          });
        })
        .catch(err => rej(err))
    });
  }
}

module.exports = ImageCorners;
