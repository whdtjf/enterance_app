//SPDX-License-Identifier: Apache-2.0

var enterance = require('./controller.js');

module.exports = function(app){

  app.get('/get_enterance/:id', function(req, res){ //GET 메소드 / 주소의 요청일때만 실행된다.
    enterance.get_enterance(req, res);
  });
  app.get('/add_barcode/:enterance', function(req, res){
    enterance.add_barcode(req, res);
  });
  app.get('/get_all_enterance', function(req, res){
    enterance.get_all_enterance(req, res);
  });
  app.get('/update_enterance/:timestamp', function(req, res){
    enterance.update_enterance(req, res);
  });
}
