// First part of the project - conversion logic


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

  // Function spelling out the units (used in the getString function)
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
  
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    let result;
    
    return result;
  };
  
}



module.exports = ConvertHandler;