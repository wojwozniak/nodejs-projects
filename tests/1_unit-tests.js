const { assert } = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', function () {
        test('Whole number input', function () {
            const input = '12L';
            assert.equal(convertHandler.getNum(input), 12);
        });

        test('Decimal number input', function () {
            const input = '12.3KG';
            assert.equal(convertHandler.getNum(input), 12.3);
        });

        test('Fractional input', function () {
            const input = '12/3lbs';
            assert.equal(convertHandler.getNum(input), 4);
        });

        test('Fractional input with a decimal', function () {
            const input = '12.3/4.5kg';
            assert.equal(convertHandler.getNum(input), 2.73333);
        });

        test('Double-fraction', function () {
            const input = '1/2.3/4lbs';
            assert.equal(convertHandler.getNum(input), 'Invalid number');
        });

        test('Default 1', function () {
            const input = 'kg';
            assert.equal(convertHandler.getNum(input), 1);
        });
    });

    suite('Function convertHandler.getUnit(input)', function () {
        test('Each valid input unit', function () {
            const input = [
                'gal',
                'mi',
                'km',
                'lbs',
                'kg',
                'GAL',
                'MI',
                'KM',
                'LBS',
                'KG',
            ];
            input.forEach(function (unit) {
                assert.equal(convertHandler.getUnit(unit), unit.toLowerCase());
            });
            assert.equal(convertHandler.getUnit('l'), 'L');
            assert.equal(convertHandler.getUnit('L'), 'L');
        });

        test('Invalid input unit', function () {
            const input = '1pies';
            assert.equal(convertHandler.getUnit(input), 'Invalid unit');
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {
        test('Return correct unit', function () {
            const preconvert = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const postconvert = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            preconvert.forEach(function (unit, i) {
                assert.equal(convertHandler.getReturnUnit(unit), postconvert[i]);
            });
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {
        test('Return spelled-out unit', function () {
            const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expected = [
                'gallons',
                'liters',
                'miles',
                'kilometers',
                'pounds',
                'kilograms',
            ];
            input.forEach((unit, i) => {
                assert.equal(convertHandler.spellOutUnit(unit)[0], expected[i]);
            });
        });
    });

    suite('Function convertHandler.convert(num, unit)', function () {
        test('Gal to L', function () {
            const input = [1, 'gal'];
            const expected = 3.78541;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
        });

        test('L to Gal', function () {
            const input = [1, 'L'];
            const expected = 0.26417;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
        });

        test('Mi to Km', function () {
            const input = [1, 'mi'];
            const expected = 1.60934;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
        });

        test('Km to Mi', function () {
            const input = [1, 'km'];
            const expected = 0.62137;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
        });

        test('Lbs to Kg', function () {
            const input = [1, 'lbs'];
            const expected = 0.45359;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
        });

        test('Kg to Lbs', function () {
            const input = [1, 'kg'];
            const expected = 2.20462;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
        });
    });
});