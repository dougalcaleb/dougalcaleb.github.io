import Utils from "../modules/utility.js";

export default class Polygon {
	vertices = []; // references to vertices
	color = null;

	_parentLayer = null;

	constructor(vertices, parentLayer = null) {
		this.vertices = vertices;
		this._parentLayer = parentLayer;
		if (this.vertices.length > 2) {
			this.vertices = Polygon.createPolygon(vertices);
		}
	}

	static CopySet(polygonSet) {
		const newSet = [];
		polygonSet.forEach((polygon) => {
			newSet.push(new Polygon(polygon.vertices, polygon._parentLayer));
		});
		return newSet;
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
	
	AddVertex(vertex) {
		this.vertices.push(vertex);
		if (this.vertices.length > 2) {
			this.vertices = Utils.createPolygon(this.vertices);
		}
	}
	
	GetColor(variance = false) {
		const center = this.GetCenter();
		this.color = this._parentLayer.refCanvas.GetPixelColor(center.x, center.y, {applyVariance: variance});
		return this.color;
	}

	GetCenter() {
		let x = 0;
		let y = 0;
		for (let i = 0; i < this.vertices.length; i++) {
			x += this.vertices[i].x;
			y += this.vertices[i].y;
		}
		return { x: x / this.vertices.length, y: y / this.vertices.length };
	}

	GetNeighborsOfVertex(vertex) {
		const neighbors = [];
		for (let i = 0; i < this.vertices.length; i++) {
			if (this.vertices[i] == vertex) {
				neighbors.push(this.vertices[i - 1]);
				neighbors.push(this.vertices[i + 1]);
				break;
			}
		}
		return neighbors;
	}
}