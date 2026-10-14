import path from "node:path";
import { compileString } from "sass";
import { describe, expect, it } from "vitest";
import * as style from "./style";

// Prints every list and map key in _style.scss as a custom property, so the test can read them back.
const probe = `
@use "style";
@use "sass:map";
@use "sass:meta";
@use "sass:list";

:root {
  @each $name, $value in meta.module-variables("style") {
    @if meta.type-of($value) == map {
      --#{$name}: #{list.join(map.keys($value), (), comma)};
    } @else if meta.type-of($value) == list or meta.type-of($value) == string {
      --#{$name}: #{$value};
    }
  }
}
`;

function readSass(): Record<string, string[]> {
	const { css } = compileString(probe, { loadPaths: [path.join(import.meta.dirname)] });
	const out: Record<string, string[]> = {};
	for (const [, name, value] of css.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
		out[name.replace(/_/g, "-")] = value.split(",").map(v => v.trim().replace(/^['"]|['"]$/g, ""));
	}
	return out;
}

// TS array → its Sass key list and every map keyed by it.
const options = {
	variants: { keys: "variant-keys", maps: ["variants-background-map", "variants-border-map", "variants-text-map"] },
	colors: { keys: "color-keys", maps: ["color-map", "on-color-map"] },
	sizes: { keys: "size-keys", maps: ["size-map"] },
	roundeds: { keys: "rounded-keys", maps: ["rounded-map"] },
	fonts: { keys: "font-keys", maps: ["font-map"] },
	weights: { keys: "weight-keys", maps: ["weight-map"] },
	slants: { keys: "slant-keys", maps: ["slant-map"] },
	shadows: { keys: "shadow-keys", maps: ["shadow-map"] },
} as const;

describe("style.ts and _style.scss", () => {
	const sass = readSass();

	for (const [array, { keys, maps }] of Object.entries(options)) {
		const expected = [...style[array as keyof typeof options]].sort();

		it(`$${keys} matches ${array}`, () => {
			expect(sass[keys]?.slice().sort()).toEqual(expected);
		});

		for (const map of maps) {
			it(`$${map} has a value for every ${array} key`, () => {
				expect(sass[map]?.slice().sort()).toEqual(expected);
			});
		}
	}

	it("stylingPrefix matches $styling-prefix", () => {
		expect(sass["styling-prefix"]?.[0]).toBe(style.stylingPrefix);
	});

	it("no key is used by two options", () => {
		const all = Object.keys(options).flatMap(array => [...style[array as keyof typeof options]]);
		const duplicates = all.filter((key, i) => all.indexOf(key) !== i);
		expect(duplicates).toEqual([]);
	});
});
