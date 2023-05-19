saumaCtrlsList = [];
saumaCtrlsListV = [];
saumaused = 0;
s_h = 0;
s_v = 0;
lvalarm = false;
// 0 SAUMOITUS PÄÄTOIMINTO, V/H
function saumoita() {
  document.querySelector("#settings__sauma_interval_x").value = document.querySelector("#settings__sauma_intervalx").value;
  document.querySelector("#settings__sauma_interval_y").value = document.querySelector("#settings__sauma_intervaly").value;
  s_v = 0;
  s_h = 0;
  pystyhanta_oikealle = false;
  pystyhanta_oikealle_am = false;
  vaakahanta_alas = false;
  vaakahanta_alas_am = false;
  aukoitus_param = false;
  h = parseFloat(document.querySelector("#box_h").value);
  w = parseFloat(document.querySelector("#box_w").value);
  var newrow_horizontal = document.createElement("div");
  var newrow_vertical = document.createElement("div");
  var canvas = document.querySelector("#box-wrapper > main");
  var aukkos = document.getElementsByClassName("aukko");
  myDivs_horizontal = [],
    myDivs_vertical = [],
    i = 0;
  saumoitus__deleterest();
  if (document.getElementById("settings__sauma_pysty").checked) {
    if (document.querySelector(".levyt")) {
      document.querySelector(".levyt").style.flexDirection = "row";
    }
    var sauma__interval_vertical = document.querySelector("#settings__sauma_interval_x").value;
    var sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_y").value;
    numOfDivs__horizontal = Math.trunc((h - 5 * 2) / sauma__interval_horizontal);
    numOfDivs__vertical = Math.trunc((w - 5 * 2) / sauma__interval_vertical);
    if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
      pystysaumat__aukkojenmukaan();
      vaakasaumat__aukkojenmukaan();
    }
    else {
      // PYSTYSAUMOITUS
      if (document.getElementById('saumoitus__sauma_one').checked) {
        pystysaumat__aukkojenyli();
        // console.log("pystysaumat__aukkojenyli");
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        pystysaumat__aukkojenmukaan();
      }
      // VAAKASAUMOITUS
      if (document.getElementById("saumoitus__sauma_one_v").checked) {
        vaakasaumat__aukkojenyli();
        //console.log("vaakasaumat__aukkojenyli");
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        vaakasaumat__aukkojenmukaan();
      }
    }
  }
  else if (document.getElementById("settings__sauma_vaaka").checked) {
    if (document.querySelector(".levyt")) {
      document.querySelector(".levyt").style.flexDirection = "row-reverse";
    }
    var sauma__interval_vertical = document.querySelector("#settings__sauma_interval_y").value;
    var sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_x").value;
    numOfDivs__horizontal = Math.trunc(h / sauma__interval_horizontal);
    numOfDivs__vertical = Math.trunc(w / sauma__interval_vertical);
    if (document.getElementById("settings__saumahanta-tasoitus").checked) {
      numOfDivs__horizontal = Math.ceil(h / sauma__interval_horizontal);
      numOfDivs__vertical = Math.ceil(w / sauma__interval_vertical);
    }
    if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
      pystysaumat__aukkojenmukaan();
      vaakasaumat__aukkojenmukaan();
    }
    else {
      // PYSTYSAUMOITUS
      if (document.getElementById('saumoitus__sauma_one').checked) {
        pystysaumat__aukkojenyli();
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        pystysaumat__aukkojenmukaan();
      }
      // VAAKASAUMOITUS
      if (document.getElementById("saumoitus__sauma_one_v").checked) {
        vaakasaumat__aukkojenyli();
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        vaakasaumat__aukkojenmukaan();
      }
    }
  }
  calculateamounts();
  fixmissing__saumoitus();
  aukoitus__siirto();
  if (canvas.querySelector(".lapivienti") && lvalarm === false) {
    alert("Huomaan, että piirrosalueella on läpivientejä. Tarkennathan, etteivät ne mene levyjen välistä");
    lvalarm = true;
  }
  alkusaumat();
  levyta();
  submitprogress('', 'adding', '', 'sau');


  dels = canvas.querySelectorAll(".sauma__controls_del");
  
  for (var i = dels.length - 1; i >= 0; i--) {
    sauma = dels[i].parentElement.parentElement;
    if(dels[i].querySelector(".delmeasure")) {
      delmeasure = dels[i].querySelector(".delmeasure");
      if(sauma.classList.contains("sauma__vertical")) {
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.left)*5);
      }
      else if(sauma.classList.contains("sauma__horizontal")) {
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.bottom)*5);
      }
    }
    else {
      
      delmeasure = document.createElement("div");
      delmeasure.classList.add("delmeasure");
      if(sauma.classList.contains("sauma__vertical")) {
        delmeasure.classList.add("delmeasure_vertical");
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.left)*5);
      }
      else if(sauma.classList.contains("sauma__horizontal")) {
        delmeasure.classList.add("delmeasure_horizontal");
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.bottom)*5);
      }

      dels[i].appendChild(delmeasure);
    }
  }

  calculateamounts();
}
// 1 SAUMAKUVAT, V/H
function saumoitus__examplephoto() {
  var examplephoto = document.getElementById("sauma__saumoitus_photo");
  if (document.getElementById("settings__sauma_pysty").checked) {
    examplephoto.src = "/img/saumoitus/s1.jpg";
  }
  if (document.getElementById("settings__sauma_vaaka").checked) {
    examplephoto.src = "/img/saumoitus/s1.jpg";
  }
  // other variables
  if (document.getElementById("settings__sauma_pysty").checked) {
    if (document.getElementById('settings__saumahanta-oik').checked) {
      if (document.getElementById('saumoitus__sauma_one').checked) {
        examplephoto.src = "/img/saumoitus/s1.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/s4.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        examplephoto.src = "/img/saumoitus/s2.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/s3.jpg";
      }
    }
    else if (document.getElementById('settings__saumahanta-vas').checked) {
      if (document.getElementById('saumoitus__sauma_one').checked) {
        examplephoto.src = "/img/saumoitus/s1v.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/s4v.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        examplephoto.src = "/img/saumoitus/s2v.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/s3v.jpg";
      }
    }
    else if (document.getElementById('settings__saumahanta-tasoitus').checked) {
      if (document.getElementById('saumoitus__sauma_one').checked) {
        examplephoto.src = "/img/saumoitus/s1t.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/s4t.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        examplephoto.src = "/img/saumoitus/s2t.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/s3t.jpg";
      }
    }
  }
  if (document.getElementById("settings__sauma_vaaka").checked) {
    if (document.getElementById('settings__saumahanta-oik').checked) {
      if (document.getElementById('saumoitus__sauma_one').checked) {
        examplephoto.src = "/img/saumoitus/vs1.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/vs4.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        examplephoto.src = "/img/saumoitus/vs2.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/vs3.jpg";
      }
    }
    else if (document.getElementById('settings__saumahanta-vas').checked) {
      if (document.getElementById('saumoitus__sauma_one').checked) {
        examplephoto.src = "/img/saumoitus/vs1v.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/vs4v.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        examplephoto.src = "/img/saumoitus/vs2v.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/vs3v.jpg";
      }
    }
    else if (document.getElementById('settings__saumahanta-tasoitus').checked) {
      if (document.getElementById('saumoitus__sauma_one').checked) {
        examplephoto.src = "/img/saumoitus/vs1t.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/vs4t.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_two").checked) {
        examplephoto.src = "/img/saumoitus/vs2t.jpg";
      }
      else if (document.getElementById("saumoitus__sauma_three").checked) {
        examplephoto.src = "/img/saumoitus/vs3t.jpg";
      }
    }
  }
}
// 2 SAUMAPOISTOT, V/H
function sauma__del(e) {
  if(input_step !== "drawscreen_section_four") {
    return
  }

  // alert(e.getAttribute("name"));
  name = e.getAttribute("name");
  const elements = document.querySelectorAll('.sauma__vertical');
  const h_elements = document.querySelectorAll('.sauma__horizontal');
  if ((e.parentElement.parentElement).classList.contains("sauma__vertical")) {
    if ((e.parentElement).classList.contains("sauma__vertical")) {
      sauma = e.parentElement;
    }
    else if ((e.parentElement.parentElement).classList.contains("sauma__vertical")) {
      sauma = e.parentElement.parentElement;
    }
    const currentIndex = Array.from(elements).indexOf(sauma);
    // console.log("currentIndex " + currentIndex);
    // console.log("elements.length " + elements.length );
    if (document.querySelectorAll('.sauma__vertical')[currentIndex + 1]) {
      next_sauma = document.querySelectorAll('.sauma__vertical')[currentIndex + 1];
      next_sauma_value = parseFloat(next_sauma.querySelector("input").value) + parseFloat(sauma.querySelector("input").value);
      next_sauma.querySelector("input").value = next_sauma_value;
      next_sauma.querySelector(".sauma__vertical_ctrldown").innerText = next_sauma_value - 10;
      next_upperinput = next_sauma.querySelector("input");
      next_lowerinput = next_sauma.querySelector(".sauma__vertical_ctrldown");
      next_upperinput.style.width = next_sauma_value / 5 + "px";
      next_lowerinput.style.width = next_sauma_value / 5 + "px";
      next_upperinput.style.left = ((-1) * next_sauma_value / 5) + "px";
      next_lowerinput.style.left = ((-1) * next_sauma_value / 5) + "px";
    }
    else if (document.querySelectorAll('.sauma__vertical')[currentIndex - 1]) {
      prev_sauma = document.querySelectorAll('.sauma__vertical')[currentIndex - 1];
      prev_sauma_value = parseFloat(prev_sauma.querySelector("input").value) + parseFloat(sauma.querySelector("input").value);
      prev_sauma_cord = sauma.style.left;
      prev_sauma.querySelector("input").value = prev_sauma_value;
      prev_sauma.querySelector(".sauma__vertical_ctrldown").innerText = prev_sauma_value - 10;
      prev_upperinput = prev_sauma.querySelector("input");
      preh_lowerinput = prev_sauma.querySelector(".sauma__vertical_ctrldown");
      prev_sauma.style.left = prev_sauma_cord;
      prev_upperinput.style.width = prev_sauma_value / 5 + "px";
      preh_lowerinput.style.width = prev_sauma_value / 5 + "px";
      prev_upperinput.style.left = ((-1) * prev_sauma_value / 5) + "px";
      preh_lowerinput.style.left = ((-1) * prev_sauma_value / 5) + "px";
    }
  }
  if ((e.parentElement.parentElement).classList.contains("sauma__horizontal")) {
    if ((e.parentElement).classList.contains("sauma__horizontal")) {
      h_sauma = e.parentElement;
    }
    else if ((e.parentElement.parentElement).classList.contains("sauma__horizontal")) {
      h_sauma = e.parentElement.parentElement;
    }
    const h_currentIndex = Array.from(h_elements).indexOf(h_sauma);
    // console.log("h_currentIndex " + h_currentIndex);
    // console.log("elh_elementsements.length " + h_elements.length );
    if (document.querySelectorAll('.sauma__horizontal')[h_currentIndex - 1]) {
      prev_h_sauma = document.querySelectorAll('.sauma__horizontal')[h_currentIndex - 1];
      prev_h_sauma_value = parseFloat(prev_h_sauma.querySelector("input").value) + parseFloat(h_sauma.querySelector("input").value);
      prev_h_sauma_cord = h_sauma.style.bottom;
      prev_h_sauma.style.bottom = prev_h_sauma_cord;
      prev_h_sauma.querySelector("input").value = prev_h_sauma_value;
      prev_h_sauma.querySelector(".sauma__horizontal_ctrldown").innerText = prev_h_sauma_value - 10;
      prev_h_upperinput = prev_h_sauma.querySelector("input");
      prev_h_lowerinput = prev_h_sauma.querySelector(".sauma__horizontal_ctrldown");
      prev_h_upperinput.style.height = prev_h_sauma_value / 5 + "px";
      prev_h_lowerinput.style.height = prev_h_sauma_value / 5 + "px";
      // if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
      prev_h_upperinput.style.bottom = ((-1) * prev_h_sauma_value / 5) + "px";
      prev_h_lowerinput.style.bottom = ((-1) * prev_h_sauma_value / 5) + "px";
      // }
      // else {
      //   prev_h_upperinput.style.top = ((-1) * prev_h_sauma_value/5) + "px";
      //   prev_h_lowerinput.style.top = ((-1) * prev_h_sauma_value/5) + "px";
      // }
    }
    else if (document.querySelectorAll('.sauma__horizontal')[h_currentIndex + 1]) {
      next_h_sauma = document.querySelectorAll('.sauma__horizontal')[h_currentIndex];
      next_h_sauma_value = parseFloat(next_h_sauma.querySelector("input").value) + parseFloat(h_sauma.querySelector("input").value);
      next_h_sauma.querySelector("input").value = next_h_sauma_value;
      next_h_sauma.querySelector(".sauma__horizontal_ctrldown").innerText = next_h_sauma_value - 10;
      next_h_upperinput = next_h_sauma.querySelector("input");
      next_h_lowerinput = next_h_sauma.querySelector(".sauma__horizontal_ctrldown");
      next_h_upperinput.style.height = next_h_sauma_value / 5 + "px";
      next_h_lowerinput.style.height = next_h_sauma_value / 5 + "px";
      next_h_upperinput.style.bottom = ((-1) * next_h_sauma_value / 5) + "px";
      next_h_lowerinput.style.bottom = ((-1) * next_h_sauma_value / 5) + "px";
    }
  }
  let sauma__del = document.getElementsByName(name);
  for (var i = sauma__del.length - 1; i >= 0; i--) {
    sauma__del[i].remove();
  }
  let sauma__del2 = document.querySelectorAll("." + name);
  for (var i = sauma__del2.length - 1; i >= 0; i--) {
    sauma__del2[i].remove();
  }

  saumasize__checkup();
  // submitprogress('', 'adding', '', 'sau');
  // if (input_step == "drawscreen_section_five") {
    
    
  // }ää
  calculateamounts();
  levyta();

}
// 3 VAIHDA SAUMAN SIJANTI, V/H
function changedimensions_sauma(input) {
  const elements = document.querySelectorAll('.sauma__vertical');
  const h_elements = document.querySelectorAll('.sauma__horizontal');

  if(input_step !== "drawscreen_section_four") {
    return
  }
  if (input) {

    if (input.value % 25 !== 0) {
      input.style.border = "3px dashed red";
    }
    else if (input.classList.contains("sauma__vertical_ctrl") && parseFloat(input.value) > parseFloat(document.querySelector("#settings__sauma_intervalx")
        .value)) {
      input.style.border = "3px dashed red";
    }
    else if (input.classList.contains("sauma__horizontal_ctrl") && parseFloat(input.value) > parseFloat(document.querySelector("#settings__sauma_intervaly")
        .value)) {
      input.style.border = "3px dashed red";
    }
    else {
      oldvalue = parseFloat(input.dataset.from);
      input.style.border = "unset";
      if ((input.parentElement).classList.contains("sauma__vertical") || (input.parentElement.parentElement).classList.contains("sauma__vertical")) {
        input.style.borderBottom = "1px solid #000";
        if ((input.parentElement).classList.contains("sauma__vertical")) {
          sauma = input.parentElement;
        }
        else if ((input.parentElement.parentElement).classList.contains("sauma__vertical")) {
          sauma = input.parentElement.parentElement;
        }
        const currentIndex = Array.from(elements).indexOf(sauma);
        // console.log("currentIndex " + currentIndex);
        // console.log("elements.length " + elements.length );
        if (currentIndex + 1 === elements.length) {
          alert("Älä muokkaa häntää");
          input.value = input.dataset.from;
        }
        else {
          old_cord = parseFloat(sauma.style.left) * 5;
          newvalue = parseFloat(input.value);
          initialcord = old_cord - oldvalue;
          old_value_cord = (old_cord - initialcord) / 5;
          changed_value = oldvalue + (newvalue - oldvalue);
          new_cord = (parseFloat(initialcord) + changed_value) / 5 + "px";
          sauma.querySelector(".sauma__control_down").innerHTML = changed_value - 10;
          sauma.style.left = new_cord;
          input.dataset.from = newvalue;
          sauma.querySelector(".sauma__controls > b").innerHTML = newvalue - 10;
          erotus = newvalue - oldvalue;
          console.log("old_cord " + old_cord);
          console.log("newvalue " + newvalue);
          console.log("initialcord " + initialcord);
          console.log("old_value_cord " + old_value_cord);
          console.log("changed_value " + changed_value);
          console.log("new_cord " + new_cord);
          console.log("erotus " + erotus);
          if (document.querySelectorAll('.sauma__vertical')[currentIndex + 1]) {
            if (erotus > 0) {
              next_sauma = document.querySelectorAll('.sauma__vertical')[currentIndex + 1];
              next_sauma_value = parseFloat(next_sauma.querySelector("input").value);
              next_sauma_newvalue = parseFloat(next_sauma_value - erotus);
              next_sauma.querySelector("input").value = parseFloat(next_sauma_newvalue);
              next_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(next_sauma_newvalue) - 10;
              next_sauma.style.left = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(next_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.width = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.width = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.left = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
            }
            else if (erotus < 0) {
              prev_sauma = document.querySelectorAll('.sauma__vertical')[currentIndex + 1];
              prev_sauma_value = parseFloat(prev_sauma.querySelector("input").value);
              prev_sauma_newvalue = parseFloat(prev_sauma_value - erotus);
              prev_sauma.querySelector("input").value = parseFloat(prev_sauma_newvalue);
              prev_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(prev_sauma_newvalue) - 10;
              prev_sauma.style.left = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(prev_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.width = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.width = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.left = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
            }
          }
          else {
            if (erotus > 0) {
              next_sauma = document.querySelectorAll('.sauma__vertical')[currentIndex - 1];
              next_sauma_value = parseFloat(next_sauma.querySelector("input").value);
              next_sauma_newvalue = parseFloat(next_sauma_value - erotus);
              next_sauma.querySelector("input").value = parseFloat(next_sauma_newvalue);
              next_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(next_sauma_newvalue) - 10;
              next_sauma.style.left = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(next_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.width = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.width = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.left = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
            }
            else if (erotus < 0) {
              prev_sauma = document.querySelectorAll('.sauma__vertical')[currentIndex - 1];
              prev_sauma_value = parseFloat(prev_sauma.querySelector("input").value);
              prev_sauma_newvalue = parseFloat(prev_sauma_value - erotus);
              prev_sauma.querySelector("input").value = parseFloat(prev_sauma_newvalue);
              prev_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(prev_sauma_newvalue) - 10;
              prev_sauma.style.left = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(prev_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.width = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.width = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.width = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.left = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.left = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
            }
          }
        }
      }
      if ((input.parentElement).classList.contains("sauma__horizontal") || (input.parentElement.parentElement).classList.contains("sauma__horizontal")) {
        // input.style.borderLeft = "1px solid #000";
        if ((input.parentElement).classList.contains("sauma__horizontal")) {
          sauma = input.parentElement;
        }
        else if ((input.parentElement.parentElement).classList.contains("sauma__horizontal")) {
          sauma = input.parentElement.parentElement;
        }

        // delmeasure = sauma.querySelector(".delmeasure");
        // delmeasure.innerHTML = parseFloat(sauma.style.bottom) * 5;
        const currentIndex = Array.from(h_elements).indexOf(sauma);
        if (currentIndex + 1 === h_elements.length) {
          alert("Älä muokkaa häntää");
          input.value = input.dataset.from;
        }
        else {
          old_cord = parseFloat(sauma.style.bottom) * 5;
          newvalue = parseFloat(input.value);
          initialcord = old_cord - oldvalue;
          changed_value = oldvalue + (newvalue - oldvalue);
          new_cord = (parseFloat(initialcord) + changed_value) / 5 + "px";
          sauma.querySelector(".sauma__control_down").innerHTML = changed_value - 10;
          sauma.style.bottom = new_cord;
          input.dataset.from = newvalue;
          sauma.querySelector(".sauma__controls > b").innerHTML = newvalue - 10;
          // console.log("HORIZONTAL");
          // console.log("h_elements" + h_elements);
          // console.log("currentIndex" + currentIndex);
          // console.log("old_cord " + old_cord);
          // console.log("newvalue " + newvalue);
          // console.log("initialcord " + initialcord);
          // console.log("changed_value " + changed_value);
          // console.log("new_cord " + new_cord);
          erotus = newvalue - oldvalue;
          // console.log("erotus " + erotus);
          if (document.querySelectorAll('.sauma__horizontal')[currentIndex + 1]) {
            if (erotus > 0) {
              next_sauma = document.querySelectorAll('.sauma__horizontal')[currentIndex + 1];
              next_sauma_value = parseFloat(next_sauma.querySelector("input").value);
              next_sauma_newvalue = parseFloat(next_sauma_value - erotus);
              next_sauma.querySelector("input").value = parseFloat(next_sauma_newvalue);
              next_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(next_sauma_newvalue) - 10;
              next_sauma.style.bottom = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(next_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.height = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.height = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.bottom = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
            }
            else if (erotus < 0) {
              prev_sauma = document.querySelectorAll('.sauma__horizontal')[currentIndex + 1];
              prev_sauma_value = parseFloat(prev_sauma.querySelector("input").value);
              prev_sauma_newvalue = parseFloat(prev_sauma_value - erotus);
              prev_sauma.querySelector("input").value = parseFloat(prev_sauma_newvalue);
              prev_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(prev_sauma_newvalue) - 10;
              prev_sauma.style.bottom = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(prev_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.height = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.height = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.bottom = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
            }
          }
          else {
            if (erotus > 0) {
              next_sauma = document.querySelectorAll('.sauma__horizontal')[currentIndex - 1];
              next_sauma_value = parseFloat(next_sauma.querySelector("input").value);
              next_sauma_newvalue = parseFloat(next_sauma_value - erotus);
              next_sauma.querySelector("input").value = parseFloat(next_sauma_newvalue);
              next_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(next_sauma_newvalue) - 10;
              next_sauma.style.bottom = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(next_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.height = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.height = parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector("input").style.bottom = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
              next_sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(next_sauma_newvalue) / 5 + "px";
            }
            else if (erotus < 0) {
              prev_sauma = document.querySelectorAll('.sauma__horizontal')[currentIndex - 1];
              prev_sauma_value = parseFloat(prev_sauma.querySelector("input").value);
              prev_sauma_newvalue = parseFloat(prev_sauma_value - erotus);
              prev_sauma.querySelector("input").value = parseFloat(prev_sauma_newvalue);
              prev_sauma.querySelector(".sauma__controls > b").innerHTML = parseFloat(prev_sauma_newvalue) - 10;
              prev_sauma.style.bottom = (parseFloat(initialcord) + parseFloat(changed_value) + parseFloat(prev_sauma_newvalue)) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.height = parseFloat(newvalue) / 5 + "px";
              sauma.querySelector("input").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.height = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.height = parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector("input").style.bottom = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
              prev_sauma.querySelector(".sauma__controls > b").style.bottom = (-1) * parseFloat(prev_sauma_newvalue) / 5 + "px";
            }
          }
        }
      }
    }
    saumasize__checkup();
  }

  saumasize__checkup();
}
// 4 TYHJÄ
// 5 SAUMAN RAAHAUS V/H
function resizeSauma(e, sauma, sauma__controls, sauma__control, axis) {
  const canvaRight = document.querySelector('.drawarea__top');
  const canvaForV = document.querySelector('.drawarea__right');
  const w = document.querySelector('#box_w').value;
  const h = document.querySelector('#box_h').value;
  if (input_step !== 'drawscreen_section_four') {
    return;
  } else {
    // submitprogress('', 'adding', '', 'sau');
  }
  // const canvaForLine = document.querySelector('.box-wrapper .canvas');
  // const BETWEENSHAPES_X = widthInput / canvaRight.offsetWidth;
  // const BETWEENSHAPES_Y = heightInput / canvaForV.offsetHeight;
  if (axis === 'h') {
    let whereInput;
    let elemI;
    // Get resize between in parts
    e.preventDefault();
    let h_elements = [];
    if (document.getElementById("saumoitus__sauma_one").checked && sauma.classList.contains("luo__lastsauma_vertical")) {}
    else {
      const elements = document.querySelectorAll('.sauma__vertical');
      const currentIndex = Array.from(elements).indexOf(sauma);
      ns_vontrol = 101;
      ps_vontrol = 101;
      n_elem = document.querySelectorAll('.sauma__vertical')[currentIndex + 1];
      p_elem = document.querySelectorAll('.sauma__vertical')[currentIndex];
      if (n_elem) {
        ns_vontrol = n_elem.querySelector("input").value;
      }
      if (p_elem) {
        ps_vontrol = p_elem.querySelector("input").value;
      }
      if (parseFloat(ps_vontrol)) {
        // if(document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_one").checked) {
        //   let resizeWidth = event.targetTouches[0].pageX - canvaRight.getBoundingClientRect().left;
        //   let rightIs = parseInt(resizeWidth) + 'px';
        //   sauma.style.right = rightIs;
        //   sauma__control.style.right = "";
        //   sauma.querySelector(".sauma__control_down").style.right = "";
        //   sauma.querySelector(".sauma__control_down").style.width = "auto";
        //   // sauma__control.value = roundToNearest25(5*resizeWidth);
        //   // sauma.querySelector(".sauma__control_down").innerHTML = roundToNearest25(resizeWidth*5)-10;
        //   change__cord_raahaus(sauma);
        //  }
        //  //(document.getElementById("settings__saumahanta-oik").checked || document.getElementById("settings__saumahanta-tasoitus").checked)
        //  else {
        let resizeWidth = event.targetTouches[0].pageX - canvaRight.getBoundingClientRect().left;
        if (event.targetTouches[0].pageX > canvaRight.getBoundingClientRect().left && canvaRight.offsetWidth > resizeWidth) {
          let leftIs = parseInt(resizeWidth) + 'px';
          sauma.style.left = leftIs;
          // sauma__control.style.left = "";
          sauma.querySelector(".sauma__control_down").style.left = "";
          sauma.querySelector(".sauma__control_down").style.width = "auto";
          // sauma__control.value = roundToNearest25(5*resizeWidth);
          // sauma.querySelector(".sauma__control_down").innerHTML = roundToNearest25(resizeWidth*5)-10;
          change__cord_raahaus(sauma);
        }
        // }
      }
    }
  }
  else if (axis === 'v') {
    if (document.getElementById("saumoitus__sauma_one_v").checked && sauma.classList.contains("sauma__horizontal_last")) {}
    else {
      let whereInput;
      let elemI;
      e.preventDefault();
      let resizeHeight = canvaForV.getBoundingClientRect().bottom - event.targetTouches[0].pageY;
      if (resizeHeight * 5 > h) {
        sauma.style.bottom = h / 5 + "px";
      }
      else {
        let h_elements = [];
        
        if (0 < resizeHeight) {
          let bIs = parseInt(resizeHeight) + 'px';
          sauma.style.bottom = bIs;
          sauma.querySelector(".sauma__control_down").style.bottom = "";
          sauma.querySelector(".sauma__control_down").style.height = "auto";
          
          // console.log("bIs " + bIs);
          change__cord_raahaus(sauma);
        }
      }
    }
  
  }


}
// 6 SAUMAN RAAHAUS, KOORDNIAATISTO V/H
function change__cord_raahaus(uusi) {
  vs_summ = 0;
  hs_summ = 0;
  w = parseFloat(document.querySelector("#box_w").value);
  h = parseFloat(document.querySelector("#box_h").value);
  let pystysauma = canvas.querySelectorAll(".sauma__vertical");
  let vaakasauma = canvas.querySelectorAll(".sauma__horizontal");
  if (input_step !== 'drawscreen_section_four') {
    return;
  }
  if (uusi.classList.contains("sauma__vertical")) {
    pystysauma.forEach(function(j) {
      saumawidth = parseFloat(j.style.left) * 5 - vs_summ;
      j.querySelector("input").value = saumawidth;
      j.querySelector(".sauma__vertical_ctrldown").innerHTML = saumawidth - 10;
      j.querySelector(".sauma__vertical_ctrldown").style.width = saumawidth / 5 + "px";
      j.querySelector(".sauma__vertical_ctrldown").style.left = (-1) * saumawidth / 5 + "px";
      j.querySelector(".sauma__vertical_ctrl").style.width = saumawidth / 5 + "px";
      j.querySelector(".sauma__vertical_ctrl").style.left = (-1) * saumawidth / 5 + "px";
      j.querySelector("input").dataset.from = roundToNearest25(saumawidth);
      j.dataset.from = roundToNearest25(saumawidth);
      if (j.classList.contains("sauma__vertical_hanta") !== true) {
        j.querySelector("input").value = roundToNearest25(saumawidth);
        j.querySelector(".sauma__vertical_ctrldown").innerHTML = roundToNearest25(saumawidth) - 10;
        j.querySelector("input").dataset.from = roundToNearest25(saumawidth);
        vs_summ += saumawidth;
      }
    });
    if (document.querySelector(".sauma__vertical_hanta")) {
      hantawidth = w - vs_summ;
      j = document.querySelector(".sauma__vertical_hanta");
      j.style.left = w / 5 + "px";
      j.querySelector(".sauma__controls").style.left = "0";
      j.querySelector(".sauma__vertical_ctrldown").style.width = hantawidth / 5 + "px";
      j.querySelector(".sauma__vertical_ctrl").style.width = hantawidth / 5 + "px";
      j.querySelector("input").value = roundToNearest25(hantawidth);
      j.querySelector(".sauma__vertical_ctrldown").innerHTML = roundToNearest25(hantawidth) - 10;
      j.querySelector("input").dataset.from = roundToNearest25(hantawidth);

      sauma_downheight = parseFloat(hantawidth)-10;
      // j.querySelector(".sauma__vertical_ctrldown").innerHTML = "<div>"+sauma_downheight+"</div>";
    }
    // }
  }
  else if(uusi.classList.contains("sauma__horizontal")) {
    vaakasauma.forEach(function(j) {
      saumaHeight = parseFloat(j.style.bottom) * 5 - hs_summ;
      // j.querySelector(".sauma__horizontal_ctrl").innerHTML = saumaHeight;
      // j.querySelector(".sauma__horizontal_ctrldown").innerHTML = saumaHeight - 10;
      j.querySelector(".sauma__horizontal_ctrldown").style.height = saumaHeight / 5 + "px";
      j.querySelector(".sauma__horizontal_ctrldown").style.bottom = (-1) * saumaHeight / 5 + "px";
      j.querySelector(".sauma__horizontal_ctrl").style.height = saumaHeight / 5 + "px";
      j.querySelector(".sauma__horizontal_ctrl").style.bottom = (-1) * saumaHeight / 5 + "px";
      if (j.classList.contains("sauma__horizontal_hanta") !== true) {
        j.querySelector(".sauma__horizontal_ctrl").value = roundToNearest25(saumaHeight);
        
        sauma_downheight =  roundToNearest25(saumaHeight) - 10;
        j.querySelector(".sauma__horizontal_ctrldown").innerHTML = "<div>"+sauma_downheight+"</div>";

        // j.querySelector(".sauma__horizontal_ctrldown").innerHTML = roundToNearest25(saumaHeight) - 10;
        j.querySelector("input").dataset.from = roundToNearest25(saumaHeight);
        hs_summ += saumaHeight;
      }
      j.dataset.from = (saumaHeight);
      // vs_summ +=saumawidth;
    });
    if (document.querySelector(".sauma__horizontal_hanta")) {
      hantawidth = h - hs_summ;
      j = document.querySelector(".sauma__horizontal_hanta");
      j.style.bottom = h / 5 + "px";
      j.querySelector(".sauma__controls").style.bottom = "0";
      j.querySelector(".sauma__horizontal_ctrldown").style.height = hantawidth / 5 + "px";
      j.querySelector(".sauma__horizontal_ctrl").style.height = hantawidth / 5 + "px";
      j.querySelector(".sauma__horizontal_ctrl").value = roundToNearest25(hantawidth);

      sauma_downheight =  roundToNearest25(hantawidth) - 10;
      j.querySelector(".sauma__horizontal_ctrldown").innerHTML = "<div>"+sauma_downheight+"</div>";

      // j.querySelector(".sauma__horizontal_ctrldown").innerHTML = hantawidth - 10;
      j.querySelector("input").dataset.from = roundToNearest25(hantawidth);
    }
  }
  saumasize__checkup();

  dels = canvas.querySelectorAll(".sauma__controls_del");
  
  for (var i = dels.length - 1; i >= 0; i--) {
    sauma = dels[i].parentElement.parentElement;
    if(dels[i].querySelector(".delmeasure")) {
      delmeasure = dels[i].querySelector(".delmeasure");
      if(sauma.classList.contains("sauma__vertical")) {
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.left)*5);
      }
      else if(sauma.classList.contains("sauma__horizontal")) {
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.bottom)*5);
      }
    }
    else {
      
      delmeasure = document.createElement("div");
      delmeasure.classList.add("delmeasure");
      if(sauma.classList.contains("sauma__vertical")) {
        delmeasure.classList.add("delmeasure_vertical");
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.left)*5);
      }
      else if(sauma.classList.contains("sauma__horizontal")) {
        delmeasure.classList.add("delmeasure_horizontal");
        delmeasure.innerHTML = roundToNearest25(parseFloat(sauma.style.bottom)*5);
      }

      dels[i].appendChild(delmeasure);
    }
  }
}
// 7 POISTAA VIALLISET SAUMAT, V/H
function saumoitus__deleterest() {
  // if (document.querySelector(".verticalrow_saumat")) {
  //   let verticalrow_saumat = document.querySelectorAll(".verticalrow_saumat");
  //   for (var i=0;i<verticalrow_saumat.length;i+=1){
  //     verticalrow_saumat[i].remove();
  //   }
  // }
  if (document.querySelector(".drawarea__controls_four-pysty > li")) {
    let p_li_p = document.querySelectorAll(".drawarea__controls_four-pysty > li");
    for (var i = 0; i < p_li_p.length; i += 1) {
      p_li_p[i].remove();
    }
  }
  if (document.querySelector(".drawarea__controls_four-vaaka > li")) {
    let p_li_v = document.querySelectorAll(".drawarea__controls_four-vaaka > li");
    for (var i = 0; i < p_li_v.length; i += 1) {
      p_li_v[i].remove();
    }
  }
  // if (document.querySelector(".horizontalrow_saumat")) {
  //   let horizontalrow_saumat = document.querySelectorAll(".horizontalrow_saumat");
  //   for (var i = 0; i < horizontalrow_saumat.length; i += 1) {
  //     horizontalrow_saumat[i].remove();
  //   }
  // }

  // if (document.querySelector(".horizontalrow_saumat")) {
  //   let horizontalrow_saumat = document.querySelectorAll(".horizontalrow_saumat");
  //   for (var i = 0; i < horizontalrow_saumat.length; i += 1) {
  //     horizontalrow_saumat[i].remove();
  //   }
  // }

  if (document.querySelector(".newrow_vertical")) {
    let newrow_vertical = document.querySelectorAll(".newrow_vertical");
    for (var i = 0; i < newrow_vertical.length; i += 1) {
      newrow_vertical[i].remove();
    }
    if (document.querySelector(".drawarea__left_container > sauma__downctrl_container")) {
      document.querySelector(".drawarea__left_container > sauma__downctrl_container ").innerHTML = "";
    }
    if (document.querySelector(".drawarea__right > .sauma__controls")) {
      document.querySelector(".drawarea__right > .sauma__controls").innerHTML = "";
    }
  }
  if (document.querySelector(".newrow_horizontal")) {
    let newrow_horizontal = document.querySelectorAll(".newrow_horizontal");
    for (var i = 0; i < newrow_horizontal.length; i += 1) {
      newrow_horizontal[i].remove();
    }
  }
  if (document.querySelector(".levyt")) {
    document.querySelector(".levyt").remove();
  }
  if (canvas.querySelector(".sauma") || canvas.querySelector(".sauma__controls") || canvas.querySelector(".sauma__horizontal_ctrl") || canvas
    .querySelector(".sauma__horizontal_ctrldown") || canvas.querySelector(".sauma__vertical_ctrldown") || document.querySelector(
      ".drawarea__controls_fouritems > li") || canvas.querySelector(".levy") || canvas.querySelector(".verticalrow_saumat") || canvas.querySelector(
      ".horizontalrow_saumat")) {
    let saumas = canvas.querySelectorAll(".sauma");
    for (var i = 0; i < saumas.length; i += 1) {
      saumas[i].remove();
    }
    let sauma__controls = canvas.querySelectorAll(".sauma__controls");
    for (var i = 0; i < sauma__controls.length; i += 1) {
      sauma__controls[i].remove();
    }
    let sauma__horizontal_ctrl = canvas.querySelectorAll(".sauma__horizontal_ctrl");
    for (var i = 0; i < sauma__horizontal_ctrl.length; i += 1) {
      sauma__horizontal_ctrl[i].remove();
    }
    let sauma__horizontal_ctrldown = canvas.querySelectorAll(".sauma__horizontal_ctrldown");
    for (var i = 0; i < sauma__horizontal_ctrldown.length; i += 1) {
      sauma__horizontal_ctrldown[i].remove();
    }
    let sauma__vertical_ctrldown = canvas.querySelectorAll(".sauma__vertical_ctrldown");
    for (var i = 0; i < sauma__vertical_ctrldown.length; i += 1) {
      sauma__vertical_ctrldown[i].remove();
    }
    let drawarea__controls_four_vaaka = document.querySelectorAll(".drawarea__controls_four-vaaka > li");
    for (var i = 0; i < drawarea__controls_four_vaaka.length; i += 1) {
      drawarea__controls_four_vaaka[i].remove();
    }
    let drawarea__controls_four_pysty = document.querySelectorAll(".drawarea__controls_four-pysty > li");
    for (var i = 0; i < drawarea__controls_four_pysty.length; i += 1) {
      drawarea__controls_four_pysty[i].remove();
    }
    let levys = canvas.querySelectorAll(".levy");
    for (var i = 0; i < levys.length; i += 1) {
      levys[i].remove();
    }
    let verticalrow_saumats = canvas.querySelectorAll(".verticalrow_saumat");
    for (var i = 0; i < verticalrow_saumats.length; i += 1) {
      verticalrow_saumats[i].remove();
    }
    let horizontalrow_saumats = canvas.querySelectorAll(".horizontalrow_saumat");
    for (var i = 0; i < horizontalrow_saumats.length; i += 1) {
      horizontalrow_saumats[i].remove();
    }
    
  }
}
// 8 TARKISTAA SAUMAT JA KORJAA VIRHEELLISET, V/H
function fixmissing__saumoitus() {
  h = parseFloat(document.querySelector("#box_h").value);
  w = parseFloat(document.querySelector("#box_w").value);
  horizontal = 0;
  vertical = 0;
  let sauma__horizontal_ctrl = document.querySelectorAll(".sauma__horizontal_ctrl");
  for (var i = 0; i < sauma__horizontal_ctrl.length; i += 1) {
    horizontal += parseFloat(sauma__horizontal_ctrl[i].value);
  }
  if (document.querySelector(".sauma__vertical_ctrl")) {
    let sauma__vertical_ctrl = document.querySelector(".sauma__vertical_ctrl");
    for (var i = 0; i < sauma__vertical_ctrl.length; i += 1) {
      vertical += parseFloat(sauma__vertical_ctrl[i].value);
    }
  }
  horizontalrow_saumat = document.querySelector(".horizontalrow_saumat");
  s_x = document.querySelector(".horizontalrow_saumat > .seina_patka_x");
  s_y = document.querySelector(".horizontalrow_saumat > .seina_patka_y");
  if (s_y) {
    s_ys = document.querySelectorAll(".horizontalrow_saumat > .seina_patka_y");
    for (var i = s_ys.length - 1; i >= 0; i--) {
      s_ys[i].title;
    }
    $('.seina_patka_y').each(function() {
      var ids = $('[title="' + this.title + '"]');
      if (ids.length > 1 && ids[0] == this) {
        $(ids[1]).remove();
      }
    });
    s_ys = document.querySelectorAll(".horizontalrow_saumat > .seina_patka_y");
    title_summ = new Array();
    for (var i = s_ys.length - 1; i >= 0; i--) {
      title = parseFloat(s_ys[i].style.height);
      title_summ.push(title);
    }
    title_summ.sort(function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    height = h / 5 + 1;
    for (var i = 0; i < title_summ.length; i += 1) {
      height -= title_summ[i];
      if (parseFloat(height) < 0) {
        console.log(height);
        for (var j = s_ys.length - 1; j >= 0; j--) {
          s = parseFloat(s_ys[j].style.height);
          if (s == title_summ[i]) {
            s_ys[j].remove();
            break;
          }
        }
      }
      else {
        continue
      }
    }
  }
  // Unstable?
  // if(s_x) {
  //   s_xs = document.querySelectorAll(".verticalrow_saumat > .seina_patka_x");
  //   for (var i = s_xs.length - 1; i >= 0; i--) {
  //     s_xs[i].title;
  //   }
  //   $('.seina_patka_x').each(function () {
  //       var ids = $('[title="' + this.title + '"]');
  //       if (ids.length > 1 && ids[0] == this) {
  //           $(ids[1]).remove();
  //       }
  //   });
  //    s_xs = document.querySelectorAll(".verticalrow_saumat > .seina_patka_x");
  //    title_summ = new Array();
  //    for (var i = s_xs.length - 1; i >= 0; i--) {
  //      title = parseFloat(s_xs[i].style.width);
  //      title_summ.push(title);
  //    }
  //     title_summ.sort( function( a , b){
  //         if(a > b) return 1;
  //         if(a < b) return -1;
  //         return 0;
  //     });
  //     width = w/5 + 1;
  //    for (var i=0;i<title_summ.length;i+=1) {
  //       width-=title_summ[i];
  //       if(parseFloat(width)<0) {
  //         console.log(width);
  //         for (var j = s_xs.length - 1; j >= 0; j--) {
  //           s = parseFloat(s_xs[j].style.width);
  //           if(s == title_summ[i]) {
  //             s_xs[j].remove();
  //             break;
  //           }
  //         }
  //       }
  //       else {
  //         continue
  //       }
  //    }
  // }
  height__check = h - horizontal;
  width__check = w - vertical;
  var sauma__horizontal_ctrl_down, sauma__vertical_ctrl_down;
  if (height__check == 0 || height__check == 15) {
    // console.log("ALL OKE");
  }
  else {
    var sauma__horizontal_ctrl_ = document.querySelector(".sauma_viim b.sauma__horizontal_ctrl.sauma__horizontal_ctrl-righted");
    if (sauma__horizontal_ctrl_) {
      if (sauma__horizontal_ctrl_.value == 5 || sauma__horizontal_ctrl_.value == 0) {
        sauma__horizontal_ctrl_.value = height__check;
        sauma__horizontal_ctrl_.style.height = height__check / 5 + "px";
        aukko = sauma__horizontal_ctrl_.parentElement;
        sauma__horizontal_ctrl_down = aukko.querySelector(".sauma__control_down");
        sauma__horizontal_ctrl_down.innerHTML = height__check - 10;
        sauma__horizontal_ctrl_down.style.height = height__check / 5 + "px";
        if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked ||
          vaakahanta_alas === true) {
          sauma__horizontal_ctrl_.style.bottom = (-1) * height__check / 5 + "px";
          sauma__horizontal_ctrl_down.style.bottom = (-1) * height__check / 5 + "px";
        }
        else {
          sauma__horizontal_ctrl_.style.top = (-1) * height__check / 5 + "px";
          sauma__horizontal_ctrl_down.style.top = (-1) * height__check / 5 + "px";
        }
      }
    }
  }
  if (width__check == 0 || width__check == 15) {
    // console.log("ALL OKE");
  }
  else {
    var sauma__vertical_ctrl_ = canvas.querySelector(".sauma__vertical_ctrl");
    if (sauma__vertical_ctrl_) {
      if (sauma__vertical_ctrl_.value == 5 || sauma__vertical_ctrl_.value == 0) {
        sauma__vertical_ctrl_.value = width__check;
        sauma__vertical_ctrl_.style.width = width__check / 5 + "px";
        sauma__vertical_ctrl_.style.left = (-1) * width__check / 5 + "px";
      }
    }
    if (canvas.querySelector(".verticalrow_saumat")) {
      verticalrow_saumat = canvas.querySelector(".verticalrow_saumat");
    }
    else {
      verticalrow_saumat = document.createElement("div");
      verticalrow_saumat.classList.add("verticalrow_saumat");
      saumat.append(verticalrow_saumat);

    }
    if (canvas.querySelector(".horizontalrow_saumat")) {
      horizontalrow_saumat = canvas.querySelector(".horizontalrow_saumat");
    }
    else {
      horizontalrow_saumat = document.createElement("div");
      horizontalrow_saumat.classList.add("horizontalrow_saumat");
      saumat.append(horizontalrow_saumat);

    }
    
    horizontalrow_saumat = canvas.querySelector(".horizontalrow_saumat");
    if(canvas.querySelector(".horizontalrow_saumat")) {
      Object.keys(horizontalrow_saumat).forEach(key => {
      if (horizontalrow_saumat[key] === 'undefined') {
        delete horizontalrow_saumat[key];
      }
    });
    }
    
    if (canvas.querySelector(".verticalrow_saumat > .sauma__horizontal")) {
      let todel_ = canvas.querySelectorAll(".verticalrow_saumat > .sauma__horizontal");
      todel_.forEach(function(item) {
        item.remove();
      });
    }
    //REMOVE NAN
    let nansauma = canvas.querySelectorAll(".sauma__control_down");
    for (var i = 0; i < nansauma.length; i += 1) {
      if (nansauma[i].innerText == "NaN") {
        nansauma[i].parentElement.parentElement.remove();
      }
      if (nansauma[i].innerText == "-5" || nansauma[i].innerText == "5" || nansauma[i].innerText == "0" || nansauma[i].innerText == "-10" || nansauma[i]
        .innerText == "-14" || nansauma[i].innerText == "-24" || parseFloat(nansauma[i].innerText) < 0) {
        nansauma[i].parentElement.parentElement.remove();
      }
    }
    let nansauma2 = canvas.querySelectorAll(".sauma__horizontal_ctrl");
    for (var i = nansauma2.length - 1; i >= 0; i--) {
      if (nansauma2[i].value == "NaN" || nansauma2[i].value == "NaN\n1") {
        nansauma2[i].parentElement.remove();
      }
      if (nansauma2[i].value == "0" || nansauma2[i].value == "-10" || nansauma2[i].value == "-14" || nansauma2[i].value == "-24" || parseFloat(nansauma2[i]
          .value) < 0) {
        nansauma2[i].parentElement.remove();
      }
    }
  }
  // REMOVE DOUBLE AREAS
  (function findDuplicateIds() {
    var ids = {};
    var all = document.all || document.getElementsByTagName("*");
    for (var i = 0, l = all.length; i < l; i++) {
      if (all[i]) {
        var id = all[i].id;
        if (id) {
          if (ids[id]) {
            if (String(id).includes("horizontal")) {
              if (document.querySelector("#" + id)) {
                document.querySelector("#" + id).remove();
              }
            }
          }
          else {
            ids[id] = 1;
          }
        }
      }
    }
  })();
  (function findDuplicateIds() {
    var ids = {};
    var all = document.all || document.getElementsByTagName("*");
    for (var i = 0, l = all.length; i < l; i++) {
      if (all[i]) {
        var id = all[i].id;
        if (id) {
          if (ids[id]) {
            if (String(id).includes("horizontal")) {
              if (document.querySelector("#" + id)) {
                document.querySelector("#" + id).remove();
              }
            }
          }
          else {
            ids[id] = 1;
          }
        }
      }
    }
  })();
  // REMOVE EMPTY AUKKO SPACES
  let seina_patka = canvas.querySelectorAll(".aukko_patka");
  for (var i = seina_patka.length - 1; i >= 0; i--) {
    if (seina_patka[i].title == "0,0,0") {
      seina_patka[i].remove();
    }
  }
  to_alert = false;
  let _nansauma2 = document.querySelectorAll(".sauma__control");
  for (var i = _nansauma2.length - 1; i >= 0; i--) {
    if (parseFloat(_nansauma2[i].value) < 50) {
      to_alert = true;
    }
  }
  if (to_alert === true) {
    alert("Sauma pienempi kuin 50mm ei saa olla st-järjestelmän mukaan parvekkeessa. Tarkistathan pysty- sekä vaakasaumat huolellisesti");
  }
}
function aukoitus__siirto() {
  forward_prepending = false;
  if (document.querySelector(".seina_patka_x")) {
    let seina_patka_x = canvas.querySelectorAll(".seina_patka_x");
    //reversing array
    // for (let i = 0; i < seina_patka_x .length / 2; i++) {
    //     let temp = seina_patka_x[i];
    //     seina_patka_x[i] = seina_patka_x[seina_patka_x.length - 1 - i];
    //     seina_patka_x[seina_patka_x.length - 1 - i] = temp;
    //   }
    seina_width = 0;
    a_s_v = 0;
    a_s_h = 0;
    var h = parseFloat(document.querySelector("#box_h").value);
    var w = parseFloat(document.querySelector("#box_w").value);
    for (let i = 0; i < seina_patka_x.length; i++) {
      let saumat_ = seina_patka_x[i].querySelectorAll(".sauma__vertical");
      sauma_width = 0;
      s_v += 1;
      saumoitus_t_p = [];
      if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_two").checked) {
        let elems = [];
        w = parseFloat(seina_patka_x[i].style.width);
        console.log(w);
        for (var j = saumat_.length - 1; j >= 0; j--) {
          x = parseFloat(w) - parseFloat(saumat_[j].style.right);
          console.log("x " + x);
          x_cord = saumat_[j].querySelector("input");
          x_cord.remove();
          // x_cord_left = (-1)*parseFloat(x_cord.style.right) + "px";
          // x_cord_width = (-1)*parseFloat(x_cord.style.right) + "px";
          // // x_cord.style.left = x_cord_left;
          // x_cord.style.left = 0;
          // x_cord.style.right = "unset";
          // x_cord.style.width = x_cord_width;
          parent = saumat_[j].parentElement;
          saumat_[j].style.left = seina_width + x + "px";
          saumat_[j].style.right = "unset";
          elems.push(saumat_[j]);
          saumoitus_t_p.push(saumat_[j]);
          // clone = saumat_[j].cloneNode(true);
          saumat_[j].remove();
          // parent.prepend(clone);
        }
        console.log(elems);
        saumoitus_t_p.sort(function(a, b) {
          if (parseFloat(a.style.left) > parseFloat(b.style.left)) return 1;
          if (parseFloat(a.style.left) < parseFloat(b.style.left)) return -1;
          return 0;
        });
        elems.sort(function(a, b) {
          if (parseFloat(a.style.left) > parseFloat(b.style.left)) return 1;
          if (parseFloat(a.style.left) < parseFloat(b.style.left)) return -1;
          return 0;
        });
        for (s = 0; s < elems.length; s++) {
          console.log(elems[s]);
          w = parseFloat(seina_patka_x[i].style.width);
          if (s === 0) {
            elems[s].style.left = seina_width + w + "px";
            pystyhanta_oikealle = true;
            pystyhanta_oikealle_am = true;
            hanta = elems[s];
            // elems[s].remove();
          }
          else {
            document.querySelector(".verticalrow_saumat").append(elems[s]);
          }
          elems[s].classList.remove("sauma__vertical_hanta");
          elems[s].classList.remove("luo__lastsauma_vertical");
        }
        document.querySelector(".verticalrow_saumat").append(hanta);
        calculateamounts();
      }
      else {
        for (s = 0; s < saumat_.length; s++) {
          saumat_[s].classList.remove("sauma__vertical_hanta");
          saumat_[s].classList.remove("luo__lastsauma_vertical");
          if (saumat_[s].querySelector("input")) {
            saumat__left_old = parseFloat(saumat_[s].style.left);
            saumat__left_oldparent = parseFloat(saumat_[s].parentElement.style.width);
            this_sauma_width = parseFloat(saumat_[s].querySelector(".sauma__controls > input").value) / 5;
            current_left = saumat__left_old + saumat__left_oldparent;
            cur_left = this_sauma_width + seina_width + sauma_width;
            saumat_[s].querySelector(".sauma__controls_del").innerHTML = s_v;
            saumat_[s].style.left = cur_left + "px";
            mainparent = saumat_[s].parentElement.parentElement;
            mainparent.append(saumat_[s]);
            sauma_width += saumat_[s].querySelector(".sauma__control").value / 5;
          }
        }
      }
      seina_width += parseFloat(seina_patka_x[i].style.width);
      // console.log(seina_width);
      seina_patka_x[i].remove();
    }
    if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_two").checked) {
      calculateamounts();
    }
  }
  if (document.querySelector(".seina_patka_y")) {
    seina_patka_y = canvas.querySelectorAll(".seina_patka_y");
    seina_height = 0;
    seina_patka_ybtm = [];
    for (i = 0; i < seina_patka_y.length; i++) {
      title = seina_patka_y[i].title;
      t = title.split(",");
      seina_patka_ybtm.push(parseFloat(t[0]));
    }
    seina_patka_ybtm.sort(function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    console.log(seina_patka_ybtm);
    saumoitus_t_v = [];
    for (var b = 0; b < seina_patka_ybtm.length; b++) {
      sauma_height = 0;
      if (document.querySelector("#settings__saumahanta-ala").checked && document.getElementById("saumoitus__sauma_three").checked) {
        for (i = 0; i < seina_patka_y.length; i++) {
          if (parseFloat(seina_patka_y[i].style.bottom) == seina_patka_ybtm[b] / 5) {
            bb = seina_patka_ybtm[b] / 5;
            console.log("seina_patka_ybtm[b])/5 " + parseFloat(seina_patka_ybtm[b]) / 5);
            console.log("seina_patka_y[i].style.bottom " + parseFloat(seina_patka_y[i].style.bottom));
            let saumat_ = seina_patka_y[i].querySelectorAll(".sauma");
            sauma_height = 0;
            let elems = [];
            hanta = 0;
            h = parseFloat(seina_patka_y[i].style.height);
            console.log(h);
            for (var j = saumat_.length - 1; j >= 0; j--) {
              x = parseFloat(h) - parseFloat(saumat_[j].style.top);
              console.log("x " + x);
              x_cord = saumat_[j].querySelector("input");
              x_cord.remove();
              // x_cord_left = (-1)*parseFloat(x_cord.style.top) + "px";
              // x_cord_width = (-1)*parseFloat(x_cord.style.top) + "px";
              // // x_cord.style.left = x_cord_left;
              // x_cord.style.left = 0;
              // x_cord.style.top = "unset";
              // x_cord.style.width = x_cord_width;
              parent = saumat_[j].parentElement;
              saumat_[j].style.bottom = bb + x + "px";
              saumat_[j].style.top = "unset";
              saumoitus_t_v.push(saumat_[j]);
              elems.push(saumat_[j]);
              // saumoitus_t_v = saumat_[j].cloneNode(true);
              saumat_[j].remove();
              // parent.prepend(clone);
            }
            saumoitus_t_v.sort(function(a, b) {
              if (parseFloat(a.style.bottom) > parseFloat(b.style.bottom)) return 1;
              if (parseFloat(a.style.bottom) < parseFloat(b.style.bottom)) return -1;
              return 0;
            });
            elems.sort(function(a, b) {
              if (parseFloat(a.style.bottom) > parseFloat(b.style.bottom)) return 1;
              if (parseFloat(a.style.bottom) < parseFloat(b.style.bottom)) return -1;
              return 0;
            });
            seina_height += parseFloat(seina_patka_y[i].style.height);
            console.log("seina_height " + seina_height);
            seina_patka_y[i].remove();
          }
        }
        for (var i = saumoitus_t_v.length - 1; i >= 0; i--) {
          document.querySelector(".horizontalrow_saumat").prepend(saumoitus_t_v[i]);
        }
      }
      // if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked)
      else {
        for (i = 0; i < seina_patka_y.length; i++) {
          if (parseFloat(seina_patka_y[i].style.bottom) == seina_patka_ybtm[b] / 5) {
            let saumat_ = seina_patka_y[i].querySelectorAll(".sauma");
            seina_b = seina_patka_ybtm[b] / 5;
            for (s = 0; s < saumat_.length; s++) {
              // if (saumat_[s].querySelector("input") && saumat_[s].classList.contains("sauma_ensi__horizontal") !== true) {
              saumat__bottom_old = parseFloat(saumat_[s].style.bottom);
              saumat__bottom_oldparent = parseFloat(saumat_[s].parentElement.style.bottom);
              this_sauma_height = parseFloat(saumat_[s].querySelector("input").value) / 5;
              current_bottom = saumat__bottom_old + saumat__bottom_oldparent;
              cur_btm = this_sauma_height + sauma_height + seina_b;
              // console.log("this_sauma_height: " + this_sauma_height*5);
              // console.log("saumat__bottom_old: " + saumat__bottom_old);
              // console.log("saumat__bottom_oldparent: " + saumat__bottom_oldparent);
              // console.log("current_bottom: " + current_bottom);
              // console.log("cur_bottom: " + cur_btm);
              // console.log("seina_height: " + seina_height);
              // console.log("sauma_height: " + sauma_height); 
              saumat_[s].style.bottom = cur_btm + "px";
              saumat_[s].style.top = "unset";
              mainparent = saumat_[s].parentElement.parentElement;
              mainparent.append(saumat_[s]);
              sauma_height += this_sauma_height;
            }
            // }
            seina_height += parseFloat(seina_patka_y[i].style.height);
            // console.log(seina_height);
            seina_patka_y[i].remove();
          }
        }
      }
      if (document.getElementById("settings__saumahanta-ala").checked && document.getElementById("saumoitus__sauma_three").checked) {
        calculateamounts();
      }
    }
    if (document.querySelector("#settings__saumahanta-ala").checked && document.getElementById("saumoitus__sauma_three").checked) {
      var h = parseFloat(document.querySelector("#box_h").value);
      henta = luo__lastsauma_horizontal(h);
      henta.style.top = "unset";
      henta.style.bottom = h / 5 + "px";
      document.querySelector(".horizontalrow_saumat").append(henta);
      console.log(saumoitus_t_v);
      vaakahanta_alas = true;
      calculateamounts();
    }
  }
  if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_one").checked) {
    saumat_ = document.querySelectorAll(".sauma__vertical");
    if (saumat_[parseFloat(saumat_.length) - 1].classList.contains("sauma__vertical_hanta") !== true) {
      saumat_[parseFloat(saumat_.length) - 1].classList.add("sauma__vertical_hanta");
      saumat_[parseFloat(saumat_.length) - 1].classList.add("luo__lastsauma_vertical");
    }
    let elems = [];
    w = parseFloat(document.querySelector("#box_w").value) / 5;
    for (var j = saumat_.length - 1; j >= 0; j--) {
      x = parseFloat(w) - parseFloat(saumat_[j].style.right) - 2;
      x_cord = saumat_[j].querySelector("input");
      x_cord.remove();
      // x_cord_left = (-1)*parseFloat(x_cord.style.right) + "px";
      // x_cord_width = (-1)*parseFloat(x_cord.style.right) + "px";
      // // x_cord.style.left = x_cord_left;
      // x_cord.style.left = 0;
      // x_cord.style.right = "unset";
      // x_cord.style.width = x_cord_width;
      parent = saumat_[j].parentElement;
      saumat_[j].style.left = x + "px";
      saumat_[j].style.right = "unset";
      elems.push(saumat_[j]);
      // clone = saumat_[j].cloneNode(true);
      saumat_[j].remove();
      // parent.prepend(clone);
    }
    console.log("elems: " + elems);
    for (var i = elems.length - 1; i >= 0; i--) {
      console.log(elems[i]);
      if (elems[i].classList.contains("sauma__vertical_hanta")) {
        elems[i].style.left = w + "px";
        pystyhanta_oikealle = true;
        forward_prepending = true;
        hanta = elems[i];
        // elems[i].remove();
      }
      else {
        parent.prepend(elems[i]);
      }
      elems[i].classList.remove("sauma__vertical_hanta");
      elems[i].classList.remove("luo__lastsauma_vertical");
    }
    if (forward_prepending === true) {
      parent.append(hanta);
      calculateamounts();
    }
  }
  if (document.getElementById("settings__saumahanta-ala").checked && document.getElementById("saumoitus__sauma_one_v").checked) {
    saumat_ = canvas.querySelectorAll(".sauma__horizontal");
    let elems = [];
    h = parseFloat(document.querySelector("#box_h").value) / 5;
    for (var j = saumat_.length - 1; j >= 0; j--) {
      x = parseFloat(h) - parseFloat(saumat_[j].style.top);
      x_cord = saumat_[j].querySelector("input");
      x_cord.remove();
      // x_cord_left = (-1)*parseFloat(x_cord.style.right) + "px";
      // x_cord_width = (-1)*parseFloat(x_cord.style.right) + "px";
      // // x_cord.style.left = x_cord_left;
      // x_cord.style.left = 0;
      // x_cord.style.right = "unset";
      // x_cord.style.width = x_cord_width;
      parent = saumat_[j].parentElement;
      saumat_[j].style.bottom = x + "px";
      saumat_[j].style.top = "unset";
      elems.push(saumat_[j]);
      // clone = saumat_[j].cloneNode(true);
      saumat_[j].remove();
      // parent.prepend(clone);
    }
    console.log(elems);
    for (var i = elems.length - 1; i >= 0; i--) {
      console.log(elems[i]);
      if (elems[i].classList.contains("sauma__horizontal_last")) {
        elems[i].style.bottom = h + "px";
        vaakahanta_alas = true;
        hanta = elems[i];
        // elems[i].remove();
      }
      else {
        parent.prepend(elems[i]);
      }
      elems[i].classList.remove("sauma__horizontal_last");
      elems[i].classList.remove("luo__lastsauma_horizontal");
    }
    console.log("hanta " + hanta);
    parent.append(hanta);
    calculateamounts();
  }
}
// 10 LASKEE SAUMAMITAT, PÄÄTOIMINTO, V/H
function calculateamounts(aukoitusparam) {
  var canvas = document.querySelector(".canvas");
  var h = document.querySelector("#box_h").value;
  var w = document.querySelector("#box_w").value;
  var s_summ = 0;


  if (aukoitusparam) {
    aukoitus_param = true;
  }
  else {
    s_h = 0;
    s_v = 0;
  }
  sauma = canvas.querySelectorAll(".sauma");
  sauma.forEach(function(j) {
    if (j.querySelector(".sauma__controls")) {
      for (var i = j.querySelectorAll(".sauma__controls").length - 1; i >= 0; i--) {
        j.querySelectorAll(".sauma__controls")[i].remove();
      }
    }
  });

  document.querySelector(".drawarea__controls_four-pysty").innerHTML = "";
  document.querySelector(".drawarea__controls_four-vaaka").innerHTML = "";
  if (document.querySelector(".seina_patka_x") && document.querySelector(".seina_patka_y")) {
    //OK?
    if (document.querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_three").checked && document
      .getElementById("saumoitus__sauma_two").checked) {
      cord_pystysaumat__aukotmukaan();
      cord_vaakasaumat__aukotmukaan();
    }
    //OK
    else if (document.getElementById("saumoitus__sauma_two").checked && document.getElementById("saumoitus__sauma_three").checked) {
      cord_pystysaumat__aukotmukaan();
      cord_vaakasaumat__aukotmukaan();
    }
  }
  else if (document.querySelector(".seina_patka_x")) {
    //OK
    if (document.querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_two").checked) {
      cord_vaakasaumat__aukotyli_tasoitus();
      cord_pystysaumat__aukotmukaan();
    }
    //OK
    else if (document.getElementById("saumoitus__sauma_two").checked) {
      cord_pystysaumat__aukotmukaan();
      cord_vaakasaumat__aukotyli();
    }
  }
  else if (document.querySelector(".seina_patka_y")) {
    //OK
    if (document.querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_three").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotmukaan();
    }
    //OK
    else if (document.getElementById("saumoitus__sauma_three").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotmukaan();
    }
  }
  else {
    //OK
    if (document.getElementById("settings__saumahanta-oik").checked && document.getElementById("saumoitus__sauma_one").checked || (pystyhanta_oikealle === true) && document.getElementById("saumoitus__sauma_one").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotyli();
      // console.log("OIK,YLI");
    }
    //OK
    else if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_one").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotyli();
    }
    //OK
    else if (document.getElementById("settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_one").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotyli_tasoitus();
    }
    else if (document.getElementById("settings__saumahanta-oik").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotyli();
    }
    //OK
    else if (document.getElementById("settings__saumahanta-vas").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotyli();
    }
    //OK
    else if (document.getElementById("settings__saumahanta-tasoitus").checked) {
      cord_pystysaumat__aukotyli();
      cord_vaakasaumat__aukotyli_tasoitus();
    }
  }
  vertical_saumat = canvas.querySelectorAll(".sauma__vertical");
  horizontal_saumat = canvas.querySelectorAll(".sauma__horizontal");
  sauma__verticals = canvas.querySelectorAll(".sauma__vertical");
  sauma__horizontals = canvas.querySelectorAll(".sauma__horizontal");
  if (canvas.querySelector(".sauma__vertical")) {
    for (var i = 0; i < sauma__verticals.length; i++) {
      if (sauma__verticals[i].querySelector(".sauma__controls_del")) {
        sauma__verticals[i].querySelector(".sauma__controls_del").innerHTML = i + 2;
      }
    }
    s_v = i + 1;
  }
  if (canvas.querySelector(".sauma__horizontal")) {
    for (var i = 0; i < sauma__horizontals.length; i++) {
      if (sauma__horizontals[i].querySelector(".sauma__controls_del")) {
        sauma__horizontals[i].querySelector(".sauma__controls_del").innerHTML = String.fromCharCode(65 + parseFloat(i + 1));
      }
    }
    s_h = i + 1;
  }

  sauma = canvas.querySelectorAll(".sauma");
  _newDiv__comment = document.createElement("li");
  _newDiv__comment.innerHTML = "Alkusauma";
  document.querySelector(".drawarea__controls_four-pysty").prepend(_newDiv__comment);
  newDiv__comment_ = document.createElement("li");
  newDiv__comment_.innerHTML = "Alkusauma";
  document.querySelector(".drawarea__controls_four-vaaka").prepend(newDiv__comment_);

  sauma.forEach(function(j) {
    if (j.querySelector(".sauma__controls")) {
      _id=j.getAttribute("id");

      commie = j.querySelector(".sauma__controls_del").cloneNode(true);
      const newDiv__comment = document.createElement("li");
      const newDiv__comment_del = document.createElement("i");
      newDiv__comment_del.classList.add("newDiv__comment_del");
      newDiv__comment.classList.add(_id);
      newDiv__comment.classList.add(_id);
      newDiv__comment.innerHTML = "Sauma ";

      newDiv__comment_del.innerHTML =
        "<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41675 9.91668H2.33341C2.024 9.91668 1.72725 9.79376 1.50846 9.57497C1.28966 9.35618 1.16675 9.05943 1.16675 8.75001V1.75001C1.16675 1.1059 1.28966 1.14384 1.50846 0.925052C1.72725 0.70626 2.024 0.58331 2.33341 0.58331H9.33341V1.75001H2.33341V8.75001H6.41675V7.58334L8.75008 9.33334L6.41675 11.0833V9.91668ZM11.0834 12.25V4.08334H4.66675V7.58334H3.50008V4.08334C3.50008 3.77392 3.623 3.47718 3.84179 3.25839C4.06058 3.03959 4.35733 2.91668 4.66675 2.91668H11.0834C11.3928 2.91668 11.6896 3.03959 11.9084 3.25839C12.1272 3.47718 12.2501 3.77392 12.2501 4.08334V12.25C12.2501 12.5594 12.1272 12.8562 11.9084 13.075C11.6896 13.2938 11.3928 13.4167 11.0834 13.4167H4.66675C4.35733 13.4167 4.06058 13.2938 3.84179 13.075C3.623 12.8562 3.50008 12.5594 3.50008 12.25V11.0833H4.66675V12.25H11.0834Z' fill='#18AB00'/></svg>";
      newDiv__comment.innerHTML = "Sauma ";
      newDiv__comment_del.innerHTML = "";
      newDiv__comment_del.setAttribute("onclick", "obj = this.getAttribute('name');document.querySelector('#'+obj).remove();this.parentElement.remove();");
      newDiv__comment_del.setAttribute("name", _id);
      newDiv__comment.setAttribute("name", _id);
      commie.style.display = "inline-block";
      newDiv__comment.appendChild(commie);
      if(j.classList.contains("sauma__vertical")) {
        document.querySelector(".drawarea__controls_four-pysty").prepend(newDiv__comment);
      }

      if(j.classList.contains("sauma__horizontal")) {
        document.querySelector(".drawarea__controls_four-vaaka").prepend(newDiv__comment);
      }
      

    }
  });

  // _newDiv__comment = document.createElement("li");
  // _newDiv__comment = "Päätysauma";
  // document.querySelector(".drawarea__controls_four-pysty").prepend(_newDiv__comment);
  // newDiv__comment_ = document.createElement("li");
  // newDiv__comment_.innerHTML = "Päätysauma";
  // document.querySelector(".drawarea__controls_four-vaaka").prepend(newDiv__comment_);
}

col_ = 0;
// 11 MÄÄRITTÄÄ AUKKOJEN ALAISEN LEVYTTÄMÄTTÖMÄN ALUEEN, V/H
function aukkojenallapoisto() {
  aukko = canvas.querySelectorAll(".aukko");

  for (var j = 0; j < aukko.length; j++) {
  // aukko = document.querySelector("#aukko6418b82c6594b");

    acord = aukko[j].getAttribute("title");
    a_l = parseFloat(aukko[j].querySelector(".aukko_lcord").innerHTML);
    a_r = parseFloat(aukko[j].querySelector(".aukko_rcord").innerHTML);
    a_b = parseFloat(aukko[j].querySelector(".aukko_bcord").innerHTML);
    a_t = parseFloat(aukko[j].querySelector(".aukko_tcord").innerHTML);


    levy=canvas.querySelectorAll(".levy");


    for (var i = 0; i < levy.length; i++) {
      lcord = levy[i].getAttribute("title");
      l_l = parseFloat(lcord.split(",")[3]);
      l_r = parseFloat(lcord.split(",")[3]) + parseFloat(lcord.split(",")[0]);
      l_b = parseFloat(lcord.split(",")[2]);
      l_t = parseFloat(lcord.split(",")[1]) + parseFloat(lcord.split(",")[2]);
      
      // SPLT IF MATCHES INSIDE Y     
      if(a_l <= l_l && a_r >= l_r && a_b >= l_b && a_t <= l_t) {
         low_top = a_b-l_b;
         up_top = l_t-a_t;
         levyt = document.querySelector(".levyt");

         w=l_r-l_l;
         dex = "Yhdistettylevy";
         col_ += 1;
         levyt.append(luo__levy(w,low_top, dex, col_, l_b, l_l));
         levyt.append(luo__levy(w,up_top, dex, col_, a_t, l_l));

         levy[i].remove();
         
      }

      // SPLT IF MATCHES INSIDE X
      if(a_l >= l_l && a_r <= l_r && a_b <= l_b && a_t >= l_t) {
         l_left = a_l-l_l;
         r_left = l_r-a_r;
         levyt = document.querySelector(".levyt");
         h=l_t-l_b;
         dex = "Yhdistettylevy";
         col_ += 1;
         levyt.append(luo__levy(l_left,h, dex, col_, l_b, l_l));
         levyt.append(luo__levy(r_left,h, dex, col_, l_b, a_r));
         
        levy[i].remove();
      }
    
      // DEL IF MATCHES COMPLETELY
      if(a_l == l_l && a_r == l_r && a_b == l_b && a_t == l_t) {
        levy[i].remove();
      }


      // DEL IF INSIDE
      if(a_l <= l_l && a_r >= l_r && a_b <= l_b && a_t >= l_t) {
        levy[i].remove();
      }




      // REDUCE FROM LEFT OLD
      // if(a_l >= l_l && l_b <= a_t-10) {
      //   if(a_r <= l_r) {
      //     console.log("LL: " + l_l + ", LR: " + l_r + ", LB: "+ l_b + ", LT: "+ l_t);
      //     console.log("AL: " + a_l + ", AR: " + a_r + ", AB: "+ a_b + ", AT: "+ a_t);
      //     erotus = parseFloat(l_r)-parseFloat(l_l);
      //     inversed_erotus = parseFloat(a_r)-parseFloat(l_l);

      //     levy[i].style.width = parseFloat(levy[i].style.width) - inversed_erotus/5 + "px";
      //     levy[i].style.left = parseFloat(levy[i].style.left) + inversed_erotus/5 +"px";
      //   }
      // }

      // DEL FROM LEFT
      if(a_t >= l_t && a_l <= l_l && a_r <= l_r && a_b <= l_t && a_r >= l_l && a_b <= l_b+15 || a_t >= l_t && a_l <= l_l+15 && a_r <= l_r && a_b <= l_t && a_r >= l_l && a_b <= l_b+15) {
        erotus = parseFloat(l_r) - parseFloat(a_r);
        // inversed_erotus = parseFloat(a_r)-parseFloat(l_l);


        levy[i].style.width = erotus/5 + "px";
        levy[i].style.left = parseFloat(a_l/5) + parseFloat((a_r-a_l)/5) +"px";
      }

      // DEL FROM UP
      if(a_t >= l_t && a_l <= l_l && a_r >= l_r && a_b <= l_t || a_t >= l_t+15 && a_l <= l_l && a_r >= l_r && a_b <= l_t) {
        erotus = parseFloat(l_t) - parseFloat(a_b);
        levy[i].style.height = parseFloat(levy[i].style.height) - erotus/5 + "px";
      }

      

      // DEL FROM BOTTOM
      if(a_t <= l_t && a_l <= l_l+5 && a_r >= l_r+5 && a_t <= l_t && a_t >= l_b || a_t <= l_t && a_l <= l_l && a_r >= l_r && a_t <= l_t && a_t >= l_b || a_t <= l_t+15 && a_l <= l_l && a_r >= l_r && a_t <= l_t && a_t >= l_b || a_t <= l_t && a_l <= l_l+20 && a_r >= l_r+20 && a_t <= l_t && a_t >= l_b) {
        erotus = parseFloat(l_t) - parseFloat(a_t);
        levy[i].style.height = erotus/5 + "px";
        levy[i].style.bottom = parseFloat(a_b/5) + parseFloat((a_t-a_b)/5) +"px";
      }


      // DEL HUKKA RIGHT
      if(a_b <= l_b+15 && a_l >= l_l && a_r >= l_r && a_t >= l_t && a_l <= l_r || a_b <= l_b+15 && a_l >= l_l && a_r >= l_r && a_t >= l_t && a_l <= l_r+15) {
        erotus = parseFloat(l_r) - parseFloat(a_l);
        // inversed_erotus = parseFloat(a_r)-parseFloat(l_l);
        levy[i].style.width = parseFloat(levy[i].style.width) - erotus/5 + "px";
      }


      // DEL SMOL
      if(parseFloat(levy[i].style.height) < 2 || parseFloat(levy[i].style.width) < 2) {
        levy[i].remove();
      }


      // DEL IF INSIDE
      if(a_l <= l_l && a_r >= l_r && a_b <= l_b && a_t >= l_t) {
        levy[i].remove();
      }

      
      coolcord_w = parseFloat(levy[i].style.width) * 5;
      coolcord_h = parseFloat(levy[i].style.height) * 5;
      coolcord_b = parseFloat(levy[i].style.bottom) * 5;
      coolcord_l = parseFloat(levy[i].style.left) * 5;

      levy[i].setAttribute("title", (parseFloat(coolcord_w)-5)+","+(parseFloat(coolcord_h)-5)+","+coolcord_b+","+coolcord_l);
      levy[i].querySelector("i").innerHTML = (parseFloat(coolcord_w)-5)+"x"+(parseFloat(coolcord_h)-5);


    }
   }
}
////// 12 - 19 PYSTY
// 12 MÄÄRITTÄÄ PYSTYSAUMAT AUKKOJEN YLI, V
function pystysaumat__aukkojenyli() {
  var w = parseFloat(document.getElementById('box_w').value);
  if (document.getElementById("settings__sauma_pysty").checked) {
    sauma__interval_vertical = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
    sauma__interval_horizontal = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
  }
  if (document.getElementById("settings__sauma_vaaka").checked) {
    sauma__interval_vertical = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
    sauma__interval_horizontal = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
  }
  // if (document.getElementById("settings__saumahanta-tasoitus").checked) {
  //   numOfDivs__vertical+=1;
  // }
  var newrow_horizontal = document.createElement("div");
  var newrow_vertical = document.createElement("div");
  var canvas = document.querySelector("#box-wrapper > main");
  var aukkos = document.getElementsByClassName("aukko");
  myDivs_horizontal = [],
    myDivs_vertical = [],
    i = 0;

  if (document.querySelector(".saumat__grandrow")) {
    saumat = document.querySelector(".saumat__grandrow");
  }
  else {
    saumat = document.createElement("div");
    saumat.classList.add("saumat__grandrow");
    canvas.appendChild(saumat);
  }
  saumat.appendChild(newrow_vertical);
  if (document.getElementById("settings__saumahanta-oik").checked || document.getElementById("settings__saumahanta-vas").checked) {
    var numOfDivs__vertical;
    numOfDivs__vertical = Math.floor(w / sauma__interval_vertical);
    for (i = 0; i < numOfDivs__vertical; i++) {
      newrow_vertical.classList.add("verticalrow_saumat");
      // newrow_vertical.style.width = w/5 + "px";
      newrow_vertical.append(luo__sauma_vertical(w, "", "", i));
    }
    // if(newrow_vertical == 0) {
    newrow_vertical.append(luo__lastsauma_vertical(canvas));
    // }
  }
  else if (document.querySelector("#settings__saumahanta-tasoitus").checked) {
    numOfDivs__vertical = Math.ceil(w / sauma__interval_vertical);
    v_tas_kaava1 = Math.ceil(w / sauma__interval_vertical);
    area__modcount = (parseFloat(w) / 25);
    sauma__modcount = Math.floor(area__modcount / v_tas_kaava1);
    v_tas_li = parseFloat(sauma__modcount) * 25;
    // console.log("numOfDivs__vertical " + numOfDivs__vertical);
    // console.log("v_tas_kaava1 " + v_tas_kaava1);
    // console.log("area__modcount " + area__modcount);
    // console.log("sauma__modcount " + sauma__modcount);
    // console.log("tas_li " + v_tas_li);
    for (i = 0; i < numOfDivs__vertical; i++) {
      newrow_vertical.classList.add("verticalrow_saumat");
      newrow_vertical.append(luo__sauma_vertical(w, v_tas_li, i, i));
    }
    sauma = canvas.querySelectorAll(".sauma__vertical");
    if (canvas.querySelector(".sauma__vertical")) {
      distance = sauma[0].parentElement;
      viim_sauma = luo__lastsauma_vertical(distance);
      distance.append(viim_sauma);
      sauma = canvas.querySelectorAll(".sauma__vertical");
    }
    // newrow_vertical.append(luo__lastsauma_vertical(newrow_vertical));
  }
  // newrow_vertical.append(luo__lastsauma_vertical(canvas));
}
// 13 MÄÄRITTÄÄ PYSTYSAUMAT AUKKOJEN MUKAAN, V
function pystysaumat__aukkojenmukaan() {
  var canvas = document.querySelector("#box-wrapper > main");
  if (canvas.querySelector(".aukko")) {
    h = parseFloat(document.querySelector("#box_h").value);
    w = parseFloat(document.querySelector("#box_w").value);
    var sauma__interval_vertical, sauma__interval_horizontal;
    if (document.getElementById("settings__sauma_pysty").checked) {
      sauma__interval_vertical = document.querySelector("#settings__sauma_interval_x").value;
      sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_y").value;
    }
    if (document.getElementById("settings__sauma_vaaka").checked) {
      sauma__interval_vertical = document.querySelector("#settings__sauma_interval_y").value;
      sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_x").value;
    }
    var newrow_horizontal = document.createElement("div");
    var newrow_vertical = document.createElement("div");
    var canvas = document.querySelector("#box-wrapper > main");
    var aukkos = document.getElementsByClassName("aukko");
    myDivs_horizontal = [],
      myDivs_vertical = [],
      i = 0;
    var verticalrow_saumat = document.createElement("div");
    verticalrow_saumat.classList.add("verticalrow_saumat");

    if (canvas.querySelector(".saumat__grandrow")) {
      saumat = canvas.querySelector(".saumat__grandrow");
    }
    else {
      saumat = document.createElement("div");
      saumat.classList.add("saumat__grandrow");
      canvas.appendChild(saumat);
    }
    if (canvas.querySelector(".verticalrow_saumat")) {
      verticalrow_saumat = canvas.querySelector(".verticalrow_saumat");
    }
    else {
      verticalrow_saumat = document.createElement("div");
      verticalrow_saumat.classList.add("verticalrow_saumat");
      saumat.appendChild(verticalrow_saumat);
    }
    v_aukkos = canvas.querySelectorAll(".aukko");
    // var aukko5, aukko4, aukko3, aukko2, aukko1;
    v_l = v_aukkos.length;
    if (v_l == 1) {
      aukko1 = v_aukkos[0];
    }
    else if (v_l == 2) {
      aukko1 = v_aukkos[1];
      aukko2 = v_aukkos[0];
    }
    else if (v_l == 3) {
      aukko1 = v_aukkos[0];
      aukko2 = v_aukkos[1];
      aukko3 = v_aukkos[2];
    }
    else if (v_l == 4) {
      aukko1 = v_aukkos[0];
      aukko2 = v_aukkos[1];
      aukko3 = v_aukkos[2];
      aukko4 = v_aukkos[3];
    }
    else if (v_l == 5) {
      aukko1 = v_aukkos[0];
      aukko2 = v_aukkos[1];
      aukko3 = v_aukkos[2];
      aukko4 = v_aukkos[3];
      aukko5 = v_aukkos[4];
    }
    if (aukko1) {
      areas = new Array();
      
      vertical_aukkos = new Array();
      for (var i = v_aukkos.length - 1; i >= 0; i--) {
        v_area = v_aukkos[i];
        vertical_aukkos.push(v_area);
      }
      vertical_aukkos.sort(function(a, b) {
        if (parseFloat(a.style.left) > parseFloat(b.style.left)) return 1;
        if (parseFloat(a.style.left) < parseFloat(b.style.left)) return -1;
        return 0;
      });
      a_summ = 0;
      for (var i = 0; i < vertical_aukkos.length; i++) {
        vertical_aukkos[i].style.opacity = "0.5";
        // area_left = parseFloat(vertical_aukkos[i].querySelector(".newDiv__x").innerText.replace("X: ",""));
        l_percent = parseFloat(vertical_aukkos[i].querySelector(".aukko_lcord").innerHTML)-a_summ;
        console.log("l_percent " + l_percent);
        console.log("l_percent+v_area " + l_percent);
        v_area =  parseFloat(vertical_aukkos[i].querySelector(".aukko_rcord").innerHTML) -  parseFloat(vertical_aukkos[i].querySelector(".aukko_lcord").innerHTML);
        // area_right = 100;
        // a_summ = area_left + v_area;
        
        if (parseFloat(l_percent) > 0) {
          areas.push(l_percent);
        }
        if (parseFloat(v_area) > 0) {
          areas.push(v_area);
        }
        len=parseFloat(vertical_aukkos.length)-1;
        if(i == len) {
           area_right = parseFloat(w) - parseFloat(vertical_aukkos[i].querySelector(".aukko_rcord").innerHTML);
           areas.push(area_right);
           console.log("AREA RIGHT " + area_right);
        }
       a_summ=parseFloat(vertical_aukkos[i].querySelector(".aukko_rcord").innerHTML);
        
       
      }
      for (var j = 0; j < areas.length; j++) {
        if (document.querySelector("#settings__saumahanta-vas").checked || document.querySelector("#settings__saumahanta-oik").checked) {
          var newrow_vertical = document.createElement("div");
          numOfDivs__vertical = Math.trunc((areas[j]) / sauma__interval_vertical);
          // if(document.getElementById("settings__saumahanta-tasoitus").checked) {
          //   numOfDivs__vertical = Math.trunc(areas[j] / sauma__interval_vertical) +1;
          // }
          s_v = 0;
          s_h = 0;
          g = 0;
          tas_li = 0;
          newrow_vertical.classList.add("newrow_vertical");
          newrow_vertical.classList.add("seina_patka" + j);
          newrow_vertical.classList.add("seina_patka_x");
          newrow_vertical.style.width = parseFloat(areas[j]) / 5 + "px";
          newrow_vertical.setAttribute('id', "verticalrow_saumat" + String(areas[j]).replace(",", "-").replace(" ", "-"));
          verticalrow_saumat.append(newrow_vertical);
          for (var g = 0; g < numOfDivs__vertical; g++) {
            // //console.log(newrow_vertical);
            newrow_vertical.classList.add("verticalrow_saumat");
            //newrow_vertical.style.width = w/5 + "px";
            newrow_vertical.append(luo__sauma_vertical(areas[j], g, "", g));
          }
          // console.log("HÄNTÄ VERTICAL");
          newrow_vertical.append(luo__lastsauma_vertical(newrow_vertical));
        }
        else if (document.querySelector("#settings__saumahanta-tasoitus").checked) {
          var newrow_vertical = document.createElement("div");
          numOfDivs__vertical = Math.trunc((areas[j]) / sauma__interval_vertical);
          newrow_vertical.classList.add("newrow_vertical");
          newrow_vertical.classList.add("seina_patka" + j);
          newrow_vertical.classList.add("seina_patka_x");
          newrow_vertical.style.width = areas[j] / 5 + "px";
          newrow_vertical.setAttribute('id', "verticalrow_saumat" + String(areas[j]).replace(",", "-").replace(" ", "-"));
          verticalrow_saumat.append(newrow_vertical);
          numOfDivs__vertical = Math.ceil(areas[j] / sauma__interval_vertical);
          // Itaratioiden määrä
          area__modcount = Math.ceil(parseFloat(areas[j]) / 25);
          // Moduuleita areassa
          sauma__modcount = Math.floor(area__modcount / numOfDivs__vertical);
          //Moduulimittojen määrä?
          tas_li = parseFloat(sauma__modcount) * 25;
          s_v = 0;
          for (i = 0; i < numOfDivs__vertical; i++) {
            newrow_vertical.classList.add("verticalrow_saumat");
            newrow_vertical.append(luo__sauma_vertical(areas[j], tas_li, i, i));
          }
          newrow_vertical.append(luo__lastsauma_vertical(newrow_vertical));
        }
      }
    }
    // verticalrow_saumat = document.createElement("div");
    //   verticalrow_saumat.classList.add("verticalrow_saumat");
    //   saumat.appendChild(verticalrow_saumat);
  }
  else {
    document.querySelector("#saumoitus__sauma_one").checked = true;
    pystysaumat__aukkojenyli();
  }
}
// 14 LUO YKSITTÄISEN PYSTYSAUMAN, V
function luo__sauma_vertical(aukko, tas_li, modcount, sauma_name) {
  s_v += 1;
  item = "";
  var sauma__interval_horis_vontal = parseFloat(document.querySelector("#settings__sauma_interval_y").value) / 5;
  var nhs_vrtl = document.querySelector(".newrow_vertical");
  var sauma__interval_vertical;
  if (document.getElementById("settings__sauma_pysty").checked) {
    sauma__interval_vertical = document.querySelector("#settings__sauma_interval_x").value;
  }
  if (document.getElementById("settings__sauma_vaaka").checked) {
    sauma__interval_vertical = document.querySelector("#settings__sauma_interval_y").value;
  }
  const widthBox = document.querySelector('#box_w').value;
  const w = document.querySelector('#box_w').value;
  const between_sauma = sauma__interval_vertical / widthBox;
  const canvasWidth = document.querySelector('#box-wrapper > main').offsetWidth;
  const sauma = document.createElement("div");
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls = document.createElement("div");
  const sauma__controls_del = document.createElement("div");
  const sauma__controls_type = document.createElement("input");
  const newDiv__comment = document.createElement("li");
  const newDiv__comment_del = document.createElement("i");
  const newrow_horis_vontal = document.createElement("div");
  let id = "sauma" + Math.random().toString(16).slice(2).toLowerCase().toLowerCase();
  sauma.dataset.no = s_v;
  sauma.classList.add("sauma");
  sauma.classList.add("luo__sauma_vertical");
  sauma.classList.add("sauma__vertical");
  sauma__control.classList.add("sauma__vertical_ctrl");
  sauma__control.classList.add("sauma__control");
  sauma__control.classList.add("sauma__vertical_ctrl-lefted");
  sauma__controls_type.classList.add("lineinput");
  sauma__control_down.classList.add("sauma__vertical_ctrldown");
  newDiv__comment_del.classList.add("newDiv__comment_del");
  sauma__controls.classList.add("sauma__controls");
  sauma__controls_del.classList.add("sauma__controls_del");
  newrow_horis_vontal.classList.add("newrow_vertical");
  sauma__control_down.classList.add("sauma__control_down");
  sauma__control_down.classList.add(id);
  sauma__control.classList.add(id);
  // newDiv__comment.classList.add(id);
  sauma.classList.add(id);
  // newDiv__comment.classList.add(id);
  sauma__controls.classList.add(id);
  sauma__controls_del.classList.add(id);
  sauma__controls_type.classList.add(id);
  sauma.innerHTML = "";
  sauma__control.value = "0";
  sauma__controls.innerHTML = "";
  // newDiv__comment.innerHTML = "Sauma";
  // newDiv__comment_del.innerHTML =
  //   "<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41675 9.91668H2.33341C2.024 9.91668 1.72725 9.79376 1.50846 9.57497C1.28966 9.35618 1.16675 9.05943 1.16675 8.75001V1.75001C1.16675 1.1059 1.28966 1.14384 1.50846 0.925052C1.72725 0.70626 2.024 0.58331 2.33341 0.58331H9.33341V1.75001H2.33341V8.75001H6.41675V7.58334L8.75008 9.33334L6.41675 11.0833V9.91668ZM11.0834 12.25V4.08334H4.66675V7.58334H3.50008V4.08334C3.50008 3.77392 3.623 3.47718 3.84179 3.25839C4.06058 3.03959 4.35733 2.91668 4.66675 2.91668H11.0834C11.3928 2.91668 11.6896 3.03959 11.9084 3.25839C12.1272 3.47718 12.2501 3.77392 12.2501 4.08334V12.25C12.2501 12.5594 12.1272 12.8562 11.9084 13.075C11.6896 13.2938 11.3928 13.4167 11.0834 13.4167H4.66675C4.35733 13.4167 4.06058 13.2938 3.84179 13.075C3.623 12.8562 3.50008 12.5594 3.50008 12.25V11.0833H4.66675V12.25H11.0834Z' fill='#18AB00'/></svg>";
  sauma__control_down.innerHTML = "0";
  // newDiv__comment.innerHTML = "Sauma ";
  // newDiv__comment_del.innerHTML = "";
  sauma__control.value = sauma__interval_vertical;
  sauma__control.setAttribute("data-from", parseFloat(sauma__interval_vertical));
  sauma__control_down.innerHTML = parseFloat(sauma__interval_vertical) - 10;
  sauma__controls_type.value = "ST1";
  sauma__controls_type.type = "text";
  // newDiv__comment.setAttribute("name", id);
  

  sauma__control.setAttribute("name", id);
  sauma__controls.setAttribute("name", id);
  sauma__controls_del.setAttribute("name", id);
  sauma__controls_type.setAttribute("name", id);
  sauma.setAttribute("id", id);
  sauma.setAttribute("name", id);
  sauma__control_down.setAttribute("name", id);
  sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
  sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
  sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
  // sauma__control.setAttribute("onclick", "document.querySelector("+id+").remove();this.parentElement.style.opacity = '0';");
  sauma.setAttribute("onclick", "");
  sauma.style.position = 'absolute';
  if (document.querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_three").checked && document.getElementById(
      "saumoitus__sauma_two").checked) {
    // console.log("P/V, TASOITUS, PVA");
    leveys = tas_li;
    // sauma__control.style.left = s_v * parseFloat(leveys/5) + "px";
    sauma.style.left = modcount * parseFloat(leveys / 5) + "px";
    sauma__controls_del.style.marginLeft = "0px";
    sauma__control_down.style.left = "0px";
    //sauma__control.style.width = "0px";
    sauma__control_down.style.width = "0px";
    sauma.style.width = "0px";
    // sauma__control.style.top = '-50%';
    sauma__control.value = leveys;
    sauma__control_down.innerHTML = leveys - 10;
    sauma__control.setAttribute("data-from", parseFloat(leveys));
  }
  else if (document.querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_one").checked || document
    .querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_three").checked) {
    // console.log("P/V, TASOITUS, AY");
    // saumcount = Math.ceil(w/sauma__interval_vertical);
    leveys = parseFloat(tas_li);
    // // sauma__control.style.left = s_v * parseFloat(leveys/5) + "px";
    // sauma.style.left = s_v * parseFloat(leveys/5) + "px";
    // sauma__controls_del.style.marginLeft ="0px";
    // sauma__control_down.style.left ="0px";
    // //sauma__control.style.width = "0px";
    // sauma__control_down.style.width = "0px";
    // sauma.style.width =  "0px";
    // // sauma__control.style.top = '-50%';
    // sauma__control.value=leveys;
    // sauma__control_down.innerHTML=leveys-10;
    // sauma__control.setAttribute("data-from", parseFloat(leveys));
    sauma.style.left = modcount * parseFloat(leveys / 5) + "px";
    sauma__controls_del.style.marginLeft = "0px";
    sauma__control_down.style.left = "0px";
    sauma__control_down.style.width = "0px";
    sauma.style.width = "0px";
    sauma__control.value = leveys;
    sauma__control_down.innerHTML = leveys - 10;
    sauma__control.setAttribute("data-from", parseFloat(leveys));
  }
  else if (document.querySelector("#settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_two").checked) {
    // console.log("P/V, TASOITUS, PA");
    saumcount = Math.ceil(parseFloat(aukko) / sauma__interval_vertical);
    leveys = parseFloat(tas_li);
    // sauma__control.style.left = s_v * parseFloat(leveys/5) + "px";
    sauma.style.left = modcount * parseFloat(leveys / 5) + "px";
    sauma__controls_del.style.marginLeft = "0px";
    sauma__control_down.style.left = "0px";
    //sauma__control.style.width = "0px";
    sauma__control_down.style.width = "0px";
    sauma.style.width = "0px";
    // sauma__control.style.top = '-50%';
    sauma__control.value = leveys;
    sauma__control_down.innerHTML = leveys - 10;
    sauma__control.setAttribute("data-from", parseFloat(leveys));
  }
  else if (document.getElementById("settings__saumahanta-oik").checked && document.getElementById("saumoitus__sauma_one").checked || document.getElementById(
      "settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_one").checked) {
    if (item) {
      sauma.style.left = item;
      sauma__control.style.transform = 'translate(-100%)';
      if (last) {
        sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
        sauma__control.dataset.from = parseFloat(sauma__control.value);
      }
      else {
        sauma__control.value = parseInt((item / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
        sauma__control.dataset.from = parseInt((item / 100) * widthBox);
      }
    }
    else {
      sauma.style.left = (s_v * parseFloat(sauma__interval_vertical / 5)) + 'px';
      //sauma__control.style.width = (s_v * parseFloat(sauma__interval_vertical/5)) + 'px';
      sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
      sauma__control.dataset.from = parseInt((item / 100) * widthBox);
    }
    //sauma__control.style.width = between_sauma * canvasWidth + 'px';
    sauma__control.style.left = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.left = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.width = between_sauma * canvasWidth + 'px';
  }
  else if (document.getElementById("settings__saumahanta-oik").checked && document.getElementById("saumoitus__sauma_two").checked || document.getElementById(
      "settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_two").checked) {
    if (item) {
      sauma.style.left = item;
      sauma__control.style.transform = 'translate(-100%)';
      if (last) {
        sauma__control.value = parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox));
      }
      else {
        sauma__control.value = parseInt((item / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox));
      }
    }
    else {
      sauma.style.left = (s_v * parseFloat(sauma__interval_vertical / 5)) + 'px';
      //sauma__control.style.width = (s_v * parseFloat(sauma__interval_vertical/5)) + 'px';
    }
    //sauma__control.style.width = between_sauma * canvasWidth + 'px';
    sauma__control.style.left = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.left = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.width = between_sauma * canvasWidth + 'px';
  }
  else if (document.getElementById("settings__saumahanta-oik").checked && document.getElementById("saumoitus__sauma_three").checked || document.getElementById(
      "settings__saumahanta-tasoitus").checked && document.getElementById("saumoitus__sauma_three").checked) {
    if (item) {
      sauma.style.left = item;
      sauma__control.style.transform = 'translate(-100%)';
      if (last) {
        sauma__control.value = parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox));
      }
      else {
        sauma__control.value = parseInt((item / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox));
      }
    }
    else {
      sauma.style.left = (s_v * parseFloat(sauma__interval_vertical / 5)) + 'px';
      //sauma__control.style.width = (s_v * parseFloat(sauma__interval_vertical/5)) + 'px';
    }
    //sauma__control.style.width = between_sauma * canvasWidth + 'px';
    sauma__control.style.left = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.left = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.width = between_sauma * canvasWidth + 'px';
  }
  else if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_one").checked) {
    if (item) {
      sauma.style.right = item;
      sauma__control.style.transform = 'translate(-100%)';
      if (last) {
        sauma__control.value = parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox));
      }
      else {
        sauma__control.value = parseInt((item / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox));
      }
    }
    else {
      sauma.style.right = (s_v * parseFloat(sauma__interval_vertical / 5)) + 'px';
      //sauma__control.style.width = (s_v * parseFloat(sauma__interval_vertical/5)) + 'px';
    }
    //sauma__control.style.width = between_sauma * canvasWidth + 'px';
    sauma__control.style.right = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.right = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.width = between_sauma * canvasWidth + 'px';
  }
  else if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_two").checked) {
    if (item) {
      sauma.style.right = item;
      sauma__control.style.transform = 'translate(-100%)';
      if (last) {
        sauma__control.value = parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox));
      }
      else {
        sauma__control.value = parseInt((item / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox));
      }
    }
    else {
      sauma.style.right = (s_v * parseFloat(sauma__interval_vertical / 5)) + 'px';
      //sauma__control.style.width = (s_v * parseFloat(sauma__interval_vertical/5)) + 'px';
    }
    //sauma__control.style.width = between_sauma * canvasWidth + 'px';
    sauma__control.style.right = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.right = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.width = between_sauma * canvasWidth + 'px';
  }
  else if (document.getElementById("settings__saumahanta-vas").checked && document.getElementById("saumoitus__sauma_three").checked) {
    if (item) {
      sauma.style.right = item;
      sauma__control.style.transform = 'translate(-100%)';
      if (last) {
        sauma__control.value = parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox) - parseInt((+last.replace('px', '') / 100) * widthBox));
      }
      else {
        sauma__control.value = parseInt((item / 100) * widthBox);
        sauma__control.setAttribute("data-from", parseInt((item / 100) * widthBox));
      }
    }
    else {
      sauma.style.right = (s_v * parseFloat(sauma__interval_vertical / 5)) + 'px';
      //sauma__control.style.width = (s_v * parseFloat(sauma__interval_vertical/5)) + 'px';
    }
    //sauma__control.style.width = between_sauma * canvasWidth + 'px';
    sauma__control.style.right = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.right = (-1) * between_sauma * canvasWidth + 'px';
    sauma__control_down.style.width = between_sauma * canvasWidth + 'px';
  }
  else {
    alert("Nyt on joku perseillään. Ota yhteyttä Koodariin");
  }
  document.querySelector(".drawarea__controls_four-pysty").prepend(newDiv__comment);
  return sauma;
}
// 15 LUO PYSTYHÄNNÄN, V
function luo__lastsauma_vertical(aukko) {
  s_v += 1;
  let saumas = document.querySelectorAll(".sauma__vertical");
  var h = document.querySelector("#box_h").value;
  var w = document.querySelector("#box_w").value;
  let ctrl = document.querySelectorAll(".sauma__vertical_ctrl");
  summ = 0;
  ctrl.forEach(function(item) {
    summ += parseFloat(item.value);
  });
  const sauma = document.createElement("div");
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls = document.createElement("div");
  const sauma__controls_del = document.createElement("div");
  const sauma__controls_type = document.createElement("input");
  const newDiv__comment = document.createElement("li");
  const newDiv__comment_del = document.createElement("i");
  const newrow_vertical = document.createElement("div");
  sauma.dataset.no = s_v;
  sauma.className = "sauma";
  sauma.classList.add("sauma__vertical");
  sauma.classList.add("sauma__vertical_hanta");
  sauma.classList.add("luo__lastsauma_vertical");
  // sauma.innerHTML = "";
  let id = "lastsauma_vertical" + Math.random().toString(16).slice(2).toLowerCase().toLowerCase();
  // sauma.style.marginLeft = (parseFloat(sauma__interval_vertical) - 1.5) + 'px';
  // sauma__control.value = "0";
  sauma__controls.innerHTML = "";
  sauma__control.classList.add("sauma__vertical_ctrl");
  sauma__control.classList.add("luo__lastsauma_vertical");
  sauma__control.classList.add("sauma__control");
  sauma__control.classList.add("sauma__vertical_ctrl-lefted")
  sauma__control.classList.add(id);
  sauma__control.setAttribute("name", id);
  // if (saumaCtrlsList.length >= 1) {
  //   sauma__control.style.top = +saumaCtrlsList[saumaCtrlsList.length - 1].style.top.replace('%', '') + 5 + '%';
  // } else if (saumaCtrlsList.length == 0) {
  //   sauma__control.style.top = '-50%';
  // }
  // truesz = parseFloat(w)-summ;
  if (aukko && document.querySelector("#saumoitus__sauma_two").checked) {
    // console.log("aukko" + aukko);
    if (aukko.querySelectorAll(".sauma__vertical") !== true) {
      //console.log("parseFloat(aukko.style.width) " + parseFloat(aukko.style.width));
      truesz = parseFloat(aukko.style.width) + "px";
      sauma__control.value = truesz * 5;
      sauma__control_down.style.width = truesz * 5 + "px";
      sauma__control_down.innerHTML = truesz * 5 - 10;
      if (document.querySelector("#settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked) {
        sauma.style.left = truesz;
      }
      else {
        sauma.style.right = truesz;
      }
    }
    else if (parseFloat(aukko.style.width) > 5 && aukko.querySelectorAll(".sauma__vertical")) {
      saumas = aukko.querySelectorAll(".sauma__vertical");
      ctrl = aukko.querySelectorAll(".sauma__vertical_ctrl");
      saumacount = Math.trunc((parseFloat(aukko.style.width) * 5) / summ) * summ;
      last_sauma_size = (parseFloat(aukko.style.width) * 5) - saumacount;
      truesz = last_sauma_size;
      if (document.querySelector("#settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked) {
        // sauma__control.style.left = summ/5 + "px";
        sauma.style.left = ((parseFloat(aukko.style.width) * 5) - 15) / 5 + "px";
        // sauma__controls_del.style.marginLeft =  w-last_sauma_size/5 + "px";
        // sauma__control_down.style.left =  w-last_sauma_size/5 + "px";
        //sauma__control.style.width = truesz/5 + "px";
        sauma__control_down.style.width = truesz / 5 + "px";
        sauma__control_down.style.left = (-1) * (truesz / 5) + "px";
        sauma__controls.style.left = (-1) * (truesz / 5) + "px";
        // sauma.style.width = truesz/5 + "px";
        // sauma__control.style.top = '-50%';
        sauma__controls_del.style.float = 'right';
        sauma__control.value = truesz;
        sauma__control_down.innerHTML = truesz - 10;
      }
      else if (document.querySelector("#settings__saumahanta-vas").checked) {
        // sauma.style.right = (w-15)/5 + "px";
        sauma.style.left = "0";
        // sauma__control.style.left = last_sauma_size/5 + "px";
        // sauma.style.left = last_sauma_size/5 + "px";
        // sauma__controls_del.style.marginLeft ="0px";
        // sauma__control_down.style.left ="0px";
        //sauma__control.style.width = truesz/5 + "px";
        sauma__control_down.style.width = truesz / 5 + "px";
        sauma.style.width = truesz / 5 + "px";
        // sauma__control.style.top = '-50%';
        sauma__control.value = truesz;
        sauma__control_down.innerHTML = truesz - 10;
        let ctrl_ = document.querySelectorAll(".sauma__vertical");
        ctrl_.forEach(function(item_) {
          item_.style.marginLeft = parseFloat(last_sauma_size / 5) + "px";
        });
      }
    }
  }
  else if (aukko && document.querySelector("#saumoitus__sauma_three").checked) {
    let _ctrl = document.querySelectorAll(".sauma__vertical_ctrl");
    summ = 0;
    _ctrl.forEach(function(item) {
      summ += parseFloat(item.innerText);
    });
    if (document.querySelector("#settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked) {
      saumacount = Math.trunc((parseFloat(w - summ) * 5) / summ) * summ;
      last_sauma_size = (parseFloat(w - summ) * 5) - saumacount;
      truesz = (parseFloat(w - summ));
      // sauma__control.style.left = summ/5 + "px";
      sauma.style.left = parseFloat(w) / 5 + "px";
      // sauma.style.left = ((parseFloat(w-summ))-15)/5 + "px";
      // sauma__controls_del.style.marginLeft =  w-last_sauma_size/5 + "px";
      // sauma__control_down.style.left =  w-last_sauma_size/5 + "px";
      //sauma__control.style.width = truesz/5 + "px";
      sauma__control_down.style.width = truesz / 5 + "px";
      sauma__control_down.style.left = (-1) * (truesz / 5) + "px";
      sauma__controls.style.left = (-1) * (truesz / 5) + "px";
      // sauma.style.width = truesz/5 + "px";
      // sauma__control.style.top = '-50%';
      sauma__controls_del.style.float = 'right';
      sauma__control.value = truesz;
      sauma__control_down.innerHTML = truesz - 10;
    }
    else if (document.querySelector("#settings__saumahanta-vas").checked) {
      saumacount = Math.trunc((parseFloat(w - summ) * 5) / summ) * summ;
      last_sauma_size = (parseFloat(w - summ) * 5) - saumacount;
      truesz = (parseFloat(w - summ));
      // sauma__control.style.left = summ/5 + "px";
      sauma.style.right = parseFloat(w) / 5 + "px";
      // sauma.style.left = ((parseFloat(w-summ))-15)/5 + "px";
      // sauma__controls_del.style.marginLeft =  w-last_sauma_size/5 + "px";
      // sauma__control_down.style.left =  w-last_sauma_size/5 + "px";
      //sauma__control.style.width = truesz/5 + "px";
      sauma__control_down.style.width = truesz / 5 + "px";
      sauma__control_down.style.right = (-1) * (truesz / 5) + "px";
      sauma__controls.style.right = (-1) * (truesz / 5) + "px";
      // sauma.style.width = truesz/5 + "px";
      // sauma__control.style.top = '-50%';
      sauma__controls_del.style.float = 'right';
      sauma__controls.style.left = '0';
      sauma__control.value = truesz;
      sauma__control_down.innerHTML = truesz - 10;
      let ctrl_ = document.querySelectorAll(".sauma__vertical");
      ctrl_.forEach(function(item_) {
        item_.style.marginRught = parseFloat(last_sauma_size / 5) + "px";
      });
    }
  }
  else {
    saumacount = Math.trunc((parseFloat(w - summ) * 5) / summ) * summ;
    last_sauma_size = (parseFloat(w - summ) * 5) - saumacount;
    truesz = (parseFloat(w - summ));
    if (document.querySelector("#settings__saumahanta-oik").checked && document.querySelector("#saumoitus__sauma_one").checked || document.querySelector(
        "#settings__saumahanta-tasoitus").checked && document.querySelector("#saumoitus__sauma_one").checked || document.querySelector(
        "#settings__saumahanta-tasoitus").checked && document.querySelector("#saumoitus__sauma_three").checked) {
      // sauma__control.style.left = summ/5 + "px";
      sauma.style.left = ((parseFloat(w))) / 5 + "px";
      // sauma.style.left = ((parseFloat(w-summ))-15)/5 + "px";
      // sauma__controls_del.style.marginLeft =  w-last_sauma_size/5 + "px";
      // sauma__control_down.style.left =  w-last_sauma_size/5 + "px";
      //sauma__control.style.width = truesz/5 + "px";
      sauma__control_down.style.width = truesz / 5 + "px";
      sauma__control_down.style.left = (-1) * (truesz / 5) + "px";
      sauma__controls.style.left = (-1) * (truesz / 5) + "px";
      // sauma.style.width = truesz/5 + "px";
      // sauma__control.style.top = '-50%';
      sauma__controls_del.style.float = 'right';
      sauma__control.value = truesz;
      sauma__control_down.innerHTML = truesz - 10;
    }
    else if (document.querySelector("#settings__saumahanta-vas").checked && document.querySelector("#saumoitus__sauma_one").checked) {
      truesz = (parseFloat(w - summ));
      sauma.style.right = (w - 10) / 5 + "px";
      sauma.style.right = ((parseFloat(w - summ)) - 10) / 5 + "px";
      sauma.style.left = "unset";
      // sauma__control.style.left = last_sauma_size/5 + "px";
      // sauma.style.left = last_sauma_size/5 + "px";
      // sauma__controls_del.style.marginLeft ="0px";
      // sauma__control_down.style.left ="0px";
      //sauma__control.style.width = truesz/5 + "px";
      sauma__control_down.style.width = truesz / 5 + "px";
      // sauma.style.width = truesz/5 + "px";
      // sauma__control.style.top = '-50%';
      sauma__control.value = truesz;
      sauma__control_down.innerHTML = truesz - 10;
      // sauma.style.left = "0px";
      // sauma.style.left = ((parseFloat(w-summ))-15)/5 + "px";
      // sauma__controls_del.style.marginLeft =  w-last_sauma_size/5 + "px";
      // sauma__control_down.style.left =  w-last_sauma_size/5 + "px";
      // //sauma__control.style.width = truesz/5 + "px";
      // sauma__control_down.style.width = truesz/5 + "px";
      // sauma__control_down.style.left = "0px";
      // sauma__controls.style.left = "0px";
      // // sauma.style.width = truesz/5 + "px";
      // // sauma__control.style.top = '-50%';
      // sauma__controls_del.style.float = 'left';
      // sauma__control.value=truesz;
      // sauma__control_down.innerHTML=truesz-10;
    }
    else if (document.querySelector("#settings__saumahanta-oik").checked && document.querySelector("#saumoitus__sauma_two").checked || document.querySelector(
        "#settings__saumahanta-tasoitus").checked && document.querySelector("#saumoitus__sauma_two").checked) {
      let ctrl = document.querySelectorAll(".sauma__vertical_ctrl");
      summ = 0;
      ctrl.forEach(function(item) {
        summ += parseFloat(item.innerText);
      });
      saumacount = Math.trunc((parseFloat(w - summ) * 5) / summ) * summ;
      last_sauma_size = (parseFloat(w - summ) * 5) - saumacount;
      truesz = (parseFloat(w - summ));
      sauma.style.left = "100%";
      // truesz = last_sauma_size;
      // sauma.style.left = ((parseFloat(w-summ))-15)/5 + "px";
      // sauma__controls_del.style.marginLeft =  w-last_sauma_size/5 + "px";
      // sauma__control_down.style.left =  w-last_sauma_size/5 + "px";
      //sauma__control.style.width = truesz/5 + "px";
      sauma__control_down.style.width = truesz / 5 + "px";
      sauma__control_down.style.left = (-1) * (truesz / 5) + "px";
      sauma__controls.style.left = (-1) * (truesz / 5) + "px";
      // sauma.style.width = truesz/5 + "px";
      // sauma__control.style.top = '-50%';
      sauma__controls_del.style.float = 'right';
      sauma__control.value = truesz;
      sauma__control_down.innerHTML = truesz - 10;
    }
  }
  sauma__control_down.classList.add("sauma__control_down");
  sauma__control_down.classList.add("sauma__control_down_added");
  // saumaCtrlsList.push(sauma__control);
  sauma__control_down.classList.add(id);
  sauma.classList.add(id);
  sauma__controls.classList.add(id);
  sauma__controls.setAttribute("name", id);
  sauma__controls_del.classList.add(id);
  sauma__controls_del.setAttribute("name", id);
  sauma__controls_type.classList.add(id);
  sauma__controls_type.setAttribute("name", id);
  sauma__controls_type.classList.add("lineinput");
  sauma__control_down.classList.add("sauma__vertical_ctrldown");
  sauma.setAttribute("id", id);
  newDiv__comment.setAttribute("name", id);
  newDiv__comment.classList.add(id);
  newDiv__comment_del.classList.add("newDiv__comment_del");
  newDiv__comment_del.setAttribute("name", id);
  sauma.setAttribute("name", id);
  sauma__control_down.setAttribute("name", id);
  sauma__controls.classList.add("sauma__controls");
  sauma__controls_type.type = "text";
  sauma__controls_type.value = "ST5";
  // sauma__controls_type.setAttribute("onclick", "sauma__change(this);");
  sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
  sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
  sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
  sauma__controls_del.classList.add("sauma__controls_del");
  newDiv__comment_del.setAttribute("onclick", "obj = this.getAttribute('name');document.querySelector('#'+obj).remove();this.parentElement.remove();");
  newDiv__comment.innerHTML = "Sauma";
  newDiv__comment_del.innerHTML = "";
  sauma__control.dataset.from = parseFloat(sauma__control.value);
  newDiv__comment.appendChild(newDiv__comment_del);
  document.querySelector(".drawarea__controls_four-pysty").prepend(newDiv__comment);
  var nhzrtl = document.querySelector(".newrow_vertical");
  if (typeof(nhzrtl) != 'undefined' && nhzrtl != null) {
    nhzrtl.prepend(sauma);
    // sauma__controls_del.innerHTML = nhzrtl.children.length;
  }
  else {
    newrow_vertical.classList.add("newrow_vertical");
    document.querySelector("#box-wrapper > main").prepend(newrow_vertical);
    newrow_vertical.prepend(sauma);
    // sauma__controls_del.innerHTML = "A";
  }
  // sauma__controls.addEventListener('touchmove', (e) => {
  //   resizeSauma(e, sauma, sauma.querySelector(".sauma__controls"), sauma.querySelector(".sauma__control"), "h");
  // });
  // sauma.addEventListener('touchmove', (e) => {
  //   resizeSauma(e, sauma, sauma.querySelector(".sauma__controls"), sauma.querySelector(".sauma__control"), "h");
  // });
  return sauma;
}
// 16 LUO YKSITTÄISEN KOORDINAATISTON PYSTYSAUMOILLE, V
function luo__scord_vertical(sauma, id, name) {
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls = document.createElement("div");
  const sauma__controls_del = document.createElement("div");
  // const sauma__controls_type = document.createElement("input");
  sauma__control.classList.add("sauma__vertical_ctrl");
  sauma__control.classList.add("sauma__vertical_ctrl-lefted");
  sauma__control.classList.add("sauma__control");
  // sauma__controls_type.classList.add("lineinput");
  sauma__control_down.classList.add("sauma__vertical_ctrldown");
  sauma__controls.classList.add("sauma__controls");
  sauma__controls_del.classList.add("sauma__controls_del");
  sauma__control_down.classList.add("sauma__control_down");
  sauma__control_down.classList.add(id);
  sauma__control.classList.add(id);
  sauma__control.setAttribute("type", "text");
  sauma__controls.classList.add(id);
  sauma__controls_del.classList.add(id);
  // sauma__controls_type.classList.add(id);
  sauma__controls.innerHTML = "";
  sauma__control_down.innerHTML = "0";
  sauma__control.value = sauma;
  sauma__control_down.innerHTML = parseFloat(sauma) - 10;
  // sauma__controls_type.value = "sauma";
  // sauma__controls_type.type = "text";
  sauma__control.setAttribute("name", id);
  sauma__controls.setAttribute("name", id);
  sauma__controls_del.setAttribute("name", id);
  // sauma__controls_type.setAttribute("name", id);
  sauma__control_down.setAttribute("name", id);
  sauma__control.dataset.from = sauma;
  // saumaCtrlsList.push(sauma__control);
  sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
  if (document.querySelector("#settings__saumahanta-tasoitus").checked) {
    name = parseFloat(name) - 1;
  }
  sauma__controls_del.innerHTML = name;
  sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
  sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
  // sauma__control.setAttribute("onclick", "document.querySelector("+id+").remove();this.parentElement.style.opacity = '0';");
  if (document.getElementById("settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked || pystyhanta_oikealle === true) {
    sauma__control_down.style.width = parseFloat(sauma) / 5 + "px";
    sauma__control_down.style.left = (-1) * parseFloat(sauma) / 5 + "px";
    //sauma__control.style.width = parseFloat(sauma)/5 + "px";
    sauma__control.style.left = (-1) * parseFloat(sauma) / 5 + "px";
    sauma__control.style.right = "0";
  }
  else if (document.getElementById("settings__saumahanta-vas").checked) {
    sauma__control_down.style.width = sauma / 5 + "px";
    if (document.getElementById("saumoitus__sauma_two").checked) {
      sauma__control_down.style.left = (-1) * sauma / 5 + "px";
      //sauma__control.style.width = sauma/5 + "px";
      sauma__control.style.left = (-1) * sauma / 5 + "px";
    }
    else {
      sauma__control_down.style.right = (-1) * sauma / 5 + "px";
      sauma__control.style.right = (-1) * sauma / 5 + "px";
    }
  }
  else {
    sauma__control_down.style.width = sauma / 5 + "px";
    sauma__control_down.style.left = (-1) * sauma / 5 + "px";
    //sauma__control.style.width = sauma/5 + "px";
    sauma__control.style.left = (-1) * sauma / 5 + "px";
  }
  sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
  sauma__controls.prepend(sauma__control);
  sauma__controls.append(sauma__control_down);
  sauma__controls.append(sauma__controls_del);
  // sauma__controls.append(sauma__controls_type);
  return sauma__controls;
}
// 17 LUO KOORDINAATISTON PYSTYSAUMOILLE KUN MENEE AUKKOJEN YLI, V
function cord_pystysaumat__aukotyli() {
  canvas = document.querySelector(".canvas");
  sauma = canvas.querySelectorAll(".sauma__vertical");
  // if(canvas.querySelector(".sauma__vertical")) {
  //   distance = document.querySelector(".verticalrow_saumat");
  //   // viim_sauma = luo__lastsauma_vertical();
  //   distance.append(luo__lastsauma_vertical());
  //   sauma = canvas.querySelectorAll(".sauma__vertical");
  //   // console.log("viim_sauma: "+viim_sauma);
  //   console.log("distance: "+distance);
  // }
  if (document.getElementById("settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked || pystyhanta_oikealle === true) {
    h = document.querySelector("#box_h").value;
    w = document.querySelector("#box_w").value;
    var s_summ = 0;
    sauma.forEach(function(j) {
      saumawidth = parseFloat(j.style.left) * 5 - s_summ;
      id = j.getAttribute("name");
      if (aukoitus_param === true) {
        a_s_v += 1;
        j.append(luo__scord_vertical(saumawidth, id, a_s_v));
      }
      else {
        s_v += 1;
        j.append(luo__scord_vertical(saumawidth, id, s_v));
      }
      j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
        resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
      });
      j.addEventListener('touchmove', (e) => {
        resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
      });
      s_summ += saumawidth;
    });
  }
  else if (document.getElementById("settings__saumahanta-vas").checked) {
    var canvas = document.querySelector(".canvas");
    var h = document.querySelector("#box_h").value;
    var w = document.querySelector("#box_w").value;
    var s_summ = 0;
    sauma.forEach(function(j) {
      saumawidth = parseFloat(j.style.right) * 5 - s_summ;
      s_v += 1;
      id = j.getAttribute("name");
      j.append(luo__scord_vertical(saumawidth, id, s_v));
      j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
        resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
      });
      j.addEventListener('touchmove', (e) => {
        resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
      });
      s_summ += saumawidth;
    });
  }
  //else if(document.querySelector("#settings__saumahanta-tasoitus").checked) {}
}
// 18 LUO KOORDINAATISTON PYSTYSAUMOILLE KUN MENEE AUKKOJEN YLI TASOITUKSELLA, V
function cord_pystysaumat__aukotyli_tasoitus() {
  var canvas = document.querySelector(".canvas");
  var h = document.querySelector("#box_h").value;
  var w = document.querySelector("#box_w").value;
  var s_summ = 0;
  // sauma = canvas.querySelectorAll(".sauma__vertical");
  // if(canvas.querySelector(".sauma__vertical")) {
  //   distance = sauma[0].parentElement;
  //   viim_sauma = luo__lastsauma_vertical(distance);
  //   distance.append(viim_sauma);
  //   sauma = canvas.querySelectorAll(".sauma__vertical");
  // }
  sauma.forEach(function(j) {
    saumawidth = parseFloat(j.style.left) * 5 - s_summ;
    if (j.querySelector(".sauma__vertical_ctrldown")) {
      j.querySelector(".sauma__vertical_ctrldown").remove();
    }
    if (j.querySelector(".sauma__vertical_ctrl")) {
      j.querySelector(".sauma__vertical_ctrl").remove();
    }
    if (j.querySelector(".sauma__controls")) {
      j.querySelector(".sauma__controls").remove();
    }
    id = j.getAttribute("name");
    s_v += 1;
    j.append(luo__scord_vertical(saumawidth, id, s_v));
    j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
      resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
    });
    j.addEventListener('touchmove', (e) => {
      resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
    });
    s_summ += saumawidth;
  });
}
// 19 LUO KOORDINAATISTON PYSTYSAUMOILLE KUN MENEE AUKKOJEN MUKAAN, V
function cord_pystysaumat__aukotmukaan() {
  if (document.querySelector(".seina_patka_x")) {
    let seina_patkat = document.querySelectorAll(".seina_patka_x");
    sp_lenght = parseFloat(seina_patkat.length) - 1;
    var canvas = document.querySelector(".canvas");
    var h = document.querySelector("#box_h").value;
    var w = document.querySelector("#box_w").value;
    if (document.getElementById("settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked) {
      seina_patkat.forEach(function(i) {
        let sauma = i.querySelectorAll(".sauma__vertical");
        var width = parseFloat(i.style.width) * 5;
        var s_summ = 0;
        seinapatka_pituus = parseFloat(i.height) * 5;
        seinapatka_nosto = parseFloat(i.bottom) * 5;
        if (i.querySelector(".sauma__vertical")) {
          sauma.forEach(function(j) {
            saumawidth = parseFloat(j.style.left) * 5 - s_summ;
            if (j.querySelector(".sauma__vertical_ctrldown")) {
              j.querySelector(".sauma__vertical_ctrldown").remove();
            }
            if (j.querySelector(".sauma__vertical_ctrl")) {
              j.querySelector(".sauma__vertical_ctrl").remove();
            }
            if (j.querySelector(".sauma__controls")) {
              j.querySelector(".sauma__controls").remove();
            }
            id = j.getAttribute("name");
            s_v += 1;
            j.append(luo__scord_vertical(saumawidth, id, s_v));
            j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
              resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
            });
            j.addEventListener('touchmove', (e) => {
              resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
            });
            s_summ += saumawidth;
          });
        }
        sauma__vertical_ctrldown = i.innerText;
      });
    }
    else if (document.getElementById("settings__saumahanta-vas").checked) {
      seina_patkat.forEach(function(i) {
        let sauma = i.querySelectorAll(".sauma__vertical");
        var width = parseFloat(i.style.width) * 5;
        var s_summ = 0;
        seinapatka_pituus = parseFloat(i.height) * 5;
        seinapatka_nosto = parseFloat(i.bottom) * 5;
        if (i.querySelector(".sauma__vertical")) {
          sauma.forEach(function(j) {
            saumawidth = parseFloat(j.style.right) * 5 - s_summ;
            if (j.querySelector(".sauma__vertical_ctrldown")) {
              j.querySelector(".sauma__vertical_ctrldown").remove();
            }
            if (j.querySelector(".sauma__vertical_ctrl")) {
              j.querySelector(".sauma__vertical_ctrl").remove();
            }
            if (j.querySelector(".sauma__controls")) {
              j.querySelector(".sauma__controls").remove();
            }
            id = j.getAttribute("name");
            s_v += 1;
            j.append(luo__scord_vertical(saumawidth, id, s_v));
            j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
              resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
            });
            j.addEventListener('touchmove', (e) => {
              resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "h");
            });
            s_summ += saumawidth;
          });
        }
        sauma__vertical_ctrldown = i.innerText;
      });
    }
  }
  else {
    cord_pystysaumat__aukotyli();
  }
}
////// 20 - 27 VAAKA
// 20 MÄÄRITTÄÄ VAAKASAUMAT AUKKOJEN YLI, H
function vaakasaumat__aukkojenyli() {
  var h = parseFloat(document.getElementById('box_h').value);
  var sauma__interval_vertical, sauma__interval_horizontal;
  if (document.getElementById("settings__sauma_pysty").checked) {
    sauma__interval_vertical = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
    sauma__interval_horizontal = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
  }
  if (document.getElementById("settings__sauma_vaaka").checked) {
    sauma__interval_vertical = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
    sauma__interval_horizontal = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
  }
  var newrow_horizontal = document.createElement("div");
  myDivs_horizontal = [],
    myDivs_vertical = [],
    i = 0;
  s_h = 0;
  var saumat;
  newrow_horizontal.classList.add("horizontalrow_saumat");
  if (canvas.querySelector(".saumat__grandrow")) {
    saumat = canvas.querySelector(".saumat__grandrow");
  }
  else {
    saumat = document.createElement("div");
    saumat.classList.add("saumat__grandrow");
    canvas.appendChild(saumat);
  }
  newrow_horizontal.style.height = parseFloat(canvas.getBoundingClientRect().height) + "px";
  saumat.prepend(newrow_horizontal);
  var numOfDivs__horizontal;
  if (document.getElementById("settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-ala").checked) {
    numOfDivs__horizontal = Math.floor(h / sauma__interval_horizontal);
    for (i = 0; i < numOfDivs__horizontal; i++) {
      newrow_horizontal.append(luo__sauma_horizontal(sauma__interval_horizontal));
    }
    newrow_horizontal.append(luo__lastsauma_horizontal(newrow_horizontal));
  }
  else if (document.querySelector("#settings__saumahanta-vaakatasoitus").checked) {
    numOfDivs__horizontal = Math.ceil(h / sauma__interval_horizontal);
    tas_kaava1 = Math.ceil(h / sauma__interval_horizontal);
    area__modcount = (parseFloat(h) / 25);
    sauma__modcount = Math.ceil(area__modcount / tas_kaava1);
    tas_li = parseFloat(sauma__modcount) * 25;
    for (i = 1; i < tas_kaava1; i++) {
      newrow_horizontal.classList.add("horizontalrow_saumat");
      newrow_horizontal.append(luo__sauma_horizontal("", tas_li, i));
    }
    newrow_horizontal.append(luo__lastsauma_horizontal(newrow_horizontal));
  }
  newrow_horizontal.style.height = "100%";
}
// 21 MÄÄRITTÄÄ VAAKASAUMAT AUKKOJEN MUKAAN, H
function vaakasaumat__aukkojenmukaan() {
  var canvas = document.querySelector("#box-wrapper > main");
  if (canvas.querySelector(".aukko")) {
    h = parseFloat(document.querySelector("#box_h").value);
    w = parseFloat(document.querySelector("#box_w").value);
    var sauma__interval_vertical, sauma__interval_horizontal;
    if (document.getElementById("settings__sauma_pysty").checked) {
      sauma__interval_vertical = document.querySelector("#settings__sauma_interval_x").value;
      sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_y").value;
    }
    if (document.getElementById("settings__sauma_vaaka").checked) {
      sauma__interval_vertical = document.querySelector("#settings__sauma_interval_y").value;
      sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_x").value;
    }
    var newrow_horizontal = document.createElement("div");
    var newrow_vertical = document.createElement("div");
    var canvas = document.querySelector("#box-wrapper > main");
    var aukkos = document.getElementsByClassName("aukko");
    myDivs_horizontal = [],
      myDivs_vertical = [],
      i = 0;
    var horizontalrow_saumat = document.createElement("div");
    
    if (document.querySelector(".saumat__grandrow")) {
      saumat = document.querySelector(".saumat__grandrow");
    }
    else {
      saumat = document.createElement("div");
      saumat.classList.add("saumat__grandrow");
      canvas.appendChild(saumat);
    }
    let h_aukkos = document.querySelectorAll(".drawarea > .canvas > .aukko");
    var aukko5, aukko4, aukko3, aukko2, aukko1;
    h_l = h_aukkos.length;
    if (h_l == 1) {
      aukko1 = h_aukkos[0];
    }
    else if (h_l == 2) {
      aukko1 = h_aukkos[1];
      aukko2 = h_aukkos[0];
    }
    else if (h_l == 3) {
      aukko1 = h_aukkos[0];
      aukko2 = h_aukkos[1];
      aukko3 = h_aukkos[2];
    }
    else if (h_l == 4) {
      aukko1 = h_aukkos[0];
      aukko2 = h_aukkos[1];
      aukko3 = h_aukkos[2];
      aukko4 = h_aukkos[3];
    }
    else if (h_l == 5) {
      aukko1 = h_aukkos[0];
      aukko2 = h_aukkos[1];
      aukko3 = h_aukkos[2];
      aukko4 = h_aukkos[3];
      aukko5 = h_aukkos[4];
    }
    if (aukko1) {
      h_areas = new Array();
      h_a_summ = 0;
      const h_area = new Array();
      for (var i = h_aukkos.length - 1; i >= 0; i--) {
        
        h_aukkos[i].style.opacity = "0.5";
        yla_lukema = parseFloat(h_aukkos[i].querySelector(".aukko_tcord").innerHTML);
        ala_lukema = parseFloat(h_aukkos[i].querySelector(".aukko_bcord").innerHTML);

        h_areas.push(yla_lukema);
        h_areas.push(ala_lukema);

       
      }
      h_areas.sort(function(a, b) {
        if (parseFloat(a) > parseFloat(b)) return 1;
        if (parseFloat(a) < parseFloat(b)) return -1;
        return 0;
      });

      h_areas.push(parseFloat(document.querySelector("#box_h").value));
      negation_summ = 0;
      for (var i = h_areas.length - 1; i >= 0; i--) {
        if(h_areas[i-1]) {
          temp_array = new Array();
          korkeus = h_areas[i]-parseFloat(h_areas[i-1]);
          

          
          h_area.push(temp_array);
          negation_summ+=korkeus;
          bottomcord=h_areas[h_areas.length-1]-negation_summ;
          temp_array.push(bottomcord);
          temp_array.push(korkeus);
        }
      }
      temp_array = new Array();
      h_area.push(temp_array);

      korkeus=h_areas[h_areas.length-1]-negation_summ;
      temp_array.push(0);
      temp_array.push(korkeus);


      for (var a = h_area.length - 1; a >= 0; a--) {
        var newrow_horizontal = document.createElement("div");
        numOfDivs__horizontal = Math.trunc(h_area[a][1] / sauma__interval_horizontal);
        s_v = 0;
        s_h = 0;
        g = 0;
        newrow_horizontal.classList.add("newrow_horizontal");
        newrow_horizontal.classList.add("seina_patka" + a);
        newrow_horizontal.classList.add("seina_patka_y");
        newrow_horizontal.setAttribute('title', h_area[a][1]);
        newrow_horizontal.style.bottom = h_area[a][0] / 5 + "px";
        newrow_horizontal.style.height = h_area[a][1] / 5 + "px";
        newrow_horizontal.style.position = "absolute";
        newrow_horizontal.classList.add("aukko_patka");
        var dim = document.createElement("div");
        dim.innerHTML = h_area[a];
        dim.classList.add("area_cord");
        dim.style.display = "none";
        newrow_horizontal.append(dim);
        newrow_horizontal.title = h_area[a][0] + "," + h_area[a][1];
        horizontalrow_saumat.append(newrow_horizontal);
        if (document.querySelector("#settings__saumahanta-yla").checked || document.querySelector("#settings__saumahanta-ala").checked) {
          for (var g = 0; g < numOfDivs__horizontal; g++) {
            newrow_horizontal.classList.add("horizontalrow_saumat");
            //newrow_horizontal.style.height = h/5 +"px";
            newrow_horizontal.append(luo__sauma_horizontal(sauma__interval_horizontal));
          }
          newrow_horizontal.append(luo__lastsauma_horizontal(h_area[a][1]));
        }
        else if (document.querySelector("#settings__saumahanta-vaakatasoitus").checked) {
          // for (var g = 0; g < numOfDivs__horizontal; g++) {
          //   newrow_horizontal.classList.add("horizontalrow_saumat");
          //   //newrow_horizontal.style.height = h/5 +"px";
          //   newrow_horizontal.append(luo__sauma_horizontal( a1));
          // }
          // newrow_horizontal.append(luo__lastsauma_horizontal(h_area[a][][1]));
          numOfDivs__horizontal = Math.ceil(h_area[a][1] / sauma__interval_horizontal);
          // Itaratioiden määrä
          area__modcount = Math.ceil(parseFloat(h_area[a][1]) / 25);
          // Moduuleita areassa
          sauma__modcount = Math.ceil(area__modcount / numOfDivs__horizontal);
          //Moduulimittojen määrä?
          tas_li = parseFloat(sauma__modcount) * 25;
          var formatted_pituus = parseFloat(h_area[a][1]) - tas_li;
          // console.log("numOfDivs__horizontal: "+numOfDivs__horizontal+" A: "+h_area[a][][1]);
          // console.log("area__modcount: "+area__modcount+" A: "+h_area[a[[]1]]);              
          // console.log("sauma__modcount: "+sauma__modcount+" A: "+h_area[a][][1]);
          // console.log("tas_li: "+tas_li+" A: "+h_area[a][][1]);              
          for (z = 1; z < numOfDivs__horizontal; z++) {
            newrow_horizontal.classList.add("horizontalrow_saumat");
            newrow_horizontal.append(luo__sauma_horizontal(formatted_pituus, tas_li, z));
          }
          newrow_horizontal.append(luo__lastsauma_horizontal(h_area[a][1]));
        }
      }
    }
    newrow_horizontal.classList.add("horizontalrow_saumat");
    horizontalrow_saumat.classList.add("horizontalrow_saumat");
    saumat.prepend(horizontalrow_saumat);
  }
  else {
    document.querySelector("#saumoitus__sauma_one_v").checked = true;
    vaakasaumat__aukkojenyli();
  }
}
// 22 LUO YKSITTÄISEN VAAKASAUMAN, H
function luo__sauma_horizontal(saumaheight, tas_li, modcount) {
  s_h += 1;
  var sauma__interval_horizontal;
  if (document.getElementById("settings__sauma_pysty").checked) {
    sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_y").value;
  }
  else if (document.getElementById("settings__sauma_vaaka").checked) {
    sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_x").value;
  }
  const heightBox = document.querySelector('#box_h').value;
  const boxHeight = document.querySelector('#box-wrapper > main').offsetHeight;
  const sauma = document.createElement("div");
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls_type = document.createElement("input");
  const sauma__controls_del = document.createElement("div");
  const newDiv__comment = document.createElement("li");
  const newDiv__comment_del = document.createElement("i");
  const newrow_horis_vontal = document.createElement("div");
  const sauma__controls = document.createElement("div");
  var h = document.querySelector('#box_h').value;
  var w = document.querySelector('#box_w').value;
  let id = "vaakasauma" + Math.random().toString(16).slice(2).toLowerCase();
  var nvrtcl = document.querySelector(".newrow_horizontal");
  sauma.dataset.no = s_h;
  newrow_horis_vontal.classList.add(id);
  newDiv__comment_del.classList.add("newDiv__comment_del");
  sauma__controls_del.classList.add("sauma__controls_del");
  sauma.classList.add("sauma__horizontal");
  sauma.classList.add("luo__sauma_horizontal");
  sauma.classList.add("sauma");
  sauma__control.classList.add("sauma__horizontal_ctrl");
  sauma__control_down.classList.add("sauma__horizontal_ctrldown");
  sauma__control_down.classList.add("sauma__control_down");
  sauma__control_down.classList.add("luo__sauma_horizontal");
  sauma__controls_type.classList.add("lineinput");
  sauma__controls_type.classList.add("sauma__controls_type");
  sauma__control_down.classList.add("sauma__horizontal_ctrldown");
  sauma__controls.classList.add("sauma__controls");
  sauma__controls.classList.add(id);
  sauma__controls.innerHTML = "";
  sauma.classList.add(id);
  sauma__control.classList.add(id);
  sauma__control_down.classList.add(id);
  sauma__controls_type.classList.add(id);
  sauma__controls_del.classList.add(id);
  newDiv__comment.classList.add(id);
  newDiv__comment_del.classList.add(id);
  sauma__controls_type.setAttribute("name", id);
  newDiv__comment_del.setAttribute("name", id);
  sauma__controls_del.setAttribute("name", id);
  sauma__control_down.setAttribute("name", id);
  sauma.setAttribute("name", id);
  sauma__controls.setAttribute("name", id);
  newDiv__comment.innerHTML = "Sauma";
  newDiv__comment_del.setAttribute("onclick", "obj = this.getAttribute('name');document.querySelector('#'+obj).remove();this.parentElement.remove();");
  newDiv__comment_del.innerHTML =
    "<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41675 9.91668H2.33341C2.024 9.91668 1.72725 9.79376 1.50846 9.57497C1.28966 9.35618 1.16675 9.05943 1.16675 8.75001V1.75001C1.16675 1.1059 1.28966 1.14384 1.50846 0.925052C1.72725 0.70626 2.024 0.58331 2.33341 0.58331H9.33341V1.75001H2.33341V8.75001H6.41675V7.58334L8.75008 9.33334L6.41675 11.0833V9.91668ZM11.0834 12.25V4.08334H4.66675V7.58334H3.50008V4.08334C3.50008 3.77392 3.623 3.47718 3.84179 3.25839C4.06058 3.03959 4.35733 2.91668 4.66675 2.91668H11.0834C11.3928 2.91668 11.6896 3.03959 11.9084 3.25839C12.1272 3.47718 12.2501 3.77392 12.2501 4.08334V12.25C12.2501 12.5594 12.1272 12.8562 11.9084 13.075C11.6896 13.2938 11.3928 13.4167 11.0834 13.4167H4.66675C4.35733 13.4167 4.06058 13.2938 3.84179 13.075C3.623 12.8562 3.50008 12.5594 3.50008 12.25V11.0833H4.66675V12.25H11.0834Z' fill='#18AB00'/></svg>";
  newDiv__comment.appendChild(newDiv__comment_del);
  newDiv__comment.innerHTML = "Sauma";
  newDiv__comment_del.innerHTML = "";
  sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
  sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
  sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
  if (document.getElementById("saumoitus__sauma_one_v").checked) {
    if (document.getElementById("settings__saumahanta-yla").checked) {
      saumcount = Math.ceil(h / sauma__interval_horizontal);
      sauma.style.bottom = s_h * parseFloat(saumaheight / 5) + "px";
      sauma__control.value = saumaheight;
      sauma__control_down.innerHTML = saumaheight - 10;
      sauma.style.marginTop = "unset";
      sauma__control_down.style.marginTop = "unset";
      // console.log("VAAKASAUMOITUS AUKKOJEN YLI, HÄNTÄ YLÄ ");
    }
    else if (document.getElementById("settings__saumahanta-ala").checked) {
      saumcount = Math.ceil(h / sauma__interval_horizontal);
      //sauma__control.style.bottom = s_h * parseFloat(korkeus/5) + "px";
      sauma.style.top = s_h * parseFloat(saumaheight / 5) + "px";
      sauma__control.value = saumaheight;
      sauma__control_down.innerHTML = saumaheight - 10;
      sauma.style.marginTop = "-5px";
      sauma__control_down.style.marginTop = "10px";
    }
    else if (document.getElementById("settings__saumahanta-vaakatasoitus").checked) {
      saumcount = Math.ceil(h / sauma__interval_horizontal);
      //sauma__control.style.bottom = s_h * parseFloat(korkeus/5) + "px";
      sauma.style.bottom = modcount * parseFloat(tas_li / 5) + "px";
      sauma__control.value = saumaheight;
      sauma__control_down.innerHTML = tas_li - 10;
      sauma.style.marginTop = "unset";
      sauma__control_down.style.marginTop = "unset";
    }
  }
  else if (document.getElementById("saumoitus__sauma_three").checked) {
    if (document.getElementById("settings__saumahanta-yla").checked) {
      sauma.style.bottom = s_h * parseFloat(saumaheight / 5) + "px";
      sauma__control.value = saumaheight;
      sauma__control_down.innerHTML = saumaheight - 10;
      sauma.style.marginTop = "unset";
      sauma__control_down.style.marginTop = "unset";
    }
    else if (document.getElementById("settings__saumahanta-ala").checked) {
      sauma.style.top = s_h * parseFloat(saumaheight / 5) + "px";
      sauma__control.value = saumaheight;
      sauma__control_down.innerHTML = saumaheight - 10;
      sauma.style.marginTop = "-5px";
      sauma__control_down.style.marginTop = "10px";
    }
    else if (document.getElementById("settings__saumahanta-vaakatasoitus").checked) {
      sauma.style.bottom = modcount * parseFloat(tas_li / 5) + "px";
      sauma__control.value = saumaheight;
      sauma__control_down.innerHTML = tas_li - 10;
      sauma.style.marginTop = "unset";
      sauma__control_down.style.marginTop = "unset";
    }
  }
  document.querySelector(".drawarea__controls_four-vaaka").prepend(newDiv__comment);
  sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
  return sauma;
}
// 23 LUO VAAKAHÄNNÄN, H
function luo__lastsauma_horizontal(aukko) {
  s_h += 1;
  if (document.getElementById("settings__sauma_pysty").checked) {
    sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_y").value;
  }
  else if (document.getElementById("settings__sauma_vaaka").checked) {
    sauma__interval_horizontal = document.querySelector("#settings__sauma_interval_x").value;
  }
  const sauma = document.createElement("div");
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls = document.createElement("div");
  const sauma__controls_del = document.createElement("div");
  const sauma__controls_type = document.createElement("input");
  let saumas = document.querySelectorAll(".sauma__horizontal");
  let ctrl = document.querySelectorAll(".sauma__horizontal_ctrl");
  var h = document.querySelector("#box_h").value;
  var w = document.querySelector("#box_w").value;
  var id = "lastsauma_horizontal" + Math.random().toString(16).slice(2).toLowerCase();
  var newrow_vertical = document.createElement("div");
  var newDiv__comment = document.createElement("li");
  var newDiv__comment_del = document.createElement("i");
  var nvrtcl = document.querySelector(".newrow_horizontal");
  sauma.dataset.no = s_h;
  sauma.classList.add("sauma");
  sauma.classList.add("sauma__horizontal");
  sauma.classList.add("sauma__horizontal_last");
  sauma__control.classList.add("sauma__horizontal_ctrl");
  sauma__control.classList.add("sauma__control");
  sauma__control.classList.add("sauma__horizontal_ctrl-righted");
  sauma__controls_type.classList.add("lineinput");
  sauma__controls_type.classList.add("sauma__controls_type");
  sauma__controls.classList.add("sauma__controls");
  sauma__controls.classList.add("sauma__controls-left");
  sauma__control_down.classList.add("sauma__horizontal_ctrldown");
  sauma__controls_del.classList.add("sauma__controls_del");
  // newrow_horizontal.classList.add("newrow_horizontal");
  sauma__control.classList.add(id);
  sauma__controls.classList.add(id);
  sauma__controls_del.classList.add(id);
  sauma__controls_type.classList.add(id);
  newDiv__comment.classList.add(id);
  sauma.classList.add(id);
  sauma__control_down.classList.add(id);
  sauma__control.setAttribute("name", id);
  sauma__control_down.setAttribute("name", id);
  sauma__controls.setAttribute("name", id);
  sauma__controls_del.setAttribute("name", id);
  sauma__controls_type.setAttribute("name", id);
  newDiv__comment.setAttribute("name", id);
  newDiv__comment_del.setAttribute("name", id);
  sauma.setAttribute("id", id);
  sauma.setAttribute("name", id);
  sauma__control.setAttribute("onclick", "obj = this.getAttribute('name');this.parentElement.remove();document.querySelector('.'+obj).remove();");
  sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
  sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
  sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
  sauma.setAttribute("onclick", "");
  newDiv__comment_del.setAttribute("onclick", "obj = this.getAttribute('name');document.querySelector('#'+obj).remove();this.parentElement.remove();");
  sauma__control.setAttribute("onclick", "sauma__del(this);");
  sauma.innerHTML = "";
  sauma__control.value = "0";
  sauma__controls.innerHTML = "";
  sauma__controls_del.innerHTML = "";
  newDiv__comment.innerHTML = "Sauma";
  newDiv__comment_del.innerHTML =
    "<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41675 9.91668H2.33341C2.024 9.91668 1.72725 9.79376 1.50846 9.57497C1.28966 9.35618 1.16675 9.05943 1.16675 8.75001V1.75001C1.16675 1.1059 1.28966 1.14384 1.50846 0.925052C1.72725 0.70626 2.024 0.58331 2.33341 0.58331H9.33341V1.75001H2.33341V8.75001H6.41675V7.58334L8.75008 9.33334L6.41675 11.0833V9.91668ZM11.0834 12.25V4.08334H4.66675V7.58334H3.50008V4.08334C3.50008 3.77392 3.623 3.47718 3.84179 3.25839C4.06058 3.03959 4.35733 2.91668 4.66675 2.91668H11.0834C11.3928 2.91668 11.6896 3.03959 11.9084 3.25839C12.1272 3.47718 12.2501 3.77392 12.2501 4.08334V12.25C12.2501 12.5594 12.1272 12.8562 11.9084 13.075C11.6896 13.2938 11.3928 13.4167 11.0834 13.4167H4.66675C4.35733 13.4167 4.06058 13.2938 3.84179 13.075C3.623 12.8562 3.50008 12.5594 3.50008 12.25V11.0833H4.66675V12.25H11.0834Z' fill='#18AB00'/></svg>";
  sauma__controls_type.type = "text";
  sauma__controls_type.value = "ST5";
  s_summ = 0;
  if (document.getElementById("saumoitus__sauma_one_v").checked) {
    if (document.getElementById("settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked) {
      factual_cord = parseFloat(h) - parseFloat(s_summ);
      sauma.style.bottom = factual_cord / 5 + "px";
      sauma__control.style.height = factual_cord / 5 + "px";
      sauma__control_down.style.height = factual_cord / 5 + "px";
      sauma__control.style.bottom = factual_cord / 5 + "px";
      sauma.style.marginTop = "unset";
      sauma__control_down.style.marginTop = "unset";
      sauma__control.value = factual_cord;
      sauma__control_down.innerHTML = h - s_summ;
      //console.log("VAAKASAUMOITUS AUKKOJEN YLI, HÄNTÄ YLÄ (HÄNTÄ)");
    }
    else if (document.getElementById("settings__saumahanta-ala").checked) {
      factual_cord = parseFloat(h) - parseFloat(s_summ);
      sauma.style.top = factual_cord / 5 + "px";
      sauma__control.style.height = factual_cord / 5 + "px";
      sauma__control_down.style.height = factual_cord / 5 + "px";
      sauma__control.style.top = factual_cord / 5 + "px";
      sauma.style.marginTop = "-5px";
      sauma__control_down.style.marginTop = "10px";
      sauma__control.value = factual_cord;
      sauma__control_down.innerHTML = h - s_summ;
      // console.log("VAAKASAUMOITUS AUKKOJEN YLI, HÄNTÄ ALA (HÄNTÄ)");
    }
    // else if( document.getElementById("settings__saumahanta-vaakatasoitus").checked) {}
  }
  else if (document.getElementById("saumoitus__sauma_three").checked) {
    if (document.getElementById("settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked ||
      vaakahanta_alas === true) {
      factual_cord = parseFloat(aukko) - parseFloat(s_summ);
      sauma.style.bottom = factual_cord / 5 + "px";
      sauma__control.style.height = factual_cord / 5 + "px";
      sauma__control_down.style.height = factual_cord / 5 + "px";
      sauma__control.style.bottom = factual_cord / 5 + "px";
      sauma.style.marginTop = "unset";
      sauma__control.value = factual_cord;
      sauma__control_down.innerHTML = h - s_summ;
      // console.log("VAAKASAUMOITUS AUKKOJEN MUKAAN, HÄNTÄ YLÄ (HÄNTÄ)");
    }
    else if (document.getElementById("settings__saumahanta-ala").checked) {
      factual_cord = parseFloat(aukko) - parseFloat(s_summ);
      sauma.style.top = factual_cord / 5 + "px";
      sauma__control.style.height = factual_cord / 5 + "px";
      sauma__control_down.style.height = factual_cord / 5 + "px";
      sauma__control.style.top = factual_cord / 5 + "px";
      sauma.style.marginTop = "-5px";
      sauma__control.value = factual_cord;
      sauma__control_down.innerHTML = h - s_summ;
      // console.log("VAAKASAUMOITUS AUKKOJEN MUKAAN, HÄNTÄ ALA (HÄNTÄ)");
    }
  }
  document.querySelector(".drawarea__controls_four-vaaka").prepend(newDiv__comment);
  // sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
  //console.log("HÄNTÄSAUMA " + sauma);
  return sauma;
}
// 24 LUO YKSITTÄISEN KOORDINAATISTON VAAKASAUMOILLE, H
function luo__scord_horizontal(saumaheight, id, name) {
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls = document.createElement("div");
  const sauma__controls_del = document.createElement("div");
  const sauma__controls_type = document.createElement("input");
  sauma__control.classList.add("sauma__horizontal_ctrl");
  sauma__control.classList.add("sauma__horizontal_ctrl-righted");
  sauma__control.classList.add("sauma__control");
  sauma__controls_type.classList.add("lineinput");
  sauma__control_down.classList.add("sauma__horizontal_ctrldown");
  sauma__controls.classList.add("sauma__controls");
  sauma__controls_del.classList.add("sauma__controls_del");
  sauma__control_down.classList.add("sauma__control_down");
  sauma__control_down.classList.add(id);
  sauma__control.classList.add(id);
  sauma__controls.classList.add(id);
  sauma__controls_del.classList.add(id);
  sauma__controls_type.classList.add(id);
  sauma__controls.innerHTML = "";
  sauma__control_down.innerHTML = "0";
  sauma__control.value = saumaheight;
  sauma_downheight = parseFloat(saumaheight)-10;
  sauma__control_down.innerHTML = "<div>"+sauma_downheight+"</div>";
  sauma__controls_type.value = "ST1";
  sauma__controls_type.type = "text";
  sauma__control.setAttribute("name", id);
  sauma__controls.setAttribute("name", id);
  sauma__controls_del.setAttribute("name", id);
  sauma__controls_type.setAttribute("name", id);
  sauma__control_down.setAttribute("name", id);
  sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
  sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
  sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
  // sauma__control.setAttribute("onclick", "document.querySelector("+id+").remove();this.parentElement.style.opacity = '0';");
  sauma__controls_del.innerHTML = String.fromCharCode(64 + parseFloat(name));
  if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked ||
    vaakahanta_alas === true) {
    // sauma__control_down.style.bottom = (-1) * saumaheight/5 + "px";
    sauma__control_down.style.height = saumaheight / 5 + "px";
    sauma__control.style.height = saumaheight / 5 + "px";
  }
  else {
    sauma__controls.style.top = (-1) * saumaheight / 5 + "px";
    sauma__control_down.style.height = saumaheight / 5 + "px";
    sauma__control.style.height = saumaheight / 5 + "px";
  }
  // if (document.getElementById("settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked) {
  //   
  //   if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //     sauma__control_down.style.bottom = (-1) * sauma/5 + "px";
  //   }
  //   else {
  //     sauma__control_down.style.top = (-1) * sauma/5 + "px";
  //   }
  //   sauma__control.style.height = sauma/5 + "px";
  //   if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //     sauma__control.style.bottom = (-1) * sauma/5 + "px";
  //   }
  //   else {
  //     sauma__control.style.top = (-1) * sauma/5 + "px";
  //   }
  // }
  // if (document.getElementById("settings__saumahanta-vas").checked) {
  //   sauma__control_down.style.height = sauma/5 + "px";
  //   sauma__control_down.style.bottom = (-1) * sauma/5 + "px";
  //   if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //     sauma__control.style.bottom = (-1) * sauma/5 + "px";
  //   }
  //   else {
  //     sauma__control.style.top = (-1) * sauma/5 + "px";
  //   }
  //   sauma__control.style.height = sauma/5 + "px";
  // }
  // else {
  //   sauma__control_down.style.height = sauma/5 + "px";
  //   if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //     sauma__control_down.style.bottom = (-1) * sauma/5 + "px";
  //   }
  //   else {
  //     sauma__control_down.style.top = (-1) * sauma/5 + "px";
  //   }
  //   sauma__control.style.height = sauma/5 + "px";
  //   if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //     sauma__control.style.bottom = (-1) * sauma/5 + "px";
  //   }
  //   else {
  //     sauma__control.style.top = (-1) * sauma/5 + "px";
  //   }
  // }
  sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
  sauma__controls.append(sauma__control);
  sauma__controls.append(sauma__control_down);
  sauma__controls.append(sauma__controls_del);
  // sauma__controls.append(sauma__controls_type);
  return sauma__controls;
}
// 25 LUO KOORDINAATISTON VAAKASAUMOILLE KUN MENEE AUKKOJEN YLI, H
function cord_vaakasaumat__aukotyli() {
  var canvas = document.querySelector(".canvas");
  var h = document.querySelector("#box_h").value;
  var w = document.querySelector("#box_w").value;
  let sauma = canvas.querySelectorAll(".sauma__horizontal");
  // sauma = canvas.querySelectorAll(".sauma__horizontal");
  //   if(canvas.querySelector(".sauma__horizontal")) {
  //     distance = sauma[0].parentElement;
  //     viim_sauma = luo__lastsauma_horizontal(distance);
  //     distance.append(viim_sauma);
  //     sauma = canvas.querySelectorAll(".sauma__horizontal");
  //   }
  s_summ = 0;
  sauma.forEach(function(j) {
    if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked ||
      vaakahanta_alas === true) {
      saumaheight = (parseFloat(j.style.bottom) * 5) - s_summ;
    }
    else {
      saumaheight = parseFloat(j.style.top) * 5 - s_summ;
    }
    if (j.querySelector(".sauma__horizontal_ctrldown")) {
      j.querySelector(".sauma__horizontal_ctrldown").remove();
    }
    if (j.querySelector(".sauma__horizontal_ctrl")) {
      j.querySelector(".sauma__horizontal_ctrl").remove();
    }
    if (j.querySelector(".sauma__controls")) {
      j.querySelector(".sauma__controls").remove();
    }
    id = j.getAttribute("name");
    j.append(luo__scord_horizontal(saumaheight, id, j.dataset.no));
    j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
      resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
    });
    j.addEventListener('touchmove', (e) => {
      resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
    });
    s_summ += saumaheight;
  });
  // if(document.getElementById("settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked || document.getElementById("settings__saumahanta-vas").checked) {
  //   sauma.forEach(function(j) {
  //     if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //       saumaheight = parseFloat(j.style.bottom)*5 - s_summ;
  //     }
  //     else {
  //       saumaheight = parseFloat(j.style.top)*5 - s_summ;
  //     }
  //     if(j.querySelector(".sauma__horizontal_ctrldown")) {
  //       j.querySelector(".sauma__horizontal_ctrldown").remove();
  //     }
  //     if(j.querySelector(".sauma__horizontal_ctrl")) {
  //       j.querySelector(".sauma__horizontal_ctrl").remove();
  //     }
  //     if(j.querySelector(".sauma__controls")) {
  //       j.querySelector(".sauma__controls").remove();
  //     }
  //     id = j.getAttribute("name");
  //     j.append(luo__scord_horizontal(saumaheight,id,j.dataset.no));
  //     j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
  //         resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
  //       });
  //       j.addEventListener('touchmove', (e) => {
  //         resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
  //       });
  //     s_summ +=saumaheight;
  //   });
  // }
  // else if (document.getElementById("settings__saumahanta-vas").checked) {
  //   sauma.forEach(function(j) {
  //     if(document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked || vaakahanta_alas === true) {
  //       saumaheight = parseFloat(j.style.bottom)*5 - s_summ;
  //     }
  //     else {
  //       saumaheight = parseFloat(j.style.top)*5 - s_summ;
  //     }
  //     if(j.querySelector(".sauma__horizontal_ctrldown")) {
  //       j.querySelector(".sauma__horizontal_ctrldown").remove();
  //     }
  //     if(j.querySelector(".sauma__horizontal_ctrl")) {
  //       j.querySelector(".sauma__horizontal_ctrl").remove();
  //     }
  //     if(j.querySelector(".sauma__controls")) {
  //       j.querySelector(".sauma__controls").remove();
  //     }
  //     id = j.getAttribute("name");
  //     j.append(luo__scord_horizontal(saumaheight,id,j.dataset.no));
  //     j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
  //       resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
  //     });
  //     j.addEventListener('touchmove', (e) => {
  //       resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
  //     });
  //     s_summ +=saumaheight;
  //   });
  // }
}
// 26 LUO KOORDINAATISTON VAAKASAUMOILLE KUN MENEE AUKKOJEN YLI TASOITUKSELLA, H
function cord_vaakasaumat__aukotyli_tasoitus() {
  let seina_patkat = document.querySelectorAll(".seina_patka_y");
  var canvas = document.querySelector(".canvas");
  var h = document.querySelector("#box_h").value;
  var w = document.querySelector("#box_w").value;
  var s_summ = 0;
  sauma = canvas.querySelectorAll(".sauma__horizontal");
  // if(canvas.querySelector(".sauma__horizontal")) {
  //   distance = sauma[0].parentElement;
  //   viim_sauma = luo__lastsauma_horizontal(distance);
  //   distance.append(viim_sauma);
  //   sauma = canvas.querySelectorAll(".sauma__horizontal");
  // }
  sauma.forEach(function(j) {
    if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked ||
      vaakahanta_alas === true) {
      saumaheight = parseFloat(j.style.bottom) * 5 - s_summ;
    }
    else {
      saumaheight = parseFloat(j.style.top) * 5 - s_summ;
    }
    if (j.querySelector(".sauma__horizontal_ctrldown")) {
      j.querySelector(".sauma__horizontal_ctrldown").remove();
    }
    if (j.querySelector(".sauma__horizontal_ctrl")) {
      j.querySelector(".sauma__horizontal_ctrl").remove();
    }
    if (j.querySelector(".sauma__controls")) {
      j.querySelector(".sauma__controls").remove();
    }
    id = j.getAttribute("name");
    j.append(luo__scord_horizontal(saumaheight, id, j.dataset.no));
    j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
      resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
    });
    j.addEventListener('touchmove', (e) => {
      resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
    });
    s_summ += saumaheight;
  });
}
// 27 LUO KOORDINAATISTON VAAKASAUMOILLE KUN MENEE AUKKOJEN MUKAAN, H
function cord_vaakasaumat__aukotmukaan() {
  if (document.querySelector(".seina_patka_y")) {
    let seina_patkat = document.querySelectorAll(".seina_patka_y");
    // sp_lenght = parseFloat(seina_patkat.length) - 1;
    if (document.getElementById("settings__saumahanta-oik").checked || document.getElementById("settings__saumahanta-vas").checked) {
      seina_patkat.forEach(function(i) {
        let sauma = i.querySelectorAll(".sauma__horizontal");
        var height = parseFloat(i.style.height);
        var s_summ = 0;
        var sauma_pituus, sauma_nosto, i_y;
        if (document.getElementById("settings__sauma_pysty").checked) {
          i_y = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
        }
        else if (document.getElementById("settings__sauma_vaaka").checked) {
          i_y = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
        }
        if (i.querySelector(".sauma__horizontal")) {
          z = 0;
          sauma.forEach(function(j) {
            // if(j.querySelector(".sauma__horizontal_ctrldown")) {
            //   j.querySelector(".sauma__horizontal_ctrldown").remove();
            // }
            // if(j.querySelector(".sauma__horizontal_ctrl")) {
            //   j.querySelector(".sauma__horizontal_ctrl").remove();
            // }
            // if(j.querySelector(".sauma__controls")) {
            //   j.querySelector(".sauma__controls").remove();
            // }
            id = j.getAttribute("name");
            if (j.classList.contains("sauma__horizontal") === true && j.classList.contains("sauma_viim__horizontal") === false && j.classList.contains(
                "sauma_ensi__horizontal") === false) {
              if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus")
                .checked || vaakahanta_alas === true) {
                var sauma_nosto = parseFloat(j.style.bottom) * 5;
              }
              else {
                var sauma_nosto = parseFloat(j.style.top) * 5;
              }
              z += 1;
              if (z == 1) {
                saumaheight = sauma_nosto;
              }
              else {
                saumaheight = (sauma_nosto) - s_summ;
              }
              j.append(luo__scord_horizontal(saumaheight, id, j.dataset.no));
              j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
              j.addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
              s_summ += (saumaheight);
            }
            if (j.classList.contains("sauma_viim__horizontal") === true) {
              if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus")
                .checked || vaakahanta_alas === true) {
                var sauma_nosto = parseFloat(j.style.bottom) * 5;
              }
              else {
                var sauma_nosto = parseFloat(j.style.top) * 5;
              }
              saumaheight = sauma_nosto - s_summ;
              j.append(luo__scord_horizontal(saumaheight, id, j.dataset.no));
              j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
              j.addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
            }
          });
        }
      });
    }
    else if (document.querySelector("#settings__saumahanta-tasoitus").checked) {
      seina_patkat.forEach(function(i) {
        let sauma = i.querySelectorAll(".sauma__horizontal");
        var height = parseFloat(i.style.height);
        var sauma_pituus, sauma_nosto, i_y;
        if (document.getElementById("settings__sauma_pysty").checked) {
          i_y = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
        }
        else if (document.getElementById("settings__sauma_vaaka").checked) {
          i_y = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
        }
        if (i.querySelector(".sauma__horizontal")) {
          var s_summ = 0;
          z = 0;
          sauma.forEach(function(j) {
            if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked ||
              vaakahanta_alas === true) {
              var sauma_nosto = parseFloat(j.style.bottom) * 5;
            }
            else {
              var sauma_nosto = parseFloat(j.style.top) * 5;
            }
            id = j.getAttribute("name");
            if (j.classList.contains("sauma__horizontal") === true && j.classList.contains("sauma_viim__horizontal") === false && j.classList.contains(
                "sauma_ensi__horizontal") === false) {
              z += 1;
              if (z == 1) {
                saumaheight = sauma_nosto;
              }
              else {
                saumaheight = sauma_nosto - s_summ;
              }
              j.append(luo__scord_horizontal(saumaheight, id, j.dataset.no));
              j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
              j.addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
              s_summ += (saumaheight);
            }
            if (j.classList.contains("sauma_viim__horizontal") === true) {
              if (document.querySelector("#settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus")
                .checked || vaakahanta_alas === true) {
                var sauma_nosto_btn = parseFloat(j.style.bottom) * 5;
              }
              else {
                var sauma_nosto_btn = parseFloat(j.style.top) * 5;
              }
              saumaheight = sauma_nosto - s_summ;
              j.append(luo__scord_horizontal(saumaheight, id, j.dataset.no));
              j.querySelector(".sauma__controls").addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
              j.addEventListener('touchmove', (e) => {
                resizeSauma(e, j, j.querySelector(".sauma__controls"), j.querySelector(".sauma__control"), "v");
              });
            }
          });
        }
      });
    }
  }
  else {
    cord_vaakasaumat__aukotyli();
  }
}
///// MUUT
// 28 tee alkusaumat
function alkusaumat() {
  if (document.querySelector(".saumat__grandrow")) {
      saumat = document.querySelector(".saumat__grandrow");
    }
    else {
      saumat = document.createElement("div");
      saumat.classList.add("saumat__grandrow");
      canvas.appendChild(saumat);
    }

  if (canvas.querySelector(".verticalrow_saumat")) {
    verticalrow_saumat = canvas.querySelector(".verticalrow_saumat");
  }
  else {
    verticalrow_saumat = document.createElement("div");
    verticalrow_saumat.classList.add("verticalrow_saumat");
    saumat.append(verticalrow_saumat);

  }
  if (canvas.querySelector(".horizontalrow_saumat")) {
    horizontalrow_saumat = canvas.querySelector(".horizontalrow_saumat");
  }
  else {
    horizontalrow_saumat = document.createElement("div");
    horizontalrow_saumat.classList.add("horizontalrow_saumat");
    saumat.append(horizontalrow_saumat);

  }
  a_v = document.createElement("div");
  a_h = document.createElement("div");
  a_v.classList.add("fakesauma");
  a_h.classList.add("fakesauma");
  a_v.classList.add("fakesauma_v");
  a_h.classList.add("fakesauma_h");
  const v__control = document.createElement("input");
  const v__control_down = document.createElement("b");
  const v__controls = document.createElement("div");
  const v__controls_del = document.createElement("div");
  const v__controls_type = document.createElement("input");
  const h__control = document.createElement("input");
  const h__control_down = document.createElement("b");
  const h__controls = document.createElement("div");
  const h__controls_del = document.createElement("div");
  const h__controls_type = document.createElement("input");
  var v_id = "alku_vertical" + Math.random().toString(16).slice(2).toLowerCase();
  var h_id = "alku_horizontal" + Math.random().toString(16).slice(2).toLowerCase();
  // var newrow_vertical = document.createElement("div");
  var v__comment = document.createElement("li");
  var v__comment_del = document.createElement("i");
  var h__comment = document.createElement("li");
  var h__comment_del = document.createElement("i");
  a_v.dataset.no = 1;
  a_h.dataset.no = "A";
  v__control.classList.add(v_id);
  v__controls.classList.add(v_id);
  v__controls_del.classList.add(v_id);
  v__controls_type.classList.add(v_id);
  v__comment.classList.add(v_id);
  v__control_down.classList.add(v_id);
  v__control.setAttribute("name", v_id);
  v__control_down.setAttribute("name", v_id);
  v__controls.setAttribute("name", v_id);
  v__controls_del.setAttribute("name", v_id);
  v__controls_type.setAttribute("name", v_id);
  v__comment.setAttribute("name", v_id);
  v__comment_del.setAttribute("name", v_id);
  a_v.classList.add(v_id);
  a_v.setAttribute("id", v_id);
  a_v.setAttribute("name", v_id);
  h__control.classList.add(h_id);
  h__controls.classList.add(h_id);
  h__controls_del.classList.add(h_id);
  h__controls_type.classList.add(h_id);
  h__comment.classList.add(h_id);
  h__control_down.classList.add(h_id);
  h__control.setAttribute("name", h_id);
  h__control_down.setAttribute("name", h_id);
  h__controls.setAttribute("name", h_id);
  h__controls_del.setAttribute("name", h_id);
  h__controls_type.setAttribute("name", h_id);
  h__comment.setAttribute("name", h_id);
  h__comment_del.setAttribute("name", h_id);
  a_h.classList.add(h_id);
  a_h.setAttribute("id", h_id);
  a_h.setAttribute("name", h_id);
  // if (document.getElementById("settings__saumahanta-oik").checked || document.querySelector("#settings__saumahanta-tasoitus").checked || pystyhanta_oikealle === true) {
  a_v.style.left = "0px";
  // }
  // else if (document.getElementById("settings__saumahanta-vas").checked) {
  //   a_v.style.right = "0px";
  // }
  // if (document.getElementById("settings__saumahanta-yla").checked || document.getElementById("settings__saumahanta-vaakatasoitus").checked) {
  a_h.style.bottom = "0px";
  // }
  // else if (document.getElementById("settings__saumahanta-ala").checked) {
  //   a_h.style.top = "0px";
  // }
  v__control.classList.add("sauma__vertical_ctrl");
  v__control.classList.add("sauma__vertical_ctrl-righted");
  v__control.classList.add("sauma__control");
  v__controls_type.classList.add("lineinput");
  // v__control_down.classList.add("sauma__vertical_ctrldown");
  v__controls.classList.add("sauma__controls");
  v__controls_del.classList.add("sauma__controls_del");
  // v__control_down.classList.add("sauma__control_down");
  h__control.classList.add("sauma__horizontal_ctrl");
  h__control.classList.add("sauma__horizontal_ctrl-righted");
  h__control.classList.add("sauma__control");
  h__controls_type.classList.add("lineinput");
  // h__control_down.classList.add("sauma__horizontal_ctrldown");
  h__controls.classList.add("sauma__controls");
  h__controls_del.classList.add("sauma__controls_del");
  // h__control_down.classList.add("sauma__control_down");
  v__controls_del.innerHTML = 1;
  h__controls_del.innerHTML = "A";
  a_v.appendChild(v__controls);
  v__controls.append(v__control);
  v__controls.append(v__control_down);
  v__controls.append(v__controls_del);
  a_h.appendChild(h__controls);
  h__controls.append(h__control);
  h__controls.append(h__control_down);
  h__controls.append(h__controls_del);

  
  horizontalrow_saumat.appendChild(a_h);
  verticalrow_saumat.appendChild(a_v);
  
  sauma__verticals = canvas.querySelectorAll(".sauma__vertical");
  sauma__horizontals = canvas.querySelectorAll(".sauma__horizontal");
  if (canvas.querySelector(".sauma__vertical")) {
    for (var i = 0; i < sauma__verticals.length; i++) {
      if (sauma__verticals[i].querySelector(".sauma__controls_del")) {
        sauma__verticals[i].querySelector(".sauma__controls_del").innerHTML = i + 2;
        sauma__verticals[i].dataset.no = i + 2;
      }
    }
    s_v = i + 1;
  }
  if (canvas.querySelector(".sauma__horizontal")) {
    for (var i = 0; i < sauma__horizontals.length; i++) {
      if (sauma__horizontals[i].querySelector(".sauma__controls_del")) {
        sauma__horizontals[i].querySelector(".sauma__controls_del").innerHTML = String.fromCharCode(65 + parseFloat(i + 1));
        sauma__horizontals[i].dataset.no = String.fromCharCode(65 + parseFloat(i + 1));
      }
    }
    s_h = i + 1;
  }
}
// 29 Tarkista koot
function saumasize__checkup() {
  v_input = document.querySelectorAll(".sauma__vertical_ctrl");
  if (document.getElementById("settings__sauma_pysty").checked) {
    int_y = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
    int_x = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
  }
  else if (document.getElementById("settings__sauma_vaaka").checked) {
    int_y = parseFloat(document.querySelector("#settings__sauma_interval_x").value);
    int_x = parseFloat(document.querySelector("#settings__sauma_interval_y").value);
  }
  for (var i = 0; i < v_input.length; i++) {
    if (parseFloat(v_input[i].value) > int_x) {
      v_input[i].style.border = "3px dashed red";
    }
    else {
      v_input[i].style.border = "unset";
      v_input[i].style.borderBottom = "1px solid #000";
    }
  }
  h_input = document.querySelectorAll(".sauma__horizontal_ctrl");
  for (var i = 0; i < h_input.length; i++) {
    if (parseFloat(h_input[i].value) > int_y) {
      h_input[i].style.border = "3px dashed red";
    }
    else {
      h_input[i].style.border = "unset";
      // h_input[i].style.borderLeft = "1px solid #000";
    }
  }
  levyta();
}

saumoitettu_muut = false;
// 30 Siirrä ladonta A-D
function siirto_ladonta() {
  
  horizontals_original = canvas.querySelectorAll(".horizontalrow_saumat > div");
  rooms_vaaka = [];
  room_summ = 0;
  oneroom = document.querySelector("div.house__wall.house__wall_one");
  tworoom = document.querySelector("div.house__wall.house__wall_two");
  threeroom = document.querySelector("div.house__wall.house__wall_three");
  fourromm = document.querySelector("div.house__wall.house__wall_four");
  oneroom_h = parseFloat(oneroom.querySelector(".wall_height").value);
  tworoom_h = parseFloat(tworoom.querySelector(".wall_height").value);
  threeroom_h = parseFloat(threeroom.querySelector(".wall_height").value);
  fourromm_h = parseFloat(fourromm.querySelector(".wall_height").value);
  oneroom_w = parseFloat(oneroom.querySelector(".wall_width").value);
  tworoom_w = parseFloat(tworoom.querySelector(".wall_width_2").value);
  threeroom_w = parseFloat(threeroom.querySelector(".wall_width").value);
  fourromm_w = parseFloat(fourromm.querySelector(".wall_width_2").value);
  oneroom_name = parseFloat(oneroom.querySelector(".house__wall_status").innerText);
  tworoom_name = parseFloat(tworoom.querySelector(".house__wall_status").innerText);
  threeroom_name = parseFloat(threeroom.querySelector(".house__wall_status").innerText);
  fourromm_name = parseFloat(fourromm.querySelector(".house__wall_status").innerText);
  one = oneroom_h + "|" + oneroom_w + "|" + oneroom_name;
  two = tworoom_h + "|" + tworoom_w + "|" + tworoom_name;
  three = threeroom_h + "|" + threeroom_w + "|" + threeroom_name;
  four = fourromm_h + "|" + fourromm_w + "|" + fourromm_name;
  rooms_vaaka.push(one);
  rooms_vaaka.push(two);
  rooms_vaaka.push(three);
  rooms_vaaka.push(four);
  copiedcanvases = [];
  saumoitettu_muut = true;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  (async () => {
    for (var z = 0; z < rooms_vaaka.length; z++) {
      // document.querySelector(".saumat_data").value = "";
      room_h = parseFloat(rooms_vaaka[z].split("|")[0]);
      room_w = parseFloat(rooms_vaaka[z].split("|")[1]);
      document.querySelector(".wall").value = rooms_vaaka[z].split("|")[2];
      if (canvas.querySelector("div.levyt")) {
        canvas.querySelector("div.levyt").remove();
      }
      if (canvas.querySelector(".mp")) {
        todel = canvas.querySelectorAll(".mp");
        for (var i = 0; i < todel.length; i++) {
          todel[i].remove();
        }
      }
      if (canvas.querySelector(".lv")) {
        todel = canvas.querySelectorAll(".lv");
        for (var i = 0; i < todel.length; i++) {
          todel[i].remove();
        }
      }
      if (canvas.querySelector(".aukko")) {
        todel = canvas.querySelectorAll(".aukko");
        for (var i = 0; i < todel.length; i++) {
          todel[i].remove();
        }
      }
      if (canvas.querySelector("div.saumat__grandrow")) {
        canvas.querySelector("div.saumat__grandrow").remove();
      }
      if (canvas.querySelector("div.tyostot__grandrow")) {
        canvas.querySelector("div.tyostot__grandrow").remove();
      }
      if (canvas.querySelector("div.listat__grandrow")) {
        canvas.querySelector("div.listat__grandrow").remove();
      }
      if (canvas.querySelector("div.newrow_vertical")) {
        canvas.querySelector("div.newrow_vertical").remove();
      }
      await sleep(1000);
      $("#project_start").hide();
      console.log("z: " + z);
      realcount = Math.floor(parseFloat(z) + 1);
      console.log("z+1: " + realcount);
      document.querySelector("div.house.drawarea__house > div:nth-child(2) > div:nth-child(" + realcount + ") > div.house__wall_status").click();
      // updatearea();
      // changesize();
      await sleep(1000);
      console.log("Saumoitetaan");
      $('#step_drawscreen').val('drawscreen_section_four');
      refresh__drawcontrols();
      updatearea();
      saumoita();
      horizontals = canvas.querySelectorAll(".sauma__horizontal");
      for (var i = 0; i < horizontals.length; i++) {
        h_parent = horizontals[i].parentElement;
        horizontals[i].remove();
      }
      for (var i = 0; i < horizontals_original.length; i++) {
        h_parent.appendChild(horizontals_original[i]);
      }
      levyta();
      submitprogress('', 'adding', '', 'sau');
      await sleep(1000);
      $('#step_drawscreen').val('drawscreen_section_five');
      refresh__drawcontrols();
      updatearea();

      a_num = String.fromCharCode(64 + parseFloat(realcount)).toLowerCase();
      thiswall_status = document.querySelectorAll("div.house__wall_status_" + a_num);
      for (var i = 0; i < thiswall_status.length; i++) {
        thiswall_status[i].classList.add("saumatok");
      }
    }
    saumoitettu_muut = false;
  })();
}
// 31 Restoring sauma
function luo__sauma_restore(mod_nam, mod_type, mod_b, mod_left, mod_cord, mod_name) {
  const heightBox = document.querySelector('#box_h').value;
  const boxHeight = document.querySelector('#box-wrapper > main').offsetHeight;
  const canvasWidth = document.querySelector('#box-wrapper > main').offsetWidth;
  verticalrow_saumat = document.querySelector(".verticalrow_saumat");
  horizontalrow_saumat = document.querySelector(".horizontalrow_saumat");
  var h = parseFloat(document.querySelector('#box_h').value);
  var w = parseFloat(document.querySelector('#box_w').value);
  aukoitus_param = false;
  const sauma = document.createElement("div");
  const sauma__control = document.createElement("input");
  const sauma__control_down = document.createElement("b");
  const sauma__controls_type = document.createElement("input");
  const sauma__controls_del = document.createElement("div");
  const newDiv__comment = document.createElement("li");
  const newDiv__comment_del = document.createElement("i");
  const newrow_horis_vontal = document.createElement("div");
  const sauma__controls = document.createElement("div");
  sauma.classList.add("sauma");
  sauma.dataset.no = mod_nam;
  if (mod_type == "pysty") {
    let id = "sauma" + Math.random().toString(16).slice(2).toLowerCase().toLowerCase();
    sauma.classList.add("luo__sauma_vertical");
    sauma.classList.add("sauma__vertical");
    sauma__control.classList.add("sauma__vertical_ctrl");
    sauma__control.classList.add("sauma__control");
    sauma__control.classList.add("sauma__vertical_ctrl-lefted");
    sauma__controls_type.classList.add("lineinput");
    sauma__control_down.classList.add("sauma__vertical_ctrldown");
    newDiv__comment_del.classList.add("newDiv__comment_del");
    sauma__controls.classList.add("sauma__controls");
    sauma__controls_del.classList.add("sauma__controls_del");
    newrow_horis_vontal.classList.add("newrow_vertical");
    sauma__control_down.classList.add("sauma__control_down");
    newDiv__comment_del.classList.add("newDiv__comment_del");
    sauma__control_down.classList.add(id);
    sauma__control.classList.add(id);
    newDiv__comment.classList.add(id);
    sauma.classList.add(id);
    newDiv__comment.classList.add(id);
    sauma__controls.classList.add(id);
    sauma__controls_del.classList.add(id);
    sauma__controls_type.classList.add(id);
    sauma.innerHTML = "";
    sauma__control.value = "0";
    sauma__controls.innerHTML = "";
    newDiv__comment.innerHTML = "Sauma";
    newDiv__comment_del.innerHTML =
      "<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41675 9.91668H2.33341C2.024 9.91668 1.72725 9.79376 1.50846 9.57497C1.28966 9.35618 1.16675 9.05943 1.16675 8.75001V1.75001C1.16675 1.1059 1.28966 1.14384 1.50846 0.925052C1.72725 0.70626 2.024 0.58331 2.33341 0.58331H9.33341V1.75001H2.33341V8.75001H6.41675V7.58334L8.75008 9.33334L6.41675 11.0833V9.91668ZM11.0834 12.25V4.08334H4.66675V7.58334H3.50008V4.08334C3.50008 3.77392 3.623 3.47718 3.84179 3.25839C4.06058 3.03959 4.35733 2.91668 4.66675 2.91668H11.0834C11.3928 2.91668 11.6896 3.03959 11.9084 3.25839C12.1272 3.47718 12.2501 3.77392 12.2501 4.08334V12.25C12.2501 12.5594 12.1272 12.8562 11.9084 13.075C11.6896 13.2938 11.3928 13.4167 11.0834 13.4167H4.66675C4.35733 13.4167 4.06058 13.2938 3.84179 13.075C3.623 12.8562 3.50008 12.5594 3.50008 12.25V11.0833H4.66675V12.25H11.0834Z' fill='#18AB00'/></svg>";
    sauma__control_down.innerHTML = "0";
    newDiv__comment.innerHTML = "Sauma ";
    newDiv__comment_del.innerHTML = "";
    sauma__control.value = roundToNearest25(mod_cord);
    sauma__control.setAttribute("data-from", parseFloat(roundToNearest25(mod_cord)));
    sauma__control_down.innerHTML = parseFloat(roundToNearest25(mod_cord)) - 10;
    sauma__controls_type.value = "ST1";
    sauma__controls_type.type = "text";
    newDiv__comment.setAttribute("name", id);
    newDiv__comment_del.setAttribute("onclick", "obj = this.getAttribute('name');document.querySelector('#'+obj).remove();this.parentElement.remove();");
    newDiv__comment_del.setAttribute("name", id);
    sauma__control.setAttribute("name", id);
    sauma__controls.setAttribute("name", id);
    sauma__controls_del.setAttribute("name", id);
    sauma__controls_type.setAttribute("name", id);
    sauma.setAttribute("id", id);
    sauma.setAttribute("name", id);
    sauma__control_down.setAttribute("name", id);
    sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
    sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
    sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
    // sauma__control.setAttribute("onclick", "document.querySelector("+id+").remove();this.parentElement.style.opacity = '0';");
    sauma.setAttribute("onclick", "");
    sauma.style.position = 'absolute';
    sauma.style.left = mod_left + "px";
    sauma__controls_del.style.marginLeft = "0px";
    sauma__control_down.style.left = "0px";
    //sauma__control.style.width = "0px";
    sauma__control_down.style.width = "0px";
    sauma.style.width = "0px";
    document.querySelector(".drawarea__controls_four-pysty").prepend(newDiv__comment);
    verticalrow_saumat.prepend(sauma);
    if (parseFloat(mod_left) == 0) {
      return;
    }
  }
  if (mod_type == "vaaka") {
    let id = "vaakasauma" + Math.random().toString(16).slice(2).toLowerCase();
    newrow_horis_vontal.classList.add(id);
    newDiv__comment_del.classList.add("newDiv__comment_del");
    sauma__controls_del.classList.add("sauma__controls_del");
    sauma.classList.add("sauma__horizontal");
    sauma.classList.add("luo__sauma_horizontal");
    sauma__control.classList.add("sauma__horizontal_ctrl");
    sauma__control_down.classList.add("sauma__horizontal_ctrldown");
    sauma__control_down.classList.add("sauma__control_down");
    sauma__control_down.classList.add("luo__sauma_horizontal");
    sauma__controls_type.classList.add("lineinput");
    sauma__controls_type.classList.add("sauma__controls_type");
    sauma__control_down.classList.add("sauma__horizontal_ctrldown");
    sauma__controls.classList.add("sauma__controls");
    sauma__controls.classList.add(id);
    sauma__controls.innerHTML = "";
    sauma.classList.add(id);
    sauma__control.classList.add(id);
    sauma__control_down.classList.add(id);
    sauma__controls_type.classList.add(id);
    sauma__controls_del.classList.add(id);
    newDiv__comment.classList.add(id);
    newDiv__comment_del.classList.add(id);
    sauma__controls_type.setAttribute("name", id);
    newDiv__comment_del.setAttribute("name", id);
    sauma__controls_del.setAttribute("name", id);
    sauma__control_down.setAttribute("name", id);
    sauma.setAttribute("name", id);
    sauma__controls.setAttribute("name", id);
    newDiv__comment.innerHTML = "Sauma";
    newDiv__comment_del.setAttribute("onclick", "obj = this.getAttribute('name');document.querySelector('#'+obj).remove();this.parentElement.remove();");
    newDiv__comment_del.innerHTML =
      "<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.41675 9.91668H2.33341C2.024 9.91668 1.72725 9.79376 1.50846 9.57497C1.28966 9.35618 1.16675 9.05943 1.16675 8.75001V1.75001C1.16675 1.1059 1.28966 1.14384 1.50846 0.925052C1.72725 0.70626 2.024 0.58331 2.33341 0.58331H9.33341V1.75001H2.33341V8.75001H6.41675V7.58334L8.75008 9.33334L6.41675 11.0833V9.91668ZM11.0834 12.25V4.08334H4.66675V7.58334H3.50008V4.08334C3.50008 3.77392 3.623 3.47718 3.84179 3.25839C4.06058 3.03959 4.35733 2.91668 4.66675 2.91668H11.0834C11.3928 2.91668 11.6896 3.03959 11.9084 3.25839C12.1272 3.47718 12.2501 3.77392 12.2501 4.08334V12.25C12.2501 12.5594 12.1272 12.8562 11.9084 13.075C11.6896 13.2938 11.3928 13.4167 11.0834 13.4167H4.66675C4.35733 13.4167 4.06058 13.2938 3.84179 13.075C3.623 12.8562 3.50008 12.5594 3.50008 12.25V11.0833H4.66675V12.25H11.0834Z' fill='#18AB00'/></svg>";
    newDiv__comment.appendChild(newDiv__comment_del);
    newDiv__comment.innerHTML = "Sauma ";
    newDiv__comment_del.innerHTML = "";
    sauma__controls_del.setAttribute("onclick", "sauma__del(this);");
    sauma__control.setAttribute("onchange", "changedimensions_sauma(this);");
    sauma__control.setAttribute("onclick", "clearcord(this,'sau');");
    sauma.style.bottom = mod_b + "px";
    sauma__control.value = parseFloat(roundToNearest25(mod_cord));
    sauma__control_down.innerHTML = "<div>"+sauma__control.value - 10+"</div>";
    sauma.style.marginTop = "unset";
    sauma__control_down.style.marginTop = "unset";
    document.querySelector(".drawarea__controls_four-vaaka").prepend(newDiv__comment);
    sauma__control.setAttribute("data-from", parseFloat(sauma__control.value));
    if (parseFloat(mod_b) == 0) {
      return;
    }
    horizontalrow_saumat.prepend(sauma);
  }
  calculateamounts();


}

function clearcord(cord,type) {
  if(type === 'sau' || type === 'tyo') {
    cord.value = "";
  }

}