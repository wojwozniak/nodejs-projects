// API part of the app

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if (initNum === 'Invalid number' && initUnit === 'Invalid unit') {
      return res.status(400).json({
        error: 'Invalid number and unit'
      });
    } else if (initNum === 'Invalid number') {
      return res.status(400).json({
        error: 'Invalid number'
      });
    } else if (initUnit === 'Invalid unit') {
      return res.status(400).json({
        error: 'Invalid unit'
      });
    }

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};