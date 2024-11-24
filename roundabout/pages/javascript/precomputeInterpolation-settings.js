import Roundabout from "/javascript/roundabout.min.js";

new Roundabout({
    parent: ".roundabout-example",
    id: ".firstCarousel",
    pagesToShow: 3,
    pages: [
        {
           backgroundImage: "../images/numbers/0.png"
        },
        {
           backgroundImage: "../images/numbers/1.png"
        },
        {
           backgroundImage: "../images/numbers/2.png"
        },
        {
           backgroundImage: "../images/numbers/3.png"
        },
        {
           backgroundImage: "../images/numbers/4.png"
        },
        {
           backgroundImage: "../images/numbers/5.png"
        }
    ],
    interpolate: [
        {
            values: {
                0: 50,
                1: 100
            },
            property: "height",
            unit: "$%"
        },
        {
            values: {
                1: 100,
                2: 50
            },
            property: "height",
            unit: "$%"
        },
    ],
    precomputeInterpolation: 0.2
});

new Roundabout({
    parent: ".roundabout-example",
    id: ".secondCarousel",
    pagesToShow: 3,
    pages: [
        {
           backgroundImage: "../images/numbers/0.png"
        },
        {
           backgroundImage: "../images/numbers/1.png"
        },
        {
           backgroundImage: "../images/numbers/2.png"
        },
        {
           backgroundImage: "../images/numbers/3.png"
        },
        {
           backgroundImage: "../images/numbers/4.png"
        },
        {
           backgroundImage: "../images/numbers/5.png"
        }
    ],
    interpolate: [
        {
            values: {
                0: 50,
                1: 100
            },
            property: "height",
            unit: "$%"
        },
        {
            values: {
                1: 100,
                2: 50
            },
            property: "height",
            unit: "$%"
        },
    ],
    precomputeInterpolation: 0.05
});