const sendEmail = require("./sendEmail");

const userSignUpEmail = async (email, subject, message) => {
   try {
      sendEmail(
         email,
         subject,
         `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Sortmate</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Sortmate. </p>
        <p>${message}</p>

      </div>
   `
      );
   } catch (err) {
      console.log(err);
   }
};

module.exports = userSignUpEmail;
