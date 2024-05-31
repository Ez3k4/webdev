// polyfill
// import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';


// write hover over html function to log xy pos of mouse cursor


const plasmid = document.getElementById("plasmid");
let rect_plasmid = plasmid.getBoundingClientRect();
const start_div = document.querySelector(".startpoint");
let rect_start_div = start_div.getBoundingClientRect();

console.log("Plasmid x:", rect_plasmid.x, "Plasmid y:", rect_plasmid.y);
console.log("Start Div x:", rect_start_div.x, "Start Div y:", rect_start_div.y);
const start_x = rect_start_div.width/2 - rect_plasmid.width/2;
const start_y = rect_start_div.height/2 -rect_plasmid.height/2;
console.log("Start X: " + start_x, "Start Y: " + start_y)

// gets each element with the id and returns the positions of it in an array of ClientRect objects
function get_class_positions(class_name) {
    const positions = [];
    const elements = document.querySelectorAll(class_name);
    for (var i = 0; i < elements.length; i++) {
        var element_position = elements[i].getBoundingClientRect();
        positions.push(element_position);
    }
    return positions;
}
const class_DOMrect = get_class_positions(".anchor")
console.log(class_DOMrect)

// calculates the coordinates needed to draw object centered in relation to its parent div (=> startpoint div)
// this could be solved different
function get_element_center(elements, object) {
    const elements_xy = []
    for (var i = 0; i < elements.length; i++) {
        var element_x = (elements[i].x + elements[i].width / 2 - object.width / 2) - rect_start_div.x;
        var element_y = (elements[i].y + elements[i].height / 2 - object.height / 2) - rect_start_div.y;
        elements_xy.push({x: element_x, y: element_y});
    }
    return elements_xy
}
const centered_coordinates = get_element_center(class_DOMrect, plasmid)
console.log("centered coordinates")
console.log(centered_coordinates)

const plasmidMoving = [
    { 
        top: `${start_y}px`, 
        left: `${start_x}px`, offset: 0.2},
    { 
        top: `${centered_coordinates[0].y}px`, 
        left: `${start_x}px`, offset: 0.3,
        transform: 'scale(1)'},
    { 
        top: `${centered_coordinates[0].y}px`, 
        left: `${centered_coordinates[0].x}px`, offset: 0.4,
        transform: 'scale(4)'},
    { 
        top: `${centered_coordinates[0].y}px`, 
        left: `${centered_coordinates[1].x}px`, offset: 0.5,
        transform: 'scale(1)'},
    { 
        top: `${centered_coordinates[2].y}px`, 
        left: `${centered_coordinates[1].x}px`, offset: 0.7},
    { 
        top: `${centered_coordinates[2].y}px`, 
        left: `${centered_coordinates[3].x}px`, offset: 0.9},
    { 
        top: `${centered_coordinates[3].y}px`, 
        left: `${centered_coordinates[3].x}px`, offset: 1},
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

window.addEventListener("scroll", () => {
    rect = plasmid.getBoundingClientRect();
    console.log("Plasmid x:", rect.x, "Plasmid y:", rect.y);
});
