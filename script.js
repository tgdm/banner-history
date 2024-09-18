// Load the CSV data
d3.csv('data.csv').then(data => {
    // Parse the data
    data.forEach(d => {
        d.start = new Date(d.start);
        d.end = new Date(d.end);
    });

    // Set up the SVG canvas dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#timeline")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.start))
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.event))
        .range([0, height])
        .padding(0.1);

    // Add the axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    // Add the bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.start))
        .attr("y", d => y(d.event))
        .attr("width", d => x(d.end) - x(d.start))
        .attr("height", y.bandwidth());
});
