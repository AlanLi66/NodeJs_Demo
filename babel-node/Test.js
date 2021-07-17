import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

const files = imagemin(['*.jpg'], {
	destination: 'build/images',
	plugins: [
		imageminJpegtran({
			quality: 90,
            progressive:true,
            arithmetic:false
		}),
		imageminPngquant({
			quality: [0.5, 0.5]
		})
	]
});

console.log(files);

// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
