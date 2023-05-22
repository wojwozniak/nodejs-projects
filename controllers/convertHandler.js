/**
 * This function handles the conversion of 
 * units - it's main logic part of the app
 */
function ConvertHandler() {
  
  this.getNum = (input) => {
    let result;
    
    return result;
  };
  
  this.getUnit = (input) => {
    let result;
    
    return result;
  };
  
  this.getReturnUnit = (initUnit) => {
    let result;
    
    return result;
  };

  /**
   * This function returns the spelled out unit
   * @param {*} initUnit - the unit to convert
   * @param {*} returnUnit - the unit to convert to
   * @returns the spelled out unit to use in toString method
   */
  this.spellOutUnit = (initUnit, returnUnit) => {
    const units = {
      gal: 'gallons',
      l: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers',
    };
    return [units[initUnit], units[returnUnit]];
  };
  
  /**
   * This function converts the initNum to 
   * the returnNum
   * @param {*} initNum - the number to convert
   * @param {*} initUnit - the unit to convert
   * @returns the converted number
   */
  this.convert = (initNum, initUnit) => {
    const conversions = {
      'gal': 3.78541,
      'lbs': 0.453592,
      'mi': 1.60934,
      'l': 1 / 3.78541,
      'kg': 1 / 0.453592,
      'km': 1 / 1.60934
    };
  
    if (initNum === 'invalid number' || initUnit === 'invalid unit' || initUnit === 'no unit') {
      return;
    }
  
    const conversionFactor = conversions[initUnit];
  
    if (conversionFactor) {
      const result = initNum * conversionFactor;
      return result.toFixed(5);
    }
  
    return initNum;
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    let result;
    
    return result;
  };
  
}



module.exports = ConvertHandler;