function init() {

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        console.log(data);
        let names = data.names;
        names.forEach((sample) => {
            selector.append("option").text(sample).property("value", sample);
        });

        var firstSample = names[0];
        populateDemoInfo(firstSample);
        buildCharts(firstSample);



    })

}

init();

function optionChanged(newSubject) {
    populateDemoInfo(newSubject);
    buildCharts(newSubject);

}




//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
function buildCharts(sample) {


    d3.json("samples.json").then((data) => {




        // -------------------------------------------------------------------------
        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

        // Use sample_values as the values for the bar chart

        // Use otu_ids as the labels for the bar chart

        // Use otu_labels as the hovertext for the chart


        // Define samples
        var samples = data.samples;
        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == sample)[0];

        // Filter by patient ID
        var filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == sample)[0];

        // Create variables for chart
        // Grab sample_values for the bar chart
        var sample_values = filteredSample.sample_values;

        // Use otu_ids as the labels for bar chart
        var otu_ids = filteredSample.otu_ids;

        // use otu_labels as the hovertext for bar chart
        var otu_labels = filteredSample.otu_labels;

        // BAR CHART
        // Create the trace
        var bar_data = [{
            // Use otu_ids for the x values
            x: sample_values.slice(0, 10).reverse(),
            // Use sample_values for the y values
            y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
            // Use otu_labels for the text values
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(242, 113, 102)'
            },
        }];

        // Define plot layout
        var bar_layout = {
            title: "Top 10 Microbial Species in Belly Buttons",
            xaxis: { title: "Bacteria Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        // Display plot
        Plotly.newPlot('bar', bar_data, bar_layout);



        //----------------------------------------------------------------------------
        // Create a bubble chart that displays each sample.

        // Use otu_ids for the x values.

        // Use sample_values for the y values.

        // Use sample_values for the marker size.

        // Use otu_ids for the marker colors.

        // Use otu_labels for the text values

        // Create the trace
        var bubble_data = [{
            // Use otu_ids for the x values
            x: otu_ids,
            // Use sample_values for the y values
            y: sample_values,
            // Use otu_labels for the text values
            text: otu_labels,
            mode: 'markers',
            marker: {
                // Use otu_ids for the marker colors
                color: otu_ids,
                // Use sample_values for the marker size
                size: sample_values,
                colorscale: 'YlOrRd'
            }
        }];


        // Define plot layout
        var layout = {
            title: "Belly Button Samples",
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" },
        };

        // Display plot
        Plotly.newPlot('bubble', bubble_data, layout)

        // GAUGE CHART
        // Create variable for washing frequency
        var washFreq = filteredMetadata.wfreq

        // Create the trace
        var gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                title: { text: "Washing Frequency (Times per Week)" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: { color: 'white' },
                    axis: { range: [null, 10] },
                    steps: [
                        { range: [0, 3], color: 'rgb(253, 162, 73)' },
                        { range: [3, 6], color: 'rgb(242, 113, 102)' },
                        { range: [6, 10], color: 'rgb(166, 77, 104)' },
                    ],
                    // threshold: {
                    //     line: { color: "white" },
                    // }
                }
            }
        ];

        // Define Plot layout
        var gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

        // Display plot
        Plotly.newPlot('gauge', gauge_data, gauge_layout);
    })


};


// //-----------------------------------------------------------------------------
// // Display the sample metadata, i.e., an individual's demographic information.

function populateDemoInfo(sample) {


    d3.json("samples.json").then(data => {
        var metadata = data.metadata
        var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == sample)[0];

        var demographicInfoBox = d3.select("#sample-metadata");
        demographicInfoBox.html("");


        console.log(filteredMetadata);
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            demographicInfoBox.append("p").text(`${key.toUpperCase()}: ${value}`)
        });


    })
}


//------------------------------------------------------------------------------
// Display each key-value pair from the metadata JSON object somewhere on the page.







//-------------------------------------------------------------------------------
// Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard









//------------------------------------------------------------------------------
// Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file








