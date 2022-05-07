(async function(){

    const postcodeForm = document.getElementById('postcodeform');
    postcodeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validatePostcode();
    })
  
    const redirectOnFound = true;
    const postCodeFoundRedirectUrl = "";
    const noPostCodeFoundRedirectUrl = "";
  
    //fetch an array of the valid partial postcodes
    const url = "https://sheets-api-totalize.herokuapp.com/"
  
    let postcodes = await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
    })
  
    // main function
    function validatePostcode() {
      const inputfield = document.getElementById("postcode");
      const foundCodeMessage = document.getElementById('code-found__message')
      const postcode = inputfield.value.toUpperCase();
  
      // basic regex for an Edinburgh postcode
      const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
      if (!regex.test(postcode)) {      
        document.getElementById("postcodeerror").style.display = "block";
        return false;
      }
      // valid postcode so split into two parts
      let stringArray = postcode.split(" ");
      // get first and seconds parts
      let firstword = stringArray[0];
      let secondword = stringArray[1];
      // and then just first char of second word
      let firstchar = secondword.charAt(0);
  
      let lookingfor = firstword + " " + firstchar;
      // check input postcode is in array of good postcodes
      if (postcodes.indexOf(lookingfor) > -1) {
        // yes it is so carry on
        if(redirectOnFound){
          window.location.href = postCodeFoundRedirectUrl
          return false;
        }
        foundCodeMessage.classList.add('show');
      } else {
        // no it isn't so show other option
        window.location.href = noPostCodeFoundRedirectUrl;
        return false;
      }
    }
})();