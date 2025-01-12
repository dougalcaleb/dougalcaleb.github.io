import Physics2D from './physics2d.js';
import { Point, Polygon, PolygonType } from './physics2d.js';

window.onLandingPageLoad = () => {
	
	if (window.physics2DScene) {
		return;
	}

	const isMobile = window.innerWidth < 768;

	const wallWidth = isMobile ? 0.2 : 0.1;
	const scale = isMobile ? 15 : 60;
	const halfWorldWidth = window.innerWidth / 2 / scale;
	const halfWorldHeight = window.innerHeight / 2 / scale;
	const quarterWorldWidth = window.innerWidth / 4 / scale;
	const quarterWorldHeight = window.innerHeight / 4 / scale;

	window.physics2DScene = new Physics2D({
		canvas: document.getElementById('physics2d-canvas'),
		sceneX: window.innerWidth,
		sceneY: window.innerHeight,
		scale,
		backgroundColor: "rbga(0,0,0,0)",
		lineWidth: 5,
	});

	// main
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(1, 1),
			new Point(1, -1),
			new Point(-1, 1),
			new Point(-1, -1)
		],
		position: new Point(halfWorldWidth - 2, halfWorldHeight),
		type: PolygonType.DYNAMIC,
		restitution: 1,
	}));

	// pentagon
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(1, 0),
			new Point(0.309, 0.951),
			new Point(-0.809, 0.588),
			new Point(-0.809, -0.588),
			new Point(0.309, -0.951),
		],
		position: new Point(halfWorldWidth / 3, halfWorldHeight + 2),
		type: PolygonType.DYNAMIC,
		restitution: 1,
		angularVelocity: -1,
		velocity: { x: 2, y: 0 }
	}));

	// triangle
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(2, 0),
			new Point(-1, 1.732),
			new Point(-1, -1.732),
		],
		position: new Point(halfWorldWidth*1.5, halfWorldHeight*1.5),
		type: PolygonType.DYNAMIC,
		restitution: 1,
		angularVelocity: -2
	}));

	// floor left
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-quarterWorldWidth, 0.1),
			new Point(-quarterWorldWidth, -0.1),
			new Point(quarterWorldWidth, 0.1),
			new Point(quarterWorldWidth, -0.1),
		],
		position: new Point( halfWorldWidth*0.5, isMobile ? 2.5 : 0 ),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));
	// floor right
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-quarterWorldWidth, 0.1),
			new Point(-quarterWorldWidth, -0.1),
			new Point(quarterWorldWidth, 0.1),
			new Point(quarterWorldWidth, -0.1),
		],
		position: new Point( halfWorldWidth*1.5, isMobile ? 2.5 : 0 ),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));

	// ceiling left
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-quarterWorldWidth, 0.1),
			new Point(-quarterWorldWidth, -0.1),
			new Point(quarterWorldWidth, 0.1),
			new Point(quarterWorldWidth, -0.1),
		],
		position: new Point( halfWorldWidth*0.5, halfWorldHeight*2 ),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));
	// ceiling right
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-quarterWorldWidth, 0.1),
			new Point(-quarterWorldWidth, -0.1),
			new Point(quarterWorldWidth, 0.1),
			new Point(quarterWorldWidth, -0.1),
		],
		position: new Point( halfWorldWidth*1.5, halfWorldHeight*2 ),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));

	// right wall upper
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-wallWidth, quarterWorldHeight),
			new Point(-wallWidth, -quarterWorldHeight),
			new Point(wallWidth, quarterWorldHeight),
			new Point(wallWidth, -quarterWorldHeight),
		],
		position: new Point(halfWorldWidth * 2 - 0.25, halfWorldHeight * 1.5),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));
	// right wall lower
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-wallWidth, quarterWorldHeight),
			new Point(-wallWidth, -quarterWorldHeight),
			new Point(wallWidth, quarterWorldHeight),
			new Point(wallWidth, -quarterWorldHeight),
		],
		position: new Point(halfWorldWidth * 2 - 0.25, halfWorldHeight * 0.5),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));

	// left wall upper
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-wallWidth, quarterWorldHeight),
			new Point(-wallWidth, -quarterWorldHeight),
			new Point(wallWidth, quarterWorldHeight),
			new Point(wallWidth, -quarterWorldHeight),
		],
		position: new Point(isMobile ? 0.5 : 1.5, halfWorldHeight * 1.5),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));
	// left wall lower
	window.physics2DScene.addPolygon(new Polygon({
		vertices: [
			new Point(-wallWidth, quarterWorldHeight),
			new Point(-wallWidth, -quarterWorldHeight),
			new Point(wallWidth, quarterWorldHeight),
			new Point(wallWidth, -quarterWorldHeight),
		],
		position: new Point(isMobile ? 0.5 : 1.5, halfWorldHeight * 0.5),
		restitution: 1,
		type: PolygonType.STATIC,
		render: false,
	}));


	window.addEventListener("resize", () => {
		window.physics2DScene.Renderer.setCanvasSize(
			window.innerWidth / 2 / scale,
			window.innerHeight / 2 / scale
		);
		window.physics2DScene.Renderer.render();
	});

	window.physics2DScene.afterStep(() => {
		// console.log(scene.frame);
	});
	window.physics2DScene.start();
};

window.pausePhysics2D = () => {
	window.physics2DScene.pause();
}

window.resumePhysics2D = () => {
	window.physics2DScene.start();
}