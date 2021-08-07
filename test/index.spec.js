/* eslint-disable no-undef */
import { expect } from "chai";
import lib from "../src/util";

describe("index test", () => {
    describe("true or false", () => {
        it("true is true", () => {
            expect(true).to.eql(true);
        });
        it("false is false", () => {
            expect(false).to.eql(false);
        });
    });

    describe("sayHello function", () => {
        it("should say Hello guys!", () => {
            const str = "Hello Peace";
            expect(str).to.equal("Hello Peace");
        });
    });
});
