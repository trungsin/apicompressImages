'use strict'
const { compress } = require('compress-images/promise');
module.exports = {
	compress_image: async (input, output) => {
		//let input = req.params.input;
        const processImages = async (onProgress) => {
        	console.log('input: ' + input);
        	console.log('output: ' + output);
            const result = await compress({
                source: input,
                destination: output,
                onProgress,
                enginesSetup: {
                    jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
                    png: { engine: 'pngquant', command: ['--quality=20-50', '-o']},
                }
            });
    
            const { statistics, errors } = result;
            // statistics - all processed images list
            // errors - all errros happened list
        };
    
        processImages((error, statistic, completed) => {
            if (error) {
                console.log('Error happen while processing file');
                console.log(error);
                throw error
            }
            console.log('Sucefully processed file');
            console.log(statistic)
            return statistic;
        });
	}
}