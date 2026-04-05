const API_KEY = process.env.API_KEY;
const MODEL = "gemini-3-flash-preview"; // or gemini-1.5-pro
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function askGemini(prompt) {
  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error.message);
      return;
    }

    // Extract the text content from the response object
    const resultText = data.candidates[0].content.parts[0].text;
    console.log(resultText);
    document.getElementById("output-area").value = resultText;
    document.getElementById("loader").innerHTML = "";
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

var skill_count = 1;
function skill_add_button_clicked(){
  console.log("Skill add button clicked");
  skill_count += 1;
  const element = document.getElementById("skill-fields");
  const new_field = document.createElement("input");
  new_field.setAttribute("type","text");
  new_field.setAttribute("placeholder","Skill");
  new_field.setAttribute("id","skill-"+String(skill_count));
  new_field.setAttribute("class","skill-field");
  element.appendChild(new_field);
}

var exp_count = 1;
function exp_add_button_clicked(){
  console.log("Exp add button clicked");
  exp_count += 1;
  const element = document.getElementById("exp-fields");
  const new_field = document.createElement("input");
  new_field.setAttribute("type","text");
  new_field.setAttribute("placeholder","Experience");
  new_field.setAttribute("id","exp-"+String(exp_count));
  new_field.setAttribute("class","exp-field");
  element.appendChild(new_field);
}

function submit_data(){
  const name = (document.getElementById("name_first").value + " " + document.getElementById("name_middle").value + " " + document.getElementById("name_last").value).replace(/\s+/g, ' ').trim();
  const job_position = (document.getElementById("job-position")).value;
  const job_company = (document.getElementById("job-company")).value;
  const skills = document.getElementsByClassName("skill-field");
  const experience = document.getElementsByClassName("exp-field");
  var skills_arr = [];
  var exp_arr = [];

  for(var i=0;i<skills.length;i++){
    skills_arr.push( String( skills[i].value ) );
  }
  for(var i=0;i<experience.length;i++){
    exp_arr.push( String( experience[i].value ) );
  }

  console.log(skills_arr," ",exp_arr);

  var resp = "Write a professional cover letter for "+name+" applying to "+job_company+" for the position of "+job_position+". Make is small and precise. Do not give anything else other than the letter body";
  resp += "Further add skills : "+String(skills_arr)+". Further add experience : "+String(exp_arr);
  resp += "DO NOT generate anything not provided specailly like [Your Name] or [Your Email]. If you dont get that info then dont make it. The response should be around 300 words";
  askGemini(resp);
  document.getElementById("loader").innerHTML = "<div class='loader'></div>Generating";

}

function copy_data(){
  var copyText = document.getElementById("output-area");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}