const newsLetterSubDetails = document.querySelector('.form--submit');

const apiEndpoint =  "https://mg15fiws9l.execute-api.us-east-1.amazonaws.com/test/newsletter"

// NEWSLETTER SUBSCRIBERS DETAILS
if(newsLetterSubDetails){
  newsLetterSubDetails.addEventListener('submit', event => {
    event.preventDefault();
    const Firstname = document.getElementById('fname').value;
    const Lastname = document.getElementById('lname').value;
    const Email = document.getElementById('email').value;
    const Country = document.getElementById('country').value;
    const NewsLetterType = document.getElementById('newsType').value;

    ProcessUserData(Firstname,Lastname,Email,Country,NewsLetterType);
  });
};


// Function to process user input.
 const ProcessUserData = async(Firstname,Lastname,Email,Country,NewsLetterType) => {
  if(NewsLetterType === 'null'){
    return showAlert('error', "Please select your preferred newsletter type");
  };
  try {
    const response = await axios({
      method: 'POST',
      url: apiEndpoint,
      data: {
        Firstname,
        Lastname,
        Email,
        Country,
        NewsLetterType
      }
    });
    if(response.data){
      return showAlert('success',response.data)
    }
  } catch (error) {
    console.log(error)
    if(error.response.data){
      return showAlert('error', error.response.data);
    }
    return showAlert('error', "AN ERROR OCCURRED PROCESSING THE REQUEST");
  }
 };

// Function to display Alert on success or error  
const hideAlert = () => {
  const element = document.querySelector('.alert');
  if (element) element.parentElement.removeChild(element);
}; 

const showAlert = (type, msg) => {
  hideAlert();
  const message = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', message);
  window.setTimeout(hideAlert, 5000);
};