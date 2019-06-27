import {baseValidator, bytesToMB, formatBytes, isEmpty, secondsToStr, validateInt, validateSizeSuffix} from './Tools';

describe('String Formats are as expected', function () {
    it('should return correct representation in MB', function () {
        expect(bytesToMB(0)).toBe(0);
        expect(bytesToMB(1024 * 1024)).toBe(1);
        expect(bytesToMB(10 * 1024 * 1024)).toBe(10);
    });

    it('should format bytes properly', function () {
        expect(formatBytes(0.1, 0)).toEqual("0 B");


        let x = 1024;
        const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        for (let i = 0; i < sizes.length; i++) {
            const size = sizes[i];
            expect(formatBytes(x, 0)).toEqual("1 " + size);
            expect(formatBytes(10 * x, 0)).toEqual("10 " + size);
            x *= 1024;

        }


    });

    it('should give time properly', function () {
        expect(secondsToStr(0)).toBe('Just now');
        expect(secondsToStr(10)).toBe('10.00 seconds');
        expect(secondsToStr(60)).toBe('1 minute');
        expect(secondsToStr(120)).toBe('2 minutes');
        expect(secondsToStr(3600)).toBe('1 hour');
        expect(secondsToStr(3600 * 2)).toBe('2 hours');
        expect(secondsToStr(3600 * 24)).toBe('1 day');
        expect(secondsToStr(3600 * 24 * 2)).toBe('2 days');
    });
});

describe('Utility functions', function () {
    describe('isEmpty', function () {
        it('should return true if empty', function () {
            expect(isEmpty({})).toBe(true);
        });
        it('should return false if not empty', function () {
            expect(isEmpty({'a': 'a', 'b': 'b'})).toBe(false);
        });
        it('should return true if array is empty', function () {
            expect(isEmpty([])).toBe(true);
        });
        it('should return false if it is an array', function () {
            expect(isEmpty(['a', 'b'])).toBe(false);
        });
    });

});

describe('validator functions', function () {

    describe('base validator', function () {
        it('should validate regex correctly', function () {
            expect(baseValidator(/^a$/, 'a')).toBe(true);
            expect(baseValidator(/^a$/, 'b')).toBe(false);
            expect(baseValidator(/^a|b$/, 'b')).toBe(true);
            expect(baseValidator(/^[ABC]$/, 'A')).toBe(true);
            expect(baseValidator(/^[ABC].*$/, 'AAAA')).toBe(true);
            expect(baseValidator(/^[ABC].*$/, 'XXXXX')).toBe(false);
        });
    });

    it('should validate size suffix', function () {
        expect(validateSizeSuffix("off")).toBe(true);
        expect(validateSizeSuffix("1k")).toBe(true);
        expect(validateSizeSuffix("1K")).toBe(true);
        expect(validateSizeSuffix("10K")).toBe(true);
        expect(validateSizeSuffix("0.5K")).toBe(true);
        expect(validateSizeSuffix("0.5M")).toBe(true);
        expect(validateSizeSuffix("100.10M")).toBe(true);
        expect(validateSizeSuffix("999.1G")).toBe(true);
        expect(validateSizeSuffix("999.1g")).toBe(true);
        expect(validateSizeSuffix("100.10t")).toBe(true);
        expect(validateSizeSuffix("100.100p")).toBe(true);


        expect(validateSizeSuffix("100.")).toBe(false);
        expect(validateSizeSuffix("a")).toBe(false);
        expect(validateSizeSuffix("asasd")).toBe(false);
        expect(validateSizeSuffix(".")).toBe(false);
        expect(validateSizeSuffix(".10")).toBe(false);
        expect(validateSizeSuffix(".10")).toBe(false);
        expect(validateSizeSuffix("100")).toBe(false);
    });

    it('should validate int', function () {
        expect(validateInt("10")).toBe(true)
        expect(validateInt("20")).toBe(true)
        expect(validateInt("30")).toBe(true)
        expect(validateInt(10)).toBe(true)
        expect(validateInt("10.0")).toBe(false)
    });
});