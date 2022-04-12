function round_number(num) {
    //first, move the decimal two places
    num = num * 100;

    //then, round the number to the nearest integer
    num = Math.round(num);

    //then move the decimal back two places
    num = num / 100;

    // handle trailing zeroes
    num = num.toFixed(2);

    return num;
}

// get all of the calculator inputs
const inputs = document.querySelectorAll("[name='qty']");

// evaluate all of the inputs
inputs.forEach(function (input){
    input.addEventListener("change", function(e){
        const this_input = e.target;
        const qty = parseFloat(e.target.value);
        const this_row = this_input.closest(".row");
        
        const amazon = this_row.querySelector(".amazon");
        const amazon_span = amazon.querySelector("span");
        const amazon_price = parseFloat(amazon.dataset.price);
        const amazon_cost = qty * amazon_price;
        
        amazon_span.innerHTML = round_number(amazon_cost);
        amazon.classList.add("active");

        const target = this_row.querySelector(".target");
        const target_span = target.querySelector("span");
        const target_price = parseFloat(target.dataset.price);
        const target_cost = qty * target_price;
        
        target_span.innerHTML = round_number(target_cost);
        target.classList.add("active");

        const walmart = this_row.querySelector(".walmart");
        const walmart_span = walmart.querySelector("span"); 
        const walmart_price = parseFloat(walmart.dataset.price);
        const walmart_cost = qty * walmart_price;
        
        walmart_span.innerHTML = round_number(walmart_cost);
        walmart.classList.add("active");

        let cheap = false;

        if (amazon_cost < target_cost && amazon_cost < walmart_cost){
            cheap = amazon;
        }

        if (target_cost < amazon_cost && target_cost < walmart_cost){
            cheap = target;
        }

        if (walmart_cost < amazon_cost && walmart_cost < target_cost){
            cheap = walmart;
        }

        const current_cheap = this_row.querySelector(".cheap");

        if (current_cheap){
            current_cheap.classList.remove("cheap");
        };

        if (cheap) {
            cheap.classList.add("cheap");
        }
      
    });

});