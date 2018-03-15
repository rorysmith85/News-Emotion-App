


/*
##############################################################################################
This assemmbles the search terms for the APIs, formatting them for the search. The event
below initiates the program upon the user clicking submit. It also formats the query terms
for the API basewd on what the user wanted. Upon this the necessary functions run which
collate the API data and manipulate the DOM so as to produce results based on the search criteria
in the HTML.
##############################################################################################
*/
var assembleKey = function(parameters) {
  var para_list = [];
  for (var key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      var para_string = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
      para_list.push(para_string);
    }

  }
  return para_list.join("&");
}

var button = document.getElementById("submit_button");
button.addEventListener("click", function() {
  var filter = document.getElementById("news_cat");
  var filterSource = document.getElementById("news_source");
  var category = filter.value;
  var source = filterSource.value;
  params.sources = source;
  params.q = category;
  parameters.q = category;
  var filterL = document.getElementById("news_sourceL");
  var sourceL = filterL.value;
  parameters.sources = sourceL;
  clearTextRight();
  clearTextLeft();
  showContent();
  newsApiLeft();
  newsApiRight();
  setTimeout(avgEmotionR, 2000);
  setTimeout(avgEmotionL, 2000);
  setTimeout(avgSentiment, 2000);
})

function showContent() {
  var news = document.getElementById("side_by_side");
  news.style.display = "flex";
}


/*
##############################################################################################
This runs the API for News Source #2, or the right-hand side in a bigger view. Unecessary words
are removed from the headlines. And if a certain query is mispelled, or the NewsAPI doesn't return
any results or results that are undefined, this patch of code prompts the user on the website
to refine their search. It then adds the news to the webpage.
##############################################################################################
*/

var params = {
  apiKey: "7ce9ac950e7d4f08baab8e5516c93239",
  q: "Trump",
  sources:"breitbart-news",
  sortBy:"relevancy",
  language:"en"
}


function newsApiRight() {
var url = "https://newsapi.org/v2/everything";
var query_url = url + "?" + assembleKey(params);
fetch(query_url)
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    var results = data.articles;
    //console.log(results);
    var headlines = [];
    for (var i = 0; i < results.length; i++) {
      if (results[i].title.includes("Briefing", "Op-Ed")) {
        continue;
      } else if (results[i].title.includes("- Fox News")){
        var str = results[i].title;
        var cleanStr = str.replace("- Fox News", "");
        headlines.push({
          key: results[i].source.name,
          value: cleanStr});
        } else if (results[i].title.length < 5) {
            continue;
        } else if (results[i].title.includes("- Breitbart News")){
          var str1 = results[i].title;
          var cleanStr1 = str1.replace("- Breitbart News", "");
          headlines.push({
            key: results[i].source.name,
            value: cleanStr1});
        } else if (results[i].title.includes("- Washington Post")) {
          var str = results[i].title;
          var newStr = str.replace("- Washington Post", "");
          headlines.push({
            key: results[i].source.name,
            value: newStr});
        } else if (results[i].title.includes("- Daily Mail")){
          var str = results[i].title;
          var cleanStr = str.replace("- Daily Mail", "");
          headlines.push({
            key: results[i].source.name,
            value: cleanStr});
        } else {
          headlines.push({
            key: results[i].source.name,
            value: results[i].title
          })
        }
    }

    var newsList = [];
    for (var i = 0; i < 5; i++) {
      newsList.push(headlines[i]);
    }

    console.log(newsList);
    UndefR(newsList);
  });

}

function UndefR(list) {
  if (list.includes(undefined)) {
    var caveat = document.getElementById("refine");
    caveat.innerHTML = "Try Refining Your Search";
    console.log("refine");
  } else {
    addNews(list);
    for (let i = 0; i < list.length; i++) {
      var title = list[i].value;
      analyzeSentimentRight(title);
      analyzeEmotionRight(title);
    }
  }
}

function addNews(newsList) {

    for (var i = 0; i < newsList.length; i++) {
      var listHead = document.createElement("li");
      var title = newsList[i].value;
      console.log(title);
      var titleCont = document.createTextNode(title);
      listHead.appendChild(titleCont);
      var addHead = document.getElementById("add_news1");
      addHead.append(listHead);
      }

    for (var i =0; i < 1; i++) {
      var addSource = document.getElementById("add_news");
      var source = newsList[i].key;
      var sourceCont = document.createTextNode(source);
      addSource.append(sourceCont);
      }
    }


/*
##############################################################################################
This runs the API for News Source #1, or the left-hand side in a bigger view. Unecessary words
are removed from the headlines. And if a certain query is mispelled, or the NewsAPI doesn't return
any results or results that are undefined, this patch of code prompts the user on the website
to refine their search. It then adds the news to the webpage.
##############################################################################################
*/

var parameters = {
  apiKey: "7ce9ac950e7d4f08baab8e5516c93239",
  q: "Trump",
  sources:"the-guardian-uk",
  sortBy:"relevancy",
  language:"en"
}


function newsApiLeft() {
var url = "https://newsapi.org/v2/everything";
var query_url = url + "?" + assembleKey(parameters);
console.log(query_url);
fetch(query_url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var results = data.articles;
    var headlines = [];
    for (var i = 0; i < results.length; i++) {
      if (results[i].title.includes("Briefing", "Op-Ed")) {
        continue;
      } else if (results[i].title.includes("- Fox News")){
        var str = results[i].title;
        var cleanStr = str.replace("- Fox News", "");
        headlines.push({
          key: results[i].source.name,
          value: cleanStr});
        } else if (results[i].title.length < 5) {
            continue;
        } else if (results[i].title.includes("- Breitbart News")){
          var str1 = results[i].title;
          var cleanStr1 = str1.replace("- Breitbart News", "");
          headlines.push({
            key: results[i].source.name,
            value: cleanStr1});
        } else if (results[i].title.includes("- Washington Post")) {
          var str = results[i].title;
          var newStr = str.replace("- Washington Post", "");
          headlines.push({
            key: results[i].source.name,
            value: newStr});
        } else if (results[i].title.includes("- Daily Mail")){
          var str = results[i].title;
          var cleanStr = str.replace("- Daily Mail", "");
          headlines.push({
            key: results[i].source.name,
            value: cleanStr});
        } else if (results[i].title.includes("- New York Times")) {
          var str = results[i].title;
          var newStr = str.replace("- New York Times", "");
          headlines.push({
            key: results[i].source.name,
            value: newStr});
        } else {
          headlines.push({
            key: results[i].source.name,
            value: results[i].title
          })
        }
    }
    var newsList = [];
    for (var i = 0; i < 5; i++) {
      newsList.push(headlines[i]);
    }

    console.log(newsList);
    UndefL(newsList);
  });
}
function UndefL(list) {
  if (list.includes(undefined)) {
    console.log("refine");
  } else {
    addLeftNews(list);
    for (let i = 0; i < list.length; i++) {
      var title = list[i].value;
      analyzeSentimentLeft(title);
      analyzeEmotionLeft(title);
    }
  }
}

  function addLeftNews(newsList) {

    for (let i = 0; i < newsList.length; i++) {
      var listHead = document.createElement("li");
      var title = newsList[i].value;
      var titleCont = document.createTextNode(title);
      listHead.appendChild(titleCont);
      var addHead = document.getElementById("add_left_news1");
      addHead.append(listHead);
    }
    for (var i =0; i < 1; i++) {
      var addSource = document.getElementById("add_news_sourceL");
      var source = newsList[i].key;
      var sourceCont = document.createTextNode(source);
      addSource.append(sourceCont);
    }
  }


/*
##############################################################################################
This manipulates the DOM clearing the search content and results upon the user hitting
submit again. Thus everytime, the old content is removed and only the new requested content
is revealed in the browswer.
##############################################################################################
*/

function clearTextRight() {
  document.getElementById("add_news").innerHTML = "";
  document.getElementById("add_news1").innerHTML = "";
  document.getElementById("refine").innerHTML = "";
  document.getElementById("emotion").innerHTML = "";
  document.getElementById("sentiment").innerHTML = "";
  document.getElementById("avg_right_sent").innerHTML = "";
  document.getElementById("avg_right_emot").innerHTML = "";
}

function clearTextLeft() {
  document.getElementById("add_left_news1").innerHTML = "";
  document.getElementById("add_news_sourceL").innerHTML = "";
  document.getElementById("avg_left_emot").innerHTML = "";
  document.getElementById("emotion_left").innerHTML = "";
  document.getElementById("sentiment_left").innerHTML = "";
  document.getElementById("avg_left_sentiment").innerHTML = "";
}

var button = document.getElementById("toggle");
button.addEventListener("click", function() {
  var content = document.getElementById("flex-container");
  if (content.style.display === "flex") {
    content.style.display = "none";
  } else if (content.style.display = "none") {
    content.style.display = "flex";
  }

})



/*
##############################################################################################
This analyzes the emotion for both news' sources. It runs the headlines through the Indico API
and then outputs the results onto the page after averaging the scores for the top five Headlines
for each news source.
##############################################################################################
*/

function analyzeEmotionRight(titles) {
  fetch("https://apiv2.indico.io/emotion", {
    method: "post",

    body: JSON.stringify({
      api_key: "624ef4729223cb7ef1d6e4e61f771437",
      data: titles
    })

  })
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    var results = (data.results);
    var maxKey = Object.keys(results).sort(function (a, b) {
      return results[a] < results[b];
    })[0];
    var result = {};
    result[maxKey] = results[maxKey];
    var key = Object.keys(result)[0];
    writeEmotionRight(key);
  })
}

function writeEmotionRight(titles) {
  var listEmotion = document.createElement("li");
  listEmotion.className = "right_emotion";
  var titleContent = document.createTextNode(titles);
  listEmotion.appendChild(titleContent);
  var addEmotion = document.getElementById("emotion");
  addEmotion.appendChild(listEmotion);
}


var avgEmotionR = function() {
  var listItems = document.getElementsByClassName("right_emotion");
  console.log(listItems);
  var rightEmot = {
    joy:0,
    anger:0,
    sadness:0,
    fear:0,
    surprise:0
  }

  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].innerText == "joy") {
      rightEmot.joy += 1;
    } else if (listItems[i].innerText == "anger") {
      rightEmot.anger += 1;
    } else if (listItems[i].innerText == "sadness") {
      rightEmot.sadness += 1;
    } else if (listItems[i].innerText == "fear") {
      rightEmot.fear += 1;
    } else if (listItems[i].innerText == "surprise") {
      rightEmot.fear += 1;
    }
  }
  sortEmotionR(rightEmot);
}

function sort(obj) {
  return Object.keys(obj).sort(function(a, b) {
  return obj[b] - obj[a];
  });
}

  function sortEmotionR(object) {
    var sorted = sort(object);
    var sortedREmot = sorted.map(function(key) {
      return {[key]: object[key]}
    });
    console.log("the object: ", sortedREmot);
    var insertR = document.getElementById("avg_right_emot");
    for (key in sortedREmot[0]) {
      if (sortedREmot[0].hasOwnProperty(key)) {
        var value = sortedREmot[0][key].toString();
        var valueTwo = Object.values(sortedREmot[1]).toString();
        var one = Object.keys(sortedREmot[0]).toString();
        var two = Object.keys(sortedREmot[1]).toString();

        if (value === "3" || value ==="4" || value === "5") {
          var first = Object.keys(sortedREmot[0]).toString();

          insertR.append(first);
        } else if (value === "2") {
            if (valueTwo === "2") {

              insertR.append(one, " and ", two);
            } else if (valueTwo !== "2") {
              insertR.append(one);
            }
          }
          else {
            insertR.append("There are no Dominant Emotions")
          }

      }
    }
  }


function analyzeEmotionLeft(titles) {


  fetch("https://apiv2.indico.io/emotion", {
    method: "post",

    body: JSON.stringify({
      api_key: "624ef4729223cb7ef1d6e4e61f771437",
      data: titles
    })

  })
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    var results = (data.results);
    var maxKey = Object.keys(results).sort(function (a, b) {
      return results[a] < results[b];
    })[0];
    var result = {};
    result[maxKey] = results[maxKey];
    var key = Object.keys(result)[0];
    writeEmotionLeft(key);
  })
}

function writeEmotionLeft(titles) {
  var listEmotion = document.createElement("li");
  var titleContent = document.createTextNode(titles);
  listEmotion.className = "left_emotion";
  listEmotion.appendChild(titleContent);
  var addEmotion = document.getElementById("emotion_left");
  addEmotion.appendChild(listEmotion);
}


var avgEmotionL = function() {
  var listItems = document.getElementsByClassName("left_emotion");
  console.log(listItems);
  var leftEmot = {
    joy:0,
    anger:0,
    sadness:0,
    fear:0,
    surprise:0
  }

  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].innerText == "joy") {
      leftEmot.joy += 1;
    } else if (listItems[i].innerText == "anger") {
      leftEmot.anger += 1;
    } else if (listItems[i].innerText == "sadness") {
      leftEmot.sadness += 1;
    } else if (listItems[i].innerText == "fear") {
      leftEmot.fear += 1;
    } else if (listItems[i].innerText == "surprise") {
      leftEmot.fear += 1;
    }
  }
  sortEmotionL(leftEmot);
}


function sortEmotionL(object) {
  var sorted = sort(object);
  var sortedLEmot = sorted.map(function(key) {
    return {[key]: object[key]}

  });
  console.log("the object: ", sortedLEmot);
  var insertL = document.getElementById("avg_left_emot");
  for (key in sortedLEmot[0]) {
    if (sortedLEmot[0].hasOwnProperty(key)) {
      var value = sortedLEmot[0][key].toString();
      var valueTwo = Object.values(sortedLEmot[1]).toString();
      var one = Object.keys(sortedLEmot[0]).toString();
      var two = Object.keys(sortedLEmot[1]).toString();

      if (value === "3" || value ==="4" || value === "5") {
        var first = Object.keys(sortedLEmot[0]).toString();

        insertL.append(first);
      } else if (value === "2") {
          if (valueTwo === "2") {

            insertL.append(one, " and ", two);
          } else if (valueTwo !== "2") {
            insertL.append(one);
          }
        }
        else {
          insertL.append("There are no Dominant Emotions")
        }

    }
  }
}



function analyzeSentimentRight(text) {

var url = "https://api.dandelion.eu/datatxt/sent/v1?lang=en";

var parameters = {
  text: text,
  token:"cfa106085fa54a3391aa00cc085a623f"
}

var query_url = url + "&" + assembleKey(parameters);


fetch(query_url)
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    var results = data.sentiment.score;
    listSentimentRight(results);
});
}


function listSentimentRight(titles) {
  var listSentiment = document.createElement("li");
  var titleContent = document.createTextNode(titles);
  listSentiment.className = "right_sentiment";
  listSentiment.appendChild(titleContent);
  var addSentiment = document.getElementById("sentiment");

  addSentiment.appendChild(listSentiment);
}

function textSentimentRight(results) {
  if (results >= -1.0 && results < -0.50) {
    scoreSentimentRight("Very Negative");
  } else if (results > -0.50 && results < -0.05) {
    scoreSentimentRight("Negative");
  } else if (results > -0.5 && results < 0.05 ) {
    scoreSentimentRight("Neutral");
  } else if (results > 0.05 && results < 0.50) {
    scoreSentimentRight("Positive");
  } else if (results > 0.5 && results <= 1) {
    scoreSentimentRight("Very Positive");
  }
}

function scoreSentimentRight(string) {
  var insert = document.getElementById("avg_right_sent");
  insert.append(string);
}

function textSentimentLeft(results) {
  if (results >= -1.0 && results < -0.50) {
    scoreSentimentLeft("Very Negative");
  } else if (results > -0.50 && results < -0.05) {
    scoreSentimentLeft("Negative");
  } else if (results > -0.5 && results < 0.05 ) {
    scoreSentimentLeft("Neutral");
  } else if (results > 0.05 && results < 0.50) {
    scoreSentimentLeft("Positive");
  } else if (results > 0.5 && results <= 1) {
    scoreSentimentLeft("Very Positive");
  }
}

function scoreSentimentLeft(string) {
  var insert = document.getElementById("avg_left_sentiment");
  insert.append(string);
}

var avgSentiment = function() {
  var listItems = document.getElementsByClassName("right_sentiment");
  var sentiment = 0;
  for (var i = 0; i < listItems.length; i++) {
    sentiment += Number(listItems[i].innerText);
  }
  var avg = (sentiment/5).toFixed(2);
  textSentimentRight(avg);

  var items = document.getElementsByClassName("left_sentiment");
  var leftySent = 0;
  for (var i = 0; i < items.length; i++) {
    leftySent += Number(items[i].innerText);
  }
  var leftSentAvg = (leftySent/5).toFixed(2);
  textSentimentLeft(leftSentAvg);

}

function analyzeSentimentLeft(text) {

var url = "https://api.dandelion.eu/datatxt/sent/v1?lang=en";

var parameters = {
  text: text,
  token:"cfa106085fa54a3391aa00cc085a623f"
}

var query_url = url + "&" + assembleKey(parameters);


fetch(query_url)
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    var results = data.sentiment.score;
    listSentimentLeft(results);
});
}


function listSentimentLeft(titles) {
  var listSentiment = document.createElement("li");
  var titleContent = document.createTextNode(titles);
  listSentiment.className = "left_sentiment";

  listSentiment.appendChild(titleContent);
  var addSentiment = document.getElementById("sentiment_left");

  addSentiment.appendChild(listSentiment);
}

function sentimentLeft(results) {
  if (results >= -1.0 && results < -0.50) {
    scoreSentimentLeft("Very Negative");
  } else if (results > -0.50 && results < -0.05) {
    scoreSentimentLeft("Negative");
  } else if (results > -0.5 && results < 0.05 ) {
    scoreSentimentLeft("Neutral");
  } else if (results > 0.05 && results < 0.50) {
    scoreSentimentLeft("Positive");
  } else if (results > 0.5 && results <= 1) {
    scoreSentimentLeft("Very Positive");
  }
}
