function getbarCharts(sym, data) {
        var symptoms = data["symptomsPresent"];
        var diseases= data["diseasesPresent"];
        if (symptoms.length > 15) {
            symptoms = symptoms.slice(0, 15);
        }
        if (diseases.length > 15) {
            diseases = diseases.slice(0, 15);
        }
        barGraph(symptoms, '#symptom-barChart', 'symptom');
        barGraph(diseases, '#disease-barChart', 'disease');
}

function barGraph(data, className, type) {
    var margin = {top: 20, bottom: 70, left: 40, right: 20};
    var width = 630;
    var height = 300;
    var svg = d3.select(className)
        .attr('height', height)
        .attr('width', width)
        .attr('transform', 'translate(0,20)');
    svg.selectAll("*").remove();

    var xScale = d3.scaleBand()
                .rangeRound([0, width-margin.left])
                .padding(0.1).domain(data.map(function (d) {
                    return d[type];
                }));

            var yScale = d3.scaleLinear()
                .rangeRound([height, margin.bottom+10]).domain([0, d3.max(data, function (d) {
                    return Number(d.value*1.3);
                })]);

            var yAxis = d3.axisLeft().scale(yScale).ticks(5);

            svg.append("g")
                .attr("transform", "translate("+ margin.left + "," + (height - margin.bottom) + ")")
                .attr("class","axisRed")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("text-anchor", "middle")
                .style("font-size", "10px")
                .attr("font-family", "serif")
                .attr("transform", "rotate(-45)translate(-30,-15)");

            svg.append("g")
                .attr("transform", "translate(" + margin.left + ","+ (0 - margin.bottom) +")")
                .attr("class", "axisRed")
                .call(yAxis)
                .append("text")
                .attr("transform", "translate(30,60)")
                .attr("x", -20)
                .attr("y", 2)
                .attr("dy", "15px")
                .style("text-anchor", "end")
                .style("font-size", "10px")
                .attr("font-family", "serif")
                .text("Freq");

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return (xScale(d[type])+margin.left);
                })
                .attr("y", function (d) {
                    return (yScale(Number(d.value))-margin.bottom);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) {
                    return height - yScale(Number(d.value));
                }).attr("fill","red");
}

