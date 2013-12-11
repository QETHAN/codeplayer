/**
 * Created by QETHAN on 13-12-11.
 */

var input = document.getElementById('input');
var result = document.getElementById('result');


input.addEventListener("keyup", function(event){
    result.innerHTML = input.value;
});
