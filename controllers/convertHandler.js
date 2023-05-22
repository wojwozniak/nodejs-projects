/**
 * This function handles the conversion of 
 * units - it's main logic part of the app
 * Used chatGPT to generate regex expressions
 * I understand them, but writing them myself
 * is quite difficult
 * @returns the conversion string
 */
function ConvertHandler() {

  /**
   * This function returns the number to convert
   * @param {*} input - the input string
   * @returns the number to convert
   */
  this.getNum = (input) => {
    const regex = /^(([1-9]\d*(\.\d+)?|0\.\d+)(\/[1-9]\d*(\.\d+)?|\/0\.\d+)*)?[a-zA-Z]{0,3}$/;
    const regex2 = /\/.*?\//g;

    if (!regex.test(input) || regex2.test(input)) {
      return 'Invalid number';
    }

    const numPart = input.match(/([1-9]\d*(\.\d+)?|0\.\d+)/g);

    if (!numPart?.length) {
      return 1;
    }

    let initNum;

    if (numPart.length === 1) {
      initNum = parseFloat(numPart[0]);
    } else {
      const fraction = numPart.reduce((acc, curr) => acc / parseFloat(curr));
      initNum = Math.round(fraction * 100000) / 100000;
    }

    return initNum;
  }

  /**
   * This function returns the unit to convert
   * @param {*} input - the input to get the unit from
   * @returns the unit to convert 
   */
  this.getUnit = (input) => {
    const units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    const initUnit = input.match(/[a-z]+$/i)?.[0]?.toLowerCase() || '';
    if (initUnit === 'l') {
      return 'L';
    } else if (units.includes(initUnit)) {
      return initUnit;
    } else if (initUnit === '') {
      return 'No unit';
    } else {
      return 'Invalid unit';
    }
  };

  /**
   * This function returns the unit that we have after the conversion
   * @param {*} initUnit - the unit before conversion
   * @returns the unit after conversion
   */
  this.getReturnUnit = (initUnit) => {
    const unitMap = {
      gal: 'L',
      lbs: 'kg',
      mi: 'km',
      L: 'gal',
      kg: 'lbs',
      km: 'mi',
    };

    return unitMap[initUnit] || initUnit;
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
      L: 'liters',
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
  this.convert = (initNum = 1, initUnit) => {
    const conversions = {
      gal: 3.78541,
      lbs: 0.453592,
      mi: 1.60934,
      L: 1 / 3.78541,
      kg: 1 / 0.453592,
      km: 1 / 1.60934,
    };
  
    if (initNum === 'Invalid number' || initUnit === 'Invalid unit' || initUnit === 'No unit') {
      return;
    }
  
    const conversionFactor = conversions[initUnit];
  
    if (conversionFactor !== undefined) {
      const result = initNum * conversionFactor;
      return Math.round(result * 100000) / 100000;
    }
  
    return initNum;
  };

  /**
   * Function returning conversion string
   * @param {*} initNum - the number before conversion
   * @param {*} initUnit - the unit before conversion
   * @param {*} returnNum - the number after conversion
   * @param {*} returnUnit - the unit after conversion
   * @returns the conversion string 
   */
  this.getString = function (initNum = 1, initUnit, returnNum, returnUnit) {
    if (
      initNum === 'Invalid number' ||
      initUnit === 'Invalid unit' ||
      initUnit === 'No unit'
    ) {
      return;
    }

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}



module.exports = ConvertHandler;