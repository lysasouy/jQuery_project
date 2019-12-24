

function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// Query data from API
$(document).ready(() => {
    //hide the line at the center between ingrediant and step
    $('#line').hide(); 
    requestApi();
    $('#recipe').on('change', function () {
        var recipes = $('#recipe').val();
        getRecipe(recipes);
        //show  the line at the center between ingrediant and step
        $('#line').show();
        //hide the image when it in recipe page
        $('#img').hide();
    });
});
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chhooseRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
// Gat all Data
var alldata = [];
function chhooseRechipe(rechipe) {
    alldata = rechipe;
    rechipe.forEach(element => {
        //display recipe name by id and display it in html
        Option += `
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(Option);
}
var getQuanlity = [];
var guest = 0;
function getRecipe(rechipeId) {
    alldata.forEach(element => {
        if (element.id == rechipeId) {
            // function display name and image of recipe
            getEachRecipe(element.name, element.iconUrl);
            // ingrediant function 
            getIngrdient(element);
            //function call for display instructions of recipe
            getInstructions(element.instructions);
            // Functin for increase number of people
            personNum(element);
            guest=element.nbGuests;
            //Function get Quanlity of gredients
            getQuanlity=element.ingredients;
        }
    });
}
//To get recipe name and image
var getEachRecipe = (name, img) => {
    var result = "";
    result += `
        <h3>${name}</h3> <br> <br> <br>
    `;
    $('#nameOfRecipe').html(result);
    var results = "";
    results += `
        <img src="${img}" width="150"> <br><br>
    `;
    // Increase and Discrese
    $(document).ready(function () {
        $('#increase').on('click', function () {
            var person = $('#input').val();
            addMember(person);
        })
    //discrese of number
        $('#discrease').on('click', function () {
            var person = $('#input').val();
            discrease(person);
        })
    })
    //add member and converter from string to number and add people untill 15 people
    function addMember(person) {
        var add = parseInt(person) + 1
        if (add <= 15) {
            $('#input').val(add);
            //increse the quanlity if the number of people is add more
            getNewQuility($('#input').val());
        }
    }
    // minus the number of the person untal 0
    function discrease(person) {
        var discrease = parseInt(person) - 1
                if (discrease >= 0) {
            $('#input').val(discrease);
            //display the new quility and discrese it if the number of people is discrese 
            getNewQuility($('#input').val());
        }
    }
    //end of increse and Discease
    $('#recipeImg').html(results);
}
//get all ingredient and display it in html
function getIngrdient(ingrediant) {
    var result = "";
    ingrediant.ingredients.forEach(element => {
        result += `
    <tr>
       <td><img src="${element.iconUrl}" width="90" class="img-fluid"></td>
       <td>${element.quantity}</td>
       <td>${element.unit[0]}</td>
       <td>${element.name}</td>
    </tr>
    `;
        $('#listOfIngredient').html(result);
    });
}
///get Instruction

function getInstructions(instructions) {
    $('#introduction').html('Instruction');
    var step = instructions.split("<step>");
    var instruct = "";

    //Loop to get data by step
    for (let i = 1; i < step.length; i++) {
        instruct += `
          <p class="text-info"><strong>Step${i}</strong><p/>
          ${step[i]}
        `;
        $('#stepToDo').html(instruct);
    }
}
//get number of person and increase and descrease
function personNum(el) {
    var person = "";
    person += `
        <form action="#">
            <div class="input-group mb-3">
                <h5>  Number of people &nbsp;</h5>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-success" id="discrease">-</button>
                    </div>
                        <input type="text" class="form-control text-center" value="${el.nbGuests}" disabled id="input">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-success" id="increase">+</button>
                    </div>
             </div>
        </form>
            <h1 id="result" class="text-center"></h1>
            <h5 class="text-center float-left" style="margin-left: -200px;">Ingredient</h5>
            <h5 class="text-center"style="margin-right: -300px;">Instroduction</h5>
    `;
    $("#counter").html(person);
}
///get new quility
function getNewQuility(person){
    var defualtquantity;
    var newQuantity;
    var result ="";
    getQuanlity.forEach(item =>{
        const{quantity} = item;
        defualtquantity = quantity / guest;
        newQuantity = defualtquantity*person;
         result +=`
         <tr>
         <td><img src="${item.iconUrl}" width="90" class="img-fluid"></td>
         <td>${newQuantity}</td>
         <td>${item.unit[0]}</td>
         <td>${item.name}</td>
      </tr>
         `;
    })
    $('#listOfIngredient').html(result);
}