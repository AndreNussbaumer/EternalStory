
function addStory() {
    document.getElementById("story").insertAdjacentHTML("beforeend",
        document.getElementById('text').value);
}



/* getStory();
function getStory(){
  $.get("/writestory", function(data){
    if(!data){
      console.log('Nothing to add');
    }
    console.log("Updated");
    for(var 1 = 0; 1 < data.length, i++){
      console.log(data[i].name);
    }
    addStory(data);
  });
}
*/
