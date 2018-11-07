// define variables //
// var w = 750;
// var h = 600;
// var padding = 50;
// var xWidth = 350;
// var yWidth = 350;
//var dataset = [
//[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
//[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
//];
// global parameters //
var margin = {
    top: 20,
    right: 210,
    bottom: 50,
    left:70
},
    outerWidth = 1200,
    outerHeight = 700,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;
var CellLabel = ['B', 'Tmem', 'NaiveT', 'Teff', 'NK', 'Tem', 'Mo', 'DC']
var dataset=[];
var counter=0;
var color = d3.scale.category10();
const ButtonsText = ['ALL','CD3D', 'CD27', 'IL7R', 'SELL', 'CCR7', 'GZMA', 'IL32', 'GZMK',
'DUSP2', 'CD8A', 'GZMH', 'GZMB', 'IL2RB', 'SETD5_AS1', 'ZNF528', 'ADD1',
'ANKRD49', 'CEACAM21', 'RDH11', 'FAM8A1', 'POLR2I', 'CHPF2'];
var customBase = document.createElement("custom");
var custom = d3.select(customBase);
var graphDiv = d3.selectAll('div').data([0]);
graphDiv.enter().append('div')
        .style('position', 'relative');
// initialize canvas for later use //
var canvas = graphDiv.selectAll('canvas').data([0]);
canvas.enter().append('canvas')
.attr('height', height)
.attr('width', width)
.style('position', 'absolute')
.style('top', margin.top+'px')
.style('left', margin.left+'px');
var virtualCanvas = d3.select(document.createElement('canvas'))
.attr('height', height)
.attr('width', width);
var context = canvas.node().getContext("2d");
var virtualContext = virtualCanvas.node().getContext("2d");
function paintPoint(d){
    // const color = d3.scale.linear().domain([0,10]).range(['red', 'blue'])
    // paint each point on to canvas according to DOM element
    virtualContext.fillStyle = "blue";
    context.fillStyle = color(d.attr("label"));
    context.globalAlpha = d.attr("opacity");
    context.beginPath();
    virtualContext.beginPath();
    context.arc(d.attr("cx"), d.attr("cy"), d.attr("r"), 0, 2 * Math.PI);
    virtualContext.arc(d.attr("cx"), d.attr("cy"), d.attr("r"), 0, 2 * Math.PI);
    // context.arc(x(d.tSNE_1)+95, y(d.tSNE_2), r, 0, 2 * Math.PI);
    // virtualContext.arc(x(d.tSNE_1)+95, y(d.tSNE_2), r, 0, 2 * Math.PI);

    //fill the point
    context.fill();
    virtualContext.fill();
}
function paintCanvas() {
    // get the canvas drawing context
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    var Selected = custom.selectAll("custom.circle");
    // var cirlcle = custom.selectAll("custom.circle");
    Selected.each(function(d, i){
        // console.log(d3.select(this).attr("cx"));
        ThisOne = d3.select(this);
        paintPoint(ThisOne)
    })

    // draw a circle for each
    // data.forEach((d, i) => {
        // paintPoint(context, virtualContext, d, i, x, y, 3, 0.5);
    // });
}
function bind(data, x, y){
    // to bind canvas element to web element //
    var circle = custom.selectAll("custom.circle")
                .data(data);
    circle
        .transition()
        .attr("opacity", 1);

        // 'CD3D', 'CD27', 'IL7R', 'SELL', 'CCR7', 'GZMA', 'IL32', 'GZMK',
        // 'DUSP2', 'CD8A', 'GZMH', 'GZMB', 'IL2RB', 'SETD5-AS1', 'ZNF528', 'ADD1',
        // 'ANKRD49', 'CEACAM21', 'RDH11', 'FAM8A1', 'POLR2I', 'CHPF2'
    circle.enter().append("custom")
    .attr("class", "circle")
    .attr("cx", function(d){return x(d.tSNE_1)+95;})
    .attr("cy", function(d){return y(d.tSNE_2);})
    .attr("r", 2)
    .attr("opacity", 1)
    .attr("tag", function(d){return d.ID})
    .attr("CD3D", function(d){return d.CD3D})
    .attr("CD27", function(d){return d.CD27})
    .attr("IL7R", function(d){return d.IL7R})
    .attr("SELL", function(d){return d.SELL})
    .attr("CCR7", function(d){return d.CCR7})
    .attr("GZMA", function(d){return d.GZMA})
    .attr("IL32", function(d){return d.IL32})
    .attr("DUSP2", function(d){return d.DUSP2})
    .attr("CD8A", function(d){return d.CD8A})
    .attr("GZMH", function(d){return d.GZMH})
    .attr("GZMB", function(d){return d.GZMB})
    .attr("IL2RB", function(d){return d.IL2RB})
    .attr("SETD5-AS1", function(d){return d.SETD5_AS1})
    .attr("ZNF528", function(d){return d.ZNF528})
    .attr("ADD1", function(d){return d.ADD1})
    .attr("ANKRD49", function(d){return d.ANKRD49})
    .attr("CEACAM21", function(d){return d.CEACAM21})
    .attr("ANKRD49", function(d){return d.ANKRD49})
    .attr("RDH11", function(d){return d.RDH11})
    .attr("FAM8A1", function(d){return d.FAM8A1})
    .attr("POLR2I", function(d){return d.POLR2I})
    .attr("CHPF2", function(d){return d.CHPF2})
    .attr("label", function(d){return d.CellType});
}
function DrawPlot(error, data){
//     var svg = d3.select("body")
// .append("svg")
// .attr("width", w+400)
// .attr("height", h+400);


// svg.selectAll("circle")
//     .data(data)
//     .enter().append("circle")
//     .attr("cx", function(d){return Number(d.tSNE_1) - d3.min(data, function(d){return Number(d.tSNE_1);})})
//     .attr("cy", function(d){return Number(d.tSNE_2) - d3.min(data, function(d){return Number(d.tSNE_2);})})
//     .attr("r", 1)
//     .attr("opacity", 0.2);
       // console.log(data);


                        // Make an SVG for axes
        const svg = graphDiv.selectAll('svg').data([0]);
        svg.enter().append('svg')
            .style('position', 'absolute')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);
                        // Create groups for axes
        const xAxisG = svg.selectAll('g.x').data([0]);
        xAxisG.enter().append('g')
            .attr('class', 'x')
            .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')')
            .style("font-size", "10px");
        const yAxisG = svg.selectAll('g.y').data([0]);
        yAxisG.enter().append('g')
            .attr('class', 'y')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
            .style("font-size", "10px");

            // define axis text
        svg.append("text")             
        .attr("transform",
                "translate(" + (width/2 +75) + " ," + 
                                (height + margin.top + 30) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("tSNE-1");
        // define axis text
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+100)
        .attr("x",0 - (height / 2)-15)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("tSNE-2");
        svg.append("text")
        .attr("x", (width / 2)+55)             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Small tSNE Demo");
        
        svg.selectAll("circle")
            .data(CellLabel)
            .enter().append("circle")
            .attr("cx", width)
            .attr("cy", function(d, i){return i*20+10})
            .attr("r", 7.5)
            .attr("fill", function(d){return color(d)})
            .text(function(d){return d});

            svg.selectAll(".text")
            .data(CellLabel)
            .enter().append("text")
            .attr("x", width+10)
            .attr("y", function(d, i){return i*20+15})
            .text(function(d){console.log(d);return d});



        // Create scales
        const x = d3.scale.linear()
            .domain([d3.min(data, function(d){return Number(d.tSNE_1);}), d3.max(data, function(d){return Number(d.tSNE_1);})])
            .range([0, width-95]).nice();
        const y = d3.scale.linear()
            .domain([d3.min(data, function(d){return Number(d.tSNE_2);}), d3.max(data, function(d){return Number(d.tSNE_2);})])
            .range([height, 0]).nice();

        // Create axes
        const xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom').tickSize(1);
        const yAxis = d3.svg.axis()
            .scale(y)
            .orient('left').tickSize(1);
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
        // CREATE DROP DOWN MENU
        function dropdownChange (){
            var newGene = d3.select(this).property("value");
            var points = custom.selectAll("custom.circle");
            var passedPoint = [];
            // d3.select("#container").selectAll("*").remove();
            points.each(function(d){
                
                var temp = d3.select(this);                
                // console.log(d3.select(this).attr(newGene));
                if (Number(temp.attr(newGene)) > 0){
                    temp.attr("opacity", 1.0);
                    passedPoint.push(temp.attr("tag"));
                }else{
                    temp.attr("opacity", 0.1);
                }
                if (newGene == "ALL"){
                    temp.attr("opacity", 1.0);
                }
            })
            // console.log(newGene);
            console.log(passedPoint);
            paintCanvas();
        }
        
        
        bind(data, x, y);
        paintCanvas()
        var dropdown = d3.select("#container")
                        .insert("select", "svg")
                        .on("change", dropdownChange)
            
        dropdown.selectAll("option")
        .data(ButtonsText)
        .enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });

        // create dropdown
    };

function test(error, data){
    console.log(data);
    console.log("everything is fine!");
}; 


// to queue functions 
// data is too big to load at the same time. 
// so queue is essential
d3.queue()
    .defer(d3.tsv, "data/final.txt")
    .await(DrawPlot);