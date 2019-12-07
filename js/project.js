
$(document).ready(function(){
    $('#recipe').on('change', () =>{
        var fruit = $('#recipe').val();
        choose(fruit);
    })
})
var choose = (fruit) =>{
    switch(parseInt(fruit)){
        case 1:
            getApple();
            break;
        case 2:
            getData();
            break;
        case 3:
            getCoconut();
            break;
    }
}
var getData = () =>{
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType: 'json',
        url : url,
        success: function(datas) {
            var result ="";
            datas.recipes.forEach(element => {
                if(element.id == 1) {
                    result +=`
                        <img src="${element.iconUrl}" width="100">
                `;
                }  
            });
            $('#card').html(result);
            var results ="";
            datas.recipes.forEach(element => {
                if(element.id == 1) {
                    results +=`
                        ${element.name}
                `;
                }
            });
            $('#text').html(results);
            var resultes ="";
            datas.recipes.forEach(elements => {
                elements.ingredients.forEach(el =>{
                    if(elements.id == 1) {
                        resultes +=`
                          <tr>
                            <td><img src="${el.iconUrl}" width="50"></td>
                            <td>${el.quantity}</td>
                            <td>${el.unit[0]}</td>
                            <td>${el.name}</td>
                          </tr>
                    `;
                    }
                })
            });
            $('#tables').html(resultes);
        }
    })
    // Increase and Discrese
    $(document).ready(function() {

        $('#increase').on('click',function(){
            var person = $('#input').val();
            addMember(person);
        })   
        $('#discrease').on('click',function(){
            var person = $('#input').val();
            discrease(person);
        })   
        
        })
        function addMember(person){
            var add = parseInt(person) +1;
            if(add <= 15){
                $('#input').val(add);
            }
        }
        function discrease(person){
            var discrease = parseInt(person) -1
            if(discrease >= 0 ){
                $('#input').val(discrease);
            }
        }
        
       
       
        


    //end of increse and Discease
}
