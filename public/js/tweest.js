/**
 * Created by jefferson.wu on 3/1/16.
 * extracting in-line JS to it's own file.
 */
var inputField = document.getElementById('inputField');
var resultDiv = document.getElementById('resultDiv');
var button = document.getElementById('submit');


button.addEventListener('click', function(event){

    var inputFieldValue = document.getElementById('inputField').value;
    var encodedIFV = encodeURI(inputFieldValue);

    console.log(event.type);

    getData('http://localhost:3000/api/debug3/' + encodedIFV).then(function(response) {

        // MAIN LOGIC HERE
        console.log('successfully grabbed data:');

        var parsedData = JSON.parse(response);

        console.log(parsedData);
        displayResponse(parsedData);

        var img = document.createElement('img');
        img.src = decodeURI(parsedData.statuses[0].entities.media[0].media_url);
        document.body.appendChild(img);


    }).catch(function(error){
        console.log(Error('Fay-Lo\'d: ' + error));
    });

    document.getElementById('inputField').value = '';
});



// ===== custom functions =====

function displayResponse(responseText){

    //var parsedData = JSON.parse(responseText);
    //var contentString = parsedData;

//        //debug
//        parsedData.forEach(function(element, index, array){
//            contentString += array[index].;
//
//        });


    resultDiv.innerHTML = responseText;
}