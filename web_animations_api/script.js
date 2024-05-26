
const plasmid = document.getElementById("plasmid");
const rect = plasmid.getBoundingClientRect();

const anchors = document.querySelectorAll(".anchor");
let anchorPositions = [];

anchors.forEach(anchor => {
    const rect = anchor.getBoundingClientRect();
    anchorPositions.push({
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left
    });
});

console.log(anchorPositions);

console.log("Top:", rect.top, "Right:", rect.right, "Bottom:", rect.bottom, "Left:", rect.left);

const plasmidMoving = [
    { top: `${rect.top}px`, left: `${rect.left}px`, offset: 0},
    { top: "125px", left: "57px", offset: 0.25},
    { top: "250px", left: "114px", offset: 0.5},
    { top: "250px", left: "407px", offset: 0.75},
    { top: "250px", left: "700px", offset: 1},
];

const myScrollTimeline = new ScrollTimeline({
    scrollSource: document.scrollingElement,
    orientation: 'vertical',
    scrollOffsets: [
      new CSSUnitValue(0, 'percent'),
      new CSSUnitValue(100, 'percent'),
    ],
});

const plasmidTiming = {
    easing: 'ease-in-out', // Add an easing function
    timeline: myScrollTimeline,
};

document.getElementById("plasmid").animate(plasmidMoving, plasmidTiming);

