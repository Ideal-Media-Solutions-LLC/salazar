var authorizationEndpoint = "token.php";

          let RequestAuthorizationToken = function() {
              if (authorizationEndpoint) {
                  var a = new XMLHttpRequest();
                  a.open("GET", authorizationEndpoint);
                  a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                  a.send("");
                  a.onload = function () {
                      var token = JSON.parse(atob(this.responseText.split(".")[1]));
                      regionOptions.value = token.region;
                      authorizationToken = this.responseText;
                      key.disabled = true;
                      key.value = "using authorization token (hit F5 to refresh)";
                      console.log("Got an authorization token: " + token);
                  }
              }
          }