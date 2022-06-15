'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./db')

function updateOpt(originalfile_,size_in_,size_output_,percent_,imageID_){
  var sqli = "UPDATE product_images SET optimalfile = '"+originalfile_+"',timeoptimal=1, originalsize='"+size_in_+"', optimalsize='"+size_output_+"',percent='"+percent_+"' WHERE imageID = '"+imageID_+"'";
  db.query(sqli, function (err, resulti) {
    //if (err) throw err;
    console.log(resulti.affectedRows + " record(s) updated");
  });
}
module.exports = {
  updateOpt: updateOpt,
};
