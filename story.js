function loadStory() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = this.responseText;

      var results = JSON.parse(result);

      results.forEach((comment) => {

        var node = document.createElement("div");
        var message = document.createElement("P");

        node.className = 'card-body';

        var textMessage = document.createTextNode(comment.story);

        message.appendChild(textMessage);

        node.appendChild(message);

        document.getElementById("thestory").insertAdjacentHTML("beforeend", comment.story);


      });

    }
  }

  xhttp.open("GET", "/home", true);
  xhttp.send();

}

function insertComment(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = this.responseText;
      console.log(result);
      loadComments();
    }
}
  var message = document.getElementById('story').value;

  xhttp.open("POST", "/insert", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send('{'+message+'}');
}
