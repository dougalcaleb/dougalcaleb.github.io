export default class Utils {
	constructor() { }
	
	static radToDeg(rad) {
		return rad * (180 / Math.PI);
	}

	static degToRad(deg) {
		return deg * (Math.PI / 180);
	}

	static isDescendant(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	static colorVariance(color, variance, direction) {
		return color + (variance * direction);
	}

	static randPosNeg() {
		return Math.random() < 0.5 ? -1 : 1;
	}

	static hexToRgb(color, returnAsString = false) {
		let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		let rgb = {
			r: parseInt(hex[1], 16),
			g: parseInt(hex[2], 16),
			b: parseInt(hex[3], 16)
		};
		if (returnAsString) {
			return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
		}
		return rgb;
	}

	// Create a convex hull from a set of vertices (Andrew's Monotone Chain algorithm)
	static createPolygon(vertices) {
		function orientation(p, q, r) {
			const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
			if (val === 0) {
				return 0; // colinear
			}
			return val > 0 ? 1 : 2; // clockwise or counterclockwise
		}

		function convexHull(points) {
			const n = points.length;
			if (n < 3) {
				return null; // Convex hull not possible with less than 3 points
			}
		
			// Sort points x-first, y-second
			points.sort((a, b) => {
				if (a.x !== b.x) {
					return a.x - b.x;
				}
				return a.y - b.y;
			});
		
			const hull = [];
		
			// Lower hull
			for (const p of points) {
				while (hull.length >= 2 && orientation(hull[hull.length - 2], hull[hull.length - 1], p) !== 2) {
					hull.pop();
				}
				hull.push(p);
			}
		
			// Upper hull
			const upperHullStart = hull.length;
			for (let i = n - 2; i >= 0; i--) {
				const p = points[i];
				while (hull.length >= upperHullStart + 1 && orientation(hull[hull.length - 2], hull[hull.length - 1], p) !== 2) {
					hull.pop();
				}
				hull.push(p);
			}
		
			return hull;
		}

		return convexHull(vertices);
	}
}