
function setCards() {};
function openCard() {};
function setExhibitCards() {};
function closeWindow() {
  window.location.hash = "";
};
/*
 * Function to get a single exhibit from the DB.
 */
function showExhibit(str) {
  if (str=="") {
    document.getElementById("txtHint").innerHTML="";
    return;
  } 
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      setCards(JSON.parse(this.responseText));
    }
  }
  xmlhttp.open("GET","/getexhibit.php?q="+str,true);
  xmlhttp.send();
}

/*
 * Function to populate the image model from the DB.
 */
function initImages() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      setImages(JSON.parse(this.responseText));
    }
  }
  xmlhttp.open("GET", "/getimages.php", true);
  xmlhttp.send();
}
/*
 * Same for sounds.
 */
function initSounds() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      setSounds(JSON.parse(this.responseText));
    }
  }
  xmlhttp.open("GET", "/getsounds.php", true);
  xmlhttp.send();
}
/*
 * Function to populate the exhibit model from the DB.
 */
function initExhibits() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      setExhibits(JSON.parse(this.responseText));
    }
  }
  xmlhttp.open("GET", "/getexhibits.php", true);
  xmlhttp.send();
}
/*
 * Function to get all cards.
 */
function initExhibitCards() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      setExhibitCards(JSON.parse(this.responseText));
    }
  }
  xmlhttp.open("GET", "/getexhibitcards.php", true);
  xmlhttp.send();
}
/*
 * Function to delete a file.
 */
function sendDelete(fileType, id, path) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      alert(this.responseText);
    }
  }
  if (fileType == "image") {
    xmlhttp.open("GET", "/deleteimage.php?ID="+id+"&filepath="+path, true);
    xmlhttp.send();
  }
  else if (fileType == "sound") {
    xmlhttp.open("GET", "/deletesound.php?ID="+id+"&filepath="+path, true);
    xmlhttp.send();
  }
}

var RFIDApp = angular.module('RFIDApp', []);

// Set up controller:
RFIDApp.controller('RFIDController', function ($scope) {
  $scope.cards = [];
  $scope.exhibits = [];
  $scope.images = [];
  $scope.sounds = [];
  $scope.exhibitCards = [];
  $scope.showExhibit = showExhibit;
  setImages = function(images) {
    $scope.images = images;
    // Default for a new card is no image.
    $scope.cardImage = images[0];
  };
  // Grab the current data from the DB.
  initImages();
  initSounds();
  initExhibits();
  initExhibitCards();
  setExhibits = function(exhibits) {
    $scope.exhibits = exhibits;
    $scope.$apply();
  };
  // Gets an exhibit object from an exhibit name.
  function getExhibit(name) {
    for(i = 0; i < $scope.exhibits.length; i++) {
      if ($scope.exhibits[i].ExhibitName == name) {
        return $scope.exhibits[i];
      }
    }
  };
  // Gets an image objext from an image name.
  function getImage(name) {
    for(i = 0; i < $scope.images.length; i++) {
      if ($scope.images[i].name == name) {
        return $scope.images[i];
      }
    }
  };
  $scope.sounds = [];
  setSounds = function(sounds) {
    $scope.sounds = sounds;
    // Default for a new card is no sound.
    $scope.cardSound = sounds[0];
  };
  // Gets a sound object given a name.
  function getSound(name) {
    for(i = 0; i < $scope.sounds.length; i++) {
      if ($scope.sounds[i].name == name) {
        return $scope.sounds[i];
      }
    }
  };
  // Changes the models for a currently selected card. These are used in the modal window.
  $scope.openCard = function(card) {
    window.location.hash = 'openModal';
    $scope.clickedCard = card;
    $scope.cardExhibit = $scope.selectedExhibit;
    $scope.imageName = getImage(card.ImageName);
    $scope.soundName = getSound(card.SoundName);
  };
  // Changes the properties of a card to be objects not strings with the names.
  setCards = function(cards) {
    cards.forEach(function(card) {
      card.Image = getImage(card.ImageName);
      card.Sound = getSound(card.SoundName);
      card.Exhibit = getExhibit(card.ExhibitName);
    });
    $scope.cards = cards;
    $scope.$apply();
  };
  $scope.saveCard = function() {
    var card = $scope.clickedCard;
    card.ExhibitID = card.Exhibit.ExhibitID;
    card.ExhibitName = card.Exhibit.ExhibitName;
    card.ImageName = card.Image.name;
    card.SoundName = card.Sound.name;
    var stuff = $scope.clickedCard;
    sendSavedCard($scope.clickedCard);
  };
  // Makes a card object to be saved to the DB.
  $scope.saveNewCard = function() {
    var card = {};
    card.RFIDID = $scope.exhibitCard.ID;
    card.ID = card.RFIDID;
    card.CardNumber = $scope.exhibitCard.RFIDNum;
    card.ExhibitID = $scope.cardExhibit.ExhibitID;
    card.Image = $scope.cardImage;
    card.Sound = $scope.cardSound;
    card.CardTitle = $scope.cardTitle;
    card.CardText = $scope.cardText;
    sendNewCard(card);
    // Now match up properties to what the data model expects.
    card.Image = getImage(card.Image.name);
    card.Sound = getSound(card.Sound.name);
    card.Exhibit = getExhibit($scope.cardExhibit.ExhibitName);
    $scope.cards.push(card);
  }

  // Sets the value of the model for all cards.
  setExhibitCards = function(cards) {
    cards.forEach(function(card) {
      card.cardNumber = card.RFIDNum;
      card.ID = card.RFIDID;
    });
    $scope.exhibitCards = cards;
  }
  $scope.playSound = function(soundfile) {
    document.getElementById("dummy").innerHTML=
      "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
  }

  $scope.deleteImage = function() {
    sendDelete("image", $scope.imageForDelete.Exhibit_ImageID, $scope.imageForDelete.image);
  }
  $scope.deleteSound = function() {
    sendDelete("sound", $scope.soundForDelete.Exhibit_SoundID, $scope.soundForDelete.sound);
  }
});

// Sends a card to be saved to the DB.
function sendSavedCard(card) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      alert(card.CardTitle + " saved!\n");
      // For debugging only: this.resultText;
    }
  }
  xmlhttp.open("GET", "/updatecard.php?dataID=" + card.Exhibit_DataID + "&imageID=" + card.Image.Exhibit_ImageID +
                      "&soundID=" + card.Sound.Exhibit_SoundID + "&exhibitID=" + card.ExhibitID + "&title=" + encodeURI(card.CardTitle) +
                      "&text=" + encodeURI(card.CardText), true);
  xmlhttp.send();
}

// Sends a new card to be added to the DB.
function sendNewCard(card) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      //alert(card.CardTitle + " saved!\n");
      alert(this.responseText);
    }
  }
  xmlhttp.open("GET", "/newcard.php?RFIDID=" + card.RFIDID + "&imageID=" + card.Image.Exhibit_ImageID +
                      "&soundID=" + card.Sound.Exhibit_SoundID + "&exhibitID=" + card.ExhibitID + "&title=" + encodeURI(card.CardTitle) +
                      "&text=" + encodeURI(card.CardText), true);
  xmlhttp.send();
}

// Return function for an image or sound being added from PHP.
function loaded() {
  var ret = frames['upload_target'].document.getElementsByTagName("body")[0].innerHTML;
  if (ret.startsWith('File is')) {
    // Got a response and uploaded a file, add to DB now.
    if (ret.endsWith('has been uploaded.')) {
      sendImage(document.getElementById('fileName').value, "/uploads/" +
        baseName(document.getElementById('fileToUpload').value));
    }
    // Got a response but didn't upload file.
    else {
      alert(ret);
    }
  }
  // Uploaded a sound.
  else if (ret.startsWith('Uploading Sound.')) {
    alert(ret);
    if (ret.endsWith('has been uploaded.')) {
    }
  }

}

// Saves the information for an image to the DB.
function sendImage(name, path) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      if (this.responseText.length > 2) {
        alert(this.responseText)
      }
      else {
        alert('Image uploaded!' + this.responseText);
      }
    }
  }
  xmlhttp.open("GET", "/saveimage.php?name=" + name + "&path=" + window.location.href.split('/#')[0] + path, true);
  xmlhttp.send();
}

// Adding useful string functions.
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}
function baseName(path) {
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

