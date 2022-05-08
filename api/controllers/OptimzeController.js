no'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const { compress } = require('compress-images/promise');
const rootInput = "/var/www/compress-images.com/node/originalfiles/"
const rootOutput = "/var/www/compress-images.com/node/optimalfile/"

module.exports = {
    opt: (req, res) => {
        let input = req.params.input;
        const processImages = async (onProgress) => {
            const result = await compress({
                source: rootInput + input,
                destination: rootOutput,
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
            res.json(statistic) 
        });
    }
}
